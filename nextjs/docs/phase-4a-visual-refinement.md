# Phase 4A.1 — Marketplace + homepage badge visual refinement

Follow-up polish on the Phase 4A jobs marketplace foundation
(`docs/phase-4a-jobs-marketplace.md`). This pass removes the "fake logo"
feeling caused by initial/avatar tiles and calms the listing grid, while
keeping the Concept A homepage cockpit and all existing routes intact.

Concept / prototype only — synthetic data, no real candidate data, no real CV
storage, no backend, no auth, no CMS.

## Homepage cockpit initials removed

`components/home/HomeMatchingHero.tsx` + `app/home-hero.css`.

- The floating glass cockpit cards previously showed confusing initials
  ("AO", "CL") in coloured tiles that read as fake user/company avatars.
- They are replaced with **premium role icon tiles** (`.hc-badge`) drawn from
  the existing `Icon` set, colour-coded to the platform language:
  - **Candidate** → green tile, `users` (people) icon.
  - **Employer** → blue tile, `building` icon.
  - **Role / opportunity** → orange tile, `sparkles` icon (replaces the old
    bare dot for a consistent, premium mark).
- No random initials anywhere in the cockpit.
- The candidate card now leads with the **role** ("Warehouse Team Lead") rather
  than a synthetic person name, reinforcing that the cockpit is illustrative.
- **Overflow fixed:** labels (CANDIDATE / EMPLOYER / ROLE) can shrink and
  truncate with an ellipsis (`min-width: 0`, `overflow: hidden`,
  `text-overflow: ellipsis`) so they never push the status badge out; card
  names and metas wrap inside the card (`overflow-wrap: anywhere`); cards use
  `box-sizing: border-box` so their fixed widths include padding. Text can no
  longer exceed the inner card boundary at any breakpoint.

## Job card initials removed

`components/jobs/JobCard.tsx` + `app/globals.css`.

- The alphabet tiles ("t", "A", "SI", "TB", "E") built from company initials are
  gone. Cards now render a **category badge tile** (`.jobs-logo-tile`) — a
  tonal green/blue/navy square with a category icon — as the default.
- The company name stays as normal muted text directly under the title.

## No external logo fetching strategy

- There is **no remote logo fetching, no scraping, and no logo API** anywhere
  in this codebase.
- `Job.logoAsset` (optional, in `lib/types.ts`) is future-ready support for an
  **approved local** asset under `/public` (e.g. `/logos/acme.svg`) only. It is
  intentionally **unpopulated** — no fake company branding is invented.
- When `logoAsset` is absent (the default for every concept job), the card and
  the detail hero fall back to the category badge — never to initials.

## Category badge fallback strategy

`lib/platform/jobs.ts` — `getJobCategoryVisual(job)`.

- Returns a stable `{ category, label, icon, tone }` descriptor derived
  deterministically from the job's title and sector.
- **Title keywords override the broad sector** via an ordered keyword table, so
  a role is never mislabelled by its sector:
  - `Recruitment Consultant` (Sales sector) → **Recruitment / hiring**
  - `HR Advisor` → **HR & people**
  - `Customer Service Advisor` → **Customer service**
  - `Management Accountant` → **Finance & accounts**
  - `Sales Executive` → **Sales & growth**
  - `Transport Planner` → **Logistics & transport**
- If no title keyword matches, the sector mapping applies; failing that, a
  **General opportunity** fallback is used. The fallback is always a category
  badge, never initials.
- Categories covered: Recruitment / hiring, HR & people, Customer service,
  Finance & accounts, Sales & growth, Logistics & transport, Technical / IT,
  Health & safety, Admin & office, General opportunity.

## Job card layout simplification

`components/jobs/JobCard.tsx`.

- Reduced visual noise: the red "Featured" chip that appeared on cards is gone,
  and the extra sparkly signal chips ("Priority brief" / "Hybrid-friendly")
  were removed from the chip row.
- Card top area is now: **category badge tile → title → company**, with a single
  calm green **match** badge (`{score}%`) at the top-right — one status chip
  maximum, in platform green/blue (no red).
- Main chips are limited to **location, contract/type, working pattern**, plus
  the readable category chip (which also gives the icon-only tile an accessible
  text label).
- Salary and the **"View role"** CTA stay aligned at the bottom of every card,
  so the grid reads as a consistent, aligned set of cards.

## Job detail hero cleanup

`components/JobDetailPage.tsx` + `app/globals.css`.

- The dark ink hero no longer shows a red/orange initial tile. It uses the same
  `getJobCategoryVisual` helper as the cards: a tonal category icon tile plus an
  on-brand **category pill** (`.jobs-hero-badge-cat`, blue) and, when truly
  featured, a green **Featured role** badge (`.jobs-hero-badge-featured`) — no
  red chips clashing with the theme.
- Content and routing are unchanged; unknown slugs still `notFound()` → 404.

## Accessibility / responsive notes

- All badge/logo tiles are decorative (`aria-hidden`); the category text is
  still conveyed by the visible category chip / hero pill, so the category is
  available to assistive tech without relying on the icon.
- The optional local logo `img` keeps a meaningful `alt` (`"{company} logo"`).
- No new motion was added; the cockpit keeps its existing
  `prefers-reduced-motion` fallbacks (`.hc-beam` / `.hc-float` / `.hc-pulse`).
- Cockpit cards stay within their boundaries at the 920 / 600 / 440px
  breakpoints thanks to `box-sizing: border-box`, label truncation and text
  wrapping. The job grid keeps its existing responsive behaviour.

## Concept / prototype note

This is a high-fidelity design and engineering exploration, not the official
thefutureworks website. All companies, roles, salaries, match scores and badges
are synthetic and illustrative. No real candidate data and no CV storage.

## Remaining Phase 4B work (not started here)

- Employer-facing request-staff / intake flow (Phase 5 scope) and any
  marketplace ↔ employer cross-linking.
- Persisting filter state to the URL and optional pagination for a larger
  dataset.
- Real (approved) local logo assets, if/when supplied, dropped into `/public`
  and referenced via `Job.logoAsset` — still no remote fetching.
- Wiring the synthetic match signal into a richer detail/aside treatment.
