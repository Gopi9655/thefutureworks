/* global React, Icon, Orb, Reveal, Btn, HeroScene, MobileHeroScene, useTfw, JobCard, TestimonialCard, CTABand, TrustStrip, JOBS, TESTIMONIALS, DIFFERENTIATORS, SectionHead, CountUp, STATS, NetworkMapBg */
const { useState: useHS } = React;

/* ============================================================
   HERO
   ============================================================ */
function HomeHero() {
  const t = useTfw ? useTfw() : { heroMetaphor: "converge" };
  return (
    <section className="hero-light" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)", gap: 40, alignItems: "center", minHeight: "min(56vh, 540px)", paddingBlock: "18px 26px" }} className="home-hero-grid">
          {/* Left — text + CTAs */}
          <div style={{ minWidth: 0 }}>
            <Reveal as="span" className="chip" style={{ marginBottom: 14 }}>
              <Orb size={16} /> Coventry University-owned · Established 2005
            </Reveal>
            <Reveal as="h1" d="1" style={{ color: "var(--ink-800)", margin: "12px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(40px, 10.5vw, 70px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}>
              Find work. Hire talent.<br />
              <span style={{ color: "var(--g-green)" }}>Build Coventry's future.</span>
            </Reveal>
            <Reveal as="p" d="2" className="lead" style={{ margin: "16px 0 0", maxWidth: 480 }}>
              Coventry University-owned recruitment support for candidates, graduates and employers across Coventry, Warwickshire and the West Midlands.
            </Reveal>
            <Reveal d="3" className="hero-cta-row">
              <Btn to="/vacancies" variant="primary" size="lg" icon="arrowRight">Find jobs</Btn>
              <Btn to="/employers" variant="ghost-blue" size="lg" iconLeft="building">Hire staff</Btn>
              <Btn to="/candidates" variant="outline" size="lg" iconLeft="send">Submit CV</Btn>
            </Reveal>
            <Reveal d="4" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
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
          {/* Right — full 3D scene, desktop only */}
          <div className="home-hero-scene hero-scene-desktop" style={{ position: "relative", height: "min(54vh, 480px)", minHeight: 400, borderRadius: "var(--radius-lg)", background: "linear-gradient(160deg, rgba(8,14,38,0.04) 0%, rgba(8,14,38,0.09) 100%)", border: "1px solid rgba(30,111,184,0.10)", overflow: "hidden" }}>
            <HeroScene metaphor={t.heroMetaphor} />
          </div>
        </div>
        {/* Mobile-only compact matching visual — below text, no absolute positioning */}
        <div className="hero-scene-mobile">
          <MobileHeroScene />
        </div>
      </div>
      <TrustStrip />
    </section>
  );
}

/* ============================================================
   GLASS STATS
   ============================================================ */
const STAT_META = [
  { icon: "briefcase",  color: "var(--g-green)",   bg: "rgba(95,168,42,0.14)"  },
  { icon: "users",      color: "var(--g-green)",     bg: "rgba(95,168,42,0.14)"  },
  { icon: "building",   color: "var(--g-blue)",      bg: "rgba(30,111,184,0.14)" },
  { icon: "heart",      color: "var(--g-orange)",    bg: "rgba(240,138,36,0.14)" },
  { icon: "sparkles",   color: "var(--g-teal)",      bg: "rgba(26,163,154,0.14)" },
];

function GlassStatsSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(175deg,#ebf2ff 0%,#edf8ee 100%)", paddingBlock: "clamp(48px,7vw,96px)" }}>
      {/* WM map as background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
        <NetworkMapBg />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div>
            <span className="eyebrow"><Icon name="chart" size={14} /> By the numbers</span>
            <h2 className="h3" style={{ color: "var(--t-ink)", margin: "10px 0 0" }}>A track record the region trusts</h2>
          </div>
          <Btn to="/about" variant="outline" size="sm" icon="arrowRight">Our story</Btn>
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
                  <span className="stat-dot" style={{ color: m.color, marginTop: 6 }}></span>
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

/* ============================================================
   LATEST JOBS
   ============================================================ */
function LatestJobs() {
  const jobs = JOBS.slice(0, 6);
  return (
    <section className="bg-paper section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <SectionHead eyebrow={<><Icon name="briefcase" size={14} /> Live opportunities</>} title="Latest vacancies" sub="Fresh roles across the West Midlands, updated daily by our consultants." max={520} />
          <Btn to="/vacancies" variant="outline" icon="arrowRight">View all vacancies</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
          {jobs.map((j, i) => <Reveal key={j.id} d={(i % 3) + 1}><JobCard job={j} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SPLIT JOURNEY — interactive tab toggle
   ============================================================ */
const JOURNEYS = {
  candidate: {
    icon: "users",
    bg: "linear-gradient(135deg, #0a2218, #1AA39A)",
    title: "Looking for a job?",
    sub: "From first conversation to first day — guidance, honesty and opportunities that fit.",
    steps: [
      { t: "Register & share your goals", d: "Email your CV or call 02476 158815. You don't have to be a student.", icon: "send" },
      { t: "Get matched to real roles",   d: "Hand-picked vacancies that fit your skills and salary expectations.",   icon: "target" },
      { t: "Interview with us first",     d: "We brief you, prep you and present you at your best to every client.", icon: "compass" },
      { t: "Placed & supported",          d: "CV advice, interview prep and honest market-salary guidance throughout.", icon: "checkCircle" },
    ],
    cta:  { label: "Find jobs",    to: "/vacancies" },
    cta2: { label: "How it works", to: "/candidate-how" },
  },
  employer: {
    icon: "building",
    bg: "linear-gradient(135deg, #0e1d3a, var(--g-blue))",
    title: "Looking for staff?",
    sub: "Permanent, temporary and part-time staffing across the region. Our advice is always free.",
    steps: [
      { t: "Brief us once, properly",     d: "We map the role, culture and requirements in full — no cut-and-paste.", icon: "doc"       },
      { t: "We search & assess",          d: "Rigorous candidate selection from our deep local talent database.",      icon: "target"    },
      { t: "Receive a vetted shortlist",  d: "Reference-checked, interview-ready — no speculative CV bundles.",         icon: "layers"    },
      { t: "Success-fee, guaranteed",     d: "Permanent placements on a success-fee basis, with a guarantee period.",  icon: "shield"    },
    ],
    cta:  { label: "Hire staff",   to: "/employers" },
    cta2: { label: "Our process",  to: "/employer-how" },
  },
};

function SplitJourney() {
  const [active, setActive] = useHS("candidate");
  const j = JOURNEYS[active];
  return (
    <section className="bg-paper-2 section">
      <div className="wrap">
        <SectionHead align="center" eyebrow={<><Icon name="compass" size={14} /> Two ways we help</>} title="Whichever side of the desk you're on" sub="One team, helping with long and short-term temporary assignments and permanent recruitment." max={620} />

        {/* toggle */}
        <div style={{ display: "flex", gap: 10, marginTop: 34, maxWidth: 500, marginInline: "auto" }}>
          {[["candidate","users","I'm looking for a job"], ["employer","building","I need to hire staff"]].map(([k, ic, label]) => (
            <button key={k} className={"split-tab" + (active === k ? " active" : "")} onClick={() => setActive(k)}>
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: active === k ? (k === "candidate" ? "rgba(95,168,42,0.12)" : "rgba(30,111,184,0.12)") : "var(--paper-3)" }}>
                  <Icon name={ic} size={17} style={{ color: active === k ? (k === "candidate" ? "var(--g-green)" : "var(--g-blue)") : "var(--t-ink-dim)" }} />
                </span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: active === k ? "var(--t-ink)" : "var(--t-ink-mut)" }}>{label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* animated content panel */}
        <div key={active} className="card slide-in-panel" style={{ marginTop: 18, padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr" }} className="cards-2">
            {/* coloured header */}
            <div style={{ background: j.bg, padding: "clamp(26px,3vw,44px)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -30, top: -30, opacity: .22 }}><Orb size={168} spin /></div>
              <div style={{ position: "relative" }}>
                <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 15, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,.22)", marginBottom: 20 }}>
                  <Icon name={j.icon} size={26} style={{ color: "#fff" }} />
                </span>
                <h3 className="h3" style={{ color: "#fff", margin: "0 0 10px" }}>{j.title}</h3>
                <p style={{ color: "rgba(255,255,255,.80)", margin: 0, fontSize: 15.5, lineHeight: 1.55, maxWidth: 340 }}>{j.sub}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn to={j.cta.to} variant="light" icon="arrowRight">{j.cta.label}</Btn>
                <Btn to={j.cta2.to} variant="ghost">{j.cta2.label}</Btn>
              </div>
            </div>
            {/* steps */}
            <div style={{ padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 0 }}>
              {j.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < j.steps.length - 1 ? 24 : 0, position: "relative" }}>
                  {i < j.steps.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 42, width: 2, bottom: 0, background: "linear-gradient(var(--paper-line), transparent)" }}></div>
                  )}
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: active === "candidate" ? "rgba(95,168,42,0.09)" : "rgba(30,111,184,0.09)", border: active === "candidate" ? "1px solid rgba(95,168,42,0.18)" : "1px solid rgba(30,111,184,0.18)", zIndex: 1 }}>
                    <Icon name={s.icon} size={19} style={{ color: active === "candidate" ? "var(--g-green)" : "var(--g-blue)" }} />
                  </span>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{s.t}</div>
                    <div className="t-mut" style={{ fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   REGION SECTION — WM network map
   ============================================================ */
const REGION_CITIES = [
  { name: "Coventry",        jobs: "1,240+", x: "57%", y: "51%", main: true  },
  { name: "Birmingham",      jobs: "320+",   x: "20%", y: "36%", main: false },
  { name: "Nuneaton",        jobs: "184",    x: "72%", y: "23%", main: false },
  { name: "Warwick",         jobs: "156",    x: "48%", y: "74%", main: false },
  { name: "Rugby",           jobs: "98",     x: "82%", y: "38%", main: false },
  { name: "Leamington Spa",  jobs: "112",    x: "43%", y: "80%", main: false },
  { name: "Solihull",        jobs: "142",    x: "35%", y: "46%", main: false },
  { name: "Kenilworth",      jobs: "68",     x: "50%", y: "64%", main: false },
];

function RegionSection() {
  const [hov, setHov] = useHS(null);
  return (
    <section style={{ background: "var(--ink-850)", position: "relative", overflow: "hidden", paddingBlock: "clamp(56px,8vw,110px)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 52, alignItems: "center" }} className="cards-2">
          <div className="on-dark">
            <Reveal>
              <span className="eyebrow on-dark"><Icon name="mapPin" size={14} /> The region</span>
              <h2 className="h2" style={{ color: "#fff", margin: "16px 0 0" }}>Coventry, Warwickshire &amp; the West Midlands</h2>
              <p className="lead" style={{ margin: "16px 0 28px" }}>
                Almost twenty years recruiting across the region — we know the employers, business parks and the local talent inside out.
              </p>
            </Reveal>
            <Reveal d="1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {REGION_CITIES.map((c) => (
                <div key={c.name} className="glass" style={{ padding: "12px 15px", borderRadius: 13, cursor: "default", border: hov === c.name ? "1px solid rgba(30,111,184,0.42)" : "1px solid var(--line)", transition: "border-color .2s, background .2s", background: hov === c.name ? "rgba(30,111,184,0.08)" : "rgba(20,28,52,0.55)" }}
                  onMouseEnter={() => setHov(c.name)} onMouseLeave={() => setHov(null)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 50, flexShrink: 0, background: c.main ? "var(--g-blue)" : "rgba(255,255,255,.45)" }}></span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: c.main ? "#fff" : "var(--t-on-dark-mut)" }}>{c.name}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#fff" }}>{c.jobs}</span>
                  <span style={{ fontSize: 11, color: "var(--t-on-dark-dim)", marginLeft: 4 }}>roles</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal d="2" style={{ position: "relative", aspectRatio: "6/5", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--ink-950)", border: "1px solid var(--line-2)" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.7 }}>
              <NetworkMapBg />
            </div>
            {REGION_CITIES.map((c) => (
              <div key={c.name} style={{ position: "absolute", left: c.x, top: c.y, transform: "translate(-50%,-50%)", zIndex: 2 }}
                onMouseEnter={() => setHov(c.name)} onMouseLeave={() => setHov(null)}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "default" }}>
                  <div style={{ width: c.main ? 14 : 8, height: c.main ? 14 : 8, borderRadius: 50, transition: "box-shadow .2s, transform .2s", background: c.main ? "var(--g-blue)" : "rgba(255,255,255,0.5)", transform: hov === c.name ? "scale(1.5)" : "scale(1)", boxShadow: c.main ? "0 0 18px var(--g-blue), 0 0 40px rgba(30,111,184,.28)" : hov === c.name ? "0 0 12px rgba(255,255,255,0.6)" : "none", border: c.main ? "2px solid rgba(100,170,230,.7)" : "1px solid rgba(255,255,255,.3)" }}></div>
                  {(hov === c.name) && (
                    <div className="glass" style={{ padding: "5px 11px", borderRadius: 9, pointerEvents: "none", whiteSpace: "nowrap" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11.5, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: 10.5, color: "var(--g-lime)", fontWeight: 600 }}>{c.jobs} roles</div>
                    </div>
                  )}
                  {c.main && hov !== c.name && (
                    <div className="glass" style={{ padding: "4px 10px", borderRadius: 8, pointerEvents: "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10.5, color: "#fff", letterSpacing: ".08em" }}>COVENTRY HQ</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHY DIFFERENT — glow hover glass cards
   ============================================================ */
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

/* ============================================================
   TESTIMONIALS PREVIEW
   ============================================================ */
function TestimonialsPreview() {
  const items = TESTIMONIALS.slice(0, 3);
  return (
    <section className="bg-paper section">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 38 }}>
          <SectionHead eyebrow={<><Icon name="quote" size={14} /> Testimonials</>} title="People at the heart of it" max={460} />
          <Btn to="/testimonials" variant="outline" icon="arrowRight">Read more stories</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
          {items.map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE ASSEMBLY
   ============================================================ */
function HomePage() {
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

window.PAGES = window.PAGES || {};
window.PAGES.home = HomePage;
