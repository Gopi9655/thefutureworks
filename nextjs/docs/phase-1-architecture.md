# Phase 1 Architecture Scaffold

This repository branch contains a high-fidelity concept/prototype for thefutureworks Advanced Platform v2. It is not the official thefutureworks website.

## Dependency Additions

Runtime dependencies added:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `framer-motion`
- `clsx`

Development dependencies added:

- `tailwindcss@3.4.17`
- `postcss`
- `autoprefixer`

The React Three Fiber package is pinned to the React 18-compatible v8 line. The project remains on the existing React 18 and Next.js 15 stack.

## Tailwind Setup

Added `tailwind.config.js` with App Router content paths for:

- `app`
- `components`
- `lib`
- `data`

Added `postcss.config.js` with Tailwind and Autoprefixer plugins. The existing `app/globals.css` file was not rewritten and no Tailwind directives were inserted, so the current v1 CSS surface remains intact.

## Route Scaffold

Phase 1 adds these App Router route skeletons:

- `/request-staff`
- `/dashboard`
- `/dashboard/candidates`
- `/dashboard/employers`

The existing homepage and v1 routes remain in place.

## Data Model Scaffold

Added typed platform model scaffolds in `lib/platform/types.ts`:

- `CandidateProfile`
- `EmployerRequest`
- `JobRecord`
- `MatchSignal`
- `DashboardMetric`

Added synthetic placeholder records in `data/platform/index.ts` for:

- candidate profiles
- employer requests
- job records
- match signals
- dashboard metrics

The records are concept data only. They do not contain real personal data, live employer data, CV data, uploads or production identifiers.

## Component Scaffold

Added `components/platform/PlatformScaffold.tsx` for small reusable route scaffolding primitives:

- page intro wrapper
- prototype note
- section wrapper
- metric grid
- route card
- record panel
- field list

Added `components/three/PlatformScenePlaceholder.tsx` as a build-safe placeholder for future 3D platform work.

## Remaining Phase 2 Work

Phase 2 should focus on the visual and interaction concept, including:

- v2 visual language and information architecture
- candidate and employer dashboard states
- richer Three.js platform scenes
- motion choreography with `framer-motion`
- route-level responsive QA screenshots
- prototype-only form interactions
- clear boundaries around any future backend, CMS, upload or auth work

No backend, CMS, real CV upload, admin authentication or production data integration is implemented in Phase 1.
