import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "@/components/Icon";
import type { PlatformPillTone } from "./PlatformPill";

export interface PlatformCardProps {
  title?: ReactNode;
  eyebrow?: ReactNode;
  icon?: string;
  tone?: PlatformPillTone;
  href?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function toneClass(tone: PlatformPillTone) {
  if (tone === "green") return "platform-icon-tile-green";
  if (tone === "blue") return "platform-icon-tile-blue";
  return "";
}

export function PlatformCard({
  title,
  eyebrow,
  icon,
  tone = "blue",
  href,
  children,
  footer,
  className,
}: PlatformCardProps) {
  const content = (
    <div className="platform-card-pad">
      {(icon || eyebrow) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
          <div>{eyebrow}</div>
          {icon && (
            <span className={clsx("platform-icon-tile", toneClass(tone))} aria-hidden="true">
              <Icon name={icon} size={20} />
            </span>
          )}
        </div>
      )}
      {title && <h3 className="platform-card-title">{title}</h3>}
      {children && <div style={{ marginTop: title ? 14 : 0 }}>{children}</div>}
      {footer && <div style={{ marginTop: 20 }}>{footer}</div>}
    </div>
  );

  const cardClassName = clsx("platform-card", href && "platform-card-interactive", className);

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

export interface PlatformFieldListProps {
  items: { label: string; value: ReactNode }[];
  className?: string;
}

export function PlatformFieldList({ items, className }: PlatformFieldListProps) {
  return (
    <dl className={clsx("platform-field-list", className)}>
      {items.map((item) => (
        <div key={item.label} className="platform-field-row">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
