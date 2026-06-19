import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { PageHero, CTABand, SectionHead, TestimonialCard, StatBand } from "@/components/sections";
import { DIFFERENTIATORS, ACCREDITATIONS, TESTIMONIALS } from "@/data/content";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";

export const metadata: Metadata = {
  title: "About us",
  description: "Public business facts for a concept prototype of thefutureworks.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="cap" size={14} /> About us</>}
        title="Recruitment with a social purpose"
        sub="thefutureworks is a commercial recruitment agency owned by Coventry University, a division of PeoplesFuture Ltd, established in 2005 and based in Coventry."
      />

      <section className="bg-ink-2" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
        <div className="wrap">
          <StatBand />
        </div>
      </section>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead
            align="center"
            eyebrow={<><Icon name="sparkles" size={14} /> Public facts</>}
            title="What sets thefutureworks apart"
            sub={`This prototype uses public facts manually captured from official pages. thefutureworks supports ${OFFICIAL_BUSINESS_FACTS.identity.serviceArea}.`}
            max={700}
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 48 }} className="cards-3">
            {DIFFERENTIATORS.map((d, i) => (
              <Reveal key={d.title} d={(i % 3) + 1} className="card card-hover" style={{ padding: 28 }}>
                <span style={{ display: "grid", placeItems: "center", width: 50, height: 50, borderRadius: 14, background: "rgba(95,168,42,0.10)", border: "1px solid rgba(95,168,42,0.20)" }}>
                  <Icon name={d.icon} size={24} style={{ color: "var(--g-green)" }} />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18.5, margin: "18px 0 0", letterSpacing: "-.01em" }}>{d.title}</h3>
                <p className="t-mut" style={{ margin: "9px 0 0", fontSize: 14.5, lineHeight: 1.55 }}>{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="shield" size={14} /> Accreditations</>} title="Trust you can verify" max={620} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 40, maxWidth: 860, marginInline: "auto" }} className="cards-2">
            {ACCREDITATIONS.map((a, i) => (
              <Reveal key={a.abbr} d={(i % 2) + 1} className="card" style={{ padding: 28, display: "flex", gap: 18, alignItems: "flex-start" }}>
                <span style={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 14, flex: "0 0 auto", background: "var(--ink-900)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{a.abbr}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, margin: 0 }}>{a.name}</h3>
                  <p className="t-mut" style={{ fontSize: 14, lineHeight: 1.55, margin: "8px 0 0" }}>{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead eyebrow={<><Icon name="quote" size={14} /> Testimonials</>} title="People at the heart of it" max={460} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 36 }} className="cards-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => <Reveal key={i} d={(i % 3) + 1}><TestimonialCard t={t} light /></Reveal>)}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
