# Phase 10 - Official business facts integration

This phase integrates manually captured public facts from official
thefutureworks pages into the Advanced Platform v2 prototype.

This remains a high-fidelity concept/prototype, not the official
thefutureworks website.

## Official facts integrated

- thefutureworks is a commercial recruitment agency owned by Coventry
  University.
- It is a division of PeoplesFuture Ltd owned by Coventry University.
- It was established in 2005 and is based in Coventry.
- It supports Coventry, Warwickshire and the West Midlands.
- It supports permanent, temporary, full-time and part-time recruitment.
- It works with commercial/professionally experienced individuals, Coventry
  University students and Coventry University graduates.
- Contact details now use the official email, phone and Coventry University
  Campus / Charles Ward Building address.

## Stats replaced

- Jobs posted: 2,456.
- Positions filled: 953.
- Companies supplied: 257.
- Repeat customers: 232.
- Candidates registered: 8,196.
- Collective recruitment experience: over 70 years.

Stats are centralized in `data/official-business-facts.ts` and consumed by the
existing `data/content.ts` exports.

## Pages and components updated

- Homepage hero copy now describes the official business identity and service
  area.
- Homepage trust rail now uses official trust facts: Coventry
  University-owned, REC corporate member, BIOR member, 70+ years experience,
  and 8,196 candidates registered.
- Homepage stats and current vacancies section now use official statistics and
  static snapshot language.
- About page now references ownership, PeoplesFuture Ltd, establishment year,
  service area, REC and BIOR facts.
- Employers page now uses official employer service points and official sector
  labels.
- Candidates page now reflects the official audience mix.
- Contact page and footer now use official contact details.
- Vacancy marketplace, job cards and job detail pages now label roles as a
  static official website snapshot.
- Apply/contact API comments were clarified as prototype stubs with no
  persistence, email, ATS or CV storage.

## Job snapshot added

The old prototype vacancy dataset was replaced with five static snapshot roles:

- Project Office Co-ordinator - Coventry - GBP 32,000-35,000 per annum.
- Sales Executive - Coventry - GBP 40,000-45,000 per annum.
- Senior Recruitment Consultant - Coventry - GBP 37,995-40,452 per annum.
- Internal Sales & Customer Services Co-ordinator - Coventry - GBP
  32,000-35,000 per annum.
- Operations Systems Co-Ordinator - Kenilworth - GBP 28,000-32,000 per annum.

Employer names were not included in the supplied official listing snapshot, so
the prototype displays "Employer not listed" rather than inventing company
names.

## Known limitations

- Facts were manually captured from public official pages; the app does not
  scrape at runtime.
- Job listings can change on the official website. This prototype uses a
  static snapshot, not a live feed.
- Vacancy sector, work-mode and contract fields are conservative prototype
  classifications needed by the existing filters/cards; the official snapshot
  supplied only title, location and salary.
- No official third-party logos were added. REC/BIOR items use neutral local
  icons.
- Backend, apply and contact flows remain prototype/stubbed unless explicitly
  implemented later.
- Synthetic dashboard records remain synthetic and clearly bounded as concept
  data.

## Source of truth

The canonical local source is:

- `data/official-business-facts.ts`

Downstream data modules import from that file rather than duplicating official
statistics or contact details.
