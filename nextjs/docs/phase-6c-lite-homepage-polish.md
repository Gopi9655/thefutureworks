# Phase 6C-lite — Homepage first-impression & brand-orb polish

A focused visual pass over the homepage "matching cockpit" hero and the
CSS/SVG BrandOrb concept mark. This is a **high-fidelity concept / prototype**,
not the official thefutureworks website. All data is synthetic.

The earlier Codex Phase 6C attempt (backed up at
`backup/rejected-codex-phase6c`) was rejected for drifting toward a darker,
flatter SaaS look. This pass keeps the preferred Claude direction —
vibrant, light, recruitment-focused — and only refines spacing, contrast and
dimensionality.

## What was visually improved

### Homepage hero (`components/home/HomeMatchingHero.tsx`, `app/home-hero.css`)

- **Roomier cockpit cards.** Card padding increased (`12/13px` → `14/16px`),
  larger radius and a stronger layered shadow + inset top-light so the glass
  cards feel premium and spacious rather than cramped.
- **More vibrant, contrast-rich stage.** The right-hand stage now layers
  brighter green (candidate) and blue (employer) corner glows plus a soft
  gold centre lift over a crisp off-white base — vivid but still light, never
  dark/cyber.
- **More visible match core.** The central orb is larger (138 → 150px), with a
  crisper white centre, a richer green→blue→gold colour ring, a soft white
  halo ring and a stronger drop shadow so it clearly reads as the matching
  engine.
- **Clearer connection beams.** Beam under-glow and animated stroke widths
  were increased and the opportunity beam re-tuned to the sampled logo gold
  (`#E1801A`) — clear but still elegant. Motion still respects
  `prefers-reduced-motion`.

### Cockpit label / overflow fixes

The short status labels must always fit with no ellipsis and no overflow
outside the white cards:

- `.hc-card-label` no longer uses `overflow:hidden` / `text-overflow:ellipsis`
  and no longer shrinks (`flex: 0 1 auto`, `white-space: nowrap`). The label
  renders in full.
- The status badge gets a guaranteed `padding-left` gap so label and badge
  never touch.
- Card widths were increased and sized to hold *icon tile + full label +
  status badge*:
  - **CANDIDATE** card → `174px`
  - **EMPLOYER** card → `186px`
  - **ROLE / OPPORTUNITY** card → `200px`
- Small-screen breakpoints widen the cards (to `47–52%`) and slightly shrink
  the icon tile so the full labels keep fitting on mobile.

Result: `CANDIDATE`, `EMPLOYER` and `ROLE` all fit fully, no ellipsis, no text
spilling outside the cards.

## Sampled logo colour palette (prototype only)

These were **sampled from the provided website-logo screenshot** for this
prototype. They are **not** official brand guidelines — they are reference
colours used to make the concept orb feel on-brand.

| Role | Hex |
| --- | --- |
| Logo green | `#579C27` |
| Logo orange / gold | `#E1801A` |
| Logo blue | `#1962A3` |
| Deep navy / black | `#0C1832` |
| Wordmark grey | `#616B7D` |
| Teal green shade | `#469167` |
| Cyan blue shade | `#3381A7` |
| Light highlight | `#E3ECF1` |

## BrandOrb CSS/SVG strategy (`app/globals.css`, `components/platform/BrandOrb.tsx`)

The orb is built **purely from CSS layers** (no images, no remote assets, no
external logo fetching, no fake company logos). It is server-safe and
decorative by default (`aria-hidden`), exposed as an image only when a `label`
is passed.

Dimensionality comes from two stacked layers plus the host shadow:

- **`.brand-orb-color`** — four stacked radial gradients that follow the logo
  structure: **green lower-left**, **blue right/trust side**, **orange-gold
  highlight** near the top, over a **navy base** that reads as a separator and
  rim depth.
- **`.brand-orb-shade`** — sphere shaping: a glossy top-left highlight (light
  `#E3ECF1`), a deep navy bottom-right falloff, inset inner glow + a fine
  bright rim, and a `::after` glossy specular dot top-left.
- **`.brand-orb` host** — outer depth shadow plus a fine navy contact ring so
  the orb feels grounded and 3D.

Tone variants (`default`, `trust`, `opportunity`, `muted`) each redefine the
`--orb-green / --orb-blue / --orb-gold / --orb-navy` zone variables, so every
tone keeps the same dimensional lighting model.

## Why WebGL remains disabled

The Three.js / `@react-three/fiber` path is intentionally **kept disabled**
(`ENABLE_WEBGL_ORB = false` in `components/platform/ShowcaseOrb.tsx`). The
installed `@react-three/fiber` v8 is incompatible with the current React/three
versions and throws at mount
(`Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')`),
which previously crashed routes in the browser. A decorative orb must never
break a route, so the stable CSS BrandOrb is the runtime path and the WebGL
scene stays behind an error boundary. No new dependencies were added and no
second WebGL showcase orb was introduced.

## Accessibility / responsive notes

- The decorative hero stage is `aria-hidden`; the BrandOrb is decorative
  unless a `label` is supplied.
- All motion (beams, float, pulse, orb spin) is gated behind
  `@media (prefers-reduced-motion: no-preference)`, with a reduced-motion
  fallback that stills the beams.
- Cards, core and labels were re-checked at the `920px`, `600px` and `440px`
  breakpoints; full labels keep fitting and the layout stays clean on mobile.
- Colour language preserved: **green** = candidates/jobs/opportunity,
  **blue** = employers/Coventry/trust, **off-white** = official clarity.

## Concept / prototype note

This is illustrative concept work for `advanced-platform-v2`. The sampled
colours, match scores, company names and candidate cards are synthetic — no
real candidate data and no real CV storage.
