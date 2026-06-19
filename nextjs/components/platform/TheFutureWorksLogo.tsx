import * as React from "react";
import { BrandOrb, type BrandOrbSize, type BrandOrbTone } from "./BrandOrb";

export type LogoVariant = "navbar" | "hero" | "footer";

export interface TheFutureWorksLogoProps {
  variant?: LogoVariant;
  animated?: boolean;
  showPartnership?: boolean;
  tone?: BrandOrbTone;
  href?: string;
  label?: string;
  className?: string;
}

const ORB_SIZE: Record<LogoVariant, BrandOrbSize> = {
  navbar: "sm",
  hero: "hero",
  footer: "lg",
};

export function TheFutureWorksLogo({
  variant = "hero",
  animated = false,
  showPartnership = false,
  tone = "default",
  href,
  label = "thefutureworks - Jobs for your future",
  className,
}: TheFutureWorksLogoProps): React.JSX.Element {
  const rootClassName = [
    "tfw-logo",
    `tfw-logo--${variant}`,
    animated ? "tfw-logo--animated" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const showSlogan = variant !== "navbar";
  const showPartner = variant === "hero" && showPartnership;

  const content = (
    <>
      <BrandOrb size={ORB_SIZE[variant]} tone={tone} animated={animated} decorative />

      <span className="tfw-logo__text">
        <span className="tfw-logo__word" aria-hidden="true">
          <span className="tfw-the tfw-rv-word tfw-rv-word--1">the</span>
          <span className="tfw-future tfw-rv-word tfw-rv-word--2">future</span>
          <span className="tfw-works tfw-rv-word tfw-rv-word--3">works</span>
        </span>

        {showSlogan ? (
          <span className="tfw-logo__slogan tfw-rv-slogan">
            <span className="tfw-jobs">Jobs</span> for your future
          </span>
        ) : null}
      </span>

      {showPartner ? (
        <span className="tfw-logo__partner tfw-rv-partner">
          <span className="tfw-logo__partner-label">In partnership with</span>
          <span className="tfw-logo__partner-name">
            Coventry
            <br />
            University
          </span>
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={rootClassName} aria-label={label}>
        {content}
      </a>
    );
  }

  return (
    <span className={rootClassName} role="img" aria-label={label}>
      {content}
    </span>
  );
}

export default TheFutureWorksLogo;
