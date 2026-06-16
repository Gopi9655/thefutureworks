# Phase 3 — Visual Rescue (premium homepage hero)

> Concept / high-fidelity prototype for **thefutureworks Advanced Platform v2**.
> This is **not** the official thefutureworks website. All metrics, candidate and
> employer cards shown in the hero are synthetic illustrations of a recruitment
> matching concept.

## What was reverted

The earlier Phase 3 attempt (`c2c1d4f` — "Add Phase 3 homepage matching hero",
backed up on `backup/bad-phase-3-homepage`) was reverted in `621a1d3` because the
homepage was visually rejected. Its problems were:

- giant oversized headline (`platform-title`, `clamp(42px, 7.1vw, 88px)`),
- too much plain white space,
- weak visual depth — a flat full-bleed background SVG,
- no premium 3D / "matching engine" feel,
- a basic `RecruitmentMatchingScene` (static nodes + paths) that read as a diagram,
- poor resemblance to the stronger earlier HTML-style direction.

That commit also swapped the whole homepage to the `platform-*` shell, dropping the
two-column hero and the established section rhythm.

## What was rebuilt

This Phase 3 Visual Rescue keeps the strong reverted baseline and elevates the
right-side visual into a genuine premium matching engine, without touching backend,
auth, CMS, routes, or the `main` branch.

- **`components/HeroScene.tsx`** — the desktop scene was rebuilt as a layered,
  3D-perspective recruitment matching engine (see "Visual approach"). The mobile
  scene (`MobileHeroScene`) was kept intact.
- **`app/page.tsx`** — `HomeHero` headline reduced from `clamp(40px, 10.5vw, 70px)`
  to `clamp(34px, 4.6vw, 54px)` (smaller than both the previous baseline and the
  rejected `c2c1d4f`), so the hero fits the first desktop viewport cleanly with no
  text clipping. The scene container now uses a premium framed treatment (soft
  platform shadow + inner highlight + hairline border) instead of a flat grey panel.
- **`app/globals.css`** — a single additive, scoped `.hx-*` block was appended at the
  end. No existing global rules were rewritten or removed.

All other homepage sections below the hero were left as the polished baseline:
glass stats, latest vacancies, split candidate/employer journey, region section,
"why different", testimonials, and the final CTA band.

## Visual approach

The right-side scene (`.hx-scene`, decorative / `aria-hidden`) is built from layered
HTML + CSS + SVG — no heavy 3D runtime — to read as a platform dashboard rather than
a flat diagram:

- **Depth backdrop** — gradient lighting (green bottom-left = candidates/opportunity,
  blue top-right = employers/trust), a masked faint grid, and two blurred ambient
  orbs for soft atmospheric depth.
- **3D perspective stage** — `perspective: 1500px` with `transform-style: preserve-3d`.
  Candidate cards tilt `rotateY(9deg)` and employer cards `rotateY(-9deg)`, each
  pushed forward on the Z axis (`translateZ`) with a near/far pairing so the cards
  feel stacked in space, not flat.
- **Central matching orb** — the brand `Orb` (glow + slow spin) ringed by animated
  concentric pulse rings, with a "MATCH FOUND" glass badge below.
- **Curved connection beams** — green arcs flow candidate → core, blue arcs flow
  core → employer, with animated flowing dashes (signal traffic) over faint static
  base paths.
- **Floating glass cards** — translucent, blurred, soft layered shadows, green/blue
  left accents and live status dots ("Available now", "Match found", "Seeking
  candidates"). They drift on independent slow float cycles.
- **Live metric chips** — active matches / placement rate / avg. time-to-hire as
  small glass pills along the bottom.

Off-white surfaces and white glass keep the official-platform clarity; the palette is
deliberately green/blue rather than dark-cyber or plain-white SaaS.

## Components reused / added

- **Reused:** `HeroScene` / `MobileHeroScene` (rebuilt in place, not replaced),
  `Orb` primitive, `Icon`, and the design tokens from Phase 2 (`--platform-*`,
  `--g-green`, `--g-blue`, shadows). `NetworkMapBg` (`components/NetworkMap.tsx`)
  remains in use behind the homepage stats section as a faint texture.
- **Added:** no new component files. Only the scoped `.hx-*` CSS class set.

> Note on `NetworkMapBg`: it is intentionally red-themed for the West-Midlands map
> motif, so it was kept for the stats backdrop rather than the green/blue hero, where
> a dedicated green/blue beam SVG was used instead.

> Note on `PlatformScenePlaceholder` (`components/three/`): the react-three-fiber
> placeholder was **not** used in the hero — a layered CSS/SVG scene gives stronger,
> lighter, more controllable depth and avoids a 3D canvas on the landing viewport.

## Accessibility & responsive notes

- Semantic heading order preserved (single `h1`, section `h2`/`h3`).
- The entire decorative scene is `aria-hidden="true"`; no information is conveyed
  only through the visual.
- CTAs remain real, keyboard-focusable links/buttons with the global focus ring.
- Readable contrast: ink text on white/off-white glass; accent colours used for
  emphasis, not body copy.
- Desktop shows the 3D scene; ≤720px swaps to the simpler static `MobileHeroScene`.
- All motion (float, pulse rings, beam flow) is gated behind
  `prefers-reduced-motion: no-preference` with static fallbacks, and also responds to
  the `body.no-anim` switch.
- No horizontal overflow at any tested width (verified by `qa:screenshots`).

## Verification

- `npm run typecheck` — passed.
- `npm run build` — passed (42 static/SSG routes generated).
- `git diff --check` — clean.
- Route smoke (production server): `/`, `/vacancies`,
  `/jobs/senior-recruitment-consultant`, `/apply`, `/contact`, `/candidates`,
  `/employers`, `/about`, `/request-staff`, `/dashboard`, `/dashboard/candidates`,
  `/dashboard/employers` all returned **200**; `/jobs/unknown-job-slug` returned
  **404**.
- `npm run qa:screenshots` — passed: unknown slug 404 confirmed, apply-form
  validation + success states confirmed, no horizontal overflow at
  1440/1024/768/430/390/360, all screenshots captured.

## Limitations

- The hero scene's depth is CSS perspective + SVG, not a real 3D engine; tilt is kept
  subtle to protect legibility, so it reads as "premium dashboard" rather than full
  volumetric 3D.
- All candidate/employer cards and metrics are synthetic placeholders.
- Phase 4 was not run; jobs/apply were not rebuilt; no routes were removed; no
  backend/auth/CMS changes were made.

## Concept / prototype note

This is a concept/prototype redesign exploration. It is not the live or official
thefutureworks website and should not be presented as such.
