"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import posthog from "posthog-js";

const GITHUB_USERNAME = "Krishna7420";

const AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".caf", ".aiff", ".aif", ".ogg"];
const PREFERRED_NAMES = ["tap", "success", "click", "chime", "notification"];

const fallbackProjects = [
  { title: "Hire Or Fire", emoji: "🔥", description: "AI-powered interview preparation platform.", url: "", soundUrl: "" },
  { title: "Blink", emoji: "👁️", description: "Horror survival game using blink detection.", url: "", soundUrl: "" },
  { title: "CrypTrip", emoji: "📈", description: "Real-time cryptocurrency tracker.", url: "", soundUrl: "" },
  { title: "LunarX", emoji: "🚀", description: "NASA Astronomy Picture of the Day app.", url: "", soundUrl: "" },
];

const emojiFor = (name: string) => {
  const pool = ["⚡", "🛰️", "🧭", "🧬", "🛠️", "📱", "🧩", "🔭"];
  let hash = 0;
  for (const char of name) hash += char.charCodeAt(0);
  return pool[hash % pool.length];
};

/* ---------- GitHub sound lookup (recursive, any depth, filename-preferred) ---------- */

async function findRepoSoundUrl(
  username: string,
  repoName: string,
  branch: string
): Promise<string> {
  try {
    const treeRes = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/git/trees/${branch}?recursive=1`
    );
    if (!treeRes.ok) return "";
    const treeData = await treeRes.json();
    if (!Array.isArray(treeData.tree)) return "";

    const audioFiles = treeData.tree.filter(
      (item: any) =>
        item.type === "blob" &&
        AUDIO_EXTENSIONS.some((ext) => item.path.toLowerCase().endsWith(ext))
    );
    if (audioFiles.length === 0) return "";

    for (const preferred of PREFERRED_NAMES) {
      const match = audioFiles.find((f: any) =>
        f.path.toLowerCase().includes(preferred)
      );
      if (match) {
        return `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${match.path}`;
      }
    }

    return `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${audioFiles[0].path}`;
  } catch {
    return "";
  }
}

/* ---------- Detect real touch-only device (phones/tablets, not trackpads) ---------- */

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return isTouch;
}

/* ---------- Scramble-reveal text ---------- */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const totalFrames = 14;
    const interval = setInterval(() => {
      frame++;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const revealAt = (i / text.length) * totalFrames;
            if (frame > revealAt + 6) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (frame > totalFrames) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [active, text]);

  return (
    <span className="relative inline-block">
      {active && (
        <>
          <span aria-hidden className="absolute left-[2px] top-0 text-red-500 mix-blend-screen opacity-70">
            {display}
          </span>
          <span aria-hidden className="absolute -left-[2px] top-0 text-cyan-400 mix-blend-screen opacity-70">
            {display}
          </span>
        </>
      )}
      <span className="relative">{display}</span>
    </span>
  );
}

/* ---------- Real audio-reactive equalizer ---------- */

function LiveEqualizer({ analyser }: { analyser: AnalyserNode | null }) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      const bars = barRefs.current;
      const step = Math.floor(data.length / bars.length) || 1;
      bars.forEach((bar, i) => {
        if (!bar) return;
        const v = data[i * step] / 255;
        bar.style.height = `${20 + v * 80}%`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser]);

  return (
    <span className="ml-2 inline-flex h-4 items-end gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="w-[3px] rounded-full bg-cyan-300"
          style={{ height: "20%" }}
        />
      ))}
    </span>
  );
}

/* ---------- Particle burst ---------- */

function ParticleBurst({ triggerKey }: { triggerKey: number }) {
  const particles = Array.from({ length: 10 });
  return (
    <AnimatePresence>
      {triggerKey > 0 && (
        <span key={triggerKey} className="pointer-events-none absolute inset-0 z-20 overflow-visible">
          {particles.map((_, i) => {
            const angle = (i / particles.length) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: "50%", y: "50%", scale: 1 }}
                animate={{
                  opacity: 0,
                  x: `calc(50% + ${Math.cos(angle) * distance}px)`,
                  y: `calc(50% + ${Math.sin(angle) * distance}px)`,
                  scale: 0,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500"
              />
            );
          })}
        </span>
      )}
    </AnimatePresence>
  );
}

/* ---------- Project card ---------- */

type Project = {
  title: string;
  emoji: string;
  description: string;
  url: string;
  soundUrl?: string;
};

function ProjectCard({
  project,
  index,
  isTouch,
}: {
  project: Project;
  index: number;
  isTouch: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const fadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${px}px ${py}px, rgba(59,130,246,0.22), transparent 80%)`;

  useEffect(() => {
    if (!project.soundUrl) return;
    const audio = new Audio(project.soundUrl);
    audio.crossOrigin = "anonymous";
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioCtxRef.current?.close().catch(() => {});
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [project.soundUrl]);

  const setupAnalyser = () => {
    if (!audioRef.current || audioCtxRef.current) return;
    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
    } catch {
      // Analyser unsupported — sound still plays, just no live bars
    }
  };

  const startSound = () => {
    if (!audioRef.current) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    setupAnalyser();
    audioCtxRef.current?.resume();
    audioRef.current.volume = 0.5;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Blocked until first click anywhere on page — browser policy
      });
  };

  const stopSoundFaded = () => {
    if (!audioRef.current) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    fadeInterval.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume > 0.05) {
        audioRef.current.volume -= 0.05;
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        if (fadeInterval.current) clearInterval(fadeInterval.current);
      }
    }, 30);
  };

  const stopSoundNow = () => {
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  /* ---- Desktop: hover plays sound automatically ---- */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    px.set(x);
    py.set(y);
    mx.set(x / rect.width);
    my.set(y / rect.height);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setActive(true);
    setBurstKey((k) => k + 1);
    if (project.soundUrl) startSound();
    posthog.capture("project_card_hovered", { project_title: project.title });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    setActive(false);
    mx.set(0.5);
    my.set(0.5);
    stopSoundFaded();
  };

  /* ---- Mobile: tap toggles effects + sound, second tap stops instantly ---- */
  const handleTap = () => {
    if (!isTouch) return;

    if (active) {
      setActive(false);
      stopSoundNow();
      return;
    }

    setActive(true);
    setBurstKey((k) => k + 1);
    px.set(150);
    py.set(150);
    mx.set(0.5);
    my.set(0.35);
    if (project.soundUrl) startSound();
    posthog.capture("project_card_hovered", { project_title: project.title, interaction: "tap" });
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isTouch ? handleTap : undefined}
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, rotateX: 55, y: 60, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.12, duration: 0.8, type: "spring", stiffness: 90, damping: 14 }}
        animate={isTouch && active ? { scale: 1.03 } : { scale: 1 }}
        whileHover={!isTouch ? { scale: 1.015 } : undefined}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-black p-6 sm:p-8"
      >
        {/* Chromatic pulsing rotating border */}
        <motion.div
          animate={{
            rotate: 360,
            filter: isPlaying ? ["hue-rotate(0deg)", "hue-rotate(360deg)"] : "hue-rotate(0deg)",
          }}
          transition={{
            rotate: { repeat: Infinity, duration: isPlaying ? 2 : 6, ease: "linear" },
            filter: { repeat: Infinity, duration: 1.5, ease: "linear" },
          }}
          className={`pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl transition-opacity duration-500 ${
            isPlaying || active ? "opacity-100" : "opacity-40 group-hover:opacity-100"
          }`}
          style={{
            background: "conic-gradient(from 0deg, #3b82f6, #a855f7, #22d3ee, #3b82f6)",
          }}
        />
        <div className="pointer-events-none absolute inset-[1px] -z-10 rounded-3xl bg-black" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-zinc-800" />

        {/* Spotlight */}
        <motion.div
          style={{ background: spotlight }}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Scanline sweep while active */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
          className={`pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Sheen sweep (desktop hover only) */}
        {!isTouch && (
          <motion.div
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
        )}

        <ParticleBurst triggerKey={burstKey} />

        <div className="relative flex items-start justify-between">
          <h3 className="flex items-center text-xl sm:text-2xl font-semibold">
            <motion.span
              whileHover={!isTouch ? { rotate: 15, scale: 1.2 } : undefined}
              animate={isTouch && active ? { rotate: 15, scale: 1.15 } : { rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block"
            >
              {project.emoji}
            </motion.span>
            <span className="ml-2">
              <ScrambleText text={project.title} active={active} />
            </span>
            {isPlaying && <LiveEqualizer analyser={analyserRef.current} />}
          </h3>
        </div>

        <p className="relative mt-3 sm:mt-4 flex-1 text-zinc-400">
          {project.description}
        </p>

        {project.url && (
          <div className="relative mt-4 text-sm">
            <span
              onClick={(e) => {
                e.stopPropagation();
                posthog.capture("project_github_link_clicked", { project_title: project.title, url: project.url });
                window.open(project.url, "_blank", "noopener,noreferrer");
              }}
              className={`cursor-pointer text-blue-400 transition-opacity hover:underline ${
                active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              View on GitHub →
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [source, setSource] = useState<"github" | "fallback">("fallback");
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(async (repos) => {
        if (cancelled) return;

        const filtered = repos
          .filter(
            (r: any) =>
              !r.fork &&
              !r.private &&
              (r.language === "Swift" || r.language === "Objective-C")
          )
          .slice(0, 6);

        const withSounds = await Promise.all(
          filtered.map(async (r: any) => {
            const soundUrl = await findRepoSoundUrl(GITHUB_USERNAME, r.name, r.default_branch);
            return {
              title: r.name,
              emoji: emojiFor(r.name),
              description: r.description || "No description yet — check the repo.",
              url: r.html_url,
              soundUrl,
            };
          })
        );

        if (!cancelled && withSounds.length > 0) {
          setProjects(withSounds);
          setSource("github");
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold">
          <ScrambleText text="Featured Projects" active={false} />
        </h2>

        {source === "github" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-zinc-500"
          >
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live from GitHub
          </motion.span>
        )}
      </div>

      <div className="relative">
        <motion.div
          initial={{ x: "-150%" }}
          whileInView={{ x: "150%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
          className="pointer-events-none absolute inset-0 z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isTouch={isTouch} />
          ))}
        </div>
      </div>
    </section>
  );
}