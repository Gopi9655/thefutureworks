"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { JobCard } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { EMPTY_JOB_FILTERS, filterJobs, type JobFilterOptions, type JobFilterState } from "@/lib/platform/jobs";
import type { Job } from "@/lib/types";

// ============================================================
// Phase 4A — jobs marketplace (client orchestration)
// Holds filter state, derives the visible list, and renders the
// filter bar, result grid and empty state. All data is static and
// passed in from the server page — no fetching here.
// ============================================================
export interface JobsMarketplaceProps {
  jobs: Job[];
  options: JobFilterOptions;
}

export function JobsMarketplace({ jobs, options }: JobsMarketplaceProps) {
  const [filters, setFilters] = useState<JobFilterState>(EMPTY_JOB_FILTERS);

  const visible = useMemo(() => filterJobs(jobs, filters), [jobs, filters]);
  const reset = () => setFilters(EMPTY_JOB_FILTERS);

  return (
    <div className="jobs-marketplace">
      <JobFilters
        filters={filters}
        options={options}
        resultCount={visible.length}
        totalCount={jobs.length}
        onChange={setFilters}
        onReset={reset}
      />

      {visible.length > 0 ? (
        <div className="jobs-grid" style={{ marginTop: 28 }}>
          {visible.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="jobs-empty platform-panel" role="status" style={{ marginTop: 28 }}>
          <span className="jobs-empty-icon" aria-hidden="true">
            <Icon name="search" size={26} />
          </span>
          <h3 style={{ margin: "16px 0 0", fontFamily: "var(--font-display)", fontSize: 22 }}>
            No roles match those filters
          </h3>
          <p className="t-mut" style={{ margin: "10px auto 0", maxWidth: 420, fontSize: 15 }}>
            Try a broader keyword or clear a filter to see more concept vacancies.
          </p>
          <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 20 }} onClick={reset}>
            <Icon name="x" size={15} /> Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

export default JobsMarketplace;
