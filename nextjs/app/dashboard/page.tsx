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
import { candidateProfiles, consultantActions, dashboardMetrics, employerRequests, matchSignals, platformJobs, reviewFlags } from "@/data/platform";
import { platformRoutes } from "@/lib/platform";
import type { ConsultantActionStatus, ReviewFlagSeverity } from "@/lib/platform/types";

export const metadata: Metadata = {
  title: "Platform dashboard concept",
  description: "A premium concept dashboard for the Advanced Platform v2 recruitment-intelligence shell. Synthetic data only.",
};

const pipelineSummary = [
  { label: "Synthetic profiles", value: candidateProfiles.length, tone: "green" as const },
  { label: "High-fit profiles", value: candidateProfiles.filter((candidate) => candidate.matchScore >= 85).length, tone: "blue" as const },
  { label: "Modelled signals", value: matchSignals.length, tone: "warm" as const },
];

const flagMeta: Record<ReviewFlagSeverity, { tone: "warm" | "blue" | "green"; icon: string; label: string }> = {
  action: { tone: "warm", icon: "shield", label: "Needs action" },
  watch: { tone: "blue", icon: "target", label: "Watch" },
  info: { tone: "green", icon: "checkCircle", label: "Ready" },
};

const actionMeta: Record<ConsultantActionStatus, { tone: "navy" | "blue" | "green"; label: string }> = {
  "todo": { tone: "navy", label: "To do" },
  "in-progress": { tone: "blue", label: "In progress" },
  "scheduled": { tone: "green", label: "Scheduled" },
};

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
              This shell demonstrates the platform information architecture. It does not read from a database, CMS, upload service or authentication layer.
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

      <PlatformSection
        id="review-flags"
        eyebrow={<><Icon name="shield" size={14} /> Quality review</>}
        title="Review flags for the human layer"
        description="Synthetic checks a consultant would clear before any introduction. Concept only — no automated decisions are made and nothing is enforced."
      >
        <div className="platform-grid-2">
          {reviewFlags.map((flag) => {
            const meta = flagMeta[flag.severity];
            return (
              <PlatformCard
                key={flag.id}
                title={flag.title}
                icon={meta.icon}
                tone={meta.tone}
                eyebrow={<PlatformPill tone={meta.tone}>{meta.label}</PlatformPill>}
                footer={<PlatformPill tone="navy" icon="briefcase">{flag.entity}</PlatformPill>}
              >
                <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{flag.detail}</p>
              </PlatformCard>
            );
          })}
        </div>
      </PlatformSection>

      <PlatformSection
        id="consultant-actions"
        eyebrow={<><Icon name="checkCircle" size={14} /> Consultant actions</>}
        title="Consultant action list"
        description="A concept to-do for the human review layer. Owners are synthetic initials; nothing here is scheduled, sent or executed."
      >
        <div className="card dash-actions" style={{ padding: "clamp(14px,2.4vw,22px)" }}>
          <ul className="dash-action-list">
            {consultantActions.map((action) => {
              const meta = actionMeta[action.status];
              return (
                <li key={action.id} className="dash-action">
                  <span className={`dash-action-dot dash-action-dot-${action.status}`} aria-hidden="true" />
                  <div className="dash-action-main">
                    <span className="dash-action-task">{action.task}</span>
                    <span className="dash-action-meta">{action.relatedTo} · {action.owner}</span>
                  </div>
                  <div className="dash-action-side">
                    <span className="dash-action-due"><Icon name="clock" size={13} /> {action.due}</span>
                    <PlatformPill tone={meta.tone}>{meta.label}</PlatformPill>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PlatformSection>

      <PlatformSection tight>
        <PlatformCTA
          title="A platform shaped around human review"
          description="This concept dashboard pairs synthetic match signals with review flags and a consultant action list — illustrative only, with no production backend, admin or auth."
          actions={[
            { label: "Open request-staff concept", href: "/request-staff", icon: "arrowRight" },
            { label: "Read v2 roadmap", href: "/about", icon: "arrowUpRight" },
          ]}
        />
      </PlatformSection>
    </PlatformShell>
  );
}
