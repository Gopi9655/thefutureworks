import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import type { Stat, Testimonial, Accreditation, Differentiator } from "@/lib/types";

const FACTS = OFFICIAL_BUSINESS_FACTS;

export const STATS: Stat[] = [
  { num: FACTS.stats.jobsPosted.value, label: FACTS.stats.jobsPosted.label, sub: FACTS.stats.jobsPosted.sub },
  { num: FACTS.stats.positionsFilled.value, label: FACTS.stats.positionsFilled.label, sub: FACTS.stats.positionsFilled.sub },
  { num: FACTS.stats.companiesSupplied.value, label: FACTS.stats.companiesSupplied.label, sub: FACTS.stats.companiesSupplied.sub },
  { num: FACTS.stats.repeatCustomers.value, label: FACTS.stats.repeatCustomers.label, sub: FACTS.stats.repeatCustomers.sub },
  { num: FACTS.stats.candidatesRegistered.value, label: FACTS.stats.candidatesRegistered.label, sub: FACTS.stats.candidatesRegistered.sub },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "thefutureworks took the time to understand our contract requirements and consistently sent us people who fit first time. A genuine partner, not a quick fix.", name: "Serco Integrated Services", role: "Public-sector contract client", kind: "employer" },
  { quote: "Honest, accountable and easy to deal with. Their consultants know the local market and price fairly - we keep coming back.", name: "ACS", role: "Commercial client", kind: "employer" },
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

export const ACCREDITATIONS: Accreditation[] = FACTS.accreditations.map((item) => ({
  name: item.name,
  abbr: item.abbr,
  desc: item.desc,
}));

export const DIFFERENTIATORS: Differentiator[] = [
  { icon: "cap", title: "Coventry University-owned", body: "A commercial recruitment agency owned by Coventry University." },
  { icon: "building", title: "Part of PeoplesFuture Ltd", body: "thefutureworks is a division of PeoplesFuture Ltd owned by Coventry University." },
  { icon: "calendar", title: "Established in 2005", body: `Based in Coventry and supporting ${FACTS.identity.serviceArea}.` },
  { icon: "award", title: "70+ years collective experience", body: "The official website cites over 70 years of collective recruitment experience." },
  { icon: "shield", title: "REC & BIOR members", body: "Corporate/member status with the Recruitment and Employment Confederation and the British Institute of Recruiters." },
  { icon: "handshake", title: "Commercial and student support", body: "Works with commercial and professionally experienced individuals, Coventry University students and graduates." },
];
