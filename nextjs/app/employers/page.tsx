import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { Button } from "@/components/Button";
import { PageHero, CTABand, SectionHead, TestimonialCard } from "@/components/sections";
import { TESTIMONIALS } from "@/data/content";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import { SECTORS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "For employers",
  description: "Permanent, temporary, full-time and part-time staffing across the West Midlands. Our advice is always free.",
};

const SERVICE_POINTS = [
  { icon: "target", t: "Rigorous selection", d: OFFICIAL_BUSINESS_FACTS.employerServicePoints[0] },
  { icon: "building", t: "Interview facilities", d: OFFICIAL_BUSINESS_FACTS.employerServicePoints[1] },
  { icon: "pound", t: "Competitive pricing", d: OFFICIAL_BUSINESS_FACTS.employerServicePoints[2] },
  { icon: "shield", t: "Accountable advice", d: OFFICIAL_BUSINESS_FACTS.employerServicePoints[3] },
  { icon: "handshake", t: "Quality matches", d: OFFICIAL_BUSINESS_FACTS.employerServicePoints[4] },
];

export default function EmployersPage() {
  const employerVoices = TESTIMONIALS.filter((t) => t.kind === "employer").slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="building" size={14} /> For employers</>}
        title="Staffing partners who get it right first time"
        sub="Permanent, temporary, full-time and part-time recruitment across Coventry, Warwickshire and the West Midlands. Employer advice is always free."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
          <Button to="/contact" variant="light" size="lg" icon="arrowRight">Hire staff</Button>
          <Button to="/contact" variant="ghost" size="lg" iconLeft="phone">Talk to a consultant</Button>
        </div>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead
            align="center"
            eyebrow={<><Icon name="target" size={14} /> Employer service</>}
            title="Official employer service points"
            sub="Static public facts from the official website, integrated into this concept prototype."
            max={660}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18, marginTop: 44 }} className="cards-3">
            {SERVICE_POINTS.map((s, i) => (
              <Reveal key={s.t} d={(i % 5) + 1} className="card" style={{ padding: 26 }}>
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
          <SectionHead align="center" eyebrow={<><Icon name="layers" size={14} /> Sectors we cover</>} title="Specialists across commercial sectors" max={620} />
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
        sub="Our advice is free and the official website cites REC/BIOR membership and over 70 years of collective recruitment experience."
        primary={{ label: "Hire staff", to: "/contact" }}
        secondary={{ label: "Browse vacancies", to: "/vacancies" }}
      />
    </>
  );
}
