# Phase 6B — 3D Brand Orb + premium visual identity polish

Upgrades the flat logo/orb/icon treatment across the prototype into a premium,
dimensional brand-mark system. High-fidelity concept / prototype only — this is a
prototype brand orb, **not** the official thefutureworks logo, with no remote
images, no external logo fetching and no fake company branding.

## What was visually wrong

The recurring brand mark was a single flat element (`components/primitives.tsx`
`Orb`): a conic gradient with a thin SVG wireframe globe and two inset shadows.
At small sizes and on panels it read as a flat, pasted multicolour sticker —
most obviously in:

- the job-detail **"Human-checked before any introduction"** panel,
- the homepage **trust strip** / accreditation bullets,
- the nav / footer logo and other repeated small brand marks.

## BrandOrb strategy (CSS/SVG — the core system)

New `components/platform/BrandOrb.tsx` renders a dimensional orb entirely from
CSS, in two stacked layers under fixed lighting:

- `brand-orb-color` — a conic brand gradient (optionally slow-spinning).
- `brand-orb-shade` — fixed top sheen, bottom core shadow, inset depth + rim
  light, an edge ring and a specular highlight (`::after`).

All shadows/insets are **em-based** and driven by a single `--orb-size`
variable, so one rule scales cleanly from an 11px bullet to a 340px decorative
orb. Variants:

- **size**: `sm` (20) · `md` (34) · `lg` (56), plus an exact `px` override.
- **tone**: `default` (green→blue→orange brand), `trust` (blue), `opportunity`
  (green), `muted` (soft off-white/grey).
- `spin` (reduced-motion gated) and `glow` modifiers.
- Decorative by default (`aria-hidden`); pass `label` to expose it as an image.

The legacy `Orb` primitive now **delegates to `BrandOrb`**, so every existing
usage upgrades with no layout change and no per-file churn (same inline-block
footprint, same `size`/`spin`/`glow` API).

## Three.js — was BrandOrbScene used?

**Yes.** `@react-three/fiber` (v8) + `drei` + `three` were already installed and
React is 18.3, so a lightweight scene was added and is **stable in the
production build**.

- `components/three/BrandOrbScene.tsx` (`"use client"`) — one glossy sphere lit
  by green/blue/orange directional lights (no textures, no heavy assets), with a
  gentle `Float`.
- `components/platform/ShowcaseOrb.tsx` (`"use client"`) wraps it:
  - server / first paint renders the **CSS `BrandOrb`** (no hydration mismatch),
  - on mount it upgrades to the canvas **only** when WebGL is available **and**
    `prefers-reduced-motion` is not set,
  - the canvas is `dynamic(..., { ssr: false })`, so it is a lazy client-only
    chunk and never runs on the server.

It is used in exactly **one** showcase: the job-detail human-check panel. Every
other location uses the CSS `BrandOrb` (small UI marks never mount a canvas).

## Where flat marks were replaced

- **Job detail** `components/JobDetailPage.tsx` — the human-check panel orb is now
  a `ShowcaseOrb` (trust tone, 88px), so it reads as a dimensional 3D element
  (with CSS fallback). The sticky apply card is unchanged and still aligned.
- **Nav / footer logo** `components/primitives.tsx` (`Logo` → `Orb` → `BrandOrb`).
- **Trust strip + decorative orbs** `components/sections.tsx`, the SplitJourney
  decorative orb, the contact page and `HeroScene` — all upgraded via the
  `Orb → BrandOrb` delegation.
- **Apply forms** — flat icon squares in `ApplyForm`, `GeneralApplyForm` and the
  CV `FileField` are now premium dimensional tiles (`.premium-tile` with a
  gradient, inner highlight and soft shadow). Green = candidate, blue = upload.

## Accessibility notes

- `BrandOrb` and `ShowcaseOrb` are decorative (`aria-hidden`) by default; both
  accept an optional `label` to become a labelled `role="img"`.
- The Three.js canvas is purely decorative and is never the only carrier of
  meaning — the surrounding panel copy is unchanged.
- `spin` and the 3D upgrade both respect `prefers-reduced-motion`.
- Premium icon tiles keep their existing `Icon` semantics; CV upload remains a
  labelled, filename-only stub.

## Performance / hydration notes

- The 3D scene is a `ssr:false` dynamic import → a separate lazy chunk; the
  job-detail initial JS stays small and the canvas loads only client-side when
  supported.
- Because the server always renders the CSS `BrandOrb` and `ShowcaseOrb` starts
  in the same fallback state, there is **no hydration mismatch**; the WebGL swap
  happens after mount.
- No browser-only API is touched outside a client component; `webgl`/`matchMedia`
  checks run only in `useEffect`.

## Remaining limitations

- The 3D material is lit (not true glass transmission) to stay lightweight; a
  richer transmission/environment pass was intentionally skipped for stability.
- The Three.js showcase is deliberately limited to the one panel; broadening it
  would mean more live WebGL contexts.
- `BrandOrb` is a **prototype** mark, not an official logo asset.

## Concept / prototype note

A design and engineering exploration, not the official thefutureworks website.
The brand orb, colours and 3D scene are illustrative concept assets only.
