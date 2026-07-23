"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ---------- EDIT THIS with your real journey ---------- */

const milestones = [
  {
    date: "Mar 2026 — Present",
    title: "iOS Developer Intern",
    place: "Theze · Remote",
    detail:
      "Building production iOS features with Swift and SwiftUI in a real product team.",
    icon: "💼",
  },
  {
    date: "2025",
    title: "Shipped Blink",
    place: "Personal Project",
    detail:
      "A psychological horror game where blinking is your only weapon — built on Apple's Vision framework.",
    icon: "👁️",
  },
  {
    date: "2025",
    title: "Built iWord Scramble",
    place: "Personal Project",
    detail:
      "SwiftUI word puzzle game with strict MVVM, coordinator pattern, and an actor-isolated audio engine.",
    icon: "🧩",
  },
  {
    date: "2024",
    title: "Went deep on iOS",
    place: "Self-taught",
    detail:
      "Swift, UIKit, SwiftUI, CoreData, MapKit — shipped 15+ projects and solved 200+ LeetCode problems along the way.",
    icon: "🚀",
  },
];

/* ---------- Ghost entry (appears & dissolves) ---------- */

function GhostEntry({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex w-full ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } justify-start`}
    >
      {/* Node on the spine */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2"
      >
        <span className="relative flex h-4 w-4">
          <motion.span
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-cyan-400"
          />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
        </span>
      </motion.span>

      {/* Ghost card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -60 : 60,
          filter: "blur(16px)",
          scale: 0.92,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          scale: 1,
        }}
        viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`glass relative ml-12 w-full rounded-3xl border border-white/10 p-6 sm:p-8 md:ml-0 md:w-[calc(50%-3rem)]`}
      >
        {/* Slow spectral drift while visible */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5 + index,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
            {milestone.date}
          </p>

          <h3 className="mt-2 flex items-center gap-2 text-xl sm:text-2xl font-bold">
            <span>{milestone.icon}</span>
            {milestone.title}
          </h3>

          <p className="mt-1 text-sm text-blue-400">{milestone.place}</p>

          <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-400">
            {milestone.detail}
          </p>
        </motion.div>

        {/* Faint inner glow that breathes */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/10"
        />
      </motion.div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const beamProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });
  const beamHeight = useTransform(beamProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 sm:px-6 py-16 sm:py-24"
    >
      {/* Heading — materializes from mist */}
      <motion.h2
        initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1 }}
        className="mb-4 text-3xl sm:text-4xl font-bold"
      >
        The Journey
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-14 max-w-2xl text-zinc-400"
      >
        From first line of Swift to shipping in production.
      </motion.p>

      <div ref={containerRef} className="relative">
        {/* Spine track (faint) */}
        <div className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-white/5 md:left-1/2" />

        {/* Light beam that draws with scroll */}
        <motion.div
          style={{ height: beamHeight }}
          className="absolute left-4 top-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-500 shadow-[0_0_16px_rgba(34,211,238,0.7)] md:left-1/2"
        />

        <div className="flex flex-col gap-12 md:gap-16">
          {milestones.map((milestone, i) => (
            <GhostEntry key={milestone.title} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}