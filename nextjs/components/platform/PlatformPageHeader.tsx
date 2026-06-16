import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PlatformPill } from "./PlatformPill";

export interface PlatformAction {
  label: string;
  href: string;
  icon?: string;
  variant?: ButtonVariant;
}

export interface PlatformPageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  icon?: string;
  actions?: PlatformAction[];
  aside?: ReactNode;
}

export function PlatformPageHeader({
  eyebrow,
  title,
  description,
  icon = "sparkles",
  actions = [],
  aside,
}: PlatformPageHeaderProps) {
  return (
    <header className="platform-hero">
      <span className="platform-orb-green" aria-hidden="true" style={{ left: "-9%", top: "12%" }} />
      <span className="platform-orb-blue" aria-hidden="true" style={{ right: "-12%", top: "4%" }} />
      <div className="wrap platform-hero-inner">
        <div className="platform-hero-copy">
          <div className="platform-eyebrow"><Icon name={icon} size={14} /> {eyebrow}</div>
          <h1 className="platform-title">{title}</h1>
          <p className="platform-lead">{description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            <PlatformPill tone="green" icon="shield">Concept prototype</PlatformPill>
            <PlatformPill tone="blue" icon="building">Synthetic data only</PlatformPill>
          </div>
          {actions.length > 0 && (
            <div className="platform-actions">
              {actions.map((action, index) => (
                <Button
                  key={action.href}
                  to={action.href}
                  variant={action.variant ?? (index === 0 ? "primary" : "outline")}
                  size="lg"
                  icon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {aside && <div className="platform-panel platform-card-pad">{aside}</div>}
      </div>
    </header>
  );
}
