/* global React, Icon, Orb, Reveal, Btn, go, JobCard, JOBS, SECTORS, TESTIMONIALS, PageHero, CTABand, TestimonialCard, SectionHead */

function FeatureGrid({ items, dark }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="cards-3">
      {items.map((f, i) => (
        <Reveal key={f.title} d={(i % 3) + 1} className={dark ? "glass" : "card"} style={{ padding: 26 }}>
          <span style={{ display: "grid", placeItems: "center", width: 50, height: 50, borderRadius: 14, background: dark ? "rgba(225,29,42,.14)" : "rgba(225,29,42,.09)", border: dark ? "1px solid rgba(225,29,42,.25)" : "none" }}>
            <Icon name={f.icon} size={24} style={{ color: dark ? "var(--red-400)" : "var(--red-500)" }} />
          </span>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18.5, margin: "16px 0 0", color: dark ? "#fff" : "var(--t-ink)", letterSpacing: "-.01em" }}>{f.title}</h3>
          <p style={{ margin: "9px 0 0", fontSize: 14.5, lineHeight: 1.55, color: dark ? "var(--t-on-dark-mut)" : "var(--t-ink-mut)" }}>{f.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

function SectorCloud() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
      {SECTORS.map((s) => (
        <a key={s} href="#/vacancies" className="chip" style={{ fontSize: 14, padding: "9px 16px" }}>
          <Orb size={14} /> {s}
        </a>
      ))}
    </div>
  );
}

function CandidatesPage() {
  const benefits = [
    { icon: "target", title: "Roles matched to you", body: "Hand-picked opportunities that fit your skills and goals — never your CV blasted to every employer." },
    { icon: "compass", title: "A consultant in your corner", body: "Honest advice, interview prep and feedback from someone who actually picks up the phone." },
    { icon: "sparkles", title: "Free skills assessment", body: "Discover strengths you'd never think to list — and learn how to present them." },
    { icon: "shield", title: "Ethical, accredited employer", body: "We're REC & BIOR accredited and Coventry University-owned. Your data and your interests are protected." },
    { icon: "mapPin", title: "Local roles, real employers", body: "Genuine vacancies across Coventry, Warwickshire and the West Midlands — many before they're advertised." },
    { icon: "heart", title: "Support that lasts", body: "Aftercare beyond day one. We measure success by how long you stay and thrive." },
  ];
  const featured = JOBS.filter((j) => j.featured).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={<><Icon name="users" size={14} /> For candidates</>}
        title="Your next role, and the team to get you there"
        sub="For experienced candidates, graduates, postgraduates and students — permanent and temporary opportunities across the region. You don't have to be a student to register.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Btn to="/vacancies" variant="light" size="lg" icon="arrowRight">Browse jobs</Btn>
          <Btn to="/candidate-how" variant="ghost" size="lg">How it works</Btn>
        </div>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }} className="cards-2">
            <div>
              <SectionHead eyebrow={<><Icon name="send" size={14} /> Register your CV</>} title="Two minutes now. Opportunities for months." sub="Email your CV in Word format to jobs@thefutureworks.co.uk or call 02476 158815. Tell us what you're looking for and our consultants get to work." />
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 26 }}>
                {["Email your CV in Word format", "Tell us your skills, experience & expectations", "We search, advertise and interview you"].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 13, alignItems: "center" }}>
                    <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 50, flex: "0 0 auto", background: "var(--ink-900)", color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 14 }}>{i + 1}</span>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <Btn href="mailto:jobs@thefutureworks.co.uk" variant="primary" size="lg" iconLeft="mail">Email your CV</Btn>
                <Btn to="/skills" variant="outline" size="lg">Try skills assessment</Btn>
              </div>
            </div>
            <Reveal d="1" style={{ position: "relative" }}>
              <image-slot id="candidates-hero" style={{ width: "100%", aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }} shape="rounded" radius="26" placeholder="Drop a candidate / workplace photo"></image-slot>
              <div className="card" style={{ position: "absolute", left: -18, bottom: -18, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--shadow-card)" }}>
                <Orb size={40} glow />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22 }}>953</div>
                  <div style={{ fontSize: 12.5, color: "var(--t-ink-mut)" }}>people placed</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="sparkles" size={14} /> Why register with us</>} title="More than a job board" sub="A people-first agency that treats your career like it matters — because it does." max={620} />
          <div style={{ marginTop: 44 }}><FeatureGrid items={benefits} /></div>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 34 }}>
            <SectionHead eyebrow={<><Icon name="star" size={14} /> Hand-picked</>} title="Featured roles for you" max={460} />
            <Btn to="/vacancies" variant="outline" icon="arrowRight">All vacancies</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
            {featured.map((j, i) => <Reveal key={j.id} d={(i % 3) + 1}><JobCard job={j} /></Reveal>)}
          </div>
          <div style={{ marginTop: 40 }}>
            <SectionHead title="Sectors we recruit for" max={520} />
            <SectorCloud />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="quote" size={14} /> Candidate stories</>} title="People we've helped" max={560} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }} className="cards-3">
            {TESTIMONIALS.filter((t) => t.kind === "candidate").slice(0, 3).map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
          </div>
        </div>
      </section>

      <CTABand title="Ready to find your future?" sub="Register your CV today — it takes two minutes and could change your year." primary={{ label: "Register CV", to: "/contact" }} secondary={{ label: "Browse jobs", to: "/vacancies" }} />
    </>
  );
}

window.PAGES = window.PAGES || {};
window.PAGES.candidates = CandidatesPage;
window.PAGES.FeatureGrid = FeatureGrid;
Object.assign(window, { FeatureGrid, SectorCloud });
