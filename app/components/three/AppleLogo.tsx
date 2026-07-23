"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export default function AppleLogo() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.8}
      floatIntensity={1}
    >
      <mesh>
        <sphereGeometry args={[1.3, 128, 128]} />

        <MeshTransmissionMaterial
          transmission={1}
          roughness={0}
          thickness={0.8}
          chromaticAberration={0.03}
          distortion={0.2}
          distortionScale={0.5}
        />
      </mesh>
    </Float>
  );
}