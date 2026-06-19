import "./home-hero.css";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal, CountUp } from "@/components/primitives";
import { Button } from "@/components/Button";
import { NetworkMapBg } from "@/components/NetworkMap";
import { TestimonialCard, CTABand, TrustStrip, SectionHead } from "@/components/sections";
import { HomeMatchingHero } from "@/components/home/HomeMatchingHero";
import { SplitJourney } from "@/components/home/SplitJourney";
import { RegionSection } from "@/components/home/RegionSection";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import { JOBS, salaryStr } from "@/data/jobs";
import { STATS, TESTIMONIALS, DIFFERENTIATORS } from "@/data/content";
import type { Job } from "@/lib/types";

const STAT_META = [
  { icon: "briefcase", color: "var(--g-green)", bg: "rgba(95,168,42,0.14)" },
  { icon: "users", color: "var(--g-green)", bg: "rgba(95,168,42,0.14)" },
  { icon: "building", color: "var(--g-blue)", bg: "rgba(30,111,184,0.14)" },
  { icon: "heart", color: "var(--g-orange)", bg: "rgba(240,138,36,0.14)" },
  { icon: "sparkles", color: "var(--g-teal)", bg: "rgba(26,163,154,0.14)" },
];

function HomeVacancySnapshotCard({ job }: { job: Job }) {
  const employerKnown = job.company && job.company !== OFFICIAL_BUSINESS_FACTS.vacancySnapshot.employerDisplay;

  return (
    <Link href={"/jobs/" + job.id} className="home-vacancy-card">
      <div className="home-vacancy-card-main">
        <div>
          <h3>{job.title}</h3>
          {employerKnown && <p className="home-vacancy-employer">{job.company}</p>}
        </div>
        <div className="home-vacancy-pills" aria-label="Role details">
          <span><Icon name="mapPin" size={13} /> {job.location}</span>
          <span><Icon name="briefcase" size={13} /> {job.type}</span>
          <span><Icon name="layers" size={13} /> {job.remote}</span>
        </div>
      </div>
      <div className="home-vacancy-foot">
        <strong>{salaryStr(job)}</strong>
        <span className="home-vacancy-cta">View role <Icon name="arrowRight" size={15} /></span>
      </div>
    </Link>
  );
}

function HomeHero() {
  return (
    <section className="hero-light" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <HomeMatchingHero />
      </div>
      <TrustStrip />
    </section>
  );
}

function GlassStatsSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(175deg,#ebf2ff 0%,#edf8ee 100%)", paddingBlock: "clamp(48px,7vw,96px)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
        <NetworkMapBg />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <span className="eyebrow"><Icon name="chart" size={14} /> By the numbers</span>
            <h2 className="h3" style={{ color: "var(--t-ink)", margin: "10px 0 0" }}>A track record the region trusts</h2>
          </div>
          <Button to="/about" variant="outline" size="sm" icon="arrowRight">Official facts</Button>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="statband">
          {STATS.map((s, i) => {
            const m = STAT_META[i];
            return (
              <Reveal key={s.label} d={(i % 5) + 1} className="stat-card-light" style={{ padding: "clamp(16px,2.2vw,28px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 11, background: m.bg, flexShrink: 0 }}>
                    <Icon name={m.icon} size={18} style={{ color: m.color }} />
                  </span>
                  <span className="stat-dot" style={{ color: m.color, marginTop: 6, background: m.color }} />
                </div>
                <div className="glass-stat-num" style={{ fontSize: "clamp(26px,3.2vw,44px)" }}>
                  <CountUp end={s.num} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8, color: "var(--t-ink)" }}>{s.label}</div>
                <div style={{ fontSize: 12.5, color: "var(--t-ink-mut)", marginTop: 3 }}>{s.sub}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LatestJobs() {
  const jobs = JOBS.slice(0, 6);
  return (
    <section className="bg-paper section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <SectionHead
            eyebrow={<><Icon name="briefcase" size={14} /> Current opportunities</>}
            title="Current vacancies snapshot"
            sub="A curated snapshot of current opportunities based on publicly available official listings."
            max={560}
          />
          <Button to="/vacancies" variant="outline" icon="arrowRight">View all vacancies</Button>
        </div>
        <div className="home-vacancy-grid">
          {jobs.map((j, i) => <Reveal key={j.id} d={(i % 3) + 1}><HomeVacancySnapshotCard job={j} /></Reveal>)}
        </div>
        <p className="home-vacancy-note">Static snapshot only; listings can change on the official website.</p>
      </div>
    </section>
  );
}

function WhyDifferent() {
  return (
    <section className="bg-paper-3 section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <SectionHead align="center" eyebrow={<><Icon name="sparkles" size={14} /> Why thefutureworks</>} title="Recruitment with a difference" sub="A commercial recruitment agency owned by Coventry University, based in Coventry and established in 2005." max={640} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 48 }} className="cards-3">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} d={(i % 3) + 1} className="card card-hover" style={{ padding: 28 }}>
              <span style={{ display: "grid", placeItems: "center", width: 50, height: 50, borderRadius: 14, background: "rgba(95,168,42,0.10)", border: "1px solid rgba(95,168,42,0.20)" }}>
                <Icon name={d.icon} size={24} style={{ color: "var(--g-green)" }} />
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18.5, color: "var(--t-ink)", margin: "18px 0 0", letterSpacing: "-.01em" }}>{d.title}</h3>
              <p style={{ color: "var(--t-ink-mut)", margin: "9px 0 0", fontSize: 14.5, lineHeight: 1.55 }}>{d.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const items = TESTIMONIALS.slice(0, 3);
  return (
    <section className="bg-paper section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 38 }}>
          <SectionHead eyebrow={<><Icon name="quote" size={14} /> Testimonials</>} title="People at the heart of it" max={460} />
          <Button to="/about" variant="outline" icon="arrowRight">Read more stories</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
          {items.map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <GlassStatsSection />
      <LatestJobs />
      <SplitJourney />
      <RegionSection />
      <WhyDifferent />
      <TestimonialsPreview />
      <CTABand />
    </>
  );
}
