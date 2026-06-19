# Phase 9B - Trust icon and logo usage corrections

High-fidelity concept/prototype work for `advanced-platform-v2`, not the
official thefutureworks website. Synthetic concept content only.

## Why Repeated Orb Icons Were Removed

The Phase 9A orb/logo is the thefutureworks brand mark. Repeating it beside
third-party trust and accreditation items made the strip look noisy and implied
thefutureworks ownership of unrelated badges. Phase 9B limits the orb/logo to
brand-owned placements and uses neutral line icons for trust semantics.

## Current thefutureworks Logo Usage

- Navbar: approved compact orb + `thefutureworks` wordmark.
- Footer: approved full lockup with `Jobs for your future`.
- Larger decorative brand-orb surfaces remain as concept brand decoration where
  they support thefutureworks page framing.

The homepage hero trust eyebrow remains clean with a small sparkles icon:
`Coventry University-owned - Matching engine`.

## Trust Item Icon Mapping

Homepage trust strip:

- `Coventry University Group` -> graduation cap / university cue.
- `REC Member` -> award / member certificate cue.
- `BIOR Affiliated` -> layered professional network cue.
- `Disability Confident` -> accessibility cue.
- `Living Wage` -> pound/pay cue.

Footer accreditation chips:

- `REC Member` -> award icon.
- `BIOR Member` -> layers icon.
- `Coventry University-owned` -> graduation cap icon.

Other small badge correction:

- Contact page map overlay now uses a map-pin icon instead of the thefutureworks
  orb.

## Third-Party Marks

No official third-party logos were added, scraped, hotlinked or claimed. These
are neutral same-theme concept icons only. If approved official assets are
provided later, the homepage `TrustStrip` item mapping and footer `TRUST_BADGES`
array are the intended swap points.

## QA Results

Run on `advanced-platform-v2`:

- Cache: user-provided `Remove-Item ..next -Recurse -Force -ErrorAction SilentlyContinue` had no matching target; the actual local `.next` cache was cleared with `Remove-Item .\.next -Recurse -Force -ErrorAction SilentlyContinue`.
- `npm run typecheck` - PASS.
- `npm run build` - PASS, 43 static/generated pages.
- `git diff --check` - PASS.
- `powershell -ExecutionPolicy Bypass -File .\scripts\preview-local.ps1` - PASS, preview launched at `http://localhost:3001`.
- `powershell -ExecutionPolicy Bypass -File .\scripts\route-smoke.ps1` - PASS, valid routes returned `200` and `/jobs/unknown-job-slug` returned `404`.
- `node scripts/qa-browser.mjs` - PASS, `hardFailures: 0`, empty findings.
- `npm run qa:screenshots` - PASS, screenshots refreshed for home, vacancies, job detail, apply and contact at `1440 / 1024 / 768 / 430 / 390 / 360`, plus apply validation/success states and unknown job `404`.

No push, deploy, dependency change, WebGL/Canvas/Three/R3F enablement, force-push,
hard reset or branch switch was performed.
