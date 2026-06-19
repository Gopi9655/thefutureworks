"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// ============================================================
// Phase 6B — BrandOrbScene
// Lightweight decorative Three.js orb: a single glossy sphere lit
// by green/blue/orange directional lights so it reads as the brand
// gradient in three dimensions. No textures, no heavy assets.
//
// Mounted ONLY via ShowcaseOrb, which dynamic-imports it (ssr:false)
// and falls back to the CSS BrandOrb when WebGL or motion is
// unavailable. Purely decorative.
// ============================================================
export function BrandOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.9], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <ambientLight intensity={0.55} />
      {/* brand-tinted lights — green = opportunity, blue = trust, orange = warmth */}
      <directionalLight position={[3, 2.4, 4]} intensity={2.4} color="#8DC63F" />
      <directionalLight position={[-3.2, -1.2, 2.4]} intensity={1.7} color="#1E6FB8" />
      <directionalLight position={[0.5, 3, -2]} intensity={1.2} color="#F08A24" />
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh rotation={[0.4, 0.2, 0]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#eef3f7" metalness={0.34} roughness={0.2} />
        </mesh>
      </Float>
    </Canvas>
  );
}

export default BrandOrbScene;
