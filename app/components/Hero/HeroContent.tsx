"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";

export default function HeroContent() {
  const scrollToProjects = () => {
    posthog.capture("hero_view_projects_clicked");
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden px-4 sm:px-6 py-24">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute h-[350px] w-[350px] sm:h-[700px] sm:w-[700px] rounded-full bg-blue-500/20 blur-[100px] sm:blur-[150px]"
      />

      {/* Glass Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.3,
          y: 100,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="glass relative z-20 w-full max-w-5xl overflow-hidden rounded-[32px] sm:rounded-[60px] p-6 sm:p-10 text-center md:p-16"
      >
        {/* Reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

        {/* Welcome Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mb-6 sm:mb-8 w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl text-sm sm:text-base"
        >
          👋 Welcome
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
            duration: 1,
          }}
          className="text-4xl sm:text-6xl font-black tracking-tight md:text-8xl lg:text-9xl"
        >
          Shrikrishna
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Thodsare
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.1,
          }}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-zinc-400 md:text-2xl"
        >
          iOS Developer • Swift • UIKit • SwiftUI
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
          }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-semibold transition hover:scale-105"
          >
            View Projects
          </button>

          <a
            href="/Shrikrishna_Resume.pdf"
            download
            onClick={() => posthog.capture("hero_resume_downloaded")}
            className="glass w-full sm:w-auto text-center rounded-2xl px-8 py-4 font-semibold transition hover:scale-105"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}