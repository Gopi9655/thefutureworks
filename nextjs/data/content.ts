import type { Stat, Testimonial, Accreditation, Differentiator } from "@/lib/types";

export const STATS: Stat[] = [
  { num: 2456, label: "Jobs posted", sub: "across the region" },
  { num: 953, label: "Positions filled", sub: "candidates placed" },
  { num: 257, label: "Companies supplied", sub: "employers served" },
  { num: 232, label: "Repeat customers", sub: "who came back" },
  { num: 8196, label: "Candidates registered", sub: "and growing" },
];

export const TESTIMONIALS: Testimonial[] = [
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

export const CLIENTS: string[] = [
  "Serco Integrated Services",
  "ACS",
  "The Box Factory Limited",
  "ExactLogistics",
];

export const ACCREDITATIONS: Accreditation[] = [
  { name: "Recruitment & Employment Confederation", abbr: "REC", desc: "Corporate members of the REC — the UK's professional body for recruiters — committed to its audited Code of Professional Practice and ethical standards." },
  { name: "British Institute of Recruiters", abbr: "BIOR", desc: "Corporate members of the BIOR, upholding professional standards and continuing development across our consultants." },
];

export const DIFFERENTIATORS: Differentiator[] = [
  { icon: "cap", title: "Coventry University-owned", body: "A commercial recruitment agency owned by Coventry University — the credibility of a leading institution behind every placement." },
  { icon: "calendar", title: "Established in 2005", body: "Almost twenty years recruiting across Coventry, Warwickshire and the West Midlands — we know this market inside out." },
  { icon: "heart", title: "Profits reinvested", body: "As a division of PeoplesFuture Ltd, our profits are ultimately reinvested through Coventry University — recruitment with a social purpose." },
  { icon: "award", title: "70+ years combined experience", body: "A consultancy team whose blended experience spans seven decades across commercial, professional and technical desks." },
  { icon: "shield", title: "REC & BIOR members", body: "Corporate members of the Recruitment & Employment Confederation and the British Institute of Recruiters — trust you can verify." },
  { icon: "handshake", title: "Partnership, not quick fix", body: "We work ethically and in genuine partnership — building long-term relationships and matching exact requirements." },
];
