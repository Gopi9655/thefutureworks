/* ============================================================
   DATA — jobs, stats, testimonials, clients, sectors
   ============================================================ */

const STATS = [
  { num: 2456, label: "Jobs posted", sub: "across the region" },
  { num: 953, label: "Positions filled", sub: "candidates placed" },
  { num: 257, label: "Companies supplied", sub: "employers served" },
  { num: 232, label: "Repeat customers", sub: "who came back" },
  { num: 8196, label: "Candidates registered", sub: "and growing" },
];

const SECTORS = [
  "Administration", "Customer Service & Call Centre", "HR",
  "Engineering, Technical & IT", "Finance & Accounts", "Health & Safety",
  "Sales & Marketing", "Transport & Logistics", "Secretarial & PA",
];

const CONTACT = {
  org: "thefutureworks",
  addressLines: ["Coventry University Campus", "Charles Ward Building (145)", "Cox Street, Coventry", "CV1 5FJ"],
  phone: "+44 (0) 24 7615 8815",
  phoneHref: "tel:+442476158815",
  phoneShort: "02476 158815",
  email: "jobs@thefutureworks.co.uk",
  emailHref: "mailto:jobs@thefutureworks.co.uk",
  hours: ["Mon–Fri · 9:00am – 5:00pm", "Advice for employers is always free"],
};

const JOBS = [
  { id: "hr-advisor", title: "HR Advisor", company: "ACS", sector: "HR", type: "Permanent", location: "Coventry", salaryMin: 30000, salaryMax: 35000, salaryUnit: "year", posted: "2 days ago", featured: true, summary: "Generalist HR support across employee relations, onboarding and policy for a growing commercial team.", remote: "Hybrid" },
  { id: "customer-service-advisor", title: "Customer Service Advisor", company: "Serco Integrated Services", sector: "Customer Service & Call Centre", type: "Permanent", location: "Coventry", salaryMin: 23000, salaryMax: 25000, salaryUnit: "year", posted: "1 day ago", featured: true, summary: "First-line contact-centre support for a major public-sector contract. Full training provided.", remote: "Hybrid" },
  { id: "management-accountant", title: "Management Accountant", company: "The Box Factory Limited", sector: "Finance & Accounts", type: "Permanent", location: "Nuneaton", salaryMin: 42000, salaryMax: 48000, salaryUnit: "year", posted: "3 days ago", featured: true, summary: "Own month-end, budgeting and commercial analysis for an established West Midlands manufacturer.", remote: "Hybrid" },
  { id: "sales-executive", title: "Sales Executive", company: "ExactLogistics", sector: "Sales & Marketing", type: "Permanent", location: "Coventry", salaryMin: 26000, salaryMax: 30000, salaryUnit: "year", posted: "4 days ago", featured: false, summary: "New-business development for a fast-moving logistics provider. Uncapped commission.", remote: "Office" },
  { id: "transport-planner", title: "Transport Planner", company: "ExactLogistics", sector: "Transport & Logistics", type: "Permanent", location: "Coventry", salaryMin: 28000, salaryMax: 32000, salaryUnit: "year", posted: "2 days ago", featured: false, summary: "Plan and optimise multi-drop routes across the Midlands in a busy transport office.", remote: "Office" },
  { id: "executive-pa", title: "Executive PA", company: "ACS", sector: "Secretarial & PA", type: "Permanent", location: "Warwick", salaryMin: 28000, salaryMax: 33000, salaryUnit: "year", posted: "5 days ago", featured: false, summary: "Support a senior leadership team with diary, travel and board-level coordination.", remote: "Hybrid" },
  { id: "it-support-technician", title: "IT Support Technician", company: "Sphere IT Services", sector: "Engineering, Technical & IT", type: "Permanent", location: "Coventry", salaryMin: 25000, salaryMax: 30000, salaryUnit: "year", posted: "3 days ago", featured: false, summary: "1st/2nd-line support across Windows, O365 and networking for regional clients.", remote: "Office" },
  { id: "health-safety-officer", title: "Health & Safety Officer", company: "The Box Factory Limited", sector: "Health & Safety", type: "Permanent", location: "Nuneaton", salaryMin: 32000, salaryMax: 38000, salaryUnit: "year", posted: "6 days ago", featured: false, summary: "Drive a positive H&S culture, audits and compliance across a manufacturing site. NEBOSH preferred.", remote: "Office" },
  { id: "office-administrator", title: "Office Administrator", company: "Serco Integrated Services", sector: "Administration", type: "Temporary", location: "Coventry", salaryMin: 12.5, salaryMax: 13.5, salaryUnit: "hour", posted: "Today", featured: false, summary: "Busy administration role supporting a contract team. Immediate temporary start.", remote: "Office" },
  { id: "finance-assistant", title: "Finance Assistant", company: "ACS", sector: "Finance & Accounts", type: "Temporary", location: "Coventry", salaryMin: 13, salaryMax: 14, salaryUnit: "hour", posted: "1 day ago", featured: false, summary: "Purchase ledger, reconciliations and supplier queries on a temp-to-perm basis.", remote: "Hybrid" },
  { id: "marketing-coordinator", title: "Marketing Coordinator", company: "The Box Factory Limited", sector: "Sales & Marketing", type: "Part-time", location: "Leamington Spa", salaryMin: 27000, salaryMax: 31000, salaryUnit: "year", posted: "1 week ago", featured: false, summary: "Coordinate campaigns, content and events across digital and print. Part-time, 3 days.", remote: "Hybrid" },
  { id: "call-centre-team-leader", title: "Call Centre Team Leader", company: "Serco Integrated Services", sector: "Customer Service & Call Centre", type: "Permanent", location: "Coventry", salaryMin: 29000, salaryMax: 33000, salaryUnit: "year", posted: "4 days ago", featured: false, summary: "Lead, coach and motivate a team of advisors against service and quality KPIs.", remote: "Hybrid" },
];

function salaryStr(j) {
  if (j.salaryUnit === "hour") return `£${j.salaryMin.toFixed(2)}–£${j.salaryMax.toFixed(2)}/hr`;
  const f = (n) => "£" + (n / 1000).toFixed(0) + "k";
  return `${f(j.salaryMin)}–${f(j.salaryMax)}`;
}

const TESTIMONIALS = [
  { quote: "thefutureworks took the time to understand our contract requirements and consistently sent us people who fit first time. A genuine partner, not a quick fix.", name: "Serco Integrated Services", role: "Public-sector contract client", kind: "employer" },
  { quote: "Honest, accountable and easy to deal with. Their consultants know the local market and price fairly — we keep coming back.", name: "ACS", role: "Commercial client", kind: "employer" },
  { quote: "Rigorous candidate selection that saved us hours of screening. The shortlist was strong from the very first submission.", name: "The Box Factory Limited", role: "Manufacturing client", kind: "employer" },
  { quote: "Reliable temporary cover at short notice and a permanent hire that's still with us. They handle the compliance so we don't have to.", name: "ExactLogistics", role: "Logistics client", kind: "employer" },
  { quote: "My consultant actually listened, prepped me properly and kept me informed at every stage. I'm now settled in a role I love.", name: "Phil Lennon", role: "Placed candidate", kind: "candidate" },
  { quote: "After graduating I had no idea where to start. thefutureworks helped me present my skills and found me my first professional role.", name: "Francesca Melhuish", role: "Graduate placement", kind: "candidate" },
  { quote: "Warm, professional and genuinely on my side. The CV and interview advice made all the difference.", name: "Lorraine Laurence", role: "Placed candidate", kind: "candidate" },
  { quote: "They found me a temporary assignment that turned into a permanent job. I can't recommend the team highly enough.", name: "Stephen Keeler", role: "Temp-to-perm candidate", kind: "candidate" },
  { quote: "Quick to respond, honest about the market and supportive throughout. A completely different experience to other agencies.", name: "Jason Flynn", role: "Placed candidate", kind: "candidate" },
  { quote: "From registration to offer, they treated me as a person, not a CV. I'm grateful for the time and care they gave me.", name: "Esperance Rukongwa", role: "Placed candidate", kind: "candidate" },
];

const CLIENTS = ["Serco Integrated Services", "ACS", "The Box Factory Limited", "ExactLogistics"];

const ACCREDITATIONS = [
  { name: "Recruitment & Employment Confederation", abbr: "REC", desc: "Corporate members of the REC — the UK's professional body for recruiters — committed to its audited Code of Professional Practice and ethical standards." },
  { name: "British Institute of Recruiters", abbr: "BIOR", desc: "Corporate members of the BIOR, upholding professional standards and continuing development across our consultants." },
];

const DIFFERENTIATORS = [
  { icon: "cap", title: "Coventry University-owned", body: "A commercial recruitment agency owned by Coventry University — the credibility of a leading institution behind every placement." },
  { icon: "calendar", title: "Established in 2005", body: "Almost twenty years recruiting across Coventry, Warwickshire and the West Midlands — we know this market inside out." },
  { icon: "heart", title: "Profits reinvested", body: "As a division of PeoplesFuture Ltd, our profits are ultimately reinvested through Coventry University — recruitment with a social purpose." },
  { icon: "award", title: "70+ years combined experience", body: "A consultancy team whose blended experience spans seven decades across commercial, professional and technical desks." },
  { icon: "shield", title: "REC & BIOR members", body: "Corporate members of the Recruitment & Employment Confederation and the British Institute of Recruiters — trust you can verify." },
  { icon: "handshake", title: "Partnership, not quick fix", body: "We work ethically and in genuine partnership — building long-term relationships and matching exact requirements." },
];

Object.assign(window, { STATS, SECTORS, CONTACT, JOBS, salaryStr, TESTIMONIALS, CLIENTS, ACCREDITATIONS, DIFFERENTIATORS });
