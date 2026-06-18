# Phase 8 — Vercel preview evidence & prototype proof pack

Deployed-preview evidence for the `advanced-platform-v2` prototype, plus a
consolidated proof pack for final review. This is a **high-fidelity concept /
prototype**, not the official thefutureworks website; all data is synthetic.

## Checkpoint

- Branch: `advanced-platform-v2`
- HEAD: `678b0c0` — `Add Phase 7 QA hardening evidence`
  (full SHA `678b0c099b866ff674215924608ae89033a60d49`, authored 2026-06-17).
- Remote: `origin/advanced-platform-v2` at `640cfcd` — local is **ahead 1**
  (`678b0c0` committed locally, **not pushed**).
- `main` untouched. No production deploy. No force-push.
- Working tree clean (`git status --short` empty) at start and end of phase.

## Vercel preview

- Project: `gopi9655s-projects/thefutureworks-redesign`
  (`projectId prj_gRjpIdV2dYZRpqFuAghU8iFGuHI9`, linked via `.vercel/`).
- Deployed by: `bookdataz` · Vercel CLI `54.14.0` · Node `v24.16.0`.
- Command: `vercel deploy --yes` (preview — **not** `--prod`).
- **Preview URL:** <https://thefutureworks-redesign-9f17tggj1-gopi9655s-projects.vercel.app>
- Deployment id: `dpl_ucef5AQtr65TM4MVtV9RbFFpRz5v`
- Inspector: <https://vercel.com/gopi9655s-projects/thefutureworks-redesign/ucef5AQtr65TM4MVtV9RbFFpRz5v>
- `readyState: READY`, `target: null` (preview environment), remote build 43s.

## Local verification (commands & results)

Run from `nextjs/` on `advanced-platform-v2` against the production build:

```
git status --short --branch                                   # clean, ahead 1
git branch --show-current                                     # advanced-platform-v2
git log --oneline --decorate -12                              # HEAD 678b0c0
npm run typecheck                                             # PASS (exit 0)
npm run build                                                 # PASS (43 routes)
git diff --check                                             # PASS (no whitespace/markers)
powershell -ExecutionPolicy Bypass -File .\scripts\route-smoke.ps1   # PASS 14/14
npm run qa:screenshots                                       # PASS
node scripts/qa-browser.mjs                                   # PASS (0 hard failures)
```

| Gate | Result |
| --- | --- |
| `npm run typecheck` (`tsc --noEmit`) | **PASS** (exit 0) |
| `npm run build` (`next build`) | **PASS** — 43 pages generated |
| `git diff --check` | **PASS** — no whitespace / conflict markers |
| Route smoke (`scripts/route-smoke.ps1`) | **PASS** — 14/14 |
| Screenshot QA (`npm run qa:screenshots`) | **PASS** |
| Browser/a11y QA (`node scripts/qa-browser.mjs`) | **PASS** — 0 hard failures |

## Route smoke result

Against the local production server (`http://localhost:3001`): all 13 valid
routes returned `200`; `/jobs/unknown-job-slug` returned `404`. **PASS.**

```
/                                             -> 200  OK
/vacancies                                    -> 200  OK
/jobs/senior-recruitment-consultant           -> 200  OK
/vacancies/senior-recruitment-consultant      -> 200  OK
/apply                                        -> 200  OK
/contact                                      -> 200  OK
/candidates                                   -> 200  OK
/employers                                    -> 200  OK
/about                                        -> 200  OK
/request-staff                                -> 200  OK
/dashboard                                    -> 200  OK
/dashboard/candidates                         -> 200  OK
/dashboard/employers                          -> 200  OK
/jobs/unknown-job-slug                        -> 404  OK
```

## Screenshot QA result

`npm run qa:screenshots` — **PASS**. 30 screenshots captured (`home`,
`vacancies`, `job-senior-recruitment-consultant`, `apply`, `contact` × widths
`1440 / 1024 / 768 / 430 / 390 / 360`) into `docs/qa-screenshots/`, plus
asserted no horizontal overflow at every width, the `404` contract, and the
apply form **validation** and **success** states.

## qa-browser result

`node scripts/qa-browser.mjs` (Playwright, headless Chrome) — **PASS, 0 hard
failures, empty findings array**. Confirms: no page/console errors on any
route, no horizontal overflow at all six breakpoints, exactly one meaningful
`h1` per route, all form fields labelled, homepage cockpit labels not clipped,
mobile burger toggles `#mobile-menu`/`aria-expanded`, and
`/jobs/unknown-job-slug → 404`.

## Preview route checks

The Vercel project has **Deployment Protection (Vercel Authentication)** enabled
for preview deployments. Every request from an unauthenticated client is
intercepted by Vercel's SSO wall *before* it reaches the app and returns
`401 Unauthorized` (response carries `Server: Vercel`,
`Set-Cookie: _vercel_sso_nonce=…`, `X-Robots-Tag: noindex`). This is expected,
correct protected-preview behaviour — not an application error.

| Route | Anonymous preview | Expected (app contract) | Verified by |
| --- | --- | --- | --- |
| `/` | 401 (SSO wall) | 200 | local route smoke + qa-browser |
| `/vacancies` | 401 | 200 | local route smoke + qa-browser |
| `/jobs/senior-recruitment-consultant` | 401 | 200 | local route smoke + qa-browser |
| `/vacancies/senior-recruitment-consultant` | 401 | 200 | local route smoke |
| `/apply` | 401 | 200 | local route smoke + qa-browser |
| `/request-staff` | 401 | 200 | local route smoke + qa-browser |
| `/dashboard` | 401 | 200 | local route smoke + qa-browser |
| `/dashboard/candidates` | 401 | 200 | local route smoke + qa-browser |
| `/dashboard/employers` | 401 | 200 | local route smoke + qa-browser |
| `/contact` | 401 | 200 | local route smoke + qa-browser |
| `/about` | 401 | 200 | local route smoke + qa-browser |
| `/jobs/unknown-job-slug` | 401 | 404 | local route smoke + qa-browser |

The deployment is built from the same source tree and the same `next build`
artifact that passed the local route smoke and qa-browser above, so the
`200 / 404` routing contract holds on the deployed build. To capture authenticated
preview screenshots, either sign in to the inspector URL in a browser, or (if a
shareable anonymous preview is wanted) enable **Protection Bypass for
Automation** / relax Deployment Protection in Vercel project settings — **not
changed here** to avoid altering project security settings.

## Known limitations

- **Concept / prototype only** — this is a design and engineering exploration,
  **not** the official thefutureworks website. All content, scores, company
  names and candidate cards are synthetic.
- **Backend stubbed** — contact and apply submit to placeholder
  `/api/contact` and `/api/apply` routes; no data is persisted, emailed or
  validated server-side.
- **CV upload is filename-only / stubbed** — no file is uploaded or stored; no
  real CV storage anywhere in the prototype.
- **No real CMS / admin / auth / database** — dashboards are static concept
  views; there is no authentication, content management or persistence layer.
- **`/design-lab` is an internal prototype route** — it should be
  removed/hidden before any public final review.
- **WebGL/Three.js orb path disabled** — kept behind a CSS fallback / error
  boundary (`ENABLE_WEBGL_ORB = false`); the BrandOrb is a CSS concept mark,
  not an official logo.
- **Preview is access-protected** — anonymous visitors get Vercel's `401` SSO
  wall (see *Preview route checks*).

## Recommended final review checklist

- [ ] Walk all routes signed-in on the preview URL (or locally) — visual + content pass.
- [ ] Confirm responsive layout at `1440 / 1024 / 768 / 430 / 390 / 360` (no overflow).
- [ ] Confirm reduced-motion fallback (`prefers-reduced-motion`) on all animation.
- [ ] Confirm apply + request-staff flows clearly read as concept/illustrative.
- [ ] Decide on `/design-lab` — remove or hide before public sharing.
- [ ] Confirm no real candidate data / no real CV storage anywhere.
- [ ] Decide preview access — keep Deployment Protection on, or open via bypass for stakeholders.
- [ ] Re-run gates (`typecheck`, `build`, `diff --check`, route smoke, `qa:screenshots`, `qa-browser`).
- [ ] Decide whether to push `advanced-platform-v2` (currently local-ahead by 1).
- [ ] Confirm `main` remains the untouched v1 baseline.

## Next recommended action

Two viable paths from here — pick based on stakeholder feedback:

1. **Polish from feedback** — fold review notes into a new phase branch off
   `advanced-platform-v2`, re-run all gates, and redeploy a fresh preview.
2. **Prepare final presentation / proof pack** — assemble this document, the
   `docs/qa-screenshots/` set and the preview URL into a stakeholder deck;
   hide/remove `/design-lab` and confirm the preview access policy first.

## Concept / prototype note

Illustrative concept work for `advanced-platform-v2`. No production or official
claims, no real candidate data, no real CV storage. `main` (v1 baseline)
remains untouched.
