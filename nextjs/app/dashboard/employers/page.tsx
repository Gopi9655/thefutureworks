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
import { employerRequests, platformJobs } from "@/data/platform";

export const metadata: Metadata = {
  title: "Employer dashboard concept",
  description: "Phase 1 scaffold route for synthetic employer request and job records.",
};

export default function EmployerDashboardPage() {
  return (
    <>
      <PlatformPageIntro
        eyebrow="Employer intelligence"
        icon="briefcase"
        title="Employer dashboard scaffold"
        description="Synthetic employer request and job record views for the Advanced Platform v2 prototype."
        actions={[
          { label: "Request staff", href: "/request-staff", icon: "arrowRight" },
          { label: "Existing employers page", href: "/employers", icon: "arrowUpRight" },
        ]}
      />

      <PlatformSection
        eyebrow={<><Icon name="shield" size={14} /> Prototype data</>}
        title="Employer model scaffold"
        sub="These cards use placeholder employer names and do not represent live briefs."
      >
        <PlatformPrototypeNote />
      </PlatformSection>

      <PlatformSection
        tone="paper-2"
        eyebrow={<><Icon name="building" size={14} /> Requests</>}
        title="Employer request records"
        sub="Typed synthetic request records for future intake and dashboard states."
      >
        <PlatformCardGrid columns={3}>
          {employerRequests.map((request) => (
            <PlatformRecordPanel
              key={request.id}
              title={request.employerName}
              meta={`${request.sector} · ${request.location}`}
              icon="building"
              accent="var(--g-blue)"
            >
              <PlatformFieldList
                items={[
                  { label: "Roles", value: request.rolesNeeded.length },
                  { label: "Contract", value: request.contractType },
                  { label: "Target", value: request.targetStart },
                  { label: "Status", value: request.status },
                ]}
              />
              <p className="t-mut" style={{ margin: "16px 0 0", lineHeight: 1.55 }}>{request.notes}</p>
            </PlatformRecordPanel>
          ))}
        </PlatformCardGrid>
      </PlatformSection>

      <PlatformSection
        eyebrow={<><Icon name="doc" size={14} /> Job records</>}
        title="Job record scaffold"
        sub="Placeholder job records connect employer requests to future match signals."
      >
        <PlatformCardGrid columns={4}>
          {platformJobs.map((job) => (
            <PlatformRecordPanel
              key={job.id}
              title={job.title}
              meta={`${job.sector} · ${job.location}`}
              icon="briefcase"
              accent="var(--g-green)"
            >
              <PlatformFieldList
                items={[
                  { label: "Type", value: job.type },
                  { label: "Work mode", value: job.workMode },
                  { label: "Salary", value: job.salaryBand },
                  { label: "Status", value: job.status },
                ]}
              />
              <p className="t-mut" style={{ margin: "16px 0 0", fontSize: 13.5 }}>
                {job.signalIds.length} synthetic match signal{job.signalIds.length === 1 ? "" : "s"} linked.
              </p>
            </PlatformRecordPanel>
          ))}
        </PlatformCardGrid>
      </PlatformSection>
    </>
  );
}
