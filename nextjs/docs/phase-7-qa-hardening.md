# Phase 7 — QA, responsive hardening, accessibility & preview evidence

Stabilisation pass: full build/route/runtime/accessibility QA over the
prototype, with the evidence captured here. This is a **high-fidelity
concept / prototype**, not the official thefutureworks website; all data is
synthetic.

## Current checkpoint

- Branch: `advanced-platform-v2`
- HEAD at start of phase: `640cfcd Polish homepage cockpit and brand orb`
  (local commit — not pushed).
- `main` untouched. No deploy. WebGL/Three.js remains disabled.

## Routes checked

`/` · `/vacancies` · `/jobs/senior-recruitment-consultant` ·
`/vacancies/senior-recruitment-consultant` · `/apply` · `/request-staff` ·
`/dashboard` · `/dashboard/candidates` · `/dashboard/employers` · `/contact` ·
`/about` · `/design-lab` · `/jobs/unknown-job-slug` (expected 404).

## Commands run

```
npm run typecheck
npm run build
git diff --check
powershell -ExecutionPolicy Bypass -File .\scripts\route-smoke.ps1
npm run qa:screenshots
node scripts/qa-browser.mjs        # new — runtime + a11y audit
```

## Build gates

- `npm run typecheck` — PASS
- `npm run build` — PASS (43 routes generated)
- `git diff --check` — PASS (no whitespace / conflict markers)

## Route smoke

PASS — all 13 valid routes return `200`; `/jobs/unknown-job-slug` returns
`404`.

## Screenshot QA summary

`npm run qa:screenshots` PASS. Captures `home`, `vacancies`,
`job-senior-recruitment-consultant`, `apply`, `contact` at widths
`1440 / 1024 / 768 / 430 / 390 / 360`. The script also asserts **no horizontal
overflow** at every width, verifies the unknown job slug is `404`, and drives
the apply form through its **validation** and **success** states. Output in
`docs/qa-screenshots/`. Re-running produced byte-identical images (rendering is
deterministic), confirming no visual regression this phase.

## Browser / runtime findings

A new `scripts/qa-browser.mjs` (Playwright, headless Chrome) audits every route
above and reports JSON + a pass/fail. Result: **0 hard failures**.

Verified:

- **No client-side application error** and **no uncaught page errors** on any
  route (BrandOrb CSS fallback does not crash the runtime).
- **No console errors** on any route (favicon/manifest 404 noise filtered).
- **No horizontal overflow** at `1440 / 1024 / 768 / 430 / 390 / 360` on every
  route.
- **`/jobs/unknown-job-slug` → 404.**
- **Homepage cockpit labels still fit** — `.hc-card-label` elements are not
  clipped (`scrollWidth ≤ clientWidth`).
- **Mobile nav usable** — the burger opens `#mobile-menu` and toggles
  `aria-expanded` correctly at 390px.
- **WebGL remains disabled / fallback-safe** — `ENABLE_WEBGL_ORB = false`; the
  dimensional CSS BrandOrb renders everywhere behind an error boundary.

## Accessibility notes

Audited and confirmed already-correct (no code changes required):

- **One meaningful `h1` per page** — verified programmatically across all
  routes (page heroes / `PlatformPageHeader` / `JobDetailPage` /
  `HomeMatchingHero` each provide a single `h1`; `CTABand` correctly uses
  `h2`).
- **Form fields have labels** — no `input` / `select` / `textarea` lacked an
  accessible name (`<label for>`, `aria-label`, wrapping `<label>` or `title`).
- **Buttons / links have readable text** — icon-only controls (nav burger,
  footer social links) carry `aria-label`; `Icon` is `aria-hidden` by default.
- **Decorative visuals `aria-hidden`** — hero stage, platform header orbs,
  BrandOrb (decorative unless `label` passed) and all icons.
- **Visible focus states** — global `:focus-visible` outline
  (`3px var(--g-blue)`) on links, buttons, fields, tabs, chips; ring suppressed
  for mouse via `:focus:not(:focus-visible)`.
- **Skip link** — "Skip to main content" is the first focusable element and
  focuses `#main-content` (`tabIndex=-1`).
- **No keyboard traps** — mobile menu closes on navigation; no focus-locking
  modals in the prototype.
- **Contrast / mobile readability** — dark-ink-on-light and white-on-deep-ink
  palettes; layouts verified readable and overflow-free down to 360px.

## Fixes made

No functional or visual fixes were required — the audit passed clean. The only
change this phase is additive QA tooling:

- **Added `scripts/qa-browser.mjs`** — a repeatable Playwright runtime +
  accessibility audit (runtime/console errors, overflow, h1 count, unlabeled
  fields, cockpit-label clipping, mobile-nav toggle, 404 contract).
- **Added this document.**

## Known limitations

- Concept/prototype only — no backend, auth, CMS or database; the apply /
  request-staff flows are illustrative and store no data.
- No real CV storage and no external logo fetching; the BrandOrb is a CSS
  concept mark, not an official logo.
- WebGL/Three.js orb path is intentionally disabled (incompatible
  `@react-three/fiber` v8) and kept behind a fallback.
- `qa-browser.mjs` checks structural a11y (labels, headings, focus styles via
  CSS, overflow); it is not a substitute for a full axe-core / manual
  screen-reader audit or formal contrast measurement.

## Concept / prototype note

Illustrative concept work for `advanced-platform-v2`. All content, scores,
company names and candidate cards are synthetic — no real candidate data, no
real CV storage, no production or official claims.

## Next recommended phase

**Phase 8 — Vercel preview evidence.** Push the branch and capture the deployed
preview as evidence (per `docs/phase-gates.md`), only when the user approves a
push/deploy. Optionally fold `qa-browser.mjs` into CI for regression cover.
