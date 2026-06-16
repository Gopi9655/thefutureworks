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
import { candidateProfiles, employerRequests, platformJobs } from "@/data/platform";

export const metadata: Metadata = {
  title: "Request staff concept",
  description: "Phase 2 premium request-staff concept route for Advanced Platform v2.",
};

const intakeSteps = [
  {
    title: "Brief capture",
    icon: "doc",
    tone: "blue" as const,
    body: "A structured concept for role, salary, working pattern, location and target start details.",
  },
  {
    title: "Consultant review",
    icon: "shield",
    tone: "navy" as const,
    body: "A future review layer for role quality, compliance checks and candidate fit before action.",
  },
  {
    title: "Shortlist direction",
    icon: "target",
    tone: "green" as const,
    body: "A data-shaped shortlist concept that connects employer demand to synthetic candidate readiness.",
  },
];

export default function RequestStaffPage() {
  return (
    <PlatformShell>
      <PlatformPageHeader
        eyebrow="Employer intake concept"
        icon="building"
        title={<>A clearer way to <span className="platform-gradient-text">request staff</span></>}
        description="A premium static shell for future employer intake. It explains the direction without submitting live requests, storing details or creating production vacancies."
        actions={[
          { label: "View dashboard", href: "/dashboard", icon: "arrowRight" },
          { label: "Existing employer page", href: "/employers", icon: "arrowUpRight", variant: "outline" },
        ]}
        aside={
          <div>
            <PlatformPill tone="blue" icon="building">Employer trust layer</PlatformPill>
            <h2 className="platform-card-title" style={{ fontSize: 24, marginTop: 18 }}>Static intake preview</h2>
            <p className="platform-muted" style={{ lineHeight: 1.6, margin: "12px 0 18px" }}>
              Phase 2 defines the layout and data structure only. There is no CV upload, admin auth, database write or live request workflow.
            </p>
            <PlatformFieldList
              items={[
                { label: "Concept requests", value: employerRequests.length },
                { label: "Opportunity records", value: platformJobs.length },
                { label: "Synthetic candidates", value: candidateProfiles.length },
              ]}
            />
          </div>
        }
      />

      <PlatformSection
        id="request-boundary"
        eyebrow={<><Icon name="shield" size={14} /> Prototype boundary</>}
        title="A concept intake shell, not a live hiring form"
        description="The route is intentionally static and marked as prototype-only while the visual system and information architecture mature."
      >
        <PlatformCard icon="shield" tone="blue">
          <p className="platform-muted" style={{ margin: 0, lineHeight: 1.6 }}>
            These v2 pages are a high-fidelity platform concept. They are not the official thefutureworks website and do not submit, store or process live employer requests.
          </p>
        </PlatformCard>
      </PlatformSection>

      <PlatformSection
        id="intake-model"
        tone="navy"
        eyebrow={<><Icon name="layers" size={14} /> Intake model</>}
        title="Premium staffing workflow scaffold"
        description="Green marks opportunity and candidate momentum. Blue marks employer trust, clarity and Coventry-rooted service."
      >
        <div className="platform-grid-3">
          {intakeSteps.map((step) => (
            <PlatformCard
              key={step.title}
              title={step.title}
              icon={step.icon}
              tone={step.tone}
              eyebrow={<PlatformPill tone={step.tone}>Phase 2 shell</PlatformPill>}
            >
              <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{step.body}</p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="request-records"
        eyebrow={<><Icon name="briefcase" size={14} /> Employer requests</>}
        title="Synthetic request summary"
        description="Placeholder employer concepts demonstrate the structure of a future intake dashboard without using real client data."
      >
        <div className="platform-grid-3">
          {employerRequests.map((request) => (
            <PlatformCard
              key={request.id}
              title={request.employerName}
              icon="building"
              tone="blue"
              eyebrow={<PlatformPill tone={request.priority === "urgent" ? "warm" : "blue"}>{request.priority}</PlatformPill>}
            >
              <p className="platform-muted" style={{ margin: 0, lineHeight: 1.5 }}>{request.notes}</p>
              <PlatformFieldList
                items={[
                  { label: "Sector", value: request.sector },
                  { label: "Location", value: request.location },
                  { label: "Contract", value: request.contractType },
                  { label: "Status", value: request.status },
                ]}
                className="platform-muted"
              />
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="request-opportunities"
        eyebrow={<><Icon name="target" size={14} /> Opportunities</>}
        title="Job opportunity cards"
        description="Concept job records show how future request intake could connect to role cards and match signals."
      >
        <div className="platform-grid-4">
          {platformJobs.map((job) => (
            <PlatformCard
              key={job.id}
              title={job.title}
              icon="briefcase"
              tone="green"
              eyebrow={<PlatformPill tone="green">{job.status}</PlatformPill>}
              footer={<PlatformPill tone="navy">{job.signalIds.length} match signals</PlatformPill>}
            >
              <PlatformFieldList
                items={[
                  { label: "Sector", value: job.sector },
                  { label: "Location", value: job.location },
                  { label: "Mode", value: job.workMode },
                  { label: "Band", value: job.salaryBand },
                ]}
              />
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection tight>
        <PlatformCTA
          eyebrow="Employer concept"
          title="Ready for Phase 3 interaction design"
          description="The request-staff shell is now prepared for future prototype interactions, validation states and responsive visual QA."
          actions={[
            { label: "Open employer dashboard", href: "/dashboard/employers", icon: "arrowRight" },
            { label: "Existing contact route", href: "/contact", icon: "arrowUpRight" },
          ]}
        />
      </PlatformSection>
    </PlatformShell>
  );
}
