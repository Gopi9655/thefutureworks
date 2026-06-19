import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import {
  PlatformCard,
  PlatformCTA,
  PlatformFieldList,
  PlatformPageHeader,
  PlatformPill,
  PlatformSection,
  PlatformShell,
} from "@/components/platform";
import { candidateProfiles, matchSignals, platformJobs } from "@/data/platform";

export const metadata: Metadata = {
  title: "Candidate dashboard concept",
  description: "A premium candidate dashboard concept using synthetic candidate profile records only.",
};

const availabilitySummary = [
  { label: "Immediate", value: candidateProfiles.filter((candidate) => candidate.availability === "Immediate").length },
  { label: "Within three weeks", value: candidateProfiles.filter((candidate) => candidate.availability !== "One month").length },
  { label: "Hybrid ready", value: candidateProfiles.filter((candidate) => candidate.workMode === "Hybrid").length },
];

export default function CandidateDashboardPage() {
  return (
    <PlatformShell>
      <PlatformPageHeader
        eyebrow="Candidate intelligence"
        icon="users"
        title={<>Candidate pipeline <span className="platform-gradient-text">concept</span></>}
        description="A premium static dashboard for viewing synthetic candidate readiness, skills and match signals. No real candidate data is used."
        actions={[
          { label: "Back to dashboard", href: "/dashboard", icon: "arrowRight" },
          { label: "Existing candidates page", href: "/candidates", icon: "arrowUpRight", variant: "outline" },
        ]}
        aside={
          <div>
            <PlatformPill tone="green" icon="users">Opportunity pipeline</PlatformPill>
            <h2 className="platform-card-title" style={{ fontSize: 24, marginTop: 18 }}>Candidate readiness summary</h2>
            <p className="platform-muted" style={{ lineHeight: 1.6, margin: "12px 0 18px" }}>
              Profiles use placeholder names and concept-only attributes to test the v2 dashboard layout.
            </p>
            <PlatformFieldList
              items={[
                { label: "Profiles", value: candidateProfiles.length },
                { label: "Average score", value: `${Math.round(candidateProfiles.reduce((sum, candidate) => sum + candidate.matchScore, 0) / candidateProfiles.length)}%` },
                { label: "Signals", value: matchSignals.length },
              ]}
            />
          </div>
        }
      />

      <PlatformSection
        id="candidate-boundary"
        eyebrow={<><Icon name="shield" size={14} /> Prototype data</>}
        title="Synthetic candidate data only"
        description="The page demonstrates the future candidate intelligence shell without CV uploads, real profiles or authentication."
      >
        <div className="platform-grid-3">
          {availabilitySummary.map((item) => (
            <PlatformCard key={item.label} icon="clock" tone="green">
              <PlatformPill tone="green">{item.label}</PlatformPill>
              <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1, fontWeight: 800 }}>{item.value}</div>
              <p className="platform-muted" style={{ margin: "10px 0 0", lineHeight: 1.5 }}>Synthetic readiness count for shell layout testing.</p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="candidate-records"
        tone="navy"
        eyebrow={<><Icon name="users" size={14} /> Candidate records</>}
        title="Profile cards with skills, sectors and match context"
        description="Green surfaces emphasize candidate opportunity and movement through a future shortlist workflow."
      >
        <div className="platform-grid-4">
          {candidateProfiles.map((candidate) => {
            const signals = matchSignals.filter((signal) => signal.candidateId === candidate.id);

            return (
              <PlatformCard
                key={candidate.id}
                title={candidate.displayName}
                icon="users"
                tone="green"
                eyebrow={<PlatformPill tone="green">{candidate.matchScore}% match</PlatformPill>}
                footer={<PlatformPill tone="navy">{signals.length} linked signals</PlatformPill>}
              >
                <p className="platform-muted" style={{ margin: 0, lineHeight: 1.5 }}>{candidate.summary}</p>
                <PlatformFieldList
                  items={[
                    { label: "Target", value: candidate.roleTarget },
                    { label: "Location", value: candidate.location },
                    { label: "Available", value: candidate.availability },
                    { label: "Work mode", value: candidate.workMode },
                  ]}
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                  {candidate.skills.map((skill) => <PlatformPill key={skill} tone="green">{skill}</PlatformPill>)}
                </div>
              </PlatformCard>
            );
          })}
        </div>
      </PlatformSection>

      <PlatformSection
        id="candidate-matches"
        eyebrow={<><Icon name="target" size={14} /> Match signals</>}
        title="Candidate-to-role signal cards"
        description="Each card explains a future matching rationale while keeping the current data model static and transparent."
      >
        <div className="platform-grid-3">
          {matchSignals.map((signal) => {
            const job = platformJobs.find((record) => record.id === signal.jobId);

            return (
              <PlatformCard
                key={signal.id}
                title={signal.label}
                icon={signal.kind === "availability" ? "clock" : "target"}
                tone="green"
                eyebrow={<PlatformPill tone="green">{signal.strength}% strength</PlatformPill>}
              >
                <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{signal.rationale}</p>
                <PlatformFieldList
                  items={[
                    { label: "Signal", value: signal.kind },
                    { label: "Role", value: job?.title ?? "Concept role" },
                  ]}
                />
              </PlatformCard>
            );
          })}
        </div>
      </PlatformSection>

      <PlatformSection tight>
        <PlatformCTA
          eyebrow="Candidate concept"
          title="A candidate view built around readiness"
          description="A concept dashboard for filters, shortlist state and richer candidate cards — kept entirely synthetic, with no real candidate data in the prototype."
          actions={[
            { label: "Open employer dashboard", href: "/dashboard/employers", icon: "arrowRight" },
            { label: "Browse v1 vacancies", href: "/vacancies", icon: "arrowUpRight" },
          ]}
        />
      </PlatformSection>
    </PlatformShell>
  );
}
