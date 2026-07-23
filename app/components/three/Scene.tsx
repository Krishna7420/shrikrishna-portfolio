"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Lights from "./Lights";
import AppleLogo from "./AppleLogo";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      dpr={[1, 2]}
      className="h-[320px] sm:h-[400px] md:h-[500px] w-full"
    >
      <Lights />

      <AppleLogo />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}