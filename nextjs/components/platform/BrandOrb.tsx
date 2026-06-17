import type { CSSProperties } from "react";
import clsx from "clsx";

// ============================================================
// Phase 6B — BrandOrb
// A premium, dimensional prototype brand orb built purely from
// CSS/SVG (radial gradients, layered highlights, inner glow, rim
// light, drop shadow, specular highlight, depth ring). No images,
// no remote assets, no real-logo claims — this is a concept mark.
//
// Server-safe (no hooks): usable in server or client components.
// Decorative by default (aria-hidden); pass `label` to expose it.
// ============================================================

export type BrandOrbSize = "sm" | "md" | "lg";
export type BrandOrbTone = "default" | "trust" | "opportunity" | "muted";

const SIZE_PX: Record<BrandOrbSize, number> = { sm: 20, md: 34, lg: 56 };

export interface BrandOrbProps {
  /** Named size variant. Ignored when `px` is provided. */
  size?: BrandOrbSize;
  /** Exact pixel diameter override (decorative / legacy sizes). */
  px?: number;
  tone?: BrandOrbTone;
  /** Slowly rotate the colour layer under fixed lighting. */
  spin?: boolean;
  /** Add an outer brand glow. */
  glow?: boolean;
  /** When set, the orb is exposed as an image with this label; otherwise decorative. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function BrandOrb({
  size = "md",
  px,
  tone = "default",
  spin = false,
  glow = false,
  label,
  className,
  style,
}: BrandOrbProps) {
  const diameter = px ?? SIZE_PX[size];
  return (
    <span
      className={clsx(
        "brand-orb",
        `brand-orb-${tone}`,
        spin && "brand-orb-spin",
        glow && "brand-orb-glow",
        className,
      )}
      style={{ ["--orb-size" as string]: `${diameter}px`, ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <span className="brand-orb-color" />
      <span className="brand-orb-shade" />
    </span>
  );
}

export default BrandOrb;
