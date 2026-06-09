# thefutureworks — Production Next.js scaffold

Coventry University-owned recruitment. This is the production-ready conversion of the
high-fidelity HTML prototype into a typed **Next.js 14 (App Router)** project.

> The original prototype (single-file HTML + browser Babel) still lives at the repo root
> as the live, presentable concept. This `nextjs/` folder is the developer handoff: a real
> build pipeline with no CDN React and no in-browser transpilation.

## Quick start

```bash
cd nextjs
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` type check |

## Structure

```
nextjs/
├── app/
│   ├── layout.tsx              Root shell: fonts, skip link, nav, footer, mobile bar
│   ├── globals.css             Design tokens + components + responsive (ported 1:1)
│   ├── page.tsx                Home (fully built)
│   ├── contact/page.tsx        Contact (fully built, 4-state form)
│   ├── vacancies/page.tsx      Job listing
│   ├── vacancies/[id]/page.tsx Job detail + Apply form (4-state), SSG via generateStaticParams
│   ├── candidates/page.tsx     For candidates
│   ├── employers/page.tsx      For employers
│   ├── about/page.tsx          About / accreditations
│   ├── not-found.tsx           404
│   └── api/
│       ├── contact/route.ts    POST handler (stub — see PRODUCTION-NOTES)
│       └── apply/route.ts      POST handler (stub)
├── components/
│   ├── Icon.tsx                Stroke icon set (aria-hidden by default)
│   ├── primitives.tsx          Orb, Logo, Reveal, CountUp (client)
│   ├── Button.tsx              Link/anchor button
│   ├── Navbar.tsx Footer.tsx MobileCTABar.tsx SkipLink.tsx
│   ├── sections.tsx            PageHero, JobCard, CTABand, TrustStrip, SectionHead, …
│   ├── HeroScene.tsx           Desktop matching diagram + static mobile scene
│   ├── NetworkMap.tsx          Decorative region map
│   ├── JobAside.tsx            Sticky apply panel (client: save/share)
│   ├── home/                   SplitJourney, RegionSection (client)
│   └── forms/                  useFormSubmit, fields, validators, ContactForm, ApplyForm
├── data/
│   ├── jobs.ts                 Jobs + sectors + salary helpers (typed)
│   ├── content.ts              Stats, testimonials, accreditations, differentiators
│   └── site.ts                 Contact details + nav config
└── lib/
    ├── types.ts                Shared domain + payload types
    └── api.ts                  The single client → backend boundary
```

## Server vs client components

Server components are the default. Only the pieces that need browser state are marked
`"use client"`: the primitives that observe the viewport (`Reveal`, `CountUp`), the
navbar, the two interactive home sections, the job aside, and the forms. This keeps the
JS bundle small and most of the page server-rendered.

## Fonts

Loaded with `next/font/google` (Space Grotesk + Manrope) and exposed as the CSS variables
`--font-space-grotesk` / `--font-manrope`, which `globals.css` maps onto `--font-display`
and `--font-body`. No layout shift, no external font request at runtime.

## Images

The prototype used drag-and-drop `<image-slot>` placeholders. In this build those become
`.media-slot` placeholders that **reserve their box** (fixed height / aspect-ratio) so there
is no layout shift. Swap them for `next/image` with real assets — see PRODUCTION-NOTES.

See **PRODUCTION-NOTES.md** for the full list of QA fixes and backend integration points.
