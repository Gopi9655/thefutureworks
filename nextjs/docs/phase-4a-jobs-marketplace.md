# Phase 4A — Jobs Marketplace Foundation

Upgrades `/vacancies` from a static job grid into a premium, client-filterable
jobs marketplace concept. **Concept / prototype only — not the official
thefutureworks website.** No backend, database, CMS, auth, or CV storage; all
data is synthetic and static.

## Files changed

**Added**

- `lib/platform/jobs.ts` — static marketplace helpers over `data/jobs.ts`.
- `components/jobs/JobCard.tsx` — marketplace vacancy card with a concept match signal.
- `components/jobs/JobFilters.tsx` — controlled, accessible filter bar (client).
- `components/jobs/JobsMarketplace.tsx` — client orchestration: filter state, grid, empty state.
- `components/jobs/index.ts` — barrel export.
- `docs/phase-4a-jobs-marketplace.md` — this document.

**Modified**

- `app/vacancies/page.tsx` — renders `<JobsMarketplace>` (server passes static data in).
- `app/globals.css` — appended a scoped `.jobs-*` block (Phase 4A marketplace styling).

## Marketplace features

- Live client-side filtering of the existing concept vacancies (no page reloads, no fetching).
- Premium glass filter panel reusing the platform tokens (`.platform-panel`, platform line/colour tokens).
- Result counter with `aria-live` feedback ("Showing N of M concept roles").
- Synthetic concept **match signal** per card (green opportunity-fit %, plus a blue employer/trust tag).
- Empty state with a clear message and a reset action.
- Responsive grid (`auto-fill`, `minmax`) — collapses cleanly with no horizontal overflow.

## Filters added

| Filter        | Source field      | Behaviour                                           |
| ------------- | ----------------- | --------------------------------------------------- |
| Keyword       | title/company/sector/location/summary | case-insensitive substring match |
| Location      | `job.location`    | exact match, "All locations" = no filter            |
| Contract type | `job.type`        | exact match, "All types" = no filter                |
| Department    | `job.sector`      | exact match, "All departments" = no filter          |
| Reset filters | —                 | clears all filters; disabled when nothing is active |

Filters combine with AND. Options are derived from the dataset at render time
via `getJobFilterOptions`, so they always reflect the current `data/jobs.ts`.

## Data / helper approach

All data comes from the existing `data/jobs.ts` (`JOBS`, `SECTORS`, `salaryStr`)
and `lib/types.ts` (`Job`). No new data files. New helpers in
`lib/platform/jobs.ts`:

- `getAllJobs()` — returns every concept vacancy.
- `getJobBySlug(slug)` — single lookup (undefined when unknown).
- `getRelatedJobs(slug, limit?)` — same-sector first, then same-location.
- `getJobFilterOptions(jobs?)` — distinct, sorted locations / types / sectors.
- `getJobFilterOptions` is paired with `filterJobs(jobs, filters)` (pure filter).
- `getJobMatchSignals(job)` — **synthetic** concept signals (deterministic hash of the job id), green = candidate/opportunity fit, blue = employer/trust.

The server component (`app/vacancies/page.tsx`) computes `jobs` and `options`
once and passes them to the client `JobsMarketplace`, which owns filter state.

## Limitations / stubs

- Match signals are **illustrative only** — a deterministic value derived from
  the job's own fields, not a real matching engine and not based on any
  candidate data.
- Filtering and state are **client-only and in-memory**; not reflected in the URL
  and not persisted.
- No pagination — the concept dataset is small.
- `getRelatedJobs` is provided for detail-page reuse but the existing
  `JobDetailPage` keeps its own similar-roles logic for now (route unchanged).

## Accessibility notes

- The filter bar is a labelled `role="search"` region; every control has an
  associated `<label htmlFor>`.
- The result count uses `aria-live="polite"` so filter changes are announced.
- The reset button uses `disabled` + `aria-disabled` when no filter is active.
- The empty state is a `role="status"` region.
- No new motion was introduced, so there is nothing to gate behind
  `prefers-reduced-motion`; existing reduced-motion fallbacks are untouched.
- Selects keep native keyboard behaviour (custom chevron is a background image only).

## Routes (unchanged contract)

- `/vacancies` → 200 (upgraded marketplace).
- `/jobs/[slug]` → 200 (existing detail route, untouched).
- `/vacancies/[id]` → 200 (legacy detail route, untouched).
- Unknown job slug → 404 (via `notFound()` in `JobDetailPage`).

## Concept / prototype note

This is a high-fidelity design and engineering exploration. All companies,
roles, salaries and match signals are synthetic and illustrative. It makes no
official or production claims and is not the live thefutureworks website.
