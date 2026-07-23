"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Float,
  Text3D,
  Center,
} from "@react-three/drei";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Group } from "three";
import Lights from "./Lights";

/* ---------- Liquid glass monogram ---------- */

function Monogram({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<Group>(null);

  useFrame(() => {
    const p = progress.get();
    if (!group.current) return;

    // Full rotation across the scroll journey
    group.current.rotation.y = p * Math.PI * 2;

    // Grows from 0.5x to 1.1x as it scrolls into view
    const s = 0.5 + Math.min(p * 1.4, 0.6);
    group.current.scale.setScalar(s);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group}>
        <Center>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={1.4}
            height={0.45}
            curveSegments={24}
            bevelEnabled
            bevelThickness={0.06}
            bevelSize={0.04}
            bevelSegments={8}
          >
            ST
            <MeshTransmissionMaterial
              transmission={1}
              roughness={0.05}
              thickness={1.2}
              chromaticAberration={0.06}
              distortion={0.25}
              distortionScale={0.4}
              color="#3b82f6"
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
}

/* ---------- Scroll-driven section ---------- */

export default function ScrollApple() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-10 md:py-16"
    >
      <motion.div style={{ opacity, y }} className="relative">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] sm:h-[420px] sm:w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[100px]" />

        {/* 3D canvas */}
        <div className="relative h-[380px] sm:h-[460px] md:h-[540px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <Lights />
            <Monogram progress={scrollYProgress} />
          </Canvas>
        </div>

        <p className="mt-2 text-center text-sm uppercase tracking-[0.3em] text-zinc-500">
          The mark behind the work
        </p>

      </motion.div>
    </section>
  );
}