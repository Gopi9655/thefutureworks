import { BrandOrb, type BrandOrbTone } from "./BrandOrb";

// Phase 9A: pure SVG/CSS approved BrandOrb only. WebGL/Three.js remains disabled.
export interface ShowcaseOrbProps {
  px?: number;
  tone?: BrandOrbTone;
  className?: string;
  /** Expose as a labelled image; otherwise decorative (aria-hidden). */
  label?: string;
}

export function ShowcaseOrb({ px = 92, tone = "default", className, label }: ShowcaseOrbProps) {
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: px,
        height: px,
        flex: "0 0 auto",
        borderRadius: "50%",
        overflow: "hidden",
        filter: "drop-shadow(0 10px 22px rgba(10, 22, 48, 0.28))",
      }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <BrandOrb px={px} tone={tone} glow decorative={!label} label={label} />
    </span>
  );
}

export default ShowcaseOrb;
