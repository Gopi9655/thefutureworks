import Link from "next/link";
import { Icon } from "@/components/Icon";
import { salaryStr } from "@/data/jobs";
import { getJobMatchSignals } from "@/lib/platform/jobs";
import type { Job } from "@/lib/types";

// ============================================================
// Phase 4A — marketplace job card
// Reuses the existing .jobcard / .chip visual language and adds a
// synthetic concept match signal. Pure, server-renderable.
// ============================================================
export function JobCard({ job }: { job: Job }) {
  const signals = getJobMatchSignals(job);
  const match = signals.find((s) => typeof s.score === "number");

  return (
    <Link
      href={"/jobs/" + job.id}
      className="jobcard card-hover"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center", minWidth: 0 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              flex: "0 0 auto",
              background: "linear-gradient(135deg, var(--ink-700), var(--ink-800))",
              display: "grid",
              placeItems: "center",
            }}
            aria-hidden="true"
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#fff", fontSize: 17 }}>
              {job.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 17.5, fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-.01em", lineHeight: 1.15 }}>
              {job.title}
            </h3>
            <div style={{ fontSize: 13.5, color: "var(--t-ink-mut)", marginTop: 3 }}>{job.company}</div>
          </div>
        </div>
        {match && (
          <span className="jobs-match-badge" title={match.rationale}>
            <Icon name="target" size={12} /> {match.score}%
          </span>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--t-ink-mut)" }}>{job.summary}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span className="chip"><Icon name="mapPin" size={13} /> {job.location}</span>
        <span className="chip"><Icon name="briefcase" size={13} /> {job.type}</span>
        <span className="chip"><Icon name="layers" size={13} /> {job.remote}</span>
        {signals
          .filter((s) => typeof s.score !== "number")
          .map((s) => (
            <span key={s.label} className={"chip " + (s.tone === "green" ? "jobs-chip-green" : "jobs-chip-blue")}>
              <Icon name="sparkles" size={12} /> {s.label}
            </span>
          ))}
      </div>

      <hr className="hr" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-.01em" }}>
            {salaryStr(job)}
          </div>
          <div style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="clock" size={12} /> {job.posted}
          </div>
        </div>
        <span className="btn btn-outline btn-sm" style={{ pointerEvents: "none" }}>
          View role <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </Link>
  );
}

export default JobCard;
