# Phase 3A — Homepage Visual Lab

An **isolated** route for comparing premium homepage hero concepts locally
before any one is applied to the real homepage. Read `AGENTS.md` and
`CLAUDE.md` first; this document only covers Phase 3A.

## Why this exists

Two earlier Phase 3 homepage attempts (`c2c1d4f`, `adf8149`) were rejected and
reverted. Rather than edit the live homepage again, Phase 3A puts the
candidate hero directions in a **standalone lab** so they can be reviewed
side by side on `localhost` with zero risk to the real site.

## Hard boundaries (kept)

- The real homepage route `/` and `app/page.tsx` are **not modified**.
- `app/globals.css` is **not modified** — lab styles live in a separate,
  page-scoped stylesheet (`app/design-lab/lab.css`).
- No backend / auth / CMS / data storage.
- **Synthetic concept data only** — no real candidate data, no CV storage.
- This is a concept/prototype, not the official thefutureworks website.

## Route

- **`/design-lab`** — renders all concepts, each in its own framed card with a
  label and a one-line description. Marked `noindex` in metadata.

## Files added (Phase 3A)

| File | Purpose |
| --- | --- |
| `app/design-lab/page.tsx` | Lab route; frames each concept standalone. |
| `app/design-lab/lab.css` | Page-scoped styles (`lab-` / `concept-` prefixes only). |
| `components/home/HomeHeroConceptA.tsx` | Concept A hero. |
| `components/home/HomeHeroConceptB.tsx` | Concept B hero. |
| `components/home/HomeHeroConceptC.tsx` | Concept C hero. |
| `docs/phase-3a-visual-lab.md` | This document. |

No existing files were edited.

## Concepts

### Concept A — Glass matching cockpit
A central "match engine" orb showing a headline match score, with **green**
(candidate) and **blue** (employer) connection beams flowing out to floating
glass cards: a candidate, an employer and an opportunity. Communicates the
platform as an intelligent, human-checked matching engine.

### Concept B — Coventry talent network
A regional map/grid with **Coventry** as the pulsing hub and surrounding towns
(Nuneaton, Rugby, Warwick, Solihull) connected by beams. Includes an
employer-demand card, a candidate-readiness card and a **Coventry University
Group** trust strip. Communicates regional reach and university ownership.

### Concept C — Agency command centre
A glass dashboard panel with job-pipeline metrics (open roles / in pipeline /
filled per week), a **scored candidate queue** and a live **employer staffing
request** card. Communicates calm operational control and consultant-led
placement.

## Design guardrails honoured

Each concept deliberately avoids the previously rejected problems:

- compact headline (`clamp(28px, 3.4vw, 44px)`) — **no giant hero text**;
- off-white / glass surfaces with layered depth — **no flat white SaaS look**,
  **no weak grey panel**;
- a real recruitment-style right-side visual — **no basic diagram**;
- light, premium palette — **no dark cyber look**;
- concise left column (eyebrow, headline, subtext, two CTAs, trust chips) —
  **no cluttered text wall**;
- contained, responsive visual frame with mobile stacking — **no broken /
  clipped hero**.

Colour language follows the brand: **green = candidates / jobs / opportunity**,
**blue = employers / Coventry / trust**, **off-white = clarity / official
platform feel**.

## Accessibility & motion

- All decorative visuals are `aria-hidden`.
- All motion (connection beams, float, hub pulse) is CSS-only and gated behind
  `@media (prefers-reduced-motion: no-preference)`, with a static fallback for
  `prefers-reduced-motion: reduce`.
- CTAs use the shared `Button` component (real focus states).

## Verification

```powershell
npm run typecheck
npm run build
git diff --check
```

Then local preview (production server on port 3001):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\preview-local.ps1
```

Inspect: **http://localhost:3001/design-lab**

## Status

- Concepts are for review only. **Nothing is applied to the real homepage.**
- No commit and no push are made in Phase 3A until a concept is approved in a
  local browser.
