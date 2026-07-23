"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import AboutCard from "./AboutCard";
import FloatingTech from "./FloatingTech";

/* ---------- Count-up number ---------- */

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ---------- Swift code card ---------- */

const codeLines = [
  <span key="1">
    <span className="text-pink-400">struct</span>{" "}
    <span className="text-cyan-300">Developer</span> {"{"}
  </span>,
  <span key="2">
    {"  "}
    <span className="text-pink-400">let</span> name ={" "}
    <span className="text-orange-300">"Shrikrishna Thodsare"</span>
  </span>,
  <span key="3">
    {"  "}
    <span className="text-pink-400">let</span> role ={" "}
    <span className="text-orange-300">"iOS Developer"</span>
  </span>,
  <span key="4">
    {"  "}
    <span className="text-pink-400">let</span> stack = [
    <span className="text-orange-300">"Swift"</span>,{" "}
    <span className="text-orange-300">"UIKit"</span>,{" "}
    <span className="text-orange-300">"SwiftUI"</span>]
  </span>,
  <span key="5">{"  "}</span>,
  <span key="6">
    {"  "}
    <span className="text-pink-400">func</span>{" "}
    <span className="text-blue-300">build</span>() {"->"}{" "}
    <span className="text-cyan-300">Experience</span> {"{"}
  </span>,
  <span key="7">
    {"    "}.<span className="text-purple-300">delightful</span>
  </span>,
  <span key="8">{"  }"}</span>,
  <span key="9">{"}"}</span>,
];

function SwiftCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02 }}
      className="glass overflow-hidden rounded-3xl border border-white/10"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-zinc-500">Developer.swift</span>
      </div>

      {/* Code */}
      <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-6 sm:leading-7 text-zinc-300">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            className="whitespace-pre"
          >
            {line}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1] }}
          className="mt-1 inline-block h-4 w-2 bg-cyan-300 align-middle"
        />
      </div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

const headingWords = ["Crafting", "Native", "iOS", "Experiences."];

const stats = [
  { value: 15, suffix: "+", label: "Projects" },
  { value: 2, suffix: "", label: "Internships" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-20 md:py-32 px-4 sm:px-6"
    >
      {/* Breathing background orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-500/15 blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
        transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-500/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-blue-400 uppercase tracking-[0.25em] sm:tracking-[0.35em] text-sm sm:text-base"
          >
            ABOUT ME
          </motion.p>

          <h2 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-black">
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="inline-block mr-3 sm:mr-4"
              >
                {i >= 2 ? (
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "linear",
                    }}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #60a5fa, #22d3ee, #a855f7, #60a5fa)",
                      backgroundSize: "300% 100%",
                    }}
                    className="inline-block bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mx-auto mt-6 sm:mt-8 max-w-3xl text-base sm:text-xl text-zinc-400 leading-7 sm:leading-9"
          >
            Passionate about building beautiful, fast and intuitive
            applications using Apple's technologies.
          </motion.p>
        </div>

        {/* Main */}
        <div className="mt-16 md:mt-24 grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">

          {/* Left: tilt card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <AboutCard />
          </motion.div>

          {/* Right: swift card + bio */}
          <div>
            <SwiftCard />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-8 text-base sm:text-lg leading-7 sm:leading-9 text-zinc-400"
            >
              I build modern iOS applications using Swift, UIKit and SwiftUI
              with a strong focus on performance, clean architecture and
              delightful user experiences. From experimenting with Apple's
              Vision framework in Blink to building API-driven applications, I
              enjoy transforming ideas into polished products.
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 md:mt-28 grid w-full max-w-2xl grid-cols-2 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -10,
                boxShadow: "0 0 60px rgba(59,130,246,0.35)",
              }}
              className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center"
            >
              {/* Rotating shimmer behind the number */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 opacity-20 blur-[60px]"
              />

              <div className="relative z-10">
                <p className="text-4xl sm:text-5xl font-bold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm sm:text-base text-zinc-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tech */}
        <FloatingTech />
      </div>
    </section>
  );
}