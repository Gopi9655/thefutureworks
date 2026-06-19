// ============================================================
// Shared domain types
// ============================================================

export type SalaryUnit = "year" | "hour";
export type RemoteMode = "Hybrid" | "Office" | "Remote";
export type EmploymentType =
  | "Permanent"
  | "Temporary"
  | "Fixed-term"
  | "Term-time"
  | "Contract"
  | "Part-time";

export interface Job {
  id: string;
  title: string;
  company: string;
  sector: string;
  type: EmploymentType;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: SalaryUnit;
  posted: string;
  featured: boolean;
  summary: string;
  remote: RemoteMode;
  /** Optional static-source label, e.g. "Official website snapshot". */
  sourceLabel?: string;
  /**
   * Optional path to an *approved local* logo asset (e.g. "/logos/acme.svg").
   * Future-ready only — never populate with scraped or remote logos. When
   * absent (the default), cards fall back to a premium category badge.
   */
  logoAsset?: string;
}

export interface Stat {
  num: number;
  label: string;
  sub: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  kind: "employer" | "candidate";
}

export interface Accreditation {
  name: string;
  abbr: string;
  desc: string;
}

export interface Differentiator {
  icon: string;
  title: string;
  body: string;
}

// ---- Form payloads (shared by client form + API routes) ----
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  who: string;
  message: string;
}

export interface ApplicationPayload {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  note?: string;
  cvFileName?: string;
}

export interface ApiResult {
  ok: boolean;
  message: string;
  ref?: string;
}
