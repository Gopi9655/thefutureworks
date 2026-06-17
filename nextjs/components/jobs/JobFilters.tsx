"use client";

import { Icon } from "@/components/Icon";
import type { JobFilterOptions, JobFilterState } from "@/lib/platform/jobs";

// ============================================================
// Phase 4A — marketplace filter bar
// Controlled, accessible filters: keyword, location, contract type,
// department/sector, plus a reset action. No client data fetching.
// ============================================================
export interface JobFiltersProps {
  filters: JobFilterState;
  options: JobFilterOptions;
  resultCount: number;
  totalCount: number;
  onChange: (next: JobFilterState) => void;
  onReset: () => void;
}

export function JobFilters({ filters, options, resultCount, totalCount, onChange, onReset }: JobFiltersProps) {
  const isFiltered =
    filters.keyword.trim() !== "" || filters.location !== "" || filters.type !== "" || filters.sector !== "";

  return (
    <div className="jobs-filters platform-panel" role="search" aria-label="Filter vacancies">
      <div className="jobs-filters-grid">
        <div className="jobs-field jobs-field-keyword">
          <label className="field-label" htmlFor="job-keyword">Keyword</label>
          <div className="jobs-search-wrap">
            <Icon name="search" size={16} />
            <input
              id="job-keyword"
              type="search"
              className="field jobs-search-input"
              placeholder="Role, company or skill"
              value={filters.keyword}
              onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
            />
          </div>
        </div>

        <div className="jobs-field">
          <label className="field-label" htmlFor="job-location">Location</label>
          <select
            id="job-location"
            className="field"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
          >
            <option value="">All locations</option>
            {options.locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="jobs-field">
          <label className="field-label" htmlFor="job-type">Contract type</label>
          <select
            id="job-type"
            className="field"
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
          >
            <option value="">All types</option>
            {options.types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="jobs-field">
          <label className="field-label" htmlFor="job-sector">Department</label>
          <select
            id="job-sector"
            className="field"
            value={filters.sector}
            onChange={(e) => onChange({ ...filters, sector: e.target.value })}
          >
            <option value="">All departments</option>
            {options.sectors.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="jobs-filters-foot">
        <p className="t-mut jobs-result-count" aria-live="polite" style={{ margin: 0, fontSize: 14 }}>
          Showing <strong>{resultCount}</strong> of {totalCount} concept roles
        </p>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onReset}
          disabled={!isFiltered}
          aria-disabled={!isFiltered}
        >
          <Icon name="x" size={15} /> Reset filters
        </button>
      </div>
    </div>
  );
}

export default JobFilters;
