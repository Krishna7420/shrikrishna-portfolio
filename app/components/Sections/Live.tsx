"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Thought = {
  id: number;
  text: string;
  created_at: string;
  media_url: string | null;
  media_type: string | null;
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ---------- Decoding text (types itself out with glitch chars) ---------- */

const GLITCH = "█▓▒░<>/\\|10";

function DecodeText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      if (i >= text.length) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      setDisplay(
        text.slice(0, i) +
          GLITCH[Math.floor(Math.random() * GLITCH.length)] +
          GLITCH[Math.floor(Math.random() * GLITCH.length)]
      );
    }, 18);
    return () => clearInterval(interval);
  }, [inView, text]);

  return (
    <p
      ref={ref}
      className="relative text-lg sm:text-xl leading-8 sm:leading-9 text-zinc-200 whitespace-pre-line"
    >
      {display}
      {display !== text && (
        <span className="ml-1 inline-block h-5 w-2 translate-y-[3px] animate-pulse bg-cyan-300" />
      )}
    </p>
  );
}

/* ---------- Media block (social-post style) ---------- */

function Media({ thought }: { thought: Thought }) {
  if (!thought.media_url) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative mx-auto mb-6 flex max-w-md justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:max-w-lg"
    >
      {thought.media_type === "image" ? (
        <img
          src={thought.media_url}
          alt=""
          className="max-h-[70vh] w-auto max-w-full object-contain"
        />
      ) : (
        <video
          src={thought.media_url}
          controls
          playsInline
          preload="metadata"
          className="max-h-[70vh] w-auto max-w-full bg-black object-contain"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </motion.div>
  );
}

/* ---------- Signal ring (pulsing "broadcasting" indicator) ---------- */

function SignalRing() {
  return (
    <span className="relative flex h-3 w-3">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: i * 1,
            ease: "easeOut",
          }}
          className="absolute inline-flex h-full w-full rounded-full bg-green-400"
        />
      ))}
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
    </span>
  );
}

/* ---------- Section ---------- */

export default function Live({ preview = false }: { preview?: boolean }) {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    supabase
      .from("thoughts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(preview ? 1 : 50)
      .then(({ data }) => {
        if (data) setThoughts(data);
      });
  }, [preview]);

  const [latest, ...older] = thoughts;

  return (
    <section
      id="now"
      className="relative mx-auto max-w-4xl overflow-hidden px-4 sm:px-6 py-16 sm:py-24"
    >
      {/* Drifting background glows */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-1/4 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-blue-500/30 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.06, 0.14, 0.06] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="pointer-events-none absolute right-0 bottom-1/4 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-purple-500/25 blur-[120px]"
      />

      {/* Heading */}
      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-blue-400 uppercase tracking-[0.25em] sm:tracking-[0.35em] text-sm sm:text-base"
        >
          <SignalRing />
          LIVE FEED
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black"
        >
          Right{" "}
          <motion.span
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            style={{
              backgroundImage:
                "linear-gradient(90deg, #60a5fa, #22d3ee, #a855f7, #60a5fa)",
              backgroundSize: "300% 100%",
            }}
            className="inline-block bg-clip-text text-transparent"
          >
            Now.
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400"
        >
          Raw thoughts, photos, and clips — beamed straight from my phone.
        </motion.p>
      </div>

      {/* Latest transmission — featured */}
      {latest && (
        <motion.article
          initial={{ opacity: 0, y: 60, filter: "blur(16px)", scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-[32px] bg-black p-7 sm:p-10"
        >
          {/* Rotating conic border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="pointer-events-none absolute -inset-[2px] -z-10 rounded-[32px] opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, #3b82f6, #a855f7, #22d3ee, #3b82f6)",
            }}
          />
          <div className="pointer-events-none absolute inset-[1.5px] -z-10 rounded-[32px] bg-black" />

          {/* Breathing inner atmosphere */}
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/10"
          />

          <div className="relative mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-300/80">
            <SignalRing />
            Latest transmission
          </div>

          <Media thought={latest} />
          {latest.text && <DecodeText text={latest.text} />}

          <div className="relative mt-6 flex items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-xl">
              {timeAgo(latest.created_at)}
            </span>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-cyan-300/70 backdrop-blur-xl">
              via telegram
            </span>
          </div>
        </motion.article>
      )}

      {/* Preview mode: link to the full live page */}
      {preview && latest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/live"
            className="glass group relative overflow-hidden rounded-2xl border border-white/10 px-8 py-4 font-semibold transition hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <span className="relative flex items-center gap-2">
              View all transmissions
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </motion.div>
      )}

      {/* Older transmissions along a beam — full page only */}
      {!preview && older.length > 0 && (
        <div className="relative mt-16">
          {/* Glowing beam */}
          <div className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent sm:left-6" />

          <div className="flex flex-col gap-8">
            {older.map((thought, i) => (
              <motion.article
                key={thought.id}
                initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="glass group relative ml-10 overflow-hidden rounded-3xl border border-white/10 p-6 sm:ml-14 sm:p-8 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                {/* Node on beam */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, margin: "-12%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute -left-[26px] top-8 h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)] sm:-left-[34px]"
                />

                {/* Passing wisp */}
                <motion.div
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    delay: i * 0.7,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />

                <Media thought={thought} />

                {thought.text && (
                  <p className="relative text-base leading-8 text-zinc-300 whitespace-pre-line">
                    {thought.text}
                  </p>
                )}

                <div className="relative mt-5 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-xl">
                    {timeAgo(thought.created_at)}
                  </span>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-cyan-300/70 backdrop-blur-xl">
                    via telegram
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}