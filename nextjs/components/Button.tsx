import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

export type ButtonVariant = "primary" | "blue" | "light" | "ghost" | "ghost-blue" | "outline";

export interface ButtonProps {
  /** internal route, e.g. "/vacancies" */
  to?: string;
  /** external URL — opens in a new tab */
  href?: string;
  variant?: ButtonVariant;
  size?: "" | "sm" | "lg";
  icon?: string;
  iconLeft?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function Button({
  to, href, variant = "primary", size = "", icon, iconLeft, children, className = "", style, ariaLabel,
}: ButtonProps) {
  const cls = `btn btn-${variant} ${size ? "btn-" + size : ""} ${className}`.trim();
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} style={style} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={to || "#"} className={cls} style={style} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

export default Button;
