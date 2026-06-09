# Production-readiness notes

What changed in this pass, and where to plug in a real backend. **No visual redesign** —
the green / blue / white recruitment theme, hero, routes, content, components and layout
are unchanged. Only quality issues were addressed.

---

## 1. Visual QA

- **Blank-hero bug fixed.** The scroll-reveal wrapper relied on `IntersectionObserver`
  firing; in embedded/iframe contexts it didn't, leaving above-the-fold content stuck at
  `opacity:0`. `Reveal` now: shows instantly (synchronously, before paint) for anything in
  the viewport at mount, animates only below-the-fold content on scroll, and has a failsafe
  timer so content is never left hidden. `CountUp` got the same failsafe so stats never
  stick at `0`.
- **No above-the-fold animation.** In-viewport reveals render with `transition:none` — the
  hero appears immediately instead of fading in.
- **Hero matching visual** verified un-clipped at 360 / 390 / 410 / 768 / 1024 / 1440 (both
  the desktop diagram and the mobile scene).
- **Navbar overflow at tablet fixed.** The desktop nav needed ~840px but only collapsed to
  the burger at 720px, overflowing at 768px. It now collapses at **920px**.
- **No horizontal overflow** at any target width; `html, body { overflow-x: clip }` is a
  safety net that still allows `position: sticky`.
- CTA buttons, trust chips and navbar text/logo contrast all reviewed.

## 2. Accessibility

- **Keyboard-only focus rings** — a branded `:focus-visible` ring (3px blue, 2px offset) on
  links, buttons, inputs, selects, textareas and custom controls. `:focus:not(:focus-visible)`
  suppresses it on mouse/touch.
- **Skip-to-content link** as the first focusable element; `<main id="main-content" tabindex="-1">`.
- **Icons are decorative by default** (`aria-hidden`); icon-only controls (burger, social,
  save/share) have `aria-label`. The burger exposes `aria-expanded` / `aria-controls`.
- **Forms are fully labelled** — every field has a `<label htmlFor>`, `aria-required`,
  `aria-invalid` and `aria-describedby` wiring error/hint text; the error summary and field
  errors use `role="alert"`; success uses `role="status"` + `aria-live`.
- **Reduced motion** — `prefers-reduced-motion` short-circuits reveal/count animations, the
  orb spin, pulse rings and the network-map travel; the spinner slows rather than stops.

## 3. Performance

- **Mobile uses a simplified static visual** — `MobileHeroScene`, with spin/pulse frozen via
  CSS at ≤720px.
- **No heavy animation above the fold** (see Visual QA).
- **No layout shift from images** — every image is a placeholder that reserves its box
  (fixed height / aspect-ratio). In the Next build these are `.media-slot`; swap for
  `next/image` (which also reserves space via `width`/`height`).

## 4. Production structure (the `nextjs/` folder)

- Real **Next.js 14 App Router** + **TypeScript** project. No CDN React, no browser Babel.
- `package.json` with `dev` / `build` / `start` / `lint` / `typecheck`.
- App routes for every page incl. dynamic `vacancies/[id]` (statically generated via
  `generateStaticParams`) and a 404.
- `components/` (server by default; `"use client"` only where state is needed),
  `data/` (typed), `lib/` (types + the API boundary).
- Fonts via `next/font`; metadata + viewport via the App Router metadata API.

## 5. Forms — UI states

Both the **contact** form and the new **apply** form (on every job detail page) implement:

| State | Behaviour |
|---|---|
| **idle** | clean form, required fields marked, optional fields labelled |
| **validation error** | validate on submit; red inline messages + field borders; top-of-form summary; focus jumps to the first invalid field; errors clear as the user fixes each field |
| **submitting** | button disabled, `aria-busy`, spinner, "Sending…/Submitting…"; ~1.3s simulated latency |
| **success** | confirmation panel (`role="status"`) with a reset / "send another" action |

Error styling uses dedicated `--err*` tokens (not the brand accent) so validation always
reads as an error even though the Tweaks panel can remap the accent colour.

---

## Wiring a real backend

The UI never calls `fetch` directly. Everything goes through **`nextjs/lib/api.ts`**
(`submitContact`, `submitApplication`), which currently POSTs to local route handlers that
simulate success. To go live:

1. **`nextjs/lib/api.ts`** — set `SIMULATE_LATENCY = false`. Optionally point `fetch()` at an
   external API instead of the local routes.
2. **`nextjs/app/api/contact/route.ts`** and **`…/api/apply/route.ts`** — replace the `// TODO`
   blocks with real work: persist to your DB/CRM/ATS and send email (Resend, SendGrid,
   Nodemailer). They already validate server-side and return `{ ok, message, ref }`.
3. **CV upload** — `apply/route.ts` currently receives the filename only. For real uploads,
   switch the form to `multipart/form-data` and stream the file to storage (S3, etc.).
4. **Validation** — share `components/forms/validators.ts` between client and server so rules
   never drift.

Because forms call the typed `lib/api.ts` helpers, swapping the backend touches that one
file plus the two route handlers — no component changes.
