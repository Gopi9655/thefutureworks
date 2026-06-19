import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import type { Job, SalaryUnit } from "@/lib/types";

export const SECTORS: string[] = [...OFFICIAL_BUSINESS_FACTS.sectors];

export const JOB_TYPES = [
  "All types",
  "Permanent",
  "Temporary",
  "Fixed-term",
  "Term-time",
  "Contract",
  "Part-time",
] as const;

const SNAPSHOT = OFFICIAL_BUSINESS_FACTS.vacancySnapshot;

export const JOBS: Job[] = SNAPSHOT.jobs.map((job, index) => ({
  ...job,
  company: SNAPSHOT.employerDisplay,
  posted: SNAPSHOT.label,
  featured: index < 3,
  sourceLabel: SNAPSHOT.label,
  summary:
    `${SNAPSHOT.label}: ${job.title} in ${job.location}. ` +
    "Employer name is not shown in this prototype because it was not visible in the captured listing.",
}));

export function salaryStr(j: { salaryMin: number; salaryMax: number; salaryUnit: SalaryUnit }): string {
  if (j.salaryUnit === "hour") return `\u00a3${j.salaryMin.toFixed(2)}-\u00a3${j.salaryMax.toFixed(2)}/hr`;
  const format = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });
  return `${format.format(j.salaryMin)}-${format.format(j.salaryMax)}`;
}

export function getJob(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}
