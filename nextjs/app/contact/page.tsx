import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Orb, Reveal } from "@/components/primitives";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/sections";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to thefutureworks — hiring, job-hunting or exploring options across the West Midlands.",
};

const DETAILS: { icon: string; label: string; lines: string[]; href?: string }[] = [
  { icon: "mapPin", label: "Visit us", lines: [...CONTACT.addressLines] },
  { icon: "phone", label: "Call us", lines: [CONTACT.phone], href: CONTACT.phoneHref },
  { icon: "mail", label: "Email us", lines: [CONTACT.email], href: CONTACT.emailHref },
  { icon: "clock", label: "Opening hours", lines: [...CONTACT.hours] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="mail" size={14} /> Contact</>}
        title="Talk to a team that picks up the phone"
        sub="Hiring, job-hunting or just exploring options across the West Midlands — we'd love to hear from you."
      />

      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "start" }} className="cards-2">
            <ContactForm />

            <div>
              <Reveal style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {DETAILS.map((d) => (
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
              <Reveal d={1} style={{ marginTop: 14, position: "relative" }}>
                <div className="media-slot" data-label="Map / office photo" style={{ width: "100%", height: 220, borderRadius: 18 }} />
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
          <Button href={CONTACT.portalUrl} variant="primary" size="lg" icon="external">Open the portal</Button>
        </div>
      </section>
    </>
  );
}
