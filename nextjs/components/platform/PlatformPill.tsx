import type { ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "@/components/Icon";

export type PlatformPillTone = "green" | "blue" | "navy" | "warm" | "neutral";

export interface PlatformPillProps {
  children: ReactNode;
  tone?: PlatformPillTone;
  icon?: string;
  className?: string;
}

export function PlatformPill({ children, tone = "neutral", icon, className }: PlatformPillProps) {
  return (
    <span
      className={clsx(
        "platform-pill",
        tone !== "neutral" && `platform-pill-${tone}`,
        className,
      )}
    >
      {icon && <Icon name={icon} size={13} stroke={1.9} />}
      {children}
    </span>
  );
}
