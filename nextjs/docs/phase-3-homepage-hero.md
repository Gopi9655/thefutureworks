# Phase 3 Homepage And Matching Hero

This branch remains a high-fidelity concept/prototype for thefutureworks Advanced Platform v2. It is not the official thefutureworks website.

## Files Changed

- `app/page.tsx`
- `app/globals.css`
- `components/three/RecruitmentMatchingScene.tsx`
- `docs/phase-3-homepage-hero.md`

## Homepage Sections Added

The homepage now uses the Phase 2 platform design system and static platform data:

- full-bleed recruitment matching hero
- candidate and employer pathway cards
- featured synthetic opportunity records
- matching intelligence workflow
- synthetic platform metrics
- Coventry and West Midlands trust section
- final split CTA for `Find work` and `Request staff`

The homepage links into existing routes and Phase 2 platform routes without removing any v1 route.

## 3D Scene Approach

Added `components/three/RecruitmentMatchingScene.tsx`.

The first implementation attempted React Three Fiber and Drei, but browser QA exposed a `ReactCurrentBatchConfig` client-side exception in the current Next/React bundle. Following the Phase 3 fallback rule, the component keeps the same client-only API and renders a stable high-quality SVG/CSS matching visual instead.

The visual includes:

- candidate nodes
- employer nodes
- central opportunity node
- green-blue matching paths
- decorative `aria-hidden` usage

The component is decorative, static and safe for reduced-motion users. The R3F path should be revisited in Phase 4 only after the package/runtime compatibility issue is resolved.

## Accessibility And Responsive Notes

- Homepage hero uses a semantic `section` with a stable `h1`.
- CTAs remain keyboard-focusable through existing button/link primitives.
- The matching visual is decorative and hidden from assistive technology.
- Reduced-motion users receive the same static visual.
- Platform grids collapse for tablet and mobile breakpoints.
- Hero metrics are labelled as synthetic platform metrics.
- The visual language stays off-white, green, blue and navy rather than dark cyber/SaaS.

## Remaining Phase 4 Work

Phase 4 can focus on:

- screenshot-led responsive polish
- deeper homepage interaction states
- selected `framer-motion` transitions
- richer mobile hero composition
- page-by-page platform refinement beyond the homepage
- prototype-only filtering and shortlist interactions
- continued separation from backend, auth, CMS and CV upload work

No backend, authentication, CMS, real CV upload, production request workflow or live data integration is implemented in Phase 3.
