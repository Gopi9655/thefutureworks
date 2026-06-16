import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { PlatformAction } from "./PlatformPageHeader";

export interface PlatformCTAProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions?: PlatformAction[];
}

export function PlatformCTA({
  eyebrow = "Next phase",
  title,
  description,
  actions = [],
}: PlatformCTAProps) {
  return (
    <div className="platform-cta">
      <span className="platform-orb-green" aria-hidden="true" style={{ right: "-110px", bottom: "-130px", opacity: .6 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="platform-section-eyebrow"><Icon name="sparkles" size={14} /> {eyebrow}</div>
        <h2>{title}</h2>
        <p>{description}</p>
        {actions.length > 0 && (
          <div className="platform-actions">
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
      </div>
    </div>
  );
}
