/* global React, Icon, Orb, Reveal, Btn, go, JOBS, SECTORS, TESTIMONIALS, CLIENTS, STATS, PageHero, CTABand, TestimonialCard, SectionHead, FeatureGrid, CountUp */

function EmployersPage() {
  const services = [
    { icon: "shield", title: "Permanent recruitment", body: "End-to-end search and selection on a success-fee model — you only pay when we deliver the right hire.", points: ["Rigorous candidate selection", "Success-fee basis", "Guarantee period included"] },
    { icon: "bolt", title: "Temporary & flexible", body: "Reliable temporary workers when you need them. Paid and charged hourly, with the admin handled for you.", points: ["Fast turnaround", "PAYE, AWR & holiday pay handled", "One trusted point of contact"] },
    { icon: "cap", title: "Graduate recruitment", body: "Access fresh graduate and postgraduate talent through our Coventry University Group connections.", points: ["Students, graduates & postgraduates", "University talent access", "Future-focused hiring"] },
  ];
  const why = [
    { icon: "target", title: "Rigorous candidate selection", body: "Every candidate is screened and interviewed by us before they ever reach your shortlist." },
    { icon: "users", title: "Offsite interview facilities", body: "Professional interview space at our Coventry University campus base, available to clients." },
    { icon: "trendingUp", title: "Competitive, fair pricing", body: "Transparent rates with no hidden fees — honest value from a university-owned agency." },
  ];

  return (
    <>
      <PageHero eyebrow={<><Icon name="building" size={14} /> For employers</>}
        title="Hire the right people, from people who know the region"
        sub="Permanent, temporary and contract staffing across the West Midlands — supplied by a values-led agency owned by Coventry University.">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Btn to="/contact" variant="light" size="lg" icon="arrowRight">Hire staff</Btn>
          <Btn to="/employer-how" variant="ghost" size="lg">Our process</Btn>
        </div>
      </PageHero>

      {/* stats reassurance */}
      <section className="bg-ink-2 section-sm">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="statband">
            {[["257", "companies supplied"], ["232", "repeat customers"], ["953", "positions filled"], ["70+", "years combined experience"]].map(([n, l], i) => (
              <Reveal key={l} d={(i % 4) + 1} style={{ borderLeft: i ? "1px solid var(--line)" : "none", paddingLeft: i ? 22 : 0 }}>
                <div className="stat-num" style={{ fontSize: "clamp(28px,3.6vw,44px)", color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 14, color: "var(--t-on-dark-mut)", marginTop: 6 }}>{l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="handshake" size={14} /> Our services</>} title="Staffing, your way" sub="One trusted partner across every type of hire — so you brief once and we handle the rest." max={620} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 44 }} className="cards-3">
            {services.map((s, i) => (
              <Reveal key={s.title} d={(i % 3) + 1} className="card card-hover" style={{ padding: 30, display: "flex", flexDirection: "column" }}>
                <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 15, background: "linear-gradient(135deg, var(--red-500), var(--g-orange))" }}>
                  <Icon name={s.icon} size={26} style={{ color: "#fff" }} />
                </span>
                <h3 className="h3" style={{ margin: "20px 0 0" }}>{s.title}</h3>
                <p style={{ margin: "10px 0 18px", fontSize: 14.5, lineHeight: 1.55, color: "var(--t-ink-mut)" }}>{s.body}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                  {s.points.map((p) => (
                    <div key={p} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, fontWeight: 600 }}>
                      <Icon name="checkCircle" size={18} stroke={2} style={{ color: "var(--g-green)" }} /> {p}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="layers" size={14} /> Capacity across sectors</>} title="Specialists across the commercial sectors" sub="From administration to IT, our consultants recruit across the disciplines that keep regional businesses running." max={640} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 40, maxWidth: 900, marginInline: "auto" }}>
            {SECTORS.map((s) => (
              <span key={s} className="chip" style={{ fontSize: 15, padding: "11px 20px" }}><Orb size={16} /> {s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-deep grid-tex section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="cards-2">
            <div>
              <SectionHead dark eyebrow={<><Icon name="sparkles" size={14} /> Why partner with us</>} title="Honest, accountable, and on your side" sub="We work ethically and in genuine partnership — never a quick fix. And because we're owned by Coventry University, our profits are reinvested locally." />
              <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                <Btn to="/contact" variant="primary" size="lg" icon="arrowRight">Book a call</Btn>
                <Btn to="/clients" variant="ghost" size="lg">See our clients</Btn>
              </div>
            </div>
            <FeatureGrid items={why} dark />
          </div>
        </div>
      </section>

      <section className="bg-paper section-sm">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}><Icon name="building" size={14} /> Trusted by employers across the region</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="clients-grid">
            {CLIENTS.map((c, i) => (
              <Reveal key={c} d={(i % 4) + 1} className="card" style={{ padding: "26px 16px", display: "grid", placeItems: "center", textAlign: "center", minHeight: 96 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--t-ink-mut)" }}>{c}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="quote" size={14} /> Employer stories</>} title="What employers say" max={560} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 40 }} className="cards-3">
            {TESTIMONIALS.filter((t) => t.kind === "employer").slice(0, 3).map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
          </div>
        </div>
      </section>

      <CTABand title="Let's solve your hiring" sub="Tell us about the role and we'll come back with a plan — and a shortlist worth your time." primary={{ label: "Hire staff", to: "/contact" }} secondary={{ label: "How it works", to: "/employer-how" }} />
    </>
  );
}

window.PAGES = window.PAGES || {};
window.PAGES.employers = EmployersPage;
