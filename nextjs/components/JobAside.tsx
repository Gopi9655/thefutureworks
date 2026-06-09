"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./primitives";
import { salaryStr } from "@/data/jobs";
import type { Job } from "@/lib/types";

export function JobAside({ job }: { job: Job }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const focusApply = () => document.getElementById("apply-name")?.focus();
  const share = () => {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: job.title, url }).catch(() => {}); return; }
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };

  const rows: [string, string, string][] = [
    ["mapPin", "Location", job.location],
    ["layers", "Working pattern", job.remote],
    ["briefcase", "Sector", job.sector],
    ["clock", "Posted", job.posted],
  ];

  return (
    <aside className="job-aside" style={{ position: "sticky", top: 92 }}>
      <Reveal className="card" style={{ padding: 24 }}>
        <div className="stat-num" style={{ fontSize: 30, color: "var(--ink-900)" }}>{salaryStr(job)}</div>
        <div className="t-mut" style={{ fontSize: 13.5, marginTop: 2 }}>{job.salaryUnit === "hour" ? "per hour" : "per annum"} · {job.type}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "20px 0", paddingBlock: 18, borderBlock: "1px solid var(--paper-line)" }}>
          {rows.map(([ic, k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}>
              <span style={{ display: "inline-flex", gap: 8, alignItems: "center", color: "var(--t-ink-dim)" }}><Icon name={ic} size={15} /> {k}</span>
              <span style={{ fontWeight: 600, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={focusApply}>
          Quick apply <Icon name="arrowRight" size={18} />
        </button>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => setSaved(!saved)} aria-pressed={saved}>
            <Icon name="heart" size={16} style={{ color: saved ? "var(--red-500)" : "inherit" }} /> {saved ? "Saved" : "Save"}
          </button>
          <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={share} aria-label="Share this job">
            <Icon name={copied ? "check" : "external"} size={16} /> {copied ? "Copied" : "Share"}
          </button>
        </div>
      </Reveal>
    </aside>
  );
}

export default JobAside;
