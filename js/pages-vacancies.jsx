/* global React, Icon, Orb, Reveal, Btn, go, JobCard, JOBS, SECTORS, salaryStr, PageHero, Crumb, CTABand, TrustStrip, Field, FileField, SubmitButton, FormSuccess, FormErrorSummary, useFormSubmit */
const { useState: useVS, useMemo: useVM } = React;
const useVRef = React.useRef;

/* ============================================================
   VACANCIES — search, filter, grid
   ============================================================ */
function VacanciesPage() {
  const [q, setQ] = useVS("");
  const [sector, setSector] = useVS("All sectors");
  const [type, setType] = useVS("All types");
  const [sort, setSort] = useVS("Newest");
  const [animKey, setAnimKey] = useVS(0);
  const bump = () => setAnimKey(k => k + 1);

  const types = ["All types", "Permanent", "Temporary", "Fixed-term", "Term-time", "Contract"];

  const filtered = useVM(() => {
    let list = JOBS.filter((j) => {
      const m = (q.trim() === "") ||
        (j.title + j.company + j.location + j.sector + j.summary).toLowerCase().includes(q.toLowerCase());
      const s = sector === "All sectors" || j.sector === sector;
      const t = type === "All types" || j.type === type;
      return m && s && t;
    });
    if (sort === "Salary") list = [...list].sort((a, b) => b.salaryMax - a.salaryMax);
    if (sort === "A–Z") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [q, sector, type, sort]);

  return (
    <>
      <section className="ink-deep grid-tex" style={{ position: "relative", overflow: "hidden", paddingTop: 56, paddingBottom: 44 }}>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <Crumb items={[{ label: "Home", to: "/" }, { label: "Vacancies" }]} />
          <Reveal as="h1" className="h1" style={{ color: "#fff", margin: "14px 0 0", maxWidth: 760 }}>
            {JOBS.length} live roles across the West Midlands
          </Reveal>
          <Reveal as="p" d="1" className="lead" style={{ margin: "16px 0 28px", maxWidth: 560 }}>
            Search every current vacancy our consultants are working on right now.
          </Reveal>

          {/* search bar */}
          <Reveal d="2" className="glass" style={{ padding: 10, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 280px", display: "flex", alignItems: "center", gap: 10, padding: "0 12px" }}>
              <Icon name="search" size={20} style={{ color: "var(--t-on-dark-mut)", flex: "0 0 auto" }} />
              <input className="field field-dark" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Job title, company, skill or location…"
                style={{ border: "none", background: "transparent", padding: "12px 0", boxShadow: "none" }} />
            </div>
            <select className="field field-dark" value={sector} onChange={(e) => setSector(e.target.value)} style={{ flex: "0 1 200px" }}>
              <option>All sectors</option>
              {SECTORS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <Btn variant="primary" onClick={() => {}} icon="search" style={{ flex: "0 0 auto" }}>Search</Btn>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          {/* filter row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {types.map((t) => (
                <button key={t} onClick={() => { setType(t); bump(); }}
                  className={"filter-chip" + (type === t ? " active" : "")}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13.5, color: "var(--t-ink-dim)", fontWeight: 600 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
              <select className="field" value={sort} onChange={(e) => { setSort(e.target.value); bump(); }} style={{ width: "auto", padding: "9px 14px" }}>
                <option>Newest</option><option>Salary</option><option>A–Z</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--t-ink-mut)" }}>
              <Orb size={64} style={{ margin: "0 auto 20px" }} />
              <h3 className="h3" style={{ color: "var(--t-ink)" }}>No roles match that search</h3>
              <p className="t-mut" style={{ marginTop: 8 }}>Try clearing a filter — or register your CV and we'll alert you.</p>
              <Btn to="/candidates" variant="primary" icon="arrowRight" style={{ marginTop: 18 }}>Register your CV</Btn>
            </div>
          ) : (
            <div key={animKey} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
              {filtered.map((j, i) => (
                <div key={j.id} className="jobcard-animate" style={{ animationDelay: `${Math.min(i, 5) * 0.065}s` }}>
                  <JobCard job={j} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABand title="Can't see the right role?" sub="Register your CV and our consultants will match you to roles before they're even advertised." primary={{ label: "Register CV", to: "/candidates" }} secondary={{ label: "How it works", to: "/candidate-how" }} />
    </>
  );
}

/* ============================================================
   APPLY FORM — idle / validation-error / submitting / success
   ============================================================ */
function validateApply(f) {
  const er = {};
  if (!f.name.trim()) er["apply-name"] = "Please enter your full name";
  if (!f.email.trim()) er["apply-email"] = "Please add your email";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er["apply-email"] = "Enter a valid email address";
  if (!f.phone.trim()) er["apply-phone"] = "A contact number helps us reach you fast";
  if (!f.cv && !f.note.trim()) er["apply-note"] = "Attach a CV above, or add a short note about your experience";
  return er;
}

function ApplyForm({ job }) {
  const [form, setForm] = useVS({ name: "", email: "", phone: "", cv: "", note: "" });
  const { status, errors, submit, clearError, reset, submittedOnce } = useFormSubmit(validateApply);

  const set = (k, id) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); if (id) clearError(id); };
  const setFile = (e) => { const fn = e.target.files && e.target.files[0]; setForm((f) => ({ ...f, cv: fn ? fn.name : "" })); clearError("apply-note"); };
  const onSubmit = (e) => { e.preventDefault(); submit(form); };
  const startOver = () => { setForm({ name: "", email: "", phone: "", cv: "", note: "" }); reset(); };

  return (
    <Reveal id="apply" className="card" style={{ marginTop: 34, padding: "clamp(24px,3vw,36px)", scrollMarginTop: 96 }}>
      {status === "success" ? (
        <FormSuccess
          title="Application received"
          onReset={startOver}
          resetLabel="Apply for another role"
          extra={<Btn to="/vacancies" variant="primary" icon="arrowRight">Browse more roles</Btn>}>
          Thanks {form.name.split(" ")[0] || "there"} — a consultant will review your application for <strong>{job.title}</strong> and be in touch within one working day.
        </FormSuccess>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, flex: "0 0 auto", background: "rgba(95,168,42,.10)" }}>
              <Icon name="send" size={20} style={{ color: "var(--g-green)" }} aria-hidden="true" />
            </span>
            <div>
              <h2 className="h3" style={{ margin: 0 }}>Apply for this role</h2>
              <p className="t-mut" style={{ margin: "3px 0 0", fontSize: 14 }}>{job.title} · {job.company}</p>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate style={{ marginTop: 24 }}>
            <FormErrorSummary errors={errors} submittedOnce={submittedOnce} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
              <Field id="apply-name" label="Full name" required autoComplete="name"
                value={form.name} onChange={set("name", "apply-name")} error={errors["apply-name"]} placeholder="Jane Smith" />
              <Field id="apply-email" label="Email" type="email" required autoComplete="email" inputMode="email"
                value={form.email} onChange={set("email", "apply-email")} error={errors["apply-email"]} placeholder="jane@email.com" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
              <Field id="apply-phone" label="Phone" required type="tel" autoComplete="tel" inputMode="tel"
                value={form.phone} onChange={set("phone", "apply-phone")} error={errors["apply-phone"]} placeholder="07000 000000" />
              <FileField id="apply-cv" label="Upload CV" accept=".pdf,.doc,.docx" value={form.cv} onChange={setFile}
                hint="PDF or Word — or paste a note below instead." />
            </div>
            <div style={{ marginTop: 16 }}>
              <Field id="apply-note" label="Covering note" as="textarea" rows={4}
                value={form.note} onChange={set("note", "apply-note")} error={errors["apply-note"]}
                placeholder="Tell us why you're a great fit…" optional />
            </div>
            <SubmitButton status={status} idle="Submit application" submitting="Submitting…" icon="arrowRight"
              style={{ marginTop: 22, width: "100%" }} />
            <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>
              By applying you agree to our privacy policy. Your details are only shared with this employer.
            </p>
          </form>
        </>
      )}
    </Reveal>
  );
}

/* ============================================================
   JOB DETAIL — sticky apply panel
   ============================================================ */
function JobPage({ param }) {
  const job = JOBS.find((j) => j.id === param) || JOBS[0];
  const similar = JOBS.filter((j) => j.sector === job.sector && j.id !== job.id).slice(0, 3);
  const [saved, setSaved] = useVS(false);
  const [copied, setCopied] = useVS(false);
  const share = () => {
    const url = window.location.href;
    if (navigator.share) { navigator.share({ title: job.title, url }).catch(() => {}); return; }
    if (navigator.clipboard) { navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {}); }
  };

  const responsibilities = [
    "Deliver consistently high standards aligned to the team's KPIs and quality benchmarks.",
    "Work collaboratively across shifts, supporting colleagues and new starters.",
    "Follow health, safety and compliance procedures to the letter.",
    "Identify and suggest improvements to ways of working.",
  ];
  const requirements = [
    "Relevant experience in a comparable role or sector.",
    "Right to work in the UK and references covering recent employment.",
    "A reliable, positive approach and strong communication.",
    "Flexibility to support the shift pattern described.",
  ];
  const benefits = ["Competitive salary", "Pension scheme", "Ongoing training", "Career progression", "Supportive team", "Coventry University-owned employer"];

  return (
    <>
      <section className="ink-deep grid-tex" style={{ position: "relative", overflow: "hidden", paddingTop: 52, paddingBottom: 40 }}>
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <Crumb items={[{ label: "Home", to: "/" }, { label: "Vacancies", to: "/vacancies" }, { label: job.title }]} />
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start", marginTop: 18, flexWrap: "wrap" }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, flex: "0 0 auto", background: "linear-gradient(135deg, var(--red-500), var(--g-orange))", display: "grid", placeItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#fff", fontSize: 24 }}>{job.company.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
            </div>
            <div className="on-dark" style={{ flex: 1, minWidth: 260 }}>
              {(job.featured) && <span className="chip chip-red" style={{ marginBottom: 10 }}><Icon name="star" size={12} /> Featured role</span>}
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

            {[["Key responsibilities", responsibilities, "checkCircle"], ["What we're looking for", requirements, "check"]].map(([t, list, ic]) => (
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
                {benefits.map((b) => <span key={b} className="chip"><Icon name="check" size={13} style={{ color: "var(--g-green)" }} /> {b}</span>)}
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

          {/* sticky apply panel */}
          <aside className="job-aside" style={{ position: "sticky", top: 92 }}>
            <Reveal className="card" style={{ padding: 24 }}>
              <div className="stat-num" style={{ fontSize: 30, color: "var(--ink-900)" }}>{salaryStr(job)}</div>
              <div className="t-mut" style={{ fontSize: 13.5, marginTop: 2 }}>{job.salaryUnit === "hour" ? "per hour" : "per annum"} · {job.type}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "20px 0", paddingBlock: 18, borderBlock: "1px solid var(--paper-line)" }}>
                {[["mapPin", "Location", job.location], ["layers", "Working pattern", job.remote], ["briefcase", "Sector", job.sector], ["clock", "Posted", job.posted]].map(([ic, k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}>
                    <span style={{ display: "inline-flex", gap: 8, alignItems: "center", color: "var(--t-ink-dim)" }}><Icon name={ic} size={15} /> {k}</span>
                    <span style={{ fontWeight: 600, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <Btn variant="primary" icon="arrowRight" style={{ width: "100%" }} onClick={() => { const el = document.getElementById("apply-name"); if (el) el.focus(); }}>Quick apply</Btn>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => setSaved(!saved)} aria-pressed={saved}>
                  <Icon name="heart" size={16} style={{ color: saved ? "var(--red-500)" : "inherit" }} aria-hidden="true" /> {saved ? "Saved" : "Save"}
                </button>
                <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={share} aria-label="Share this job"><Icon name={copied ? "check" : "external"} size={16} aria-hidden="true" /> {copied ? "Copied" : "Share"}</button>
              </div>
              <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>No CV to hand? <a href="#/candidates" className="link-arrow" style={{ fontSize: 12.5 }}>Register in 2 mins</a></p>
            </Reveal>
          </aside>
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

window.PAGES = window.PAGES || {};
window.PAGES.vacancies = VacanciesPage;
window.PAGES.job = JobPage;
