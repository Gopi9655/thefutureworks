import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { Button } from "@/components/Button";
import { PageHero, CTABand, SectionHead, TestimonialCard } from "@/components/sections";
import { TESTIMONIALS } from "@/data/content";
import { SECTORS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "For employers",
  description: "Permanent, temporary and part-time staffing across the West Midlands. Our advice is always free.",
};

const STEPS = [
  { icon: "doc", t: "Brief us once, properly", d: "We map the role, culture and requirements in full — no cut-and-paste job specs." },
  { icon: "target", t: "We search & assess", d: "Rigorous candidate selection from our deep local talent database." },
  { icon: "layers", t: "Receive a vetted shortlist", d: "Reference-checked, interview-ready — no speculative CV bundles." },
  { icon: "shield", t: "Success-fee, guaranteed", d: "Permanent placements on a success-fee basis, with a guarantee period." },
];

export default function EmployersPage() {
  const employerVoices = TESTIMONIALS.filter((t) => t.kind === "employer").slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="building" size={14} /> For employers</>}
        title="Staffing partners who get it right first time"
        sub="Permanent, temporary and part-time recruitment across Coventry, Warwickshire and the West Midlands. Employer advice is always free."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
          <Button to="/contact" variant="light" size="lg" icon="arrowRight">Hire staff</Button>
          <Button to="/contact" variant="ghost" size="lg" iconLeft="phone">Talk to a consultant</Button>
        </div>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="target" size={14} /> Our process</>} title="How we match and place" sub="A rigorous, partnership-led process built over almost twenty years." max={620} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 44 }} className="cards-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} d={(i % 4) + 1} className="card" style={{ padding: 26 }}>
                <span style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 13, background: "rgba(30,111,184,0.10)", border: "1px solid rgba(30,111,184,0.20)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--g-blue)" }} />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17.5, margin: "16px 0 0" }}>{s.t}</h3>
                <p className="t-mut" style={{ fontSize: 14.5, lineHeight: 1.55, margin: "8px 0 0" }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="layers" size={14} /> Sectors we cover</>} title="Specialists across the commercial sectors" max={620} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 36, maxWidth: 900, marginInline: "auto" }}>
            {SECTORS.map((s) => <span key={s} className="chip" style={{ fontSize: 15, padding: "11px 20px" }}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead eyebrow={<><Icon name="quote" size={14} /> Client voices</>} title="What employers say" max={460} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 36 }} className="cards-3">
            {employerVoices.map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
          </div>
        </div>
      </section>

      <CTABand
        title="Let's talk about your next hire"
        sub="Our advice is free and our consultants know the region inside out."
        primary={{ label: "Hire staff", to: "/contact" }}
        secondary={{ label: "Browse candidates", to: "/contact" }}
      />
    </>
  );
}
