# Phase 2 Design System

This branch is a high-fidelity concept/prototype for thefutureworks Advanced Platform v2. It is not the official thefutureworks website.

## Files Changed

- `app/globals.css`
- `components/platform/PlatformShell.tsx`
- `components/platform/PlatformSection.tsx`
- `components/platform/PlatformCard.tsx`
- `components/platform/PlatformMetric.tsx`
- `components/platform/PlatformPill.tsx`
- `components/platform/PlatformPageHeader.tsx`
- `components/platform/PlatformCTA.tsx`
- `components/platform/index.ts`
- `components/three/PlatformScenePlaceholder.tsx`
- `components/Navbar.tsx`
- `components/Footer.tsx`
- `data/site.ts`
- `app/request-staff/page.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/candidates/page.tsx`
- `app/dashboard/employers/page.tsx`

## Design Tokens Added

Phase 2 extends `app/globals.css` with scoped platform tokens:

- opportunity green: `--platform-green`
- employer/trust blue: `--platform-blue`
- Coventry/deep navy: `--platform-navy`, `--platform-navy-2`
- off-white platform background: `--platform-offwhite`
- glass surfaces: `--platform-glass`, `--platform-glass-strong`, `--platform-surface`
- subtle borders: `--platform-line`, `--platform-line-strong`
- platform text: `--platform-text-muted`, `--platform-text-strong`
- platform shadows/glow tokens for premium depth

The existing v1 CSS tokens and classes remain intact. New visual behavior is scoped to `platform-*` classes such as `platform-shell`, `platform-section`, `platform-card`, `platform-gradient-text`, `platform-pill`, `platform-grid-bg`, `platform-orb-green` and `platform-orb-blue`.

## Platform Components Added

The platform shell now has individual typed server components:

- `PlatformShell`
- `PlatformSection`
- `PlatformCard`
- `PlatformMetric`
- `PlatformPill`
- `PlatformPageHeader`
- `PlatformCTA`

The existing Phase 1 data model in `data/platform/index.ts` remains the source for synthetic records.

## Routes Upgraded

These Phase 1 routes now use the Phase 2 platform shell:

- `/request-staff`
- `/dashboard`
- `/dashboard/candidates`
- `/dashboard/employers`

The pages show synthetic dashboard metrics, candidate pipeline summaries, employer request summaries, match signal cards and job opportunity cards. No production backend, authentication, CMS, CV upload or live request flow has been added.

## Navigation

The existing navbar and footer now expose visible links to:

- Request staff
- Dashboard
- Candidate dashboard
- Employer dashboard

Existing v1 routes remain present and unchanged.

## Accessibility And Responsive Notes

- Platform sections use semantic `section` elements with stable heading references when an id/title is provided.
- Cards use accessible links only when `href` is supplied; otherwise they render as articles.
- Decorative platform orbs are hidden from assistive technology.
- The Three.js placeholder can now be marked decorative with `decorative`.
- Platform grids collapse at tablet/mobile breakpoints.
- CTA and page-header actions wrap on desktop and become full-width on small screens.
- The design avoids dark cyber styling by using off-white surfaces, navy text, blue trust cues and green opportunity cues.

## Remaining Phase 3 Work

Phase 3 should focus on the next level of concept fidelity:

- final homepage concept direction
- richer platform page compositions
- selected motion states with `framer-motion`
- visual QA screenshots across desktop and mobile
- optional decorative Three.js hero exploration
- prototype-only filter and shortlist interactions
- clearer future integration boundaries for any backend, CMS, auth or upload work

Phase 2 remains a static frontend design-system and shell phase only.
