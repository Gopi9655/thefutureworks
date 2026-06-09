import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const port = Number(process.env.QA_PORT || 3012);
const baseUrl = process.env.QA_BASE_URL || `http://127.0.0.1:${port}`;
const outputDir = path.resolve("docs/qa-screenshots");
const widths = [1440, 1024, 768, 430, 390, 360];
const pages = [
  { name: "home", path: "/" },
  { name: "vacancies", path: "/vacancies" },
  { name: "job-senior-recruitment-consultant", path: "/jobs/senior-recruitment-consultant" },
  { name: "apply", path: "/apply" },
  { name: "contact", path: "/contact" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The isolated server is still starting.
    }
    await sleep(500);
  }
  throw new Error(`QA server did not become ready at ${url}`);
}

await mkdir(outputDir, { recursive: true });

const server = process.env.QA_BASE_URL
  ? null
  : spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    });

if (server) {
  server.stdout.on("data", (chunk) => process.stdout.write(chunk));
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));
}

let browser;
try {
  await waitForServer(baseUrl);
  const missingJob = await fetch(`${baseUrl}/jobs/not-a-real-job`);
  if (missingJob.status !== 404) {
    throw new Error(`Unknown job slug returned ${missingJob.status} instead of 404`);
  }
  console.log("verified unknown job slug returns 404");

  browser = await chromium.launch({
    channel: process.env.QA_BROWSER_CHANNEL || "chrome",
    headless: true,
  });

  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width <= 430 ? 900 : 1000 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    for (const target of pages) {
      const response = await page.goto(baseUrl + target.path, { waitUntil: "networkidle" });
      if (!response || response.status() !== 200) {
        throw new Error(`${target.path} returned ${response?.status() ?? "no response"}`);
      }

      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await page.addStyleTag({
        content: `
          .reveal, .reveal-waiting { opacity: 1 !important; transform: none !important; transition: none !important; }
          *, *::before, *::after { animation: none !important; transition-duration: 0s !important; }
        `,
      });

      const overflow = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      if (Math.max(overflow.document, overflow.body) > overflow.viewport + 1) {
        throw new Error(`${target.path} has horizontal overflow at ${width}px: ${JSON.stringify(overflow)}`);
      }

      const file = path.join(outputDir, `${target.name}-${width}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`captured ${target.path} at ${width}px`);
    }

    await context.close();
  }

  const formContext = await browser.newContext({
    viewport: { width: 1024, height: 1000 },
    reducedMotion: "reduce",
  });
  const formPage = await formContext.newPage();
  await formPage.goto(`${baseUrl}/apply`, { waitUntil: "networkidle" });
  await formPage.locator('button[type="submit"]').click();
  await formPage.getByRole("alert").first().waitFor();
  if (await formPage.locator("#apply-role").getAttribute("aria-invalid") !== "true") {
    throw new Error("Apply form did not expose the expected role validation state");
  }
  console.log("verified apply form validation state");

  await formPage.locator("#apply-role").selectOption("senior-recruitment-consultant");
  await formPage.locator("#apply-name").fill("QA Candidate");
  await formPage.locator("#apply-email").fill("qa@example.com");
  await formPage.locator("#apply-phone").fill("07000000000");
  await formPage.locator("#apply-note").fill("Screenshot QA application");
  await formPage.locator('button[type="submit"]').click();
  await formPage.getByRole("status").waitFor({ timeout: 10000 });
  console.log("verified apply form success state");
  await formContext.close();
} finally {
  await browser?.close();
  server?.kill();
}
