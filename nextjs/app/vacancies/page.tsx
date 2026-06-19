import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHero, CTABand } from "@/components/sections";
import { JobsMarketplace } from "@/components/jobs";
import { getAllJobs, getJobFilterOptions } from "@/lib/platform/jobs";
import { OFFICIAL_BUSINESS_FACTS } from "@/data/official-business-facts";
import { SECTORS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Vacancies",
  description: "Browse a static official website vacancies snapshot in the concept prototype.",
};

export default function VacanciesPage() {
  const jobs = getAllJobs();
  const options = getJobFilterOptions(jobs);
  const featured = jobs.filter((j) => j.featured);

  return (
    <>
      <PageHero
        eyebrow={<><Icon name="search" size={14} /> Jobs marketplace</>}
        title="Find your next role"
        sub={OFFICIAL_BUSINESS_FACTS.vacancySnapshot.note}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <h2 className="h3" style={{ margin: 0 }}>{jobs.length} snapshot roles</h2>
            <span className="t-mut" style={{ fontSize: 14 }}>{featured.length} highlighted from the static snapshot</span>
          </div>
          <JobsMarketplace jobs={jobs} options={options} />
        </div>
      </section>

      <CTABand
        title="Can't see the right role?"
        sub="This prototype is not a live feed. Check the official website for the latest vacancies before applying."
        primary={{ label: "Submit your CV", to: "/apply" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </>
  );
}
