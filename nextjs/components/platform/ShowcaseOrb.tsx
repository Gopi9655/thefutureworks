"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BrandOrb, type BrandOrbTone } from "./BrandOrb";

// ============================================================
// Phase 6B — ShowcaseOrb
// A premium 3D brand moment for a single showcase area. It renders
// the CSS BrandOrb on the server / first paint (no hydration
// mismatch), then upgrades to the Three.js BrandOrbScene on the
// client only when WebGL is available and motion is allowed.
// If either is missing, the dimensional CSS BrandOrb stays.
// ============================================================

const BrandOrbScene = dynamic(() => import("@/components/three/BrandOrbScene"), {
  ssr: false,
  loading: () => null,
});

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      typeof window !== "undefined" &&
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export interface ShowcaseOrbProps {
  px?: number;
  tone?: BrandOrbTone;
  className?: string;
  /** Expose as a labelled image; otherwise decorative (aria-hidden). */
  label?: string;
}

export function ShowcaseOrb({ px = 92, tone = "default", className, label }: ShowcaseOrbProps) {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && webglSupported()) setUse3d(true);
  }, []);

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
        // soft platform-blue halo so the 3D orb reads as a premium element
        filter: "drop-shadow(0 10px 22px rgba(10, 22, 48, 0.28))",
      }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {use3d ? (
        <BrandOrbScene />
      ) : (
        <BrandOrb px={px} tone={tone} glow />
      )}
    </span>
  );
}

export default ShowcaseOrb;
