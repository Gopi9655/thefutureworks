/* global React, Icon, Orb, Reveal, Btn, go, PageHero, CTABand, TestimonialCard, SectionHead, SectorCloud, TESTIMONIALS, CLIENTS, ACCREDITATIONS, DIFFERENTIATORS, SECTORS, STATS, CountUp */
const { useState: useMS } = React;

/* ---------- shared: vertical step flow ---------- */
function StepFlow({ steps }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
      {steps.map((s, i) => (
        <Reveal key={i} d={(i % 4) + 1} style={{ display: "flex", gap: 22, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 16, flex: "0 0 auto", background: "linear-gradient(135deg, var(--red-500), var(--g-orange))", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, boxShadow: "0 12px 28px -10px var(--red-glow)" }}>{i + 1}</span>
            {i < steps.length - 1 && <span style={{ width: 2, flex: 1, background: "linear-gradient(var(--paper-line), transparent)", marginBlock: 6 }}></span>}
          </div>
          <div className="card" style={{ padding: 24, marginBottom: 14, flex: 1, display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, margin: 0 }}>{s.t}</h3>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--t-ink-mut)" }}>{s.d}</p>
            </div>
            <Icon name={s.icon} size={28} style={{ color: "var(--red-500)", flex: "0 0 auto", opacity: .85 }} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function HowPage({ who }) {
  const cand = who === "candidate";
  const steps = cand ? [
    { t: "Send us your CV", d: "Email your CV in Word format to jobs@thefutureworks.co.uk, or call 02476 158815 to get started. You don't have to be a student to register.", icon: "send" },
    { t: "Tell us what you're looking for", d: "Share your skills, experience, search criteria and salary or hourly expectations so we can match you accurately.", icon: "target" },
    { t: "We search & advertise", d: "Our team searches for suitable opportunities and advertises relevant vacancies online and across social media.", icon: "compass" },
    { t: "Interview with us first", d: "You'll go through our own interview process so we can present you at your best before submitting you to clients.", icon: "users" },
    { t: "Advice at every step", d: "CV advice, interview preparation and honest market-salary guidance — and we'll confirm your right-to-work documents.", icon: "checkCircle" },
  ] : [
    { t: "Tell us your requirement", d: "Brief us on the role, team and timescales. Advice is completely free and there's no obligation.", icon: "doc" },
    { t: "Temporary staffing, handled", d: "Temporary assignments are paid and charged hourly — we manage PAYE, AWR compliance and holiday pay for you.", icon: "bolt" },
    { t: "Permanent recruitment", d: "Permanent placements work on a success-fee basis — you only pay when we deliver the right hire.", icon: "shield" },
    { t: "Backed by a guarantee", d: "Our permanent placements include a guarantee period, for complete peace of mind.", icon: "checkCircle" },
    { t: "Graduate talent access", d: "Tap into graduate and postgraduate talent through our Coventry University Group connections.", icon: "cap" },
  ];

  return (
    <>
      <PageHero eyebrow={<><Icon name="compass" size={14} /> {cand ? "Candidate" : "Employer"} journey</>}
        title={cand ? "How it works for candidates" : "How it works for employers"}
        sub={cand ? "Five simple steps from first hello to first day — with a consultant beside you the whole way." : "A clear, accountable process that gets you the right people and protects your time."}>
        <Btn to={cand ? "/contact" : "/contact"} variant="light" size="lg" icon="arrowRight">{cand ? "Register your CV" : "Brief us a role"}</Btn>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap" style={{ maxWidth: 880 }}>
          <StepFlow steps={steps} />
        </div>
      </section>

      <section className="bg-paper-2 section-sm">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="cards-3">
            {(cand ? [["users", "Interviewed first", "We interview you before submitting to any client."], ["sparkles", "Free skills assessment", "Discover and present your strengths."], ["compass", "Real advice", "CV, interview and market-salary guidance."]]
              : [["clock", "Fast & free advice", "One contact, quick response, no obligation."], ["shield", "Compliance handled", "PAYE, AWR and holiday pay sorted for temps."], ["checkCircle", "Guarantee period", "Permanent placements backed for peace of mind."]]).map(([ic, t, d], i) => (
              <Reveal key={t} d={(i % 3) + 1} className="card" style={{ padding: 24 }}>
                <Icon name={ic} size={26} style={{ color: "var(--red-500)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, margin: "14px 0 0" }}>{t}</h3>
                <p className="t-mut" style={{ marginTop: 6, fontSize: 14 }}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={cand ? "Start your journey today" : "Let's plan your next hire"} primary={cand ? { label: "Register CV", to: "/contact" } : { label: "Hire staff", to: "/contact" }} secondary={cand ? { label: "Browse jobs", to: "/vacancies" } : { label: "See our clients", to: "/clients" }} />
    </>
  );
}

/* ---------- CASE STUDIES ---------- */
function CaseStudiesPage() {
  const cases = [
    { sector: "Customer Service", title: "A contact-centre team, scaled fast", client: "Serco Integrated Services", challenge: "A new public-sector contract needed a team of trained advisors at short notice without dropping service quality.", result: "A cohort of vetted, interview-ready advisors placed quickly — with strong retention well beyond the settling-in period.", metrics: [["18", "advisors"], ["4 wks", "to staff"], ["90%", "retention"]] },
    { sector: "Finance & Accounts", title: "Temp-to-perm finance support", client: "ACS", challenge: "A growing finance function needed immediate cover that could become permanent for the right person.", result: "A temporary finance assistant who impressed from week one and converted to a permanent role within three months.", metrics: [["1", "key hire"], ["3 mths", "temp-to-perm"], ["100%", "compliance"]] },
    { sector: "Sales & Logistics", title: "Permanent sales & planning hires", client: "ExactLogistics", challenge: "Expansion meant hiring commercial and transport-planning talent quickly, on a success-fee basis.", result: "Multiple permanent hires across sales and planning, each backed by our guarantee period for peace of mind.", metrics: [["5", "permanent hires"], ["Success", "fee model"], ["0", "guarantee claims"]] },
  ];
  return (
    <>
      <PageHero eyebrow={<><Icon name="doc" size={14} /> Case studies</>} title="Real placements, real results" sub="A sample of how thefutureworks has solved hiring challenges across the West Midlands." />
      <section className="bg-paper section">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {cases.map((c, i) => (
            <Reveal key={c.title} className="card card-hover" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "0.9fr 1.1fr" }}>
              <div style={{ position: "relative", minHeight: 260, background: "var(--ink-850)" }}>
                <image-slot id={"case-" + i} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} shape="rect" placeholder="Drop a case-study photo"></image-slot>
                <span className="chip on-dark" style={{ position: "absolute", left: 18, top: 18, zIndex: 2 }}><Orb size={14} /> {c.sector}</span>
              </div>
              <div style={{ padding: "32px clamp(24px,3vw,40px)" }}>
                <h3 className="h3">{c.title}</h3>
                <div className="t-mut" style={{ fontSize: 13.5, fontWeight: 600, marginTop: 4 }}>{c.client}</div>
                <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--t-ink-mut)" }}><strong style={{ color: "var(--t-ink)" }}>Challenge — </strong>{c.challenge}</p>
                <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--t-ink-mut)" }}><strong style={{ color: "var(--t-ink)" }}>Result — </strong>{c.result}</p>
                <div style={{ display: "flex", gap: 28, marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--paper-line)" }}>
                  {c.metrics.map(([n, l]) => (
                    <div key={l}>
                      <div className="stat-num" style={{ fontSize: 26, color: "var(--red-600)" }}>{n}</div>
                      <div style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand title="Could we solve yours?" primary={{ label: "Talk to us", to: "/contact" }} secondary={{ label: "Our services", to: "/employers" }} />
    </>
  );
}

/* ---------- SKILLS ASSESSMENT (interactive) ---------- */
const SKILLS_Q = [
  { q: "Which kind of day sounds best?", a: [["Hands-on, building or making something", "practical"], ["Solving a tricky problem or puzzle", "analytical"], ["Helping someone and seeing them benefit", "caring"], ["Organising people and plans", "leading"]] },
  { q: "Colleagues would say you're the one who…", a: [["Keeps calm and gets it done", "practical"], ["Spots the detail others miss", "analytical"], ["Looks after the team", "caring"], ["Takes charge when it counts", "leading"]] },
  { q: "What gives you most satisfaction?", a: [["A job finished to a high standard", "practical"], ["Cracking something complex", "analytical"], ["A genuine thank-you", "caring"], ["A team hitting its goal", "leading"]] },
  { q: "Pick a workplace you'd enjoy.", a: [["A workshop, line or site", "practical"], ["An office or lab with data", "analytical"], ["A ward, school or care setting", "caring"], ["A fast-moving operation you run", "leading"]] },
];
const TRAITS = {
  practical: { name: "The Maker", desc: "You're hands-on, dependable and proud of a job done well.", sectors: ["Engineering, Technical & IT", "Transport & Logistics", "Health & Safety"] },
  analytical: { name: "The Problem-Solver", desc: "You think in detail and love getting to the right answer.", sectors: ["Finance & Accounts", "Engineering, Technical & IT", "Administration"] },
  caring: { name: "The People Person", desc: "You're motivated by helping people and doing right by them.", sectors: ["Customer Service & Call Centre", "HR", "Administration"] },
  leading: { name: "The Organiser", desc: "You bring order, drive and people together.", sectors: ["Transport & Logistics", "Sales & Marketing", "Customer Service & Call Centre"] },
};
function SkillsPage() {
  const ASSESS_GROUPS = [
    { icon: "doc", title: "Microsoft Office", items: ["Excel", "Word", "PowerPoint", "Access", "Outlook"] },
    { icon: "target", title: "Aptitude & reasoning", items: ["Verbal reasoning", "Numerical reasoning", "Checking", "Classification", "Sorting & coding", "Spelling & grammar"] },
    { icon: "briefcase", title: "Office & clerical", items: ["Filing", "Data entry", "Audio typing", "Speed typing"] },
    { icon: "sparkles", title: "Specialist areas", items: ["Call centre", "Finance", "Health & safety", "Languages"] },
    { icon: "layers", title: "IT skills", items: ["IT operating systems", "IT systems administration", "IT programming"] },
  ];
  const [step, setStep] = useMS(0);
  const [scores, setScores] = useMS({ practical: 0, analytical: 0, caring: 0, leading: 0 });
  const done = step >= SKILLS_Q.length;
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const pick = (trait) => { setScores({ ...scores, [trait]: scores[trait] + 1 }); setStep(step + 1); };
  const reset = () => { setScores({ practical: 0, analytical: 0, caring: 0, leading: 0 }); setStep(0); };

  return (
    <>
      <PageHero align="center" eyebrow={<><Icon name="target" size={14} /> Skills assessment</>} title="Discover your strengths in 60 seconds" sub="Answer four quick questions and we'll suggest the kind of roles where you'll shine. No sign-up needed." />
      <section className="bg-paper section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <Reveal className="card" style={{ padding: "clamp(26px, 4vw, 44px)" }}>
            {!done ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--red-500)", letterSpacing: ".08em", textTransform: "uppercase" }}>Question {step + 1} of {SKILLS_Q.length}</span>
                  <span style={{ fontSize: 13, color: "var(--t-ink-dim)" }}>{Math.round((step / SKILLS_Q.length) * 100)}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: "var(--paper-3)", overflow: "hidden", marginBottom: 26 }}>
                  <div style={{ height: "100%", width: `${(step / SKILLS_Q.length) * 100}%`, background: "linear-gradient(90deg, var(--red-500), var(--g-orange))", transition: "width .4s cubic-bezier(.2,.7,.3,1)" }}></div>
                </div>
                <h2 className="h3" style={{ marginTop: 0 }}>{SKILLS_Q[step].q}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 22 }}>
                  {SKILLS_Q[step].a.map(([label, trait]) => (
                    <button key={label} onClick={() => pick(trait)} className="card-hover" style={{
                      textAlign: "left", cursor: "pointer", padding: "16px 18px", borderRadius: 14,
                      border: "1.5px solid var(--paper-line)", background: "#fff", fontSize: 15.5, fontWeight: 600, color: "var(--t-ink)",
                      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                    }}>
                      {label} <Icon name="arrowRight" size={18} style={{ color: "var(--red-500)", flex: "0 0 auto" }} />
                    </button>
                  ))}
                </div>
                {step > 0 && <button onClick={() => setStep(step - 1)} className="link-arrow" style={{ marginTop: 18, background: "none", border: "none", cursor: "pointer" }}><Icon name="chevronRight" size={16} style={{ transform: "rotate(180deg)" }} /> Back</button>}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <span className="eyebrow" style={{ justifyContent: "center" }}>Your strength profile</span>
                <div style={{ margin: "18px auto", display: "grid", placeItems: "center" }}><Orb size={88} glow spin /></div>
                <h2 className="h2">{TRAITS[top].name}</h2>
                <p className="lead" style={{ marginTop: 12, maxWidth: 440, marginInline: "auto" }}>{TRAITS[top].desc}</p>
                <div style={{ marginTop: 26 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--t-ink-mut)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 12 }}>Sectors that suit you</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {TRAITS[top].sectors.map((s) => <a key={s} href="#/vacancies" className="chip chip-red" style={{ padding: "8px 14px" }}>{s}</a>)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
                  <Btn to="/vacancies" variant="primary" size="lg" icon="arrowRight">See matching jobs</Btn>
                  <button onClick={reset} className="btn btn-outline btn-lg">Retake</button>
                </div>
              </div>
            )}
          </Reveal>
          <p style={{ textAlign: "center", marginTop: 18, fontSize: 13.5, color: "var(--t-ink-dim)" }}>This quick guide is for inspiration — your consultant will explore your strengths in depth.</p>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="checkCircle" size={14} /> Formal assessments</>} title="Assessments we can run for you" sub="As part of registration we can formally assess your skills across a wide range of areas — giving employers confidence and you an edge." max={640} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 44, maxWidth: 1000, marginInline: "auto" }} className="cards-2">
            {ASSESS_GROUPS.map((g, i) => (
              <Reveal key={g.title} d={(i % 2) + 1} className="card" style={{ padding: 26 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: "rgba(225,29,42,.09)" }}><Icon name={g.icon} size={22} style={{ color: "var(--red-500)" }} /></span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, margin: 0 }}>{g.title}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                  {g.items.map((it) => <span key={it} className="chip" style={{ fontSize: 13 }}>{it}</span>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- CLIENTS ---------- */
function ClientsPage() {
  const support = [
    { icon: "building", title: "Private & public sector", body: "We supply organisations large and small across both the private and public sector." },
    { icon: "layers", title: "Permanent, temporary & interim", body: "Whatever the requirement, we support permanent, temporary and interim staffing." },
    { icon: "doc", title: "Job descriptions & rates", body: "We help shape job descriptions and advise on market rates, salaries and sought-after benefits." },
    { icon: "target", title: "Assessed, matched candidates", body: "Our candidate database and skills assessments mean every match is considered, not speculative." },
  ];
  return (
    <>
      <PageHero eyebrow={<><Icon name="handshake" size={14} /> Our clients</>} title="Employers who trust us, again and again" sub="257 companies supplied and 232 who came back — across both the private and public sector." />
      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="clients-grid">
            {CLIENTS.map((c, i) => (
              <Reveal key={c} d={(i % 4) + 1} className="card card-hover" style={{ padding: "30px 16px", display: "grid", placeItems: "center", textAlign: "center", minHeight: 110 }}>
                <Orb size={30} style={{ marginBottom: 12 }} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--t-ink-mut)" }}>{c}</span>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 56 }}>
            <SectionHead align="center" eyebrow={<><Icon name="sparkles" size={14} /> How we support clients</>} title="More than filling vacancies" max={600} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }} className="cards-3">
              {support.map((s, i) => (
                <Reveal key={s.title} d={(i % 4) + 1} className="card" style={{ padding: 24 }}>
                  <Icon name={s.icon} size={26} style={{ color: "var(--red-500)" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, margin: "14px 0 0" }}>{s.title}</h3>
                  <p className="t-mut" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="ink-deep grid-tex" style={{ marginTop: 40, borderRadius: "var(--radius-lg)", padding: "clamp(32px,5vw,56px)", position: "relative", overflow: "hidden" }}>
            <div className="on-dark" style={{ maxWidth: 720, position: "relative", zIndex: 2 }}>
              <Icon name="quote" size={36} style={{ color: "var(--red-400)" }} />
              <p className="h3" style={{ color: "#fff", margin: "16px 0 0", fontWeight: 500 }}>"thefutureworks took the time to understand our contract requirements and consistently sent us people who fit first time. A genuine partner, not a quick fix."</p>
              <div style={{ marginTop: 20, color: "var(--t-on-dark-mut)" }}>Serco Integrated Services · Public-sector contract client</div>
            </div>
            <div style={{ position: "absolute", right: -40, bottom: -80, opacity: .6 }} className="floaty"><Orb size={260} spin /></div>
          </Reveal>
        </div>
      </section>
      <CTABand title="Join them" primary={{ label: "Hire staff", to: "/contact" }} secondary={{ label: "Case studies", to: "/case-studies" }} />
    </>
  );
}

/* ---------- TESTIMONIALS (filterable) ---------- */
function TestimonialsPage() {
  const [filter, setFilter] = useMS("all");
  const list = TESTIMONIALS.filter((t) => filter === "all" || t.kind === filter);
  return (
    <>
      <PageHero align="center" eyebrow={<><Icon name="quote" size={14} /> Testimonials</>} title="In their words" sub="Candidates placed and employers served — the people behind the numbers." />
      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36 }}>
            {[["all", "Everyone"], ["candidate", "Candidates"], ["employer", "Employers"]].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)} className="chip" style={{
                cursor: "pointer", padding: "9px 18px", fontSize: 14,
                background: filter === k ? "var(--ink-900)" : "var(--paper-2)",
                color: filter === k ? "#fff" : "var(--t-ink-mut)",
                borderColor: filter === k ? "var(--ink-900)" : "var(--paper-line)",
              }}>{l}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
            {list.map((t, i) => <Reveal key={t.name + i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}

/* ---------- ABOUT ---------- */
function AboutPage() {
  const values = DIFFERENTIATORS.slice(0, 6);
  return (
    <>
      <PageHero eyebrow={<><Icon name="globe2" size={14} /> About us</>} title="Coventry University's own recruitment agency" sub="Built to connect the region's people and employers — and to reinvest the value we create back into education and skills." />
      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="cards-2">
            <div>
              <SectionHead eyebrow="Our story" title="Recruitment with a purpose" sub="Established in 2005, thefutureworks is a commercial recruitment agency and a division of PeoplesFuture Ltd, owned by Coventry University. We've recruited across the region for almost twenty years." />
              <p className="t-mut" style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.6 }}>
                We work with students, graduates and experienced professionals across Coventry, Warwickshire and the West Midlands. Our consultants bring 70+ years of combined experience across commercial, professional and technical desks. Profits are ultimately reinvested through Coventry University — so when you hire or get hired through us, the whole region benefits. Our mission is simple: high service levels, long-term partnerships and matching exact requirements.
              </p>
              <div style={{ display: "flex", gap: 28, marginTop: 28 }}>
                {[["8,196", "candidates"], ["257", "employers"], ["70+", "years' experience"]].map(([n, l]) => (
                  <div key={l}><div className="stat-num" style={{ fontSize: 30, color: "var(--red-600)" }}>{n}</div><div style={{ fontSize: 13, color: "var(--t-ink-dim)", marginTop: 3 }}>{l}</div></div>
                ))}
              </div>
            </div>
            <Reveal d="1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <image-slot id="about-1" style={{ width: "100%", aspectRatio: "3/4", marginTop: 24 }} shape="rounded" radius="20" placeholder="Team / office photo"></image-slot>
              <image-slot id="about-2" style={{ width: "100%", aspectRatio: "3/4" }} shape="rounded" radius="20" placeholder="Coventry / candidate photo"></image-slot>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow="What we stand for" title="Our values in practice" max={600} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 44 }} className="cards-3">
            {values.map((v, i) => (
              <Reveal key={v.title} d={(i % 3) + 1} className="card" style={{ padding: 26 }}>
                <Icon name={v.icon} size={26} style={{ color: "var(--red-500)" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, margin: "14px 0 0" }}>{v.title}</h3>
                <p className="t-mut" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55 }}>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="Work with us" primary={{ label: "Find jobs", to: "/vacancies" }} secondary={{ label: "Hire staff", to: "/employers" }} />
    </>
  );
}

/* ---------- ACCREDITATIONS ---------- */
function AccreditationsPage() {
  return (
    <>
      <PageHero eyebrow={<><Icon name="shield" size={14} /> Accreditations</>} title="Standards you can verify" sub="Recruitment is built on trust. Here's the evidence behind ours." />
      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="cards-2">
            {ACCREDITATIONS.map((a, i) => (
              <Reveal key={a.name} d={(i % 2) + 1} className="card card-hover" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: 16, flex: "0 0 auto", background: "linear-gradient(135deg, var(--ink-800), var(--ink-700))", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17 }}>{a.abbr}</span>
                <div>
                  <h3 className="h3" style={{ fontSize: 20 }}>{a.name}</h3>
                  <p className="t-mut" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.55 }}>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand title="Recruitment you can trust" primary={{ label: "Talk to us", to: "/contact" }} secondary={{ label: "About us", to: "/about" }} />
    </>
  );
}

window.PAGES = window.PAGES || {};
Object.assign(window.PAGES, {
  "candidate-how": () => <HowPage who="candidate" />,
  "employer-how": () => <HowPage who="employer" />,
  "case-studies": CaseStudiesPage,
  "skills": SkillsPage,
  "clients": ClientsPage,
  "testimonials": TestimonialsPage,
  "about": AboutPage,
  "accreditations": AccreditationsPage,
});
