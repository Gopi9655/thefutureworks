/* Jobs data — single source of truth */
window.SECTORS = [
  "Administration", "Customer Service & Call Centre", "HR",
  "Engineering, Technical & IT", "Finance & Accounts", "Health & Safety",
  "Sales & Marketing", "Transport & Logistics", "Secretarial & PA",
];

window.JOB_TYPES = ["All types", "Permanent", "Temporary", "Fixed-term", "Term-time", "Contract", "Part-time"];

window.JOBS = [
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

window.salaryStr = function(j) {
  if (j.salaryUnit === "hour") return "\u00A3" + j.salaryMin.toFixed(2) + "\u2013\u00A3" + j.salaryMax.toFixed(2) + "/hr";
  var f = function(n) { return "\u00A3" + (n / 1000).toFixed(0) + "k"; };
  return f(j.salaryMin) + "\u2013" + f(j.salaryMax);
};

window.JOB_DETAIL_DEFAULTS = {
  responsibilities: [
    "Deliver consistently high standards aligned to the team's KPIs and quality benchmarks.",
    "Work collaboratively across shifts, supporting colleagues and new starters.",
    "Follow health, safety and compliance procedures to the letter.",
    "Identify and suggest improvements to ways of working.",
  ],
  requirements: [
    "Relevant experience in a comparable role or sector.",
    "Right to work in the UK and references covering recent employment.",
    "A reliable, positive approach and strong communication.",
    "Flexibility to support the shift pattern described.",
  ],
  benefits: ["Competitive salary", "Pension scheme", "Ongoing training", "Career progression", "Supportive team", "Coventry University-owned employer"],
};
