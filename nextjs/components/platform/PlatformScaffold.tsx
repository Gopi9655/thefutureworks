import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { Button, type ButtonVariant } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/primitives";
import { PageHero, SectionHead } from "@/components/sections";
import type { DashboardMetric } from "@/lib/platform/types";

const toneColor: Record<DashboardMetric["tone"], string> = {
  green: "var(--g-green)",
  blue: "var(--g-blue)",
  orange: "var(--g-orange)",
  red: "var(--g-red)",
  neutral: "var(--t-ink-mut)",
};

export interface PlatformAction {
  label: string;
  href: string;
  icon?: string;
  variant?: ButtonVariant;
}

export function PlatformPageIntro({
  eyebrow,
  icon = "sparkles",
  title,
  description,
  actions = [],
}: {
  eyebrow: string;
  icon?: string;
  title: string;
  description: string;
  actions?: PlatformAction[];
}) {
  return (
    <PageHero
      eyebrow={<><Icon name={icon} size={14} /> {eyebrow}</>}
      title={title}
      sub={description}
    >
      {actions.length > 0 && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
          {actions.map((action, index) => (
            <Button
              key={action.href}
              to={action.href}
              variant={action.variant ?? (index === 0 ? "light" : "ghost")}
              size="lg"
              icon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </PageHero>
  );
}

export function PlatformSection({
  eyebrow,
  title,
  sub,
  children,
  tone = "paper",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "paper-2";
}) {
  return (
    <section className={clsx(tone === "paper-2" ? "bg-paper-2" : "bg-paper", "section")}>
      <div className="wrap">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} max={720} />
        <div style={{ marginTop: 34 }}>{children}</div>
      </div>
    </section>
  );
}

export function PlatformPrototypeNote() {
  return (
    <Reveal className="card" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
      <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: "rgba(30,111,184,0.10)", color: "var(--g-blue)", flex: "0 0 auto" }}>
        <Icon name="shield" size={21} />
      </span>
      <div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 650 }}>Concept scaffold only</h2>
        <p className="t-mut" style={{ margin: "7px 0 0", lineHeight: 1.55 }}>
          These v2 routes use synthetic placeholder data for a high-fidelity platform prototype. They are not the official thefutureworks website and do not submit, store or process live requests.
        </p>
      </div>
    </Reveal>
  );
}

export function PlatformMetricGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div className="cards-3" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 18 }}>
      {metrics.map((metric, index) => (
        <Reveal key={metric.id} d={(index % 4) + 1} className="card" style={{ padding: 24 }}>
          <span className="chip" style={{ color: toneColor[metric.tone], borderColor: "currentColor" }}>{metric.change}</span>
          <div style={{ marginTop: 18, fontFamily: "var(--font-display)", color: "var(--ink-900)", fontSize: 38, lineHeight: 1, fontWeight: 700 }}>
            {metric.value}
          </div>
          <h3 style={{ margin: "12px 0 0", fontSize: 16.5, fontFamily: "var(--font-display)" }}>{metric.label}</h3>
          <p className="t-mut" style={{ margin: "8px 0 0", lineHeight: 1.5, fontSize: 14 }}>{metric.description}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function PlatformCardGrid({
  children,
  columns = 3,
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}) {
  return (
    <div className="cards-3" style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 18 }}>
      {children}
    </div>
  );
}

export function PlatformRouteCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="card card-hover" style={{ padding: 24, color: "inherit", textDecoration: "none", display: "block" }}>
      <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 12, background: "rgba(95,168,42,0.10)", color: "var(--g-green)" }}>
        <Icon name={icon} size={21} />
      </span>
      <h3 style={{ margin: "18px 0 0", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 650 }}>{title}</h3>
      <p className="t-mut" style={{ margin: "8px 0 16px", lineHeight: 1.55 }}>{description}</p>
      <span className="chip">Open scaffold <Icon name="arrowRight" size={13} /></span>
    </Link>
  );
}

export function PlatformRecordPanel({
  title,
  meta,
  children,
  icon = "doc",
  accent = "var(--g-blue)",
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  icon?: string;
  accent?: string;
}) {
  return (
    <Reveal className="card" style={{ padding: 24, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
        <div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 650 }}>{title}</h3>
          {meta && <p className="t-mut" style={{ margin: "5px 0 0", fontSize: 13.5 }}>{meta}</p>}
        </div>
        <span style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, background: `${accent}18`, color: accent, flex: "0 0 auto" }}>
          <Icon name={icon} size={20} />
        </span>
      </div>
      <div style={{ marginTop: 18 }}>{children}</div>
    </Reveal>
  );
}

export function PlatformFieldList({
  items,
  style,
}: {
  items: { label: string; value: ReactNode }[];
  style?: CSSProperties;
}) {
  return (
    <dl style={{ display: "grid", gap: 12, margin: 0, ...style }}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline", borderBottom: "1px solid var(--paper-line)", paddingBottom: 10 }}>
          <dt className="t-mut" style={{ fontSize: 13.5 }}>{item.label}</dt>
          <dd style={{ margin: 0, textAlign: "right", fontWeight: 700, color: "var(--ink-900)" }}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
