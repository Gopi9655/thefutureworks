import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import { Icon } from "./Icon";
import { Orb, Reveal, CountUp } from "./primitives";
import { Button } from "./Button";
import { STATS } from "@/data/content";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import { salaryStr } from "@/data/jobs";
import { getJobCategoryVisual } from "@/lib/platform/jobs";
import type { Job, Testimonial } from "@/lib/types";

// ============================================================
// SECTION HEAD
// ============================================================
export function SectionHead({ eyebrow, title, sub, align = "left", dark = false, max = 640, children }: {
  eyebrow?: ReactNode; title?: ReactNode; sub?: ReactNode; align?: "left" | "center"; dark?: boolean; max?: number; children?: ReactNode;
}) {
  return (
    <div style={{ textAlign: align, maxWidth: max, marginInline: align === "center" ? "auto" : 0 }} className={dark ? "on-dark" : ""}>
      {eyebrow && <Reveal as="span" className={"eyebrow " + (dark ? "on-dark" : "")} style={{ marginBottom: 18 }}>{eyebrow}</Reveal>}
      {title && <Reveal as="h2" d={1} className="h2" style={{ margin: "16px 0 0", color: dark ? "#fff" : "var(--t-ink)" }}>{title}</Reveal>}
      {sub && <Reveal as="p" d={2} className="lead" style={{ margin: "18px 0 0", marginInline: align === "center" ? "auto" : 0 }}>{sub}</Reveal>}
      {children}
    </div>
  );
}

// ============================================================
// JOB CARD
// ============================================================
// Shares the marketplace card's premium visual language: a category badge tile
// (never company initials — those read as fake logos), calm green/blue chips,
// and a "View role" CTA. An approved local logoAsset is used when present; no
// external/remote logos. Used by the homepage featured grid and the job-detail
// "Similar roles" section, so they stay consistent with /vacancies.
export function JobCard({ job, featured }: { job: Job; featured?: boolean }) {
  const visual = getJobCategoryVisual(job);
  const isFeatured = featured ?? job.featured;
  return (
    <Link href={"/jobs/" + job.id} className="jobcard card-hover" style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", gap: 13, alignItems: "center", minWidth: 0 }}>
          {job.logoAsset ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.logoAsset} alt={`${job.company} logo`} className="jobs-logo-tile jobs-logo-img" width={46} height={46} />
          ) : (
            <span className={`jobs-logo-tile jobs-logo-tile-${visual.tone}`} aria-hidden="true">
              <Icon name={visual.icon} size={22} />
            </span>
          )}
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 17.5, fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "-.01em", lineHeight: 1.15 }}>{job.title}</h3>
            <div style={{ fontSize: 13.5, color: "var(--t-ink-mut)", marginTop: 3 }}>{job.company}</div>
          </div>
        </div>
        {isFeatured && (
          <span className="jobs-match-badge" title="Featured concept brief">
            <Icon name="star" size={12} /> Featured
          </span>
        )}
      </div>

      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--t-ink-mut)" }}>{job.summary}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span className={"chip " + (visual.tone === "green" ? "jobs-chip-green" : "jobs-chip-blue")}>
          <Icon name={visual.icon} size={13} /> {visual.label}
        </span>
        <span className="chip"><Icon name="mapPin" size={13} /> {job.location}</span>
        <span className="chip"><Icon name="briefcase" size={13} /> {job.type}</span>
        <span className="chip"><Icon name="layers" size={13} /> {job.remote}</span>
        {job.sourceLabel && <span className="chip"><Icon name="shield" size={13} /> {job.sourceLabel}</span>}
      </div>

      <hr className="hr" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", letterSpacing: "-.01em" }}>{salaryStr(job)}</div>
          <div style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}><Icon name="clock" size={12} /> {job.posted}</div>
        </div>
        <span className="btn btn-outline btn-sm" style={{ pointerEvents: "none" }}>View role <Icon name="arrowRight" size={16} /></span>
      </div>
    </Link>
  );
}

// ============================================================
// STAT BAND
// ============================================================
export function StatBand() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }} className="statband">
      {STATS.map((s, i) => (
        <Reveal key={s.label} d={(i % 5) + 1} style={{ padding: "8px 22px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
          <div className="stat-num" style={{ fontSize: "clamp(30px, 4vw, 48px)", color: "#fff" }}>
            <CountUp end={s.num} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 8, color: "#fff" }}>{s.label}</div>
          <div style={{ fontSize: 13, color: "var(--t-on-dark-dim)", marginTop: 2 }}>{s.sub}</div>
        </Reveal>
      ))}
    </div>
  );
}

// ============================================================
// TESTIMONIAL CARD
// ============================================================
export function TestimonialCard({ t, light = false }: { t: Testimonial; light?: boolean }) {
  return (
    <figure className={light ? "card" : "card-dark"} style={{ margin: 0, padding: 28, display: "flex", flexDirection: "column", gap: 18, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Icon name="quote" size={30} style={{ color: "var(--g-green)" }} />
        <span className={"chip " + (light ? "" : "on-dark")} style={{ textTransform: "capitalize" }}>{t.kind}</span>
      </div>
      <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, fontWeight: 500, color: light ? "var(--t-ink)" : "#fff", flex: 1 }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: light ? "1px solid var(--paper-line)" : "1px solid var(--line)" }}>
        <div style={{ width: 40, height: 40, borderRadius: 50, background: "linear-gradient(135deg, var(--g-green), var(--g-teal))", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)" }}>
          {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: light ? "var(--t-ink)" : "#fff" }}>{t.name}</div>
          <div style={{ fontSize: 13, color: light ? "var(--t-ink-mut)" : "var(--t-on-dark-mut)" }}>{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

// ============================================================
// PAGE HERO (inner pages)
// ============================================================
export function PageHero({ eyebrow, title, sub, children, align = "left" }: {
  eyebrow?: ReactNode; title: ReactNode; sub?: ReactNode; children?: ReactNode; align?: "left" | "center";
}) {
  return (
    <section className="ink-deep grid-tex" style={{ position: "relative", overflow: "hidden", paddingTop: 64, paddingBottom: 72 }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2, maxWidth: align === "center" ? 820 : 1240, textAlign: align }}>
        <Reveal as="div" className="on-dark">
          {eyebrow && <span className="eyebrow on-dark" style={{ marginBottom: 18 }}>{eyebrow}</span>}
          <h1 className="h1" style={{ color: "#fff", margin: "16px 0 0", maxWidth: align === "center" ? "100%" : 880, marginInline: align === "center" ? "auto" : 0 }}>{title}</h1>
          {sub && <p className="lead" style={{ margin: "20px 0 0", maxWidth: 640, marginInline: align === "center" ? "auto" : 0 }}>{sub}</p>}
          {children && <div style={{ marginTop: 30 }}>{children}</div>}
        </Reveal>
      </div>
      <div style={{ position: "absolute", right: -120, top: -80, opacity: 0.5, pointerEvents: "none" }}><Orb size={340} spin /></div>
    </section>
  );
}

// ============================================================
// CTA BAND
// ============================================================
export function CTABand({
  title = "Ready to build the future of work?",
  sub = "Whether you're hiring or job-hunting, talk to a team that knows the region inside out.",
  primary = { label: "Find jobs", to: "/vacancies" },
  secondary = { label: "Hire staff", to: "/employers" },
}: {
  title?: string; sub?: string; primary?: { label: string; to: string }; secondary?: { label: string; to: string };
}) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="ink-deep grid-tex" style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-lg)", padding: "clamp(40px, 6vw, 72px)" }}>
          <div style={{ position: "relative", zIndex: 2, maxWidth: 680 } as CSSProperties} className="on-dark">
            <span className="eyebrow on-dark"><Icon name="sparkles" size={14} /> Let&apos;s talk</span>
            <h2 className="h1" style={{ color: "#fff", margin: "18px 0 0" }}>{title}</h2>
            <p className="lead" style={{ margin: "18px 0 30px" }}>{sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button to={primary.to} variant="light" size="lg" icon="arrowRight">{primary.label}</Button>
              <Button to={secondary.to} variant="ghost" size="lg">{secondary.label}</Button>
            </div>
          </div>
          <div style={{ position: "absolute", right: -60, bottom: -100, opacity: 0.7, pointerEvents: "none" }} className="floaty"><Orb size={300} spin glow /></div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================================
// TRUST STRIP
// ============================================================
export function TrustStrip() {
  const items = OFFICIAL_BUSINESS_FACTS.trustRail;
  return (
    <div className="trust-strip-rail" style={{ borderTop: "1px solid var(--paper-line)", background: "rgba(0,0,0,.03)", padding: "14px 0" }}>
      <div className="wrap">
        <div className="trust-strip-row">
          {items.map((item) => (
            <span key={item.label} className="trust-item">
              <span className={`trust-icon trust-icon-${item.tone}`} aria-hidden="true">
                <Icon name={item.icon} size={12.5} stroke={2.1} />
              </span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BREADCRUMB
// ============================================================
export function Crumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--t-on-dark-mut)", marginBottom: 4 }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <Icon name="chevronRight" size={13} style={{ opacity: 0.5 }} />}
          {it.to ? <Link href={it.to} className="footer-link">{it.label}</Link> : <span style={{ color: "#fff" }}>{it.label}</span>}
        </span>
      ))}
    </div>
  );
}
