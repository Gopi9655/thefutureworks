# Phase 9A - Logo motion system

High-fidelity concept/prototype work for `advanced-platform-v2`, not the
official thefutureworks website. Synthetic concept content only.

## Approved Handoff Pack

Visual source of truth:

`_handoff/orb-design-enhancement/handoff`

Referenced files:

- `_handoff/orb-design-enhancement/handoff/README.md`
- `_handoff/orb-design-enhancement/handoff/assets/orb.svg`
- `_handoff/orb-design-enhancement/handoff/components/platform/BrandOrb.tsx`
- `_handoff/orb-design-enhancement/handoff/components/platform/TheFutureWorksLogo.tsx`
- `_handoff/orb-design-enhancement/handoff/styles/tfw-brand.css`

The `_handoff` directory was not staged or committed.

## Integrated Files

- `app/layout.tsx` imports the Phase 9A brand CSS once.
- `app/tfw-brand.css` contains approved orb/logo tokens, sizing and reduced-motion-safe animation rules.
- `components/platform/BrandOrb.tsx` implements the approved split-colour glossy orb as inline SVG.
- `components/platform/TheFutureWorksLogo.tsx` implements the navbar/footer lockup variants.
- `components/platform/ShowcaseOrb.tsx` now renders the SVG/CSS BrandOrb only.
- `components/Navbar.tsx` uses the compact static navbar logo.
- `components/Footer.tsx` uses the static full footer lockup.
- `components/primitives.tsx` keeps legacy `Logo`/`Orb` callers compatible with the approved BrandOrb system.
- `docs/qa-screenshots/` was refreshed by screenshot QA.

## Placements

- Navbar: compact static orb + `thefutureworks`, no slogan, no animation, existing 72px navbar height preserved.
- Homepage hero: no full logo lockup above the headline. The trust eyebrow remains clean with the original small sparkles icon and reads `Coventry University-owned - Matching engine`.
- Footer: full static orb + `thefutureworks` + slogan.
- Job detail consultant panel and legacy decorative orb callers now use the approved SVG/CSS BrandOrb path.

## Slogan And Trust Wording

- `Jobs for your future` appears in the footer full lockup only.
- `Coventry University-owned` appears in the homepage trust eyebrow and footer trust chip.
- Footer supporting copy still states that the concept agency is owned by Coventry University.

## Old Orb Replacement

The previous CSS-only BrandOrb component has been replaced by the approved inline SVG orb. Legacy `Orb` calls now delegate to the approved component, and the old continuous spin prop is accepted only for compatibility; it does not enable spinning motion.

`ShowcaseOrb` no longer imports or dynamically mounts the Three.js scene. It renders the approved SVG/CSS orb directly.

## Duplicate SVG ID Handling

`BrandOrb.tsx` uses React `useId()` to generate a unique per-instance prefix for all inline SVG definitions and references, including gradients, filters and clip paths. This avoids duplicate IDs when several BrandOrb instances render on the same page.

Because `useId()` is used, `BrandOrb.tsx` is a client component. The implementation remains SVG/CSS/React only.

## Small-Size Behaviour

- Navbar: `sm` orb and 20px wordmark for compact readability without increasing nav height.
- Footer: `lg` orb with the slogan stacked below the wordmark.
- Homepage: no BrandOrb inside the hero trust pill after visual correction; headline and cockpit remain the first-viewport focus.

## Animation And Reduced Motion

The approved CSS includes one-shot assemble and gloss-sweep animation classes for the BrandOrb/lockup, gated by `prefers-reduced-motion`. Current rendered placements are intentionally static:

- Navbar: static.
- Footer: static.
- Background/side orb usage: static.
- Repeated cards/lists: no logo animation.
- Homepage: no new logo/orb animation after removing the messy trust-pill orb; existing cockpit motion remains unchanged and reduced-motion safe.

## WebGL Status

WebGL, Canvas, Three.js, R3F and Drei remain disabled for the logo/orb system. No dependencies were added and `package.json` was not changed.

## Known Limitations

- This is concept/prototype branding, not official brand guidance.
- The dormant `components/three/BrandOrbScene.tsx` file still exists from an earlier phase, but Phase 9A `ShowcaseOrb` does not import or enable it.
- The homepage deliberately avoids a full brand lockup or extra orb accent above the headline to keep the matching hero clean.

## QA Results

Run on `advanced-platform-v2` after clearing stale `.next` cache:

- `npm run typecheck` - PASS.
- `npm run build` - PASS, 43 static/generated pages.
- `git diff --check` - PASS.
- `powershell -ExecutionPolicy Bypass -File .\scripts\preview-local.ps1` - PASS, local production preview launched at `http://localhost:3001`.
- `powershell -ExecutionPolicy Bypass -File .\scripts\route-smoke.ps1` - PASS, 13 valid routes returned `200` and `/jobs/unknown-job-slug` returned `404`.
- `node scripts/qa-browser.mjs` - PASS, `hardFailures: 0`, empty findings.
- `npm run qa:screenshots` - PASS, screenshots captured for home, vacancies, job detail, apply and contact at `1440 / 1024 / 768 / 430 / 390 / 360`, plus apply validation/success states and unknown job `404`.

No push, deploy, force-push, hard reset or clean was performed.
