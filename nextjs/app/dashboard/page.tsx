import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import {
  PlatformCard,
  PlatformCTA,
  PlatformFieldList,
  PlatformMetric,
  PlatformPageHeader,
  PlatformPill,
  PlatformSection,
  PlatformShell,
} from "@/components/platform";
import { candidateProfiles, dashboardMetrics, employerRequests, matchSignals, platformJobs } from "@/data/platform";
import { platformRoutes } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Platform dashboard concept",
  description: "Phase 2 premium platform shell for the Advanced Platform v2 dashboard concept.",
};

const pipelineSummary = [
  { label: "Synthetic profiles", value: candidateProfiles.length, tone: "green" as const },
  { label: "High-fit profiles", value: candidateProfiles.filter((candidate) => candidate.matchScore >= 85).length, tone: "blue" as const },
  { label: "Modelled signals", value: matchSignals.length, tone: "warm" as const },
];

export default function DashboardPage() {
  return (
    <PlatformShell>
      <PlatformPageHeader
        eyebrow="Advanced Platform v2"
        icon="chart"
        title={<><span className="platform-gradient-text">Recruitment intelligence</span> shell</>}
        description="A premium concept dashboard for matching employer demand, candidate readiness and consultant review signals. It uses synthetic records only."
        actions={[
          { label: "Request staff", href: "/request-staff", icon: "arrowRight" },
          { label: "Candidate dashboard", href: "/dashboard/candidates", icon: "users" },
          { label: "Employer dashboard", href: "/dashboard/employers", icon: "building", variant: "outline" },
        ]}
        aside={
          <div>
            <PlatformPill tone="blue" icon="shield">Prototype boundary</PlatformPill>
            <h2 className="platform-card-title" style={{ fontSize: 24, marginTop: 18 }}>No live systems connected</h2>
            <p className="platform-muted" style={{ lineHeight: 1.6, margin: "12px 0 18px" }}>
              This shell demonstrates the information architecture for Phase 2. It does not read from a database, CMS, upload service or authentication layer.
            </p>
            <PlatformFieldList
              items={[
                { label: "Candidate records", value: candidateProfiles.length },
                { label: "Employer requests", value: employerRequests.length },
                { label: "Job opportunities", value: platformJobs.length },
                { label: "Match signals", value: matchSignals.length },
              ]}
            />
          </div>
        }
      />

      <PlatformSection
        id="dashboard-metrics"
        eyebrow={<><Icon name="trendingUp" size={14} /> Platform signals</>}
        title="Operational metrics for the concept layer"
        description="The metric cards are static, typed and intentionally synthetic so the platform shell can be verified without backend dependencies."
      >
        <div className="platform-grid-4">
          {dashboardMetrics.map((metric) => <PlatformMetric key={metric.id} metric={metric} />)}
        </div>
      </PlatformSection>

      <PlatformSection
        id="dashboard-routes"
        tone="navy"
        eyebrow={<><Icon name="layers" size={14} /> Shell map</>}
        title="The v2 platform routes remain separate from the v1 website"
        description="The homepage and all existing public routes stay intact while the concept platform evolves behind clear route boundaries."
      >
        <div className="platform-grid-4">
          {platformRoutes.map((route) => (
            <PlatformCard
              key={route.href}
              href={route.href}
              title={route.label}
              icon={route.icon}
              tone={route.href.includes("candidate") ? "green" : "blue"}
              footer={<PlatformPill tone="navy" icon="arrowRight">Open route</PlatformPill>}
            >
              <p className="platform-muted" style={{ lineHeight: 1.55, margin: 0 }}>{route.description}</p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="pipeline-summary"
        eyebrow={<><Icon name="users" size={14} /> Pipeline overview</>}
        title="Candidate and employer summaries"
        description="Compact summaries make the shell feel operational while staying firmly in prototype territory."
      >
        <div className="platform-grid-3">
          {pipelineSummary.map((item) => (
            <PlatformCard key={item.label} tone={item.tone} icon={item.tone === "green" ? "users" : "target"}>
              <PlatformPill tone={item.tone}>{item.label}</PlatformPill>
              <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1, fontWeight: 800 }}>
                {item.value}
              </div>
              <p className="platform-muted" style={{ margin: "10px 0 0", lineHeight: 1.5 }}>
                Placeholder count from the synthetic Phase 1 data model.
              </p>
            </PlatformCard>
          ))}
        </div>

        <div className="platform-grid-2" style={{ marginTop: 22 }}>
          <PlatformCard title="Employer request summary" icon="building" tone="blue">
            <PlatformFieldList
              items={employerRequests.map((request) => ({
                label: request.employerName,
                value: request.status,
              }))}
            />
          </PlatformCard>
          <PlatformCard title="Job opportunity summary" icon="briefcase" tone="green">
            <PlatformFieldList
              items={platformJobs.map((job) => ({
                label: job.title,
                value: job.status,
              }))}
            />
          </PlatformCard>
        </div>
      </PlatformSection>

      <PlatformSection
        id="match-signals"
        eyebrow={<><Icon name="target" size={14} /> Match model</>}
        title="Synthetic match signal cards"
        description="Signals show where a future consultant review workflow could explain why a candidate and role are aligned."
      >
        <div className="platform-grid-3">
          {matchSignals.slice(0, 6).map((signal) => (
            <PlatformCard
              key={signal.id}
              title={signal.label}
              icon={signal.kind === "location" ? "mapPin" : "target"}
              tone={signal.kind === "availability" || signal.kind === "skill" ? "green" : "blue"}
              eyebrow={<PlatformPill tone="navy">{signal.kind} - {signal.strength}%</PlatformPill>}
            >
              <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{signal.rationale}</p>
            </PlatformCard>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection tight>
        <PlatformCTA
          title="Phase 2 stops at the shell"
          description="The next phase can explore the final homepage concept, richer interaction states and visual QA without adding production backend claims."
          actions={[
            { label: "View request scaffold", href: "/request-staff", icon: "arrowRight" },
            { label: "Read v2 roadmap", href: "/about", icon: "arrowUpRight" },
          ]}
        />
      </PlatformSection>
    </PlatformShell>
  );
}
