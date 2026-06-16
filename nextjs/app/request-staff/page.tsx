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
import { employerRequests } from "@/data/platform";

export const metadata: Metadata = {
  title: "Request staff concept",
  description: "Phase 1 scaffold route for the Advanced Platform v2 request-staff concept.",
};

const intakeSteps = [
  {
    title: "Capture the role brief",
    icon: "doc",
    body: "A future structured intake view for role, location, work mode and target start details.",
  },
  {
    title: "Shape the shortlist",
    icon: "target",
    body: "A placeholder step for consultant review, match criteria and candidate readiness checks.",
  },
  {
    title: "Track the request",
    icon: "chart",
    body: "A dashboard-facing status path for intake, shortlisting, interview and filled states.",
  },
];

export default function RequestStaffPage() {
  return (
    <>
      <PlatformPageIntro
        eyebrow="Advanced Platform v2"
        icon="building"
        title="Request staff scaffold"
        description="A concept route for structured employer intake. This page does not submit live requests or create production vacancies."
        actions={[
          { label: "View dashboard", href: "/dashboard", icon: "arrowRight" },
          { label: "Existing employer page", href: "/employers", icon: "arrowUpRight" },
        ]}
      />

      <PlatformSection
        eyebrow={<><Icon name="shield" size={14} /> Prototype scope</>}
        title="Phase 1 intake architecture"
        sub="Small, build-safe route and data scaffolds for the future platform flow."
      >
        <PlatformPrototypeNote />
      </PlatformSection>

      <PlatformSection
        tone="paper-2"
        eyebrow={<><Icon name="layers" size={14} /> Intake model</>}
        title="Request flow placeholders"
        sub="These cards map the planned shape of the route without implementing forms, uploads, auth or backend storage."
      >
        <PlatformCardGrid columns={3}>
          {intakeSteps.map((step) => (
            <PlatformRecordPanel key={step.title} title={step.title} icon={step.icon} accent="var(--g-green)">
              <p className="t-mut" style={{ margin: 0, lineHeight: 1.55 }}>{step.body}</p>
            </PlatformRecordPanel>
          ))}
        </PlatformCardGrid>
      </PlatformSection>

      <PlatformSection
        eyebrow={<><Icon name="briefcase" size={14} /> Synthetic briefs</>}
        title="Sample employer request records"
        sub="Data-driven cards using placeholder employer concepts only."
      >
        <PlatformCardGrid columns={3}>
          {employerRequests.map((request) => (
            <PlatformRecordPanel
              key={request.id}
              title={request.employerName}
              meta={`${request.sector} · ${request.location}`}
              icon="building"
            >
              <PlatformFieldList
                items={[
                  { label: "Roles", value: request.rolesNeeded.join(", ") },
                  { label: "Contract", value: request.contractType },
                  { label: "Priority", value: request.priority },
                  { label: "Status", value: request.status },
                ]}
              />
              <p className="t-mut" style={{ margin: "16px 0 0", lineHeight: 1.55 }}>{request.notes}</p>
            </PlatformRecordPanel>
          ))}
        </PlatformCardGrid>
      </PlatformSection>
    </>
  );
}
