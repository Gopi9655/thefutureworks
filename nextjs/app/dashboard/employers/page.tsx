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
import { employerRequests, matchSignals, platformJobs } from "@/data/platform";

export const metadata: Metadata = {
  title: "Employer dashboard concept",
  description: "Phase 2 premium employer dashboard shell using synthetic employer request and job records.",
};

const requestStatusSummary = ["intake", "shortlisting", "interviewing"].map((status) => ({
  status,
  count: employerRequests.filter((request) => request.status === status).length,
}));

export default function EmployerDashboardPage() {
  return (
    <PlatformShell>
      <PlatformPageHeader
        eyebrow="Employer intelligence"
        icon="briefcase"
        title={<>Employer demand <span className="platform-gradient-text">command view</span></>}
        description="A premium concept shell for employer requests, job opportunities and trust-led consultant review. All data is synthetic."
        actions={[
          { label: "Request staff", href: "/request-staff", icon: "arrowRight" },
          { label: "Existing employers page", href: "/employers", icon: "arrowUpRight", variant: "outline" },
        ]}
        aside={
          <div>
            <PlatformPill tone="blue" icon="building">Coventry trust layer</PlatformPill>
            <h2 className="platform-card-title" style={{ fontSize: 24, marginTop: 18 }}>Employer request summary</h2>
            <p className="platform-muted" style={{ lineHeight: 1.6, margin: "12px 0 18px" }}>
              Blue surfaces highlight employer confidence, clear status and future consultant accountability.
            </p>
            <PlatformFieldList
              items={[
                { label: "Requests", value: employerRequests.length },
                { label: "Open job records", value: platformJobs.length },
                { label: "Match signals", value: matchSignals.length },
              ]}
            />
          </div>
        }
      />

      <PlatformSection
        id="employer-boundary"
        eyebrow={<><Icon name="shield" size={14} /> Prototype data</>}
        title="Employer records are placeholders"
        description="No live employer briefs, admin actions, CRM integrations or backend workflows are implemented in Phase 2."
      >
        <div className="platform-grid-3">
          {requestStatusSummary.map((item) => (
            <PlatformCard key={item.status} icon="chart" tone="blue">
              <PlatformPill tone="blue">{item.status}</PlatformPill>
              <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1, fontWeight: 800 }}>{item.count}</div>
              <p className="platform-muted" style={{ margin: "10px 0 0", lineHeight: 1.5 }}>Synthetic request count by concept status.</p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="employer-requests"
        tone="navy"
        eyebrow={<><Icon name="building" size={14} /> Employer requests</>}
        title="Demand cards for a future consultant dashboard"
        description="The request model is static, typed and deliberately separated from any real CRM or booking workflow."
      >
        <div className="platform-grid-3">
          {employerRequests.map((request) => (
            <PlatformCard
              key={request.id}
              title={request.employerName}
              icon="building"
              tone="blue"
              eyebrow={<PlatformPill tone={request.priority === "urgent" ? "warm" : "blue"}>{request.priority}</PlatformPill>}
              footer={<PlatformPill tone="navy">{request.rolesNeeded.length} role groups</PlatformPill>}
            >
              <p className="platform-muted" style={{ margin: 0, lineHeight: 1.5 }}>{request.notes}</p>
              <PlatformFieldList
                items={[
                  { label: "Sector", value: request.sector },
                  { label: "Location", value: request.location },
                  { label: "Contract", value: request.contractType },
                  { label: "Target", value: request.targetStart },
                ]}
              />
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="employer-jobs"
        eyebrow={<><Icon name="briefcase" size={14} /> Job opportunities</>}
        title="Opportunity records tied to employer demand"
        description="Green accents identify job and candidate opportunity inside an employer-led dashboard view."
      >
        <div className="platform-grid-4">
          {platformJobs.map((job) => (
            <PlatformCard
              key={job.id}
              title={job.title}
              icon="briefcase"
              tone="green"
              eyebrow={<PlatformPill tone="green">{job.status}</PlatformPill>}
            >
              <PlatformFieldList
                items={[
                  { label: "Sector", value: job.sector },
                  { label: "Location", value: job.location },
                  { label: "Type", value: job.type },
                  { label: "Salary", value: job.salaryBand },
                ]}
              />
              <div className="platform-progress" aria-hidden="true" style={{ marginTop: 18 }}>
                <span style={{ width: `${Math.min(100, job.signalIds.length * 36)}%` }} />
              </div>
              <p className="platform-muted" style={{ margin: "10px 0 0", fontSize: 13.5 }}>
                {job.signalIds.length} synthetic match signal{job.signalIds.length === 1 ? "" : "s"} linked.
              </p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection tight>
        <PlatformCTA
          eyebrow="Employer concept"
          title="Employer shell is prepared for Phase 3 workflow design"
          description="Next work can prototype request states, shortlist review and consultant handoff without adding production backend behavior."
          actions={[
            { label: "Open candidate dashboard", href: "/dashboard/candidates", icon: "arrowRight" },
            { label: "Request staff concept", href: "/request-staff", icon: "arrowUpRight" },
          ]}
        />
      </PlatformSection>
    </PlatformShell>
  );
}
