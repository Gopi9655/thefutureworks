import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Orb, Reveal } from "@/components/primitives";
import { JobCard, Crumb } from "@/components/sections";
import { JobAside } from "@/components/JobAside";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { JOBS, getJob } from "@/data/jobs";
import { getJobCategoryVisual } from "@/lib/platform/jobs";

const RESPONSIBILITIES = [
  "Deliver consistently high standards aligned to the team's KPIs and quality benchmarks.",
  "Work collaboratively across shifts, supporting colleagues and new starters.",
  "Follow health, safety and compliance procedures to the letter.",
  "Identify and suggest improvements to ways of working.",
];

const REQUIREMENTS = [
  "Relevant experience in a comparable role or sector.",
  "Right to work in the UK and references covering recent employment.",
  "A reliable, positive approach and strong communication.",
  "Flexibility to support the shift pattern described.",
];

const BENEFITS = ["Competitive salary", "Pension scheme", "Ongoing training", "Career progression", "Supportive team", "Coventry University-owned employer"];

export function JobDetailPage({ jobId }: { jobId: string }) {
  const job = getJob(jobId);
  if (!job) notFound();
  const similar = JOBS.filter((j) => j.sector === job.sector && j.id !== job.id).slice(0, 3);
  const visual = getJobCategoryVisual(job);

  return (
    <>
      <section className="ink-deep grid-tex" style={{ position: "relative", overflow: "hidden", paddingTop: 52, paddingBottom: 40 }}>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <Crumb items={[{ label: "Home", to: "/" }, { label: "Vacancies", to: "/vacancies" }, { label: job.title }]} />
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 18, flexWrap: "wrap" }}>
            {job.logoAsset ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.logoAsset}
                alt={`${job.company} logo`}
                className="jobs-logo-tile jobs-logo-img"
                style={{ width: 64, height: 64, borderRadius: 16 }}
                width={64}
                height={64}
              />
            ) : (
              <span
                className={`jobs-logo-tile jobs-logo-tile-${visual.tone}`}
                style={{ width: 64, height: 64, borderRadius: 16, flex: "0 0 auto" }}
                aria-hidden="true"
              >
                <Icon name={visual.icon} size={30} />
              </span>
            )}
            <div className="on-dark" style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <span className="jobs-hero-badge jobs-hero-badge-cat">
                  <Icon name={visual.icon} size={13} /> {visual.category}
                </span>
                {job.featured && (
                  <span className="jobs-hero-badge jobs-hero-badge-featured">
                    <Icon name="star" size={12} /> Featured role
                  </span>
                )}
              </div>
              <h1 className="h1" style={{ color: "#fff", margin: "8px 0 0", fontSize: "clamp(30px,4vw,46px)" }}>{job.title}</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 14, color: "var(--t-on-dark-mut)", fontSize: 15 }}>
                <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Icon name="building" size={16} /> {job.company}</span>
                <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Icon name="mapPin" size={16} /> {job.location}</span>
                <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Icon name="briefcase" size={16} /> {job.type}</span>
                <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}><Icon name="clock" size={16} /> {job.posted}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper section" style={{ paddingTop: 48 }}>
        <div className="wrap job-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 40, alignItems: "start" }}>
          <div className="job-main">
            <Reveal>
              <h2 className="h3" style={{ marginTop: 0 }}>About the role</h2>
              <p className="lead" style={{ fontSize: 17, marginTop: 12 }}>{job.summary} This is a fantastic opportunity to join {job.company}, a valued partner of thefutureworks, in a role that genuinely matters to the business and the region.</p>
            </Reveal>

            {([["Key responsibilities", RESPONSIBILITIES, "checkCircle"], ["What we're looking for", REQUIREMENTS, "check"]] as [string, string[], string][]).map(([t, list, ic]) => (
              <Reveal key={t} style={{ marginTop: 34 }}>
                <h3 className="h3">{t}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                  {list.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <Icon name={ic} size={20} stroke={2} style={{ color: "var(--red-500)", flex: "0 0 auto", marginTop: 1 }} />
                      <span style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--t-ink-mut)" }}>{r}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal style={{ marginTop: 34 }}>
              <h3 className="h3">Benefits</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
                {BENEFITS.map((b) => <span key={b} className="chip"><Icon name="check" size={13} style={{ color: "var(--g-green)" }} /> {b}</span>)}
              </div>
            </Reveal>

            <Reveal className="card" style={{ marginTop: 34, padding: 24, display: "flex", gap: 16, alignItems: "center", background: "var(--paper-2)" }}>
              <Orb size={48} />
              <div>
                <div style={{ fontWeight: 700 }}>Placed and supported by thefutureworks</div>
                <div className="t-mut" style={{ fontSize: 14, marginTop: 3 }}>A Coventry University Group company. REC &amp; BIOR accredited.</div>
              </div>
            </Reveal>

            <ApplyForm job={job} />
          </div>

          <JobAside job={job} />
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-paper-2 section">
          <div className="wrap">
            <h2 className="h2" style={{ marginBottom: 28 }}>Similar roles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
              {similar.map((j, i) => <Reveal key={j.id} d={(i % 3) + 1}><JobCard job={j} /></Reveal>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default JobDetailPage;
