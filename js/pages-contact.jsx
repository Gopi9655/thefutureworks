/* global React, Icon, Orb, Reveal, Btn, PageHero, Crumb, Field, SubmitButton, FormSuccess, FormErrorSummary, useFormSubmit */
const { useState: useCS } = React;

function validateContact(f) {
  const er = {};
  if (!f.name.trim()) er["contact-name"] = "Please tell us your name";
  if (!f.email.trim()) er["contact-email"] = "Please add your email";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er["contact-email"] = "Enter a valid email address";
  if (!f.message.trim()) er["contact-message"] = "Add a short message so we can help";
  return er;
}

function ContactPage() {
  const [form, setForm] = useCS({ name: "", email: "", phone: "", who: "Candidate", message: "" });
  const { status, errors, submit, clearError, reset, submittedOnce } = useFormSubmit(validateContact);

  const set = (k, id) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); if (id) clearError(id); };
  const onSubmit = (e) => { e.preventDefault(); submit(form); };
  const startOver = () => { setForm({ name: "", email: "", phone: "", who: "Candidate", message: "" }); reset(); };

  const details = [
    { icon: "mapPin", label: "Visit us", lines: CONTACT.addressLines },
    { icon: "phone", label: "Call us", lines: [CONTACT.phone], href: CONTACT.phoneHref },
    { icon: "mail", label: "Email us", lines: [CONTACT.email], href: CONTACT.emailHref },
    { icon: "clock", label: "Opening hours", lines: CONTACT.hours },
  ];

  return (
    <>
      <PageHero eyebrow={<><Icon name="mail" size={14} /> Contact</>}
        title="Talk to a team that picks up the phone"
        sub="Hiring, job-hunting or just exploring options across the West Midlands — we'd love to hear from you." />

      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "start" }} className="cards-2">
            {/* form */}
            <Reveal className="card" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
              {status === "success" ? (
                <FormSuccess
                  title="Message sent"
                  onReset={startOver}
                  resetLabel="Send another message"
                  extra={<Btn to="/vacancies" variant="primary" icon="arrowRight">Browse jobs meanwhile</Btn>}>
                  Thanks {form.name.split(" ")[0] || "there"} — a consultant will be in touch within one working day.
                </FormSuccess>
              ) : (
                <>
                  <h2 className="h3" style={{ marginTop: 0 }}>Send us a message</h2>
                  <p className="t-mut" style={{ marginTop: 8, marginBottom: 24, fontSize: 15 }}>Fill in the form and we'll route you to the right consultant.</p>
                  <form onSubmit={onSubmit} noValidate>
                    <FormErrorSummary errors={errors} submittedOnce={submittedOnce} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
                      <Field id="contact-name" label="Full name" required autoComplete="name"
                        value={form.name} onChange={set("name", "contact-name")} error={errors["contact-name"]} placeholder="Jane Smith" />
                      <Field id="contact-email" label="Email" type="email" required autoComplete="email" inputMode="email"
                        value={form.email} onChange={set("email", "contact-email")} error={errors["contact-email"]} placeholder="jane@email.com" />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
                      <Field id="contact-phone" label="Phone" optional type="tel" autoComplete="tel" inputMode="tel"
                        value={form.phone} onChange={set("phone")} placeholder="07000 000000" />
                      <Field id="contact-who" label="I am a…" as="select"
                        value={form.who} onChange={set("who")}
                        options={["Candidate", "Employer", "University partner", "Other"]} />
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <Field id="contact-message" label="Message" as="textarea" rows={5} required
                        value={form.message} onChange={set("message", "contact-message")} error={errors["contact-message"]}
                        placeholder="Tell us how we can help…" />
                    </div>
                    <SubmitButton status={status} idle="Send message" submitting="Sending…" icon="send"
                      style={{ marginTop: 22, width: "100%" }} />
                    <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>
                      By submitting you agree to our privacy policy. We never share your details.
                    </p>
                  </form>
                </>
              )}
            </Reveal>

            {/* details */}
            <div>
              <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {details.map((d) => (
                  <div key={d.label} className="card" style={{ padding: 22, display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 12, flex: "0 0 auto", background: "rgba(225,29,42,.09)" }}>
                      <Icon name={d.icon} size={22} style={{ color: "var(--red-500)" }} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{d.label}</div>
                      <div style={{ marginTop: 4, fontSize: 14.5, color: "var(--t-ink-mut)", lineHeight: 1.5 }}>
                        {d.href ? <a href={d.href} className="link-arrow" style={{ fontSize: 14.5 }}>{d.lines[0]}</a> : d.lines.map((l, i) => <div key={i}>{l}</div>)}
                      </div>
                    </div>
                  </div>
                ))}
              </Reveal>
              <Reveal d="1" style={{ marginTop: 14, position: "relative" }}>
                <image-slot id="contact-map" style={{ width: "100%", height: 220 }} shape="rounded" radius="18" placeholder="Drop a map / office photo"></image-slot>
                <div className="glass" style={{ position: "absolute", left: 16, bottom: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
                  <Orb size={26} /> <span style={{ fontSize: 13, fontWeight: 600 }}>Coventry · CV1 5FJ</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section-sm">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h3 className="h3">Already registered?</h3>
            <p className="t-mut" style={{ marginTop: 6 }}>Manage your applications and documents in the candidate &amp; employer portal.</p>
          </div>
          <Btn href="https://portal.thefutureworks.co.uk" variant="primary" size="lg" icon="external">Open the portal</Btn>
        </div>
      </section>
    </>
  );
}

window.PAGES = window.PAGES || {};
window.PAGES.contact = ContactPage;
