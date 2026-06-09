# Final QA Checklist

## Commands run

- `npm.cmd run typecheck`
- `npm.cmd run build`
- `npm.cmd run qa:screenshots`
- Isolated production-server route checks
- Project-wide internal link search

## Routes fixed

- Added `/jobs/[slug]` as the public job-detail route using the same shared detail
  renderer as `/vacancies/[id]`.
- Added the live `senior-recruitment-consultant` job record.
- Added `/apply` with a role selector, candidate fields, CV placeholder, validation,
  submitting, success, and production-stub states.
- Updated job cards to link to `/jobs/[slug]`.
- Updated Submit CV links and buttons to use `/apply`.
- Preserved `/vacancies/[id]` as a working legacy route.

## Pages checked

The following routes return `200`:

- `/`
- `/vacancies`
- `/jobs/senior-recruitment-consultant`
- `/vacancies/senior-recruitment-consultant`
- `/apply`
- `/candidates`
- `/employers`
- `/contact`
- `/about`

Unknown job slugs, including `/jobs/not-a-real-job`, return the project not-found page
with HTTP `404`.

## Browser screenshots

`npm.cmd run qa:screenshots` uses Playwright with the locally installed Chrome browser.
It starts the production build on an isolated port, checks for horizontal overflow, and
saves full-page screenshots under `docs/qa-screenshots/`.

Pages captured:

- `/`
- `/vacancies`
- `/jobs/senior-recruitment-consultant`
- `/apply`
- `/contact`

Widths captured:

- 1440
- 1024
- 768
- 430
- 390
- 360

Result: **30 screenshots captured successfully**. No horizontal overflow was detected at
any checked page or width.

## Functional browser checks

- Homepage hero is visible immediately.
- Desktop navigation and tablet/mobile burger navigation are readable.
- Desktop and simplified mobile hero visuals remain contained.
- Mobile fixed CTAs remain visible and readable.
- Job cards navigate to working public job routes.
- Unknown job slugs show the proper not-found page.
- Standalone Apply form exposes accessible validation errors.
- Standalone Apply form reaches its simulated success state.
- Contact and job-detail application forms retain their existing states.
- Keyboard focus styles remain present in the shared design system.

## Known limitations

- Contact and application handlers are production stubs.
- CV selection sends only the filename; real file upload and storage are not connected.
- Image areas remain placeholders.
- Playwright uses the machine's installed Chrome by default; set
  `QA_BROWSER_CHANNEL` when another installed Chromium channel is required.
- Run `npm.cmd run build` before `npm.cmd run qa:screenshots`, because screenshot QA uses
  the production server.

## Final status

**Concept-ready and demo-ready.** Missing demo routes and responsive screenshot coverage
are resolved. Real backend integrations, CV storage, and final image assets are still
required before production deployment.
