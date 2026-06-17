// ============================================================
// Phase 7 — browser/runtime + accessibility audit
// Spawns the production server, then drives every audited route with
// Playwright to collect runtime errors, console errors, horizontal
// overflow at the responsive breakpoints, h1 counts, unlabeled form
// fields and cockpit-label clipping. Prints a JSON summary and exits
// non-zero on any hard failure (runtime/console error, overflow,
// missing 404, or a clipped cockpit label).
//
// Concept/prototype QA only — no network calls beyond the local server.
// ============================================================
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.QA_PORT || 3013);
const baseUrl = process.env.QA_BASE_URL || `http://127.0.0.1:${port}`;
const widths = [1440, 1024, 768, 430, 390, 360];

const routes = [
  "/",
  "/vacancies",
  "/jobs/senior-recruitment-consultant",
  "/vacancies/senior-recruitment-consultant",
  "/apply",
  "/request-staff",
  "/dashboard",
  "/dashboard/candidates",
  "/dashboard/employers",
  "/contact",
  "/about",
  "/design-lab",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url) {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // still starting
    }
    await sleep(500);
  }
  throw new Error(`QA server not ready at ${url}`);
}

const server = process.env.QA_BASE_URL
  ? null
  : spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });
if (server) {
  server.stdout.on("data", () => {});
  server.stderr.on("data", () => {});
}

const findings = [];
let hardFailures = 0;
const fail = (route, msg) => {
  hardFailures += 1;
  findings.push({ route, level: "FAIL", msg });
};
const warn = (route, msg) => findings.push({ route, level: "WARN", msg });

let browser;
try {
  await waitForServer(baseUrl);

  // 404 contract
  const missing = await fetch(`${baseUrl}/jobs/unknown-job-slug`);
  if (missing.status !== 404) fail("/jobs/unknown-job-slug", `expected 404, got ${missing.status}`);

  browser = await chromium.launch({
    channel: process.env.QA_BROWSER_CHANNEL || "chrome",
    headless: true,
  });

  for (const route of routes) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => pageErrors.push(String(e)));

    const res = await page.goto(baseUrl + route, { waitUntil: "networkidle" });
    if (!res || res.status() !== 200) fail(route, `status ${res?.status() ?? "none"}`);
    await page.evaluate(async () => { await document.fonts.ready; });
    await sleep(150);

    // runtime / console
    if (pageErrors.length) fail(route, `page error: ${pageErrors.join(" | ")}`);
    // ignore benign favicon/manifest 404 noise
    const realConsole = consoleErrors.filter(
      (t) => !/favicon|manifest|404 \(Not Found\)/i.test(t),
    );
    if (realConsole.length) fail(route, `console error: ${realConsole.join(" | ")}`);

    // a11y: exactly one meaningful h1
    const a11y = await page.evaluate(() => {
      const h1s = Array.from(document.querySelectorAll("h1"))
        .map((h) => (h.textContent || "").trim())
        .filter(Boolean);
      const fields = Array.from(document.querySelectorAll("input, select, textarea")).filter(
        (el) => el.type !== "hidden",
      );
      const unlabeled = fields
        .filter((el) => {
          if (el.getAttribute("aria-label")) return false;
          if (el.getAttribute("aria-labelledby")) return false;
          if (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) return false;
          if (el.closest("label")) return false;
          if (el.getAttribute("title")) return false;
          return true;
        })
        .map((el) => el.outerHTML.slice(0, 80));
      // cockpit labels (homepage) must not be clipped
      const clipped = Array.from(document.querySelectorAll(".hc-card-label"))
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.textContent);
      return { h1s, unlabeled, clipped };
    });
    if (a11y.h1s.length === 0) warn(route, "no h1");
    if (a11y.h1s.length > 1) fail(route, `multiple h1: ${a11y.h1s.join(" / ")}`);
    if (a11y.unlabeled.length) fail(route, `unlabeled field(s): ${a11y.unlabeled.join(" ; ")}`);
    if (a11y.clipped.length) fail(route, `clipped cockpit label(s): ${a11y.clipped.join(", ")}`);

    // overflow across breakpoints
    for (const width of widths) {
      await page.setViewportSize({ width, height: width <= 430 ? 900 : 1000 });
      await sleep(80);
      const o = await page.evaluate(() => ({
        vw: window.innerWidth,
        doc: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      if (Math.max(o.doc, o.body) > o.vw + 1) {
        fail(route, `horizontal overflow at ${width}px (${Math.max(o.doc, o.body)} > ${o.vw})`);
      }
    }

    await context.close();
  }

  // mobile nav usable: burger toggles the menu
  const mctx = await browser.newContext({ viewport: { width: 390, height: 850 } });
  const mpage = await mctx.newPage();
  await mpage.goto(baseUrl + "/", { waitUntil: "networkidle" });
  const burger = mpage.locator(".nav-burger");
  if ((await burger.count()) === 0) {
    fail("/", "mobile burger not found");
  } else {
    await burger.click();
    const menu = mpage.locator("#mobile-menu");
    await menu.waitFor({ state: "visible", timeout: 4000 }).catch(() => fail("/", "mobile menu did not open"));
    const expanded = await burger.getAttribute("aria-expanded");
    if (expanded !== "true") fail("/", `burger aria-expanded=${expanded} after open`);
  }
  await mctx.close();
} catch (err) {
  fail("(runner)", String(err));
} finally {
  await browser?.close();
  server?.kill();
}

console.log(JSON.stringify({ hardFailures, findings }, null, 2));
console.log(hardFailures === 0 ? "QA-BROWSER PASSED" : `QA-BROWSER FAILED (${hardFailures})`);
process.exit(hardFailures === 0 ? 0 : 1);
