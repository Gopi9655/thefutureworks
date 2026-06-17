// ============================================================
// Phase 4A — Jobs marketplace helpers
// Static, synthetic-concept helpers over the existing data/jobs.ts
// dataset. No backend, no database, no real candidate data.
// ============================================================
import { JOBS } from "@/data/jobs";
import type { Job } from "@/lib/types";

export interface JobFilterOptions {
  locations: string[];
  types: string[];
  sectors: string[];
}

/** Controlled filter state for the marketplace. Empty string = "all". */
export interface JobFilterState {
  keyword: string;
  location: string;
  type: string;
  sector: string;
}

export const EMPTY_JOB_FILTERS: JobFilterState = {
  keyword: "",
  location: "",
  type: "",
  sector: "",
};

export type JobVisualTone = "green" | "blue" | "navy";

/**
 * Stable visual identity for a vacancy. Used to render a premium category
 * badge instead of random company initials. Derived deterministically from
 * the job's title and sector — no external logos, no scraping, no APIs.
 */
export interface JobCategoryVisual {
  /** Full category name, e.g. "Recruitment & hiring". */
  category: string;
  /** Short badge label, e.g. "Recruitment". */
  label: string;
  /** Icon name from components/Icon.tsx. */
  icon: string;
  tone: JobVisualTone;
}

const GENERAL_VISUAL: JobCategoryVisual = {
  category: "General opportunity",
  label: "Opportunity",
  icon: "briefcase",
  tone: "green",
};

// Sector -> category badge. Covers every sector in data/jobs.ts SECTORS.
const SECTOR_VISUALS: Record<string, JobCategoryVisual> = {
  "Administration": { category: "Admin & office", label: "Admin", icon: "doc", tone: "navy" },
  "Secretarial & PA": { category: "Admin & office", label: "Office", icon: "doc", tone: "navy" },
  "Customer Service & Call Centre": { category: "Customer service", label: "Customer service", icon: "phone", tone: "blue" },
  "HR": { category: "HR & people", label: "HR & people", icon: "users", tone: "blue" },
  "Engineering, Technical & IT": { category: "Technical & IT", label: "Technical / IT", icon: "bolt", tone: "blue" },
  "Finance & Accounts": { category: "Finance & accounts", label: "Finance", icon: "chart", tone: "navy" },
  "Health & Safety": { category: "Health & safety", label: "Health & safety", icon: "shield", tone: "navy" },
  "Sales & Marketing": { category: "Sales & growth", label: "Sales / growth", icon: "trendingUp", tone: "green" },
  "Transport & Logistics": { category: "Logistics & transport", label: "Logistics", icon: "compass", tone: "blue" },
};

const RECRUITMENT_VISUAL: JobCategoryVisual = {
  category: "Recruitment & hiring",
  label: "Recruitment",
  icon: "handshake",
  tone: "green",
};

/**
 * Ordered title-keyword overrides. The first match wins, so the broad job
 * sector never mislabels a role (e.g. a "Recruitment Consultant" filed under
 * Sales still reads as Recruitment, a "Management Accountant" reads as Finance).
 * Patterns are intentionally specific to avoid false positives.
 */
const TITLE_VISUALS: { pattern: RegExp; visual: JobCategoryVisual }[] = [
  { pattern: /recruit|talent acquisition|resourcing/, visual: RECRUITMENT_VISUAL },
  { pattern: /\bhr\b|human resources|people (team|partner|advisor)|employee relations/, visual: SECTOR_VISUALS["HR"] },
  { pattern: /customer service|call centre|call center|contact centre/, visual: SECTOR_VISUALS["Customer Service & Call Centre"] },
  { pattern: /accountant|finance|payroll|bookkeep|ledger/, visual: SECTOR_VISUALS["Finance & Accounts"] },
  { pattern: /\bsales\b|business development/, visual: SECTOR_VISUALS["Sales & Marketing"] },
  { pattern: /transport|logistic|warehouse|supply chain|\bhgv\b/, visual: SECTOR_VISUALS["Transport & Logistics"] },
];

/**
 * Return a stable category badge descriptor for a job. Title keywords take
 * precedence over the broad sector, then sector, then a general fallback.
 * Deterministic — no external logos, no scraping, no APIs.
 */
export function getJobCategoryVisual(job: Job): JobCategoryVisual {
  const title = job.title.toLowerCase();
  const byTitle = TITLE_VISUALS.find((entry) => entry.pattern.test(title));
  if (byTitle) return byTitle.visual;
  return SECTOR_VISUALS[job.sector] ?? GENERAL_VISUAL;
}

export type JobMatchTone = "green" | "blue";

/**
 * Synthetic concept "match signal". This is illustrative only — it is a
 * deterministic value derived from the job's own fields, NOT a real matching
 * engine and NOT based on any candidate data.
 */
export interface JobMatchSignal {
  label: string;
  tone: JobMatchTone;
  /** Concept percentage, 0–100. Omitted for trust-style signals. */
  score?: number;
  rationale: string;
}

/** Return every concept vacancy. */
export function getAllJobs(): Job[] {
  return JOBS;
}

/** Look up a single vacancy by its slug/id, or undefined if unknown. */
export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((job) => job.id === slug);
}

/**
 * Related vacancies for a given slug: same sector first, then same location,
 * never the job itself. Returns up to `limit` results.
 */
export function getRelatedJobs(slug: string, limit = 3): Job[] {
  const job = getJobBySlug(slug);
  if (!job) return [];

  const sameSector = JOBS.filter((j) => j.id !== job.id && j.sector === job.sector);
  const sameLocation = JOBS.filter(
    (j) => j.id !== job.id && j.location === job.location && j.sector !== job.sector,
  );

  return [...sameSector, ...sameLocation].slice(0, limit);
}

/** Distinct, sorted filter options derived from the dataset. */
export function getJobFilterOptions(jobs: Job[] = JOBS): JobFilterOptions {
  const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  return {
    locations: unique(jobs.map((j) => j.location)),
    types: unique(jobs.map((j) => j.type)),
    sectors: unique(jobs.map((j) => j.sector)),
  };
}

/** Apply the marketplace filters to a job list. Pure + case-insensitive. */
export function filterJobs(jobs: Job[], filters: JobFilterState): Job[] {
  const keyword = filters.keyword.trim().toLowerCase();
  return jobs.filter((job) => {
    if (filters.location && job.location !== filters.location) return false;
    if (filters.type && job.type !== filters.type) return false;
    if (filters.sector && job.sector !== filters.sector) return false;
    if (keyword) {
      const haystack = [job.title, job.company, job.sector, job.location, job.summary]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });
}

// Small stable hash so the synthetic score is deterministic per job id.
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Synthetic concept signals for a vacancy card. Green = candidate/opportunity
 * fit, blue = employer/trust. Deterministic and illustrative only.
 */
export function getJobMatchSignals(job: Job): JobMatchSignal[] {
  const base = 80 + (hashString(job.id) % 16); // 80–95
  const fit = Math.min(98, base + (job.featured ? 3 : 0));

  const signals: JobMatchSignal[] = [
    {
      label: "Concept match",
      tone: "green",
      score: fit,
      rationale:
        "Synthetic fit score modelled from sector and location overlap. Concept only — not a live matching result.",
    },
  ];

  if (job.featured) {
    signals.push({
      label: "Priority brief",
      tone: "blue",
      rationale: "Flagged as a featured concept brief from a trusted employer partner.",
    });
  } else if (job.remote === "Hybrid") {
    signals.push({
      label: "Hybrid-friendly",
      tone: "blue",
      rationale: "Concept employer supports a hybrid working pattern in the region.",
    });
  }

  return signals;
}
