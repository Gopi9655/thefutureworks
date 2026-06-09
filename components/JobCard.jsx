/* JobCard — single job listing card */
function JobCard({ job, featured }) {
  return (
    <a href={"#/job/" + job.id} className="jobcard card-hover" style={{ textDecoration: "none", color: "inherit" }}
      aria-label={job.title + " at " + job.company + ", " + salaryStr(job)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center", minWidth: 0 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, flex: "0 0 auto", background: "linear-gradient(135deg, var(--ink-700), var(--ink-800))", display: "grid", placeItems: "center" }} aria-hidden="true">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#fff", fontSize: 17 }}>{job.company.split(" ").map(function(w){return w[0];}).slice(0, 2).join("")}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 17.5, fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-.01em", lineHeight: 1.15 }}>{job.title}</h3>
            <div style={{ fontSize: 13.5, color: "var(--t-ink-mut)", marginTop: 3 }}>{job.company}</div>
          </div>
        </div>
        {(featured || job.featured) && <span className="chip chip-red" style={{ flex: "0 0 auto" }}><Icon name="star" size={12} /> Featured</span>}
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--t-ink-mut)" }}>{job.summary}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span className="chip"><Icon name="mapPin" size={13} /> {job.location}</span>
        <span className="chip"><Icon name="briefcase" size={13} /> {job.type}</span>
        <span className="chip"><Icon name="layers" size={13} /> {job.remote}</span>
      </div>
      <hr className="hr" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-.01em" }}>{salaryStr(job)}</div>
          <div style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}><Icon name="clock" size={12} /> {job.posted}</div>
        </div>
        <span className="btn btn-outline btn-sm" aria-hidden="true" tabIndex={-1}>Quick apply <Icon name="arrowRight" size={16} /></span>
      </div>
    </a>
  );
}
Object.assign(window, { JobCard });
