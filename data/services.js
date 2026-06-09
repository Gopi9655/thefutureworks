/* Services, journeys, skills & differentiator data */
window.DIFFERENTIATORS = [
  { icon: "cap",       title: "Coventry University-owned",      body: "A commercial recruitment agency owned by Coventry University \u2014 the credibility of a leading institution behind every placement." },
  { icon: "calendar",  title: "Established in 2005",            body: "Almost twenty years recruiting across Coventry, Warwickshire and the West Midlands \u2014 we know this market inside out." },
  { icon: "heart",     title: "Profits reinvested",             body: "As a division of PeoplesFuture Ltd, our profits are ultimately reinvested through Coventry University \u2014 recruitment with a social purpose." },
  { icon: "award",     title: "70+ years combined experience",  body: "A consultancy team whose blended experience spans seven decades across commercial, professional and technical desks." },
  { icon: "shield",    title: "REC & BIOR members",             body: "Corporate members of the Recruitment & Employment Confederation and the British Institute of Recruiters \u2014 trust you can verify." },
  { icon: "handshake", title: "Partnership, not quick fix",     body: "We work ethically and in genuine partnership \u2014 building long-term relationships and matching exact requirements." },
];

window.EMPLOYER_SERVICES = [
  { icon: "shield", title: "Permanent recruitment", body: "End-to-end search and selection on a success-fee model \u2014 you only pay when we deliver the right hire.", points: ["Rigorous candidate selection", "Success-fee basis", "Guarantee period included"] },
  { icon: "bolt",   title: "Temporary & flexible",  body: "Reliable temporary workers when you need them. Paid and charged hourly, with the admin handled for you.", points: ["Fast turnaround", "PAYE, AWR & holiday pay handled", "One trusted point of contact"] },
  { icon: "cap",    title: "Graduate recruitment",   body: "Access fresh graduate and postgraduate talent through our Coventry University Group connections.",        points: ["Students, graduates & postgraduates", "University talent access", "Future-focused hiring"] },
];

window.EMPLOYER_WHY = [
  { icon: "target",     title: "Rigorous candidate selection", body: "Every candidate is screened and interviewed by us before they ever reach your shortlist." },
  { icon: "users",      title: "Offsite interview facilities", body: "Professional interview space at our Coventry University campus base, available to clients." },
  { icon: "trendingUp", title: "Competitive, fair pricing",    body: "Transparent rates with no hidden fees \u2014 honest value from a university-owned agency." },
];

window.CANDIDATE_BENEFITS = [
  { icon: "target",  title: "Roles matched to you",          body: "Hand-picked opportunities that fit your skills and goals \u2014 never your CV blasted to every employer." },
  { icon: "compass", title: "A consultant in your corner",   body: "Honest advice, interview prep and feedback from someone who actually picks up the phone." },
  { icon: "sparkles",title: "Free skills assessment",        body: "Discover strengths you'd never think to list \u2014 and learn how to present them." },
  { icon: "shield",  title: "Ethical, accredited employer",  body: "We're REC & BIOR accredited and Coventry University-owned. Your data and your interests are protected." },
  { icon: "mapPin",  title: "Local roles, real employers",   body: "Genuine vacancies across Coventry, Warwickshire and the West Midlands \u2014 many before they're advertised." },
  { icon: "heart",   title: "Support that lasts",            body: "Aftercare beyond day one. We measure success by how long you stay and thrive." },
];

window.JOURNEYS = {
  candidate: {
    icon: "users", bg: "linear-gradient(135deg, #0a2218, #1AA39A)",
    title: "Looking for a job?", sub: "From first conversation to first day \u2014 guidance, honesty and opportunities that fit.",
    steps: [
      { t: "Register & share your goals", d: "Email your CV or call 02476 158815. You don't have to be a student.", icon: "send" },
      { t: "Get matched to real roles",   d: "Hand-picked vacancies that fit your skills and salary expectations.",   icon: "target" },
      { t: "Interview with us first",     d: "We brief you, prep you and present you at your best to every client.", icon: "compass" },
      { t: "Placed & supported",          d: "CV advice, interview prep and honest market-salary guidance throughout.", icon: "checkCircle" },
    ],
    cta: { label: "Find jobs", to: "/vacancies" }, cta2: { label: "How it works", to: "/candidate-how" },
  },
  employer: {
    icon: "building", bg: "linear-gradient(135deg, #3a0512, var(--red-600))",
    title: "Looking for staff?", sub: "Permanent, temporary and part-time staffing across the region. Our advice is always free.",
    steps: [
      { t: "Brief us once, properly",    d: "We map the role, culture and requirements in full \u2014 no cut-and-paste.", icon: "doc" },
      { t: "We search & assess",         d: "Rigorous candidate selection from our deep local talent database.",          icon: "target" },
      { t: "Receive a vetted shortlist",  d: "Reference-checked, interview-ready \u2014 no speculative CV bundles.",     icon: "layers" },
      { t: "Success-fee, guaranteed",     d: "Permanent placements on a success-fee basis, with a guarantee period.",     icon: "shield" },
    ],
    cta: { label: "Hire staff", to: "/employers" }, cta2: { label: "Our process", to: "/employer-how" },
  },
};

window.HOW_STEPS = {
  candidate: [
    { t: "Send us your CV", d: "Email your CV in Word format to jobs@thefutureworks.co.uk, or call 02476 158815 to get started. You don't have to be a student to register.", icon: "send" },
    { t: "Tell us what you're looking for", d: "Share your skills, experience, search criteria and salary or hourly expectations so we can match you accurately.", icon: "target" },
    { t: "We search & advertise", d: "Our team searches for suitable opportunities and advertises relevant vacancies online and across social media.", icon: "compass" },
    { t: "Interview with us first", d: "You'll go through our own interview process so we can present you at your best before submitting you to clients.", icon: "users" },
    { t: "Advice at every step", d: "CV advice, interview preparation and honest market-salary guidance \u2014 and we'll confirm your right-to-work documents.", icon: "checkCircle" },
  ],
  employer: [
    { t: "Tell us your requirement", d: "Brief us on the role, team and timescales. Advice is completely free and there's no obligation.", icon: "doc" },
    { t: "Temporary staffing, handled", d: "Temporary assignments are paid and charged hourly \u2014 we manage PAYE, AWR compliance and holiday pay for you.", icon: "bolt" },
    { t: "Permanent recruitment", d: "Permanent placements work on a success-fee basis \u2014 you only pay when we deliver the right hire.", icon: "shield" },
    { t: "Backed by a guarantee", d: "Our permanent placements include a guarantee period, for complete peace of mind.", icon: "checkCircle" },
    { t: "Graduate talent access", d: "Tap into graduate and postgraduate talent through our Coventry University Group connections.", icon: "cap" },
  ],
};

window.HOW_HIGHLIGHTS = {
  candidate: [["users","Interviewed first","We interview you before submitting to any client."],["sparkles","Free skills assessment","Discover and present your strengths."],["compass","Real advice","CV, interview and market-salary guidance."]],
  employer: [["clock","Fast & free advice","One contact, quick response, no obligation."],["shield","Compliance handled","PAYE, AWR and holiday pay sorted for temps."],["checkCircle","Guarantee period","Permanent placements backed for peace of mind."]],
};

window.ASSESS_GROUPS = [
  { icon: "doc",       title: "Microsoft Office",      items: ["Excel", "Word", "PowerPoint", "Access", "Outlook"] },
  { icon: "target",    title: "Aptitude & reasoning",  items: ["Verbal reasoning", "Numerical reasoning", "Checking", "Classification", "Sorting & coding", "Spelling & grammar"] },
  { icon: "briefcase", title: "Office & clerical",     items: ["Filing", "Data entry", "Audio typing", "Speed typing"] },
  { icon: "sparkles",  title: "Specialist areas",      items: ["Call centre", "Finance", "Health & safety", "Languages"] },
  { icon: "layers",    title: "IT skills",             items: ["IT operating systems", "IT systems administration", "IT programming"] },
];

window.SKILLS_QUESTIONS = [
  { q: "Which kind of day sounds best?", a: [["Hands-on, building or making something","practical"],["Solving a tricky problem or puzzle","analytical"],["Helping someone and seeing them benefit","caring"],["Organising people and plans","leading"]] },
  { q: "Colleagues would say you're the one who\u2026", a: [["Keeps calm and gets it done","practical"],["Spots the detail others miss","analytical"],["Looks after the team","caring"],["Takes charge when it counts","leading"]] },
  { q: "What gives you most satisfaction?", a: [["A job finished to a high standard","practical"],["Cracking something complex","analytical"],["A genuine thank-you","caring"],["A team hitting its goal","leading"]] },
  { q: "Pick a workplace you'd enjoy.", a: [["A workshop, line or site","practical"],["An office or lab with data","analytical"],["A ward, school or care setting","caring"],["A fast-moving operation you run","leading"]] },
];

window.TRAITS = {
  practical:  { name: "The Maker",         desc: "You're hands-on, dependable and proud of a job done well.",           sectors: ["Engineering, Technical & IT", "Transport & Logistics", "Health & Safety"] },
  analytical: { name: "The Problem-Solver", desc: "You think in detail and love getting to the right answer.",            sectors: ["Finance & Accounts", "Engineering, Technical & IT", "Administration"] },
  caring:     { name: "The People Person", desc: "You're motivated by helping people and doing right by them.",          sectors: ["Customer Service & Call Centre", "HR", "Administration"] },
  leading:    { name: "The Organiser",     desc: "You bring order, drive and people together.",                          sectors: ["Transport & Logistics", "Sales & Marketing", "Customer Service & Call Centre"] },
};

window.CLIENT_SUPPORT = [
  { icon: "building", title: "Private & public sector",        body: "We supply organisations large and small across both the private and public sector." },
  { icon: "layers",   title: "Permanent, temporary & interim", body: "Whatever the requirement, we support permanent, temporary and interim staffing." },
  { icon: "doc",      title: "Job descriptions & rates",       body: "We help shape job descriptions and advise on market rates, salaries and sought-after benefits." },
  { icon: "target",   title: "Assessed, matched candidates",   body: "Our candidate database and skills assessments mean every match is considered, not speculative." },
];
