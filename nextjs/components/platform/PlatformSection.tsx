import type { ReactNode } from "react";
import clsx from "clsx";

export interface PlatformSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  tone?: "default" | "navy";
  tight?: boolean;
  className?: string;
}

export function PlatformSection({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "default",
  tight = false,
  className,
}: PlatformSectionProps) {
  const headingId = id && title ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={clsx(
        "platform-section",
        tight && "platform-section-tight",
        tone === "navy" && "platform-section-navy",
        className,
      )}
    >
      <div className="wrap">
        {(eyebrow || title || description) && (
          <div style={{ maxWidth: 800 }}>
            {eyebrow && <div className="platform-section-eyebrow">{eyebrow}</div>}
            {title && <h2 id={headingId} className="platform-section-title">{title}</h2>}
            {description && <p className="platform-section-sub">{description}</p>}
          </div>
        )}
        <div style={{ marginTop: title || description ? 34 : 0 }}>{children}</div>
      </div>
    </section>
  );
}
