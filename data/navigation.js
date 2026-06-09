/* Navigation, contact & site-wide data */
window.CONTACT = {
  org: "thefutureworks",
  addressLines: ["Coventry University Campus", "Charles Ward Building (145)", "Cox Street, Coventry", "CV1 5FJ"],
  phone: "+44 (0) 24 7615 8815",
  phoneHref: "tel:+442476158815",
  phoneShort: "02476 158815",
  email: "jobs@thefutureworks.co.uk",
  emailHref: "mailto:jobs@thefutureworks.co.uk",
  hours: ["Mon\u2013Fri \u00b7 9:00am \u2013 5:00pm", "Advice for employers is always free"],
};

window.STATS = [
  { num: 2456, label: "Jobs posted", sub: "across the region" },
  { num: 953, label: "Positions filled", sub: "candidates placed" },
  { num: 257, label: "Companies supplied", sub: "employers served" },
  { num: 232, label: "Repeat customers", sub: "who came back" },
  { num: 8196, label: "Candidates registered", sub: "and growing" },
];

window.STAT_META = [
  { icon: "briefcase", color: "var(--red-500)",  bg: "rgba(225,29,42,0.14)" },
  { icon: "users",     color: "var(--g-green)",   bg: "rgba(95,168,42,0.14)" },
  { icon: "building",  color: "var(--g-blue)",    bg: "rgba(30,111,184,0.14)" },
  { icon: "heart",     color: "var(--g-orange)",  bg: "rgba(240,138,36,0.14)" },
  { icon: "sparkles",  color: "var(--g-teal)",    bg: "rgba(26,163,154,0.14)" },
];

window.CLIENTS = ["Serco Integrated Services", "ACS", "The Box Factory Limited", "ExactLogistics"];

window.ACCREDITATIONS = [
  { name: "Recruitment & Employment Confederation", abbr: "REC", desc: "Corporate members of the REC \u2014 the UK's professional body for recruiters \u2014 committed to its audited Code of Professional Practice and ethical standards." },
  { name: "British Institute of Recruiters", abbr: "BIOR", desc: "Corporate members of the BIOR, upholding professional standards and continuing development across our consultants." },
];

window.REGION_CITIES = [
  { name: "Coventry",       jobs: "1,240+", x: "57%", y: "51%", main: true },
  { name: "Birmingham",     jobs: "320+",   x: "20%", y: "36%", main: false },
  { name: "Nuneaton",       jobs: "184",    x: "72%", y: "23%", main: false },
  { name: "Warwick",        jobs: "156",    x: "48%", y: "74%", main: false },
  { name: "Rugby",          jobs: "98",     x: "82%", y: "38%", main: false },
  { name: "Leamington Spa", jobs: "112",    x: "43%", y: "80%", main: false },
  { name: "Solihull",       jobs: "142",    x: "35%", y: "46%", main: false },
  { name: "Kenilworth",     jobs: "68",     x: "50%", y: "64%", main: false },
];

window.NAV = [
  { label: "Candidates", to: "/candidates", sub: [
    { label: "For candidates",   to: "/candidates",    icon: "users",   desc: "Find your next role" },
    { label: "How it works",     to: "/candidate-how",  icon: "compass", desc: "Your journey, step by step" },
    { label: "Skills assessment", to: "/skills",        icon: "target",  desc: "Discover your strengths" },
    { label: "Case studies",     to: "/case-studies",    icon: "doc",     desc: "Real placement stories" },
  ]},
  { label: "Employers", to: "/employers", sub: [
    { label: "For employers",  to: "/employers",    icon: "building",   desc: "Hire the right people" },
    { label: "How it works",   to: "/employer-how",  icon: "layers",     desc: "Our supply process" },
    { label: "Our clients",    to: "/clients",       icon: "handshake",  desc: "Who we work with" },
    { label: "Testimonials",   to: "/testimonials",  icon: "quote",      desc: "What people say" },
  ]},
  { label: "Vacancies", to: "/vacancies" },
  { label: "About", to: "/about", sub: [
    { label: "About us",       to: "/about",          icon: "globe2",  desc: "Our story & mission" },
    { label: "Accreditations", to: "/accreditations",  icon: "shield",  desc: "Standards we meet" },
    { label: "Contact",        to: "/contact",         icon: "mail",    desc: "Talk to our team" },
  ]},
];
