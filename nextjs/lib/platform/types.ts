export type PlatformPriority = "low" | "standard" | "urgent";
export type PlatformWorkMode = "On-site" | "Hybrid" | "Remote";
export type PlatformSeniority = "Entry" | "Mid" | "Senior" | "Specialist";
export type PlatformEmploymentType = "Permanent" | "Temporary" | "Contract" | "Part-time";
export type EmployerRequestStatus = "intake" | "shortlisting" | "interviewing" | "filled";
export type JobRecordStatus = "concept" | "draft" | "active" | "paused";
export type MatchSignalKind = "skill" | "availability" | "sector" | "location" | "compliance";
export type DashboardMetricTone = "green" | "blue" | "orange" | "red" | "neutral";

export interface CandidateProfile {
  id: string;
  displayName: string;
  roleTarget: string;
  location: string;
  sectors: string[];
  skills: string[];
  availability: string;
  workMode: PlatformWorkMode;
  seniority: PlatformSeniority;
  matchScore: number;
  summary: string;
}

export interface EmployerRequest {
  id: string;
  employerName: string;
  sector: string;
  location: string;
  rolesNeeded: string[];
  contractType: PlatformEmploymentType;
  priority: PlatformPriority;
  status: EmployerRequestStatus;
  targetStart: string;
  notes: string;
}

export interface JobRecord {
  id: string;
  employerId: string;
  title: string;
  sector: string;
  location: string;
  type: PlatformEmploymentType;
  workMode: PlatformWorkMode;
  salaryBand: string;
  status: JobRecordStatus;
  signalIds: string[];
}

export interface MatchSignal {
  id: string;
  candidateId: string;
  jobId: string;
  kind: MatchSignalKind;
  label: string;
  strength: number;
  rationale: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: DashboardMetricTone;
  description: string;
}
