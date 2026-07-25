"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Live from "../components/Sections/Live";
import posthog from "posthog-js";

/* ---------- Boot-up uplink sequence ---------- */

const BOOT_LINES = [
  "> initializing uplink ...",
  "> locating satellite ...",
  "> signal acquired ✦",
  "> decrypting transmissions ...",
];

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(onDone, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 450);
    return () => clearTimeout(t);
  }, [lineIndex, onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="font-mono text-sm sm:text-base">
        {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={i === 2 ? "text-green-400" : "text-cyan-300/80"}
          >
            {line}
          </motion.p>
        ))}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.5, 0.5, 1] }}
          className="mt-1 inline-block h-4 w-2 bg-green-400"
        />
      </div>
    </motion.div>
  );
}

/* ---------- Drifting particle starfield (hydration-safe) ---------- */

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

function Starfield() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Page ---------- */

export default function LivePageClient() {
  const [booted, setBooted] = useState(false);

  const handleBooted = () => {
    setBooted(true);
    posthog.capture("live_page_viewed");
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white pt-24">
      <AnimatePresence>
        {!booted && <BootSequence onDone={handleBooted} />}
      </AnimatePresence>

      <Starfield />

      {/* One-time scanline sweep after boot */}
      {booted && (
        <motion.div
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-x-0 z-40 h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
        />
      )}

      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={booted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="fixed left-4 top-6 z-40 sm:left-8"
      >
        <Link
          href="/"
          className="glass flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm backdrop-blur-xl transition hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Home
        </Link>
      </motion.div>

      {/* The feed materializes after boot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: "blur(14px)" }}
        animate={booted ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Live />
      </motion.div>
    </main>
  );
}