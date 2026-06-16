import type { ReactNode } from "react";
import clsx from "clsx";

export interface PlatformShellProps {
  children: ReactNode;
  className?: string;
}

export function PlatformShell({ children, className }: PlatformShellProps) {
  return (
    <div className={clsx("platform-shell", className)}>
      <div className="platform-grid-bg" aria-hidden="true" style={{ position: "absolute", inset: 0 }} />
      {children}
    </div>
  );
}
