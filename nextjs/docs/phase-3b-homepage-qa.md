# Phase 3B — Homepage Visual QA & Micro-Polish

Scope: quality-assurance pass on the Concept A "Glass matching cockpit" homepage
hero (applied in Phase 3A). **No redesign, no new sections, no Phase 4 work.**
Concept/prototype only — not the official thefutureworks website.

## What was inspected

Inspected the live homepage `/` from production-build screenshots (via
`scripts/qa-screenshots.mjs`) plus focused close-up captures of the `.hero-light`
region at desktop (1440px) and mobile (390px).

Focus areas reviewed:

- **Desktop first-viewport balance** — left copy column vs. right cockpit. The
  two columns read as balanced; `align-items: center` keeps the shorter copy
  block visually centred against the 430px stage. No change needed.
- **Hero vertical spacing** — top spacing under the navbar felt marginally tight
  on the first viewport. Polished (see below).
- **Right-side cockpit card size / depth** — glass cards carry good soft-shadow
  depth and blur; orb reads as the focal point. Sizes are appropriate. No change
  needed beyond the badge-wrap fix below.
- **CTA alignment** — "Find jobs" (green primary) and "Hire staff" (blue ghost)
  align cleanly on one row at desktop; stack to full-width on narrow mobile via
  the existing `.hc-actions .btn` rule. Good.
- **Trust strip spacing** — the `TrustStrip` band below the hero is evenly
  spaced; mobile collapses items to wrapped chips. Good.
- **Navbar readability** — unchanged global navbar reads clearly over the
  off-white hero gradient. Out of Phase 3B scope; no change.
- **Mobile stacking** — copy stacks above the cockpit at ≤920px as intended.
  At ≤600px the absolutely-positioned cards were slightly tight against the
  central orb. Polished (see below).
- **Horizontal overflow** — none. `qa:screenshots` asserts no overflow at
  1440 / 1024 / 768 / 430 / 390 / 360px and passed.
- **Plain-white / flat feel** — avoided: layered radial gradients, glass cards,
  engineered grid texture and the green/blue conic orb keep the premium depth.

## Micro-polish changes made

All changes are confined to `app/home-hero.css` (no component or page markup
changes were required).

1. **Hero top/bottom breathing room** — `.hc-hero` `padding-block` raised from
   `clamp(18px, 3vw, 30px)` to `clamp(20px, 3vw, 34px)` for a calmer first
   viewport under the navbar.
2. **Badge wrap fix** — added `white-space: nowrap` to `.hc-card-badge` so short
   status badges (e.g. the employer card's "5 roles") stay on a single line
   instead of wrapping.
3. **Mobile de-crowding (≤600px)** — `.hc-stage` `min-height` raised `380px →
   408px` and the three floating cards nudged (`hc-cand` / `hc-empl` top, and
   `hc-opp` bottom) to open up vertical separation around the central orb.

No changes were made to the central orb, beams, colours, copy, CTAs, or the
desktop layout structure.

## Responsive notes

- **≥921px:** two-column hero (copy + cockpit), `align-items: center`.
- **≤920px:** single column; copy first, cockpit second (`order` swap).
- **≤600px:** taller stage (408px) and re-balanced card positions; CTAs go
  full-width.
- **≤440px:** orb scales down (`116px`) and its score type reduces so it never
  crowds the stacked cards.
- Verified no horizontal overflow at every QA width down to 360px.

## Accessibility notes

- The entire cockpit visual is `aria-hidden="true"` — it is decorative and adds
  no content for assistive tech; the headline, sub-copy, CTAs and trust chips
  carry the real meaning.
- The hero heading remains a single `<h1>`; document heading order is preserved.
- Motion (beams, float, pulse) is gated behind
  `@media (prefers-reduced-motion: no-preference)`; under `reduce`, beams fall
  back to a static low-opacity stroke and floats/pulse are disabled. The QA
  screenshot run captures with `reducedMotion: "reduce"`.
- Colour roles follow the project language: green = candidates/opportunity,
  blue = employers, off-white = clarity.

## Remaining known limitations

- The cockpit cards use **synthetic concept data only** (Amara O., Coventry
  Logistics, Production Operative, "94%") — illustrative, not real candidates.
- `backdrop-filter` blur on the glass cards has no fallback for the few browsers
  that lack support; those render a solid `--platform-glass-strong` surface,
  which is acceptable.
- A separate global mobile action bar ("Find Jobs / Hire Staff") appears below
  the hero on small viewports. It is pre-existing global chrome, **outside the
  Phase 3B hero scope**, and was not modified.
- `docs/qa-screenshots/*.png` are regenerated (and therefore show as modified)
  on every QA run; this is expected evidence output, not a code change.

## Concept / prototype note

This is a high-fidelity **design & engineering concept/prototype**, not the
official thefutureworks website. All content, data and flows are illustrative.
No backend, auth, CMS, jobs or apply logic was touched in Phase 3B.
