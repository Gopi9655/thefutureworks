# Phase 5A — Employer request-staff flow

Upgrades `/request-staff` from an informational shell into a premium employer
staffing-request concept with a real (but fully stubbed) intake form and a
concept confirmation state. High-fidelity concept / prototype only — static and
stubbed, no real backend, database, email, auth or storage.

## Scope

- `/request-staff` (`app/request-staff/page.tsx`).
- New `components/forms/EmployerRequestForm.tsx`.
- `app/globals.css` (`.emp-*` styles).
- Existing `/employers` route left fully intact.

## Premium employer journey

The page keeps the `PlatformShell` concept layout and adds a prominent staffing
brief as the centrepiece, with these stages captured in the form:

- **Staffing brief** — organisation, contact name, work email, phone.
- **Role requirements** — role title, sector (from `data/jobs` `SECTORS`),
  number of roles, location, working pattern, key requirements note.
- **Timeline / urgency** — target start and an urgency level
  (Standard / Priority / Urgent).
- **Contract options** — Permanent / Temporary / Fixed-term / Contract /
  Part-time.
- **Consultant follow-up note** — a sticky "What happens next" rail
  (brief captured → consultant follows up → shortlist direction) plus a blue
  trust panel reinforcing the concept boundary.
- **Concept confirmation state** — on submit, a confirmation panel shows a
  generated concept reference, a recap of the submitted brief, and the
  consultant follow-up note. Includes "Submit another brief" and a link to the
  employer dashboard.

## Stubbed by design

- The form does **not** call any API. `EmployerRequestForm` uses the shared
  `useFormSubmit` controller with a **local, simulated** submit (a short delay,
  then an in-memory success with a random concept reference). No `fetch`, no
  network, no `/api/*` route, no persistence, no email.
- A visible concept disclaimer states nothing is submitted, stored or emailed.
- No official / production claims.

## Colour language

- **Blue = employer / trust**: section legends for organisation and timeline,
  the follow-up rail, trust panels, the primary "Request staff" / dashboard CTAs.
- **Green = opportunity**: the role-requirements legend and the success tick.

## Accessibility

- Each input is a labelled `Field` (`<label htmlFor>` + `aria-describedby` for
  hints/errors, `aria-required` / `aria-invalid` as needed).
- The three stages are real `<fieldset>` / `<legend>` groups.
- Validation focuses the first invalid field; the error summary uses
  `role="alert"`; the confirmation uses `role="status"` + `aria-live="polite"`.
- The follow-up sequence is an ordered `<ol>`.

## Responsive

- `.emp-layout` is a two-column (form + sticky rail) grid that collapses to a
  single column under 880px; the rail becomes static. Field rows use the
  existing `.cards-2` two-up grid that the design system already collapses on
  small screens.

## Routes (unchanged contract)

- `/request-staff` → 200 (upgraded).
- `/employers` → 200 (untouched).

## Concept / prototype note

A design and engineering exploration, not the official thefutureworks website.
All employers, briefs and references are synthetic and illustrative.
