import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import {
  PlatformCardGrid,
  PlatformMetricGrid,
  PlatformPageIntro,
  PlatformPrototypeNote,
  PlatformRecordPanel,
  PlatformRouteCard,
  PlatformSection,
} from "@/components/platform/PlatformScaffold";
import { dashboardMetrics, matchSignals } from "@/data/platform";
import { platformRoutes } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Platform dashboard concept",
  description: "Phase 1 scaffold route for the Advanced Platform v2 dashboard concept.",
};

export default function DashboardPage() {
  const childRoutes = platformRoutes.filter((route) => route.href !== "/dashboard");

  return (
    <>
      <PlatformPageIntro
        eyebrow="Advanced Platform v2"
        icon="chart"
        title="Platform dashboard scaffold"
        description="A synthetic overview of demand, candidate readiness and matching signals for the Phase 1 architecture prototype."
        actions={[
          { label: "Candidates", href: "/dashboard/candidates", icon: "arrowRight" },
          { label: "Employers", href: "/dashboard/employers", icon: "arrowRight" },
        ]}
      />

      <PlatformSection
        eyebrow={<><Icon name="sparkles" size={14} /> Concept status</>}
        title="Dashboard shell"
        sub="The v2 dashboard starts as typed, data-driven scaffolding. No production systems are connected."
      >
        <PlatformPrototypeNote />
        <div style={{ marginTop: 28 }}>
          <PlatformMetricGrid metrics={dashboardMetrics} />
        </div>
      </PlatformSection>

      <PlatformSection
        tone="paper-2"
        eyebrow={<><Icon name="layers" size={14} /> Routes</>}
        title="Platform route map"
        sub="Phase 1 adds route shells without replacing the existing homepage or v1 routes."
      >
        <PlatformCardGrid columns={3}>
          {childRoutes.map((route) => (
            <PlatformRouteCard key={route.href} href={route.href} icon={route.icon} title={route.label} description={route.description} />
          ))}
        </PlatformCardGrid>
      </PlatformSection>

      <PlatformSection
        eyebrow={<><Icon name="target" size={14} /> Match signals</>}
        title="Synthetic match signal preview"
        sub="Placeholder records for Phase 2 filtering, graph and review concepts."
      >
        <PlatformCardGrid columns={3}>
          {matchSignals.slice(0, 3).map((signal) => (
            <PlatformRecordPanel key={signal.id} title={signal.label} meta={`${signal.kind} · ${signal.strength}%`} icon="target" accent="var(--g-orange)">
              <p className="t-mut" style={{ margin: 0, lineHeight: 1.55 }}>{signal.rationale}</p>
            </PlatformRecordPanel>
          ))}
        </PlatformCardGrid>
      </PlatformSection>
    </>
  );
}
