import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { PageHero, JobCard, CTABand } from "@/components/sections";
import { JOBS } from "@/data/jobs";
import { SECTORS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Vacancies",
  description: "Live vacancies across Coventry, Warwickshire and the West Midlands.",
};

export default function VacanciesPage() {
  const featured = JOBS.filter((j) => j.featured);
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="search" size={14} /> Live vacancies</>}
        title="Find your next role"
        sub="Permanent, temporary and part-time opportunities across the West Midlands — updated daily by our consultants."
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {SECTORS.slice(0, 6).map((s) => (
            <span key={s} className="chip on-dark">{s}</span>
          ))}
          <span className="chip on-dark">+{SECTORS.length - 6} more</span>
        </div>
      </PageHero>

      <section className="bg-paper section">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <h2 className="h3" style={{ margin: 0 }}>{JOBS.length} open roles</h2>
            <span className="t-mut" style={{ fontSize: 14 }}>{featured.length} featured this week</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="cards-3">
            {JOBS.map((j, i) => (
              <Reveal key={j.id} d={(i % 3) + 1}><JobCard job={j} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Can't see the right role?"
        sub="Register with us and we'll match you to vacancies as they come in."
        primary={{ label: "Submit your CV", to: "/apply" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </>
  );
}
