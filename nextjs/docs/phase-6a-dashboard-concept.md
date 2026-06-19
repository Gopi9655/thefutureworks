# Phase 6A — Dashboard / admin concept polish

Upgrades the dashboard concept pages into a more credible recruitment-agency
platform view by adding the missing **review flags** and **consultant action
list**, and by removing stale phase labelling. Concept / prototype only —
synthetic data, no real candidate data, no auth, admin, CMS or backend.

## Scope

- `/dashboard`, `/dashboard/candidates`, `/dashboard/employers`.
- `lib/platform/types.ts`, `data/platform/index.ts`.
- `components/platform/*` reused as-is (no component changes needed).
- `app/globals.css` (`.dash-action*` styles).

## What was added / upgraded

Already present (kept): dashboard overview metrics, candidate pipeline cards,
employer request queue, and synthetic match-signal cards.

New in this phase, on `/dashboard`:

- **Review flags** — a "Quality review" section of synthetic consultant checks
  (right-to-work outstanding, salary below guide, possible duplicate brief,
  ready-to-shortlist). Each flag has a severity (`action` / `watch` / `info`)
  mapped to a warm / blue / green tone, and names the synthetic record it
  relates to. Copy states no automated decisions are made and nothing is
  enforced.
- **Consultant action list** — a concept to-do for the human review layer
  (call employer, build shortlist, complete right-to-work review, coordinate
  interviews). Each row shows the task, the related concept record, a synthetic
  owner (initials only), a due label and a status pill
  (`To do` / `In progress` / `Scheduled`).

Stale "Phase 2 / Phase 3" copy across the three dashboard pages (metadata, CTAs,
the overview aside) was refreshed to neutral concept language.

## Data model

`lib/platform/types.ts` gains `ReviewFlag` (+ `ReviewFlagSeverity`) and
`ConsultantAction` (+ `ConsultantActionStatus`). `data/platform/index.ts` adds
the matching `reviewFlags` and `consultantActions` arrays — typed, deterministic
and entirely synthetic. Owners are initials only; entities reference the
existing synthetic candidate/employer concepts.

## Accessibility / responsive

- The action list is a real `<ul>`; status dots are decorative
  (`aria-hidden`) with the status also conveyed by a text pill.
- Review flags reuse the accessible `PlatformCard` / `PlatformSection`
  primitives (sections are `aria-labelledby` their heading).
- `.dash-action` rows wrap under 560px so the status/due move to their own line;
  the review-flag grid uses the existing `.platform-grid-2` responsive grid.
- No new motion introduced.

## Boundaries

- No real auth, admin, CMS or database. No production claims.
- Synthetic concept data only; no real candidate personal data.
- Green = candidate/opportunity, blue = employer/trust, navy/off-white for
  structure — consistent with the platform design system.

## Routes (unchanged contract)

- `/dashboard`, `/dashboard/candidates`, `/dashboard/employers` → all 200.

## Concept / prototype note

A design and engineering exploration, not the official thefutureworks website.
All metrics, flags, actions and records are synthetic and illustrative.
