# Phase 4B — Job detail and apply flow polish

Upgrades the candidate job-detail and apply journey into a premium concept flow.
All APIs stay stubbed; no real storage, email or auth. High-fidelity concept /
prototype only — synthetic data, no real candidate data, no real CV storage.

## Scope

- `/jobs/[slug]` and legacy `/vacancies/[id]` (both render `JobDetailPage`).
- `/apply`.
- `components/JobDetailPage.tsx`, `components/forms/ApplyForm.tsx`,
  `components/forms/GeneralApplyForm.tsx`, `app/apply/page.tsx`.
- `lib/platform/jobs.ts` (typed concept helpers), `app/globals.css` (panels).

## Job detail panels (new / upgraded)

Rendered in `components/JobDetailPage.tsx`:

1. **Role summary** — existing "About the role" lead paragraph (kept).
2. **Why this role fits** (new) — a green opportunity-accent panel showing the
   synthetic concept fit score (a circular badge) plus four explainable reasons
   from `getJobFitReasons(job)`. Copy makes clear it is **not a live match and
   not based on any candidate data**.
3. **Key responsibilities / What we're looking for** — existing lists; the tick
   icons moved from red to platform green for on-brand language.
4. **Candidate readiness checklist** (new) — `getCandidateReadiness(job)`
   renders a supportive, generic checklist (CV ready, right to work, contract
   availability, covering note). No candidate data is read or stored.
5. **Benefits** — existing chips (kept).
6. **Consultant / human-review note** (new) — a blue trust-accent panel
   ("Human-checked before any introduction") stating a consultant reviews every
   application with no automated decisions; framed explicitly as a concept.
7. **Related roles** (upgraded) — now uses `getRelatedJobs(job.id, 3)`
   (same sector first, then same location) and the shared premium `JobCard`.

## Apply flow

- **Detail-page `ApplyForm`** — added the same honest concept disclaimer used by
  the general form (submission simulated, CV is filename-only, nothing stored)
  and reframed the trailing line around human review.
- **`/apply` page** — new two-column premium layout: a sticky left rail with a
  numbered "How it works" sequence (share details → consultant reviews → we
  introduce you) and a blue reassurance panel, alongside the existing
  `GeneralApplyForm` card. Collapses to a single column under 880px.
- **`GeneralApplyForm`** — unchanged; already carried the concept disclaimer.

## Helpers (typed, synthetic, deterministic)

Added to `lib/platform/jobs.ts`:

- `getJobFitReasons(job): JobFitReason[]` — four reasons derived from category,
  location, working pattern and contract type.
- `getCandidateReadiness(job): ReadinessItem[]` — generic readiness checklist
  keyed off the contract type.

Both are pure functions over the job's own fields — no external calls, no
candidate data, no scraping.

## Stubs / limitations

- CV upload remains **filename-only**; no file is uploaded or stored.
- `/api/apply` remains **stubbed** (simulated submission via `lib/api`).
- No real storage, email, auth or CMS. No official / production claims — the
  page describes itself as a concept.

## Accessibility / responsive notes

- New decorative tiles/score badges are `aria-hidden`; their meaning is carried
  by adjacent visible text.
- The readiness checklist is a real `<ul>`; the apply steps are an ordered
  `<ol>` so the sequence is conveyed to assistive tech.
- No new motion introduced; existing `Reveal` reduced-motion behaviour is
  untouched.
- `jd-fit-reasons` collapses to one column under 560px; `.apply-grid` collapses
  to a single column under 880px.

## Routes (unchanged contract)

- `/jobs/[slug]` → 200; `/vacancies/[id]` → 200 (legacy preserved).
- `/apply` → 200.
- Unknown job slug → 404 (via `notFound()` in `JobDetailPage`).

## Concept / prototype note

This is a design and engineering exploration, not the official thefutureworks
website. All roles, salaries, match scores and copy are synthetic and
illustrative.
