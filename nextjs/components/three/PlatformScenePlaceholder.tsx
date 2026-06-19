"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export function PlatformScenePlaceholder({
  label = "Advanced platform concept scene",
  decorative = false,
}: {
  label?: string;
  decorative?: boolean;
}) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      style={{ width: "100%", minHeight: 260, borderRadius: 8, overflow: "hidden", background: "linear-gradient(135deg, #0A0E1A, #111827)" }}
    >
      <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 3, 4]} intensity={1.4} />
        <Float speed={1.2} rotationIntensity={0.24} floatIntensity={0.35}>
          <mesh rotation={[0.35, 0.2, 0]}>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshStandardMaterial color="#5FA82A" metalness={0.2} roughness={0.38} />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}

export default PlatformScenePlaceholder;
