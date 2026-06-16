import { Icon } from "@/components/Icon";
import { Orb, Reveal, CountUp } from "@/components/primitives";
import { Button } from "@/components/Button";
import { HeroScene, MobileHeroScene } from "@/components/HeroScene";
import { NetworkMapBg } from "@/components/NetworkMap";
import { JobCard, TestimonialCard, CTABand, TrustStrip, SectionHead } from "@/components/sections";
import { SplitJourney } from "@/components/home/SplitJourney";
import { RegionSection } from "@/components/home/RegionSection";
import { JOBS } from "@/data/jobs";
import { STATS, TESTIMONIALS, DIFFERENTIATORS } from "@/data/content";

const STAT_META = [
  { icon: "briefcase", color: "var(--g-green)", bg: "rgba(95,168,42,0.14)" },
  { icon: "users", color: "var(--g-green)", bg: "rgba(95,168,42,0.14)" },
  { icon: "building", color: "var(--g-blue)", bg: "rgba(30,111,184,0.14)" },
  { icon: "heart", color: "var(--g-orange)", bg: "rgba(240,138,36,0.14)" },
  { icon: "sparkles", color: "var(--g-teal)", bg: "rgba(26,163,154,0.14)" },
];

function HomeHero() {
  return (
    <section className="hero-light" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)", gap: 40, alignItems: "center", minHeight: "min(56vh, 540px)", paddingBlock: "18px 26px" }} className="home-hero-grid">
          <div style={{ minWidth: 0 }}>
            <Reveal as="span" className="chip" style={{ marginBottom: 14 }}>
              <Orb size={16} /> Coventry University-owned · Established 2005
            </Reveal>
            <Reveal as="h1" d={1} style={{ color: "var(--ink-800)", margin: "12px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(34px, 4.6vw, 54px)", lineHeight: 1.06, letterSpacing: "-0.025em" }}>
              Find work. Hire talent.<br />
              <span style={{ color: "var(--g-green)" }}>Build Coventry&apos;s future.</span>
            </Reveal>
            <Reveal as="p" d={2} className="lead" style={{ margin: "16px 0 0", maxWidth: 480 }}>
              Coventry University-owned recruitment support for candidates, graduates and employers across Coventry, Warwickshire and the West Midlands.
            </Reveal>
            <Reveal d={3} className="hero-cta-row">
              <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">Find jobs</Button>
              <Button to="/employers" variant="ghost-blue" size="lg" iconLeft="building">Hire staff</Button>
              <Button to="/apply" variant="outline" size="lg" iconLeft="send">Submit CV</Button>
            </Reveal>
            <Reveal d={4} style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 50, background: "rgba(95,168,42,.16)" }}>
                  <Icon name="check" size={14} stroke={2.4} style={{ color: "var(--g-green)" }} />
                </span>
                <span style={{ fontSize: 13, color: "var(--t-ink-mut)" }}>8,196 candidates registered</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 50, background: "rgba(30,111,184,.16)" }}>
                  <Icon name="shield" size={14} style={{ color: "var(--g-blue)" }} />
                </span>
                <span style={{ fontSize: 13, color: "var(--t-ink-mut)" }}>Employer advice is always free</span>
              </div>
            </Reveal>
          </div>
          <div className="home-hero-scene hero-scene-desktop" style={{ position: "relative", height: "min(54vh, 480px)", minHeight: 400, borderRadius: "var(--radius-lg)", border: "1px solid var(--platform-line)", overflow: "hidden", boxShadow: "var(--platform-shadow), 0 1px 0 rgba(255,255,255,0.7) inset" }}>
            <HeroScene />
          </div>
        </div>
        <div className="hero-scene-mobile">
          <MobileHeroScene />
        </div>
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
          <Button to="/about" variant="outline" size="sm" icon="arrowRight">Our story</Button>
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
          <SectionHead eyebrow={<><Icon name="briefcase" size={14} /> Live opportunities</>} title="Latest vacancies" sub="Fresh roles across the West Midlands, updated daily by our consultants." max={520} />
          <Button to="/vacancies" variant="outline" icon="arrowRight">View all vacancies</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
          {jobs.map((j, i) => <Reveal key={j.id} d={(i % 3) + 1}><JobCard job={j} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function WhyDifferent() {
  return (
    <section className="bg-paper-3 section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <SectionHead align="center" eyebrow={<><Icon name="sparkles" size={14} /> Why thefutureworks</>} title="Recruitment with a difference" sub="Not just another agency — a values-led part of Coventry University Group, built to give back to the region since 2005." max={640} />
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
