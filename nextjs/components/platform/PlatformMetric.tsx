import clsx from "clsx";
import type { DashboardMetric } from "@/lib/platform/types";
import { PlatformCard } from "./PlatformCard";
import { PlatformPill, type PlatformPillTone } from "./PlatformPill";

const toneMap: Record<DashboardMetric["tone"], PlatformPillTone> = {
  green: "green",
  blue: "blue",
  orange: "warm",
  red: "warm",
  neutral: "navy",
};

export interface PlatformMetricProps {
  metric: DashboardMetric;
  className?: string;
}

export function PlatformMetric({ metric, className }: PlatformMetricProps) {
  const tone = toneMap[metric.tone];

  return (
    <PlatformCard
      className={clsx(className)}
      eyebrow={<PlatformPill tone={tone}>{metric.change}</PlatformPill>}
      tone={tone}
      icon={metric.tone === "blue" ? "building" : "chart"}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1, fontWeight: 800 }}>
        {metric.value}
      </div>
      <h3 className="platform-card-title" style={{ marginTop: 12 }}>{metric.label}</h3>
      <p className="platform-muted" style={{ margin: "8px 0 0", lineHeight: 1.5, fontSize: 14 }}>
        {metric.description}
      </p>
    </PlatformCard>
  );
}
