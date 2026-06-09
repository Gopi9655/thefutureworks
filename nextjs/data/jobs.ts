import type { Job, SalaryUnit } from "@/lib/types";

export const SECTORS: string[] = [
  "Administration",
  "Customer Service & Call Centre",
  "HR",
  "Engineering, Technical & IT",
  "Finance & Accounts",
  "Health & Safety",
  "Sales & Marketing",
  "Transport & Logistics",
  "Secretarial & PA",
];

export const JOB_TYPES = [
  "All types",
  "Permanent",
  "Temporary",
  "Fixed-term",
  "Term-time",
  "Contract",
  "Part-time",
] as const;

export const JOBS: Job[] = [
  { id: "senior-recruitment-consultant", title: "Senior Recruitment Consultant", company: "thefutureworks", sector: "Sales & Marketing", type: "Permanent", location: "Coventry", salaryMin: 32000, salaryMax: 38000, salaryUnit: "year", posted: "Today", featured: true, summary: "Build trusted candidate and employer relationships while growing a commercial recruitment desk across the West Midlands.", remote: "Hybrid" },
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

export function salaryStr(j: { salaryMin: number; salaryMax: number; salaryUnit: SalaryUnit }): string {
  if (j.salaryUnit === "hour") return `£${j.salaryMin.toFixed(2)}–£${j.salaryMax.toFixed(2)}/hr`;
  const f = (n: number) => "£" + (n / 1000).toFixed(0) + "k";
  return `${f(j.salaryMin)}–${f(j.salaryMax)}`;
}

export function getJob(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}
