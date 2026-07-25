"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { Festival } from "../../data/festivals";
import StoryScroll from "../../components/story/StoryScroll";
import AbhangVerses from "../../components/story/AbhangVerses";
import posthog from "posthog-js";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* ---------- Floating song name — scattered across whole viewport ---------- */

function FloatingSongName({
  active,
  color,
  name,
}: {
  active: boolean;
  color: string;
  name: string;
}) {
  const layout = [
    { top: "10%", left: "5%", size: 2.9, weight: 700, opacity: 0.15, duration: 11, delay: 0.1 },
    { top: "14%", left: "68%", size: 1.1, weight: 300, opacity: 0.14, duration: 11, delay: 0.8 },
    { top: "28%", left: "30%", size: 1.7, weight: 900, opacity: 0.2, duration: 8, delay: 1.5 },
    { top: "38%", left: "78%", size: 1.0, weight: 300, opacity: 0.12, duration: 10, delay: 2.2 },
    { top: "48%", left: "8%", size: 1.9, weight: 500, opacity: 0.18, duration: 9.5, delay: 3 },
    { top: "58%", left: "55%", size: 1.3, weight: 700, opacity: 0.16, duration: 10.5, delay: 3.6 },
    { top: "68%", left: "20%", size: 1.5, weight: 300, opacity: 0.14, duration: 9, delay: 4.2 },
    { top: "76%", left: "72%", size: 2.1, weight: 900, opacity: 0.2, duration: 11.5, delay: 4.8 },
    { top: "88%", left: "38%", size: 1.2, weight: 500, opacity: 0.13, duration: 8.5, delay: 5.4 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {active && name && (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            {layout.map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [item.opacity * 0.5, item.opacity, item.opacity * 0.6, item.opacity],
                  y: [10, -8, 6, -10],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute whitespace-nowrap leading-tight"
                style={{
                  color,
                  fontSize: `${item.size}rem`,
                  fontWeight: item.weight,
                  top: item.top,
                  left: item.left,
                }}
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Art (inline, no separate files) ---------- */

function VitthalRukminiArt() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute h-[340px] w-[340px] rounded-full bg-amber-400/30 blur-[90px]"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute h-72 w-72 rounded-full opacity-50"
        style={{ background: "conic-gradient(from 0deg, transparent, #fbbf24, transparent 55%)" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.6], opacity: [0.35, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: i * 1.1, ease: "easeOut" }}
          className="absolute h-40 w-40 rounded-full border border-amber-300/40"
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
        animate={{ opacity: 1, y: [0, -10, 0], filter: "blur(0px)" }}
        transition={{
          opacity: { duration: 1.2 },
          filter: { duration: 1.2 },
          y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1.2 },
        }}
        className="relative h-64 w-56 sm:h-72 sm:w-64"
        style={{
          WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 85%)",
          maskImage: "radial-gradient(circle, black 55%, transparent 85%)",
        }}
      >
        <img
          src="/festival/vitthal-rukmini.png"
          alt="Vitthal Rukmini"
          className="h-full w-full object-contain"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(180,83,9,0.15) 60%, transparent 90%)",
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -60, -120], opacity: [0, 0.9, 0] }}
          transition={{ repeat: Infinity, duration: 4 + i * 0.3, delay: i * 0.6, ease: "easeOut" }}
          className="absolute bottom-6 h-1.5 w-1.5 rounded-full bg-amber-300"
          style={{ left: `${28 + i * 9}%` }}
        />
      ))}
    </div>
  );
}

function FestiveMandalaArt({ color }: { color: string }) {
  return (
    <motion.svg viewBox="0 0 400 400" className="h-full w-full opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 2 }}>
      <defs>
        <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle cx="200" cy="200" r="120" fill="url(#mandalaGlow)" animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      <motion.g stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.7" style={{ transformOrigin: "200px 200px" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
        {[...Array(12)].map((_, i) => (
          <ellipse key={i} cx="200" cy="120" rx="14" ry="34" transform={`rotate(${i * 30} 200 200)`} />
        ))}
        <circle cx="200" cy="200" r="90" />
        <circle cx="200" cy="200" r="60" />
      </motion.g>
      <motion.g stroke={color} strokeWidth="1" fill="none" strokeOpacity="0.4" style={{ transformOrigin: "200px 200px" }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }}>
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx="200" cy="70" r="6" transform={`rotate(${i * 45} 200 200)`} />
        ))}
      </motion.g>
    </motion.svg>
  );
}

/* ---------- Particles ---------- */

type Particle = { id: number; left: number; top: number; size: number; duration: number; delay: number };

function FestiveParticles({ color }: { color: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          animate={{ y: [0, -50, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, background: color }}
        />
      ))}
    </div>
  );
}

/* ---------- Music player (multi-video rotation + time reporting) ---------- */

function CornerMusicPlayer({
  videoIds,
  onPlayStateChange,
  onTrackChange,
  onTimeUpdate,
}: {
  videoIds: string[];
  onPlayStateChange?: (playing: boolean) => void;
  onTrackChange?: (videoId: string) => void;
  onTimeUpdate?: (seconds: number) => void;
}) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    onPlayStateChange?.(playing);
  }, [playing, onPlayStateChange]);

  useEffect(() => {
    onTrackChange?.(videoIds[trackIndex]);
  }, [trackIndex, videoIds, onTrackChange]);

  useEffect(() => {
    if (!playing || !ready) return;
    const interval = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        onTimeUpdate?.(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, ready, onTimeUpdate]);

  useEffect(() => {
    const existingScript = document.getElementById("youtube-iframe-api");
    if (!existingScript) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      if (!containerRef.current || videoIds.length === 0) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoIds[0],
        playerVars: { autoplay: 1, mute: 1, controls: 0 },
        events: {
          onReady: () => {
            setReady(true);
            setPlaying(true);
          },
          onStateChange: (e: any) => {
            if (e.data === 0) {
              setTrackIndex((prev) => {
                const next = (prev + 1) % videoIds.length;
                playerRef.current.loadVideoById(videoIds[next]);
                return next;
              });
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) initPlayer();
    else window.onYouTubeIframeAPIReady = initPlayer;
  }, [videoIds]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
      setPlaying(false);
      posthog.capture("festival_music_toggled", { action: "pause", track_index: trackIndex });
    } else {
      playerRef.current.playVideo();
      setPlaying(true);
      posthog.capture("festival_music_toggled", { action: "play", track_index: trackIndex });
    }
  };

  const nextTrack = () => {
    if (!playerRef.current || videoIds.length === 0) return;
    const next = (trackIndex + 1) % videoIds.length;
    playerRef.current.loadVideoById(videoIds[next]);
    setTrackIndex(next);
    setPlaying(true);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(45);
      setMuted(false);
      posthog.capture("festival_music_mute_toggled", { action: "unmute" });
    } else {
      playerRef.current.mute();
      setMuted(true);
      posthog.capture("festival_music_mute_toggled", { action: "mute" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="fixed right-4 top-6 z-50 sm:right-8"
    >
      <div className="glass flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-2 backdrop-blur-xl">
        <div className="absolute h-0 w-0 overflow-hidden opacity-0">
          <div ref={containerRef} />
        </div>

        <span className="flex h-4 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                playing && !muted
                  ? { height: ["30%", "100%", "50%", "90%", "30%"] }
                  : { height: "20%" }
              }
              transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15, ease: "easeInOut" }}
              className="w-[3px] rounded-full bg-amber-300"
              style={{ height: "20%" }}
            />
          ))}
        </span>

        <span className="hidden text-xs text-amber-200 sm:inline">
          Vitthal Bhajans {videoIds.length > 1 ? `(${trackIndex + 1}/${videoIds.length})` : ""}
        </span>

        <button
          onClick={togglePlay}
          disabled={!ready}
          className="rounded-full px-1 text-sm text-amber-200 transition hover:text-amber-100"
        >
          {playing ? "⏸" : "▶"}
        </button>

        {videoIds.length > 1 && (
          <button
            onClick={nextTrack}
            disabled={!ready}
            className="rounded-full px-1 text-sm text-amber-200 transition hover:text-amber-100"
          >
            ⏭
          </button>
        )}

        <button
          onClick={toggleMute}
          disabled={!ready}
          className="rounded-full px-1 text-sm text-amber-200 transition hover:text-amber-100"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    </motion.div>
  );
}

/* ---------- Calendar card ---------- */

function EventCalendarCard({ festival, hasDarshan }: { festival: Festival; hasDarshan: boolean }) {
  const scrollToDarshan = () => {
    if (!hasDarshan) return;
    posthog.capture("festival_darshan_scrolled_to", { festival_name: festival.name });
    document.getElementById("darshan")?.scrollIntoView({ behavior: "smooth" });
  };

  const dateObj = new Date(festival.date + "T00:00:00");
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });

  return (
    <motion.button
      onClick={scrollToDarshan}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hasDarshan ? { scale: 1.03, y: -6 } : {}}
      className="group relative mx-auto block w-full max-w-xs overflow-hidden rounded-3xl bg-black p-1"
      style={{ cursor: hasDarshan ? "pointer" : "default" }}
    >
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="pointer-events-none absolute -inset-[2px] -z-10 rounded-3xl opacity-80" style={{ background: `conic-gradient(from 0deg, ${festival.glowColor}, #fde68a, ${festival.glowColor})` }} />
      <div className="pointer-events-none absolute inset-[2px] -z-10 rounded-3xl bg-black" />
      <div className="relative flex flex-col items-center gap-2 rounded-[22px] bg-gradient-to-b from-black/60 to-black px-8 py-10">
        <motion.div animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ background: `linear-gradient(135deg, ${festival.glowColor}33, transparent)` }} />
        <span className="relative text-xs uppercase tracking-[0.3em] text-zinc-400">{month}</span>
        <span className="relative bg-clip-text text-5xl font-black text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${festival.glowColor}, #fde68a)` }}>{day}</span>
        <span className="relative mt-1 text-center text-lg font-semibold">{festival.name}</span>
        {hasDarshan && <span className="relative text-sm text-zinc-400">Tap for Live Darshan</span>}
        {hasDarshan && (
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="relative mt-2 text-amber-300">↓</motion.span>
        )}
      </div>
    </motion.button>
  );
}

/* ---------- Page ---------- */

export default function FestivalPageClient({ festival }: { festival: Festival }) {
  const hasDarshan = Boolean(festival.darshanVideoId);
  const hasMusic = Boolean(festival.bhajanVideoIds?.length);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(festival.bhajanVideoIds?.[0] || "");
  const [currentTime, setCurrentTime] = useState(0);

  const activeTrack = festival.bhajanTracks?.find((t) => t.videoId === currentVideoId);
  const currentSongTitle =
    activeTrack?.segments.filter((s) => s.time <= currentTime).slice(-1)[0]?.title || "";

  useEffect(() => {
    posthog.capture("festival_page_viewed", { festival_name: festival.name, festival_slug: festival.slug, has_darshan: hasDarshan, has_music: hasMusic });
  }, [festival.name, festival.slug, hasDarshan, hasMusic]);

  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-white pt-24">
      <FestiveParticles color={festival.glowColor} />
      <FloatingSongName active={musicPlaying} color={festival.glowColor} name={currentSongTitle} />
      {hasMusic && (
        <CornerMusicPlayer
          videoIds={festival.bhajanVideoIds!}
          onPlayStateChange={setMusicPlaying}
          onTrackChange={setCurrentVideoId}
          onTimeUpdate={setCurrentTime}
        />
      )}

      <div className="fixed left-4 top-6 z-40 sm:left-8">
        <Link href="/" className="glass flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm backdrop-blur-xl transition hover:scale-105">
          ← Home
        </Link>
      </div>

      <section className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-10 text-center sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] w-[420px] opacity-60">
          {festival.art === "vitthal" ? <VitthalRukminiArt /> : <FestiveMandalaArt color={festival.glowColor} />}
        </div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative mt-[280px] uppercase tracking-[0.3em]" style={{ color: festival.glowColor }}>
          {festival.emoji} {festival.name}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, filter: "blur(16px)", y: 20 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="relative mt-4 text-4xl sm:text-6xl font-black">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${festival.glowColor}, #fde68a, ${festival.glowColor})` }}>
            आषाढी एकादशी
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="relative mt-6 max-w-xl text-zinc-300">
          {festival.tagline}
        </motion.p>

        <div className="relative mt-12 w-full">
          <EventCalendarCard festival={festival} hasDarshan={hasDarshan} />
        </div>
      </section>

      {hasDarshan && (
        <section id="darshan" className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40, filter: "blur(14px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9 }} className="glass overflow-hidden rounded-[32px] border p-2" style={{ borderColor: `${festival.glowColor}33` }}>
            <div className="flex items-center gap-3 px-5 py-4 text-xs uppercase tracking-[0.2em]" style={{ color: festival.glowColor }}>
              <span className="relative flex h-2 w-2">
                <motion.span animate={{ scale: [1, 2.6], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }} className="absolute inline-flex h-full w-full rounded-full bg-red-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              Live Darshan
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-3xl">
              <iframe src={`https://www.youtube.com/embed/${festival.darshanVideoId}?autoplay=0&mute=1`} title={`${festival.name} Live Darshan`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" />
            </div>
          </motion.div>
        </section>
      )}
      <StoryScroll color={festival.glowColor} />
      <AbhangVerses color={festival.glowColor} />
    </main>

  );
}