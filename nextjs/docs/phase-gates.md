# Phase Gates

Phase definitions and the gates each phase must clear before commit/push.
Read `AGENTS.md` for the shared protocol and `docs/ai-workflow.md` for the phase loop.

## Phases

- **Phase 0 — Baseline only.** No changes; protected v1 baseline reference.
- **Phase 1 — Architecture scaffold.** Project structure, routing skeleton, types.
- **Phase 2 — Design system / shell.** Tokens, layout shell, shared components.
- **Phase 3 — Homepage / visual.** Hero, sections, premium visual treatment.
- **Phase 4 — Jobs / apply.** Vacancy listing, job detail, application flow.
- **Phase 5 — Employer request-staff.** Employer-facing request and intake flow.
- **Phase 6 — Dashboard / admin concept.** Candidate and employer dashboard concepts.
- **Phase 7 — Accessibility / responsive / screenshot QA.** A11y passes, responsive polish, screenshot evidence.
- **Phase 8 — Vercel preview evidence.** Deployed preview captured as evidence.

## Verification (required for every implementation phase)

Run and pass all of:

```powershell
npm run typecheck
npm run build
git diff --check
```

Plus the route smoke:

```powershell
scripts/route-smoke.ps1
```

For **visual phases (3, 6, 7 and any phase that changes visuals)**, also:

- Run screenshot QA.
- Get local browser approval via `scripts/preview-local.ps1` before commit.
- Do not push until the user approves.
