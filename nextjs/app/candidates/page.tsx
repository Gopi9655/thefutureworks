import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { Button } from "@/components/Button";
import { PageHero, CTABand, SectionHead } from "@/components/sections";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";

export const metadata: Metadata = {
  title: "For candidates",
  description: "How thefutureworks supports commercial candidates, Coventry University students and graduates.",
};

const STEPS = [
  { icon: "send", t: "Register & share your goals", d: "Email your CV in Word format or call us. You don't have to be a student or graduate." },
  { icon: "target", t: "Get matched to real roles", d: "We hand-pick vacancies that fit your skills, experience and salary expectations." },
  { icon: "compass", t: "Interview with us first", d: "We brief you, prep you and present you at your best to every client." },
  { icon: "checkCircle", t: "Placed & supported", d: "CV advice, interview prep and honest market-salary guidance throughout." },
];

export default function CandidatesPage() {
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="users" size={14} /> For candidates</>}
        title="Find a role that actually fits"
        sub={`thefutureworks works with ${OFFICIAL_BUSINESS_FACTS.identity.audiences.join(", ")} across ${OFFICIAL_BUSINESS_FACTS.identity.serviceArea}.`}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
          <Button to="/vacancies" variant="light" size="lg" icon="arrowRight">Browse jobs</Button>
          <Button to="/apply" variant="ghost" size="lg" iconLeft="send">Submit your CV</Button>
        </div>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap">
          <SectionHead align="center" eyebrow={<><Icon name="compass" size={14} /> How it works</>} title="Four simple steps" sub="From first conversation to first day, we're with you the whole way." max={620} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 44 }} className="cards-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} d={(i % 4) + 1} className="card" style={{ padding: 26 }}>
                <span style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 13, background: "rgba(95,168,42,0.10)", border: "1px solid rgba(95,168,42,0.20)" }}>
                  <Icon name={s.icon} size={22} style={{ color: "var(--g-green)" }} />
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17.5, margin: "16px 0 0" }}>{s.t}</h3>
                <p className="t-mut" style={{ fontSize: 14.5, lineHeight: 1.55, margin: "8px 0 0" }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to take the next step?"
        sub="Register today and we'll be in touch with roles that match."
        primary={{ label: "Submit your CV", to: "/apply" }}
        secondary={{ label: "Browse jobs", to: "/vacancies" }}
      />
    </>
  );
}
