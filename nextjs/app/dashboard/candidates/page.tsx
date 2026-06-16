import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import {
  PlatformCardGrid,
  PlatformFieldList,
  PlatformPageIntro,
  PlatformPrototypeNote,
  PlatformRecordPanel,
  PlatformSection,
} from "@/components/platform/PlatformScaffold";
import { candidateProfiles, matchSignals } from "@/data/platform";

export const metadata: Metadata = {
  title: "Candidate dashboard concept",
  description: "Phase 1 scaffold route for synthetic candidate profile records.",
};

export default function CandidateDashboardPage() {
  return (
    <>
      <PlatformPageIntro
        eyebrow="Candidate intelligence"
        icon="users"
        title="Candidate dashboard scaffold"
        description="Synthetic candidate profile cards for future shortlist, filter and matching views. No real candidate data is used."
        actions={[
          { label: "Dashboard", href: "/dashboard", icon: "arrowRight" },
          { label: "Existing candidates page", href: "/candidates", icon: "arrowUpRight" },
        ]}
      />

      <PlatformSection
        eyebrow={<><Icon name="shield" size={14} /> Prototype data</>}
        title="Synthetic profiles only"
        sub="The records below are placeholders for a high-fidelity platform concept."
      >
        <PlatformPrototypeNote />
      </PlatformSection>

      <PlatformSection
        tone="paper-2"
        eyebrow={<><Icon name="users" size={14} /> Candidate records</>}
        title="Candidate profile scaffold"
        sub="Typed sample records with sectors, skills, work mode and availability fields."
      >
        <PlatformCardGrid columns={4}>
          {candidateProfiles.map((candidate) => {
            const signals = matchSignals.filter((signal) => signal.candidateId === candidate.id);

            return (
              <PlatformRecordPanel
                key={candidate.id}
                title={candidate.displayName}
                meta={`${candidate.roleTarget} · ${candidate.location}`}
                icon="users"
                accent="var(--g-green)"
              >
                <PlatformFieldList
                  items={[
                    { label: "Match score", value: `${candidate.matchScore}%` },
                    { label: "Availability", value: candidate.availability },
                    { label: "Work mode", value: candidate.workMode },
                    { label: "Seniority", value: candidate.seniority },
                  ]}
                />
                <p className="t-mut" style={{ margin: "16px 0 12px", lineHeight: 1.55 }}>{candidate.summary}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {candidate.skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
                {signals.length > 0 && (
                  <p className="t-mut" style={{ margin: "14px 0 0", fontSize: 13.5 }}>
                    {signals.length} synthetic signal{signals.length === 1 ? "" : "s"} linked.
                  </p>
                )}
              </PlatformRecordPanel>
            );
          })}
        </PlatformCardGrid>
      </PlatformSection>
    </>
  );
}
