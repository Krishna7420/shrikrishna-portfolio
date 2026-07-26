"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import posthog from "posthog-js";

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
  likes: number;
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

/* ---------- Liked-posts memory (per browser) ---------- */

function useLikedSet() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("liked-thoughts");
      if (raw) setLiked(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const toggle = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("liked-thoughts", JSON.stringify([...next]));
      return next;
    });
  };

  return { liked, toggle };
}

/* ---------- Like button ---------- */

function LikeButton({
  thought,
  isLiked,
  onToggle,
}: {
  thought: Thought;
  isLiked: boolean;
  onToggle: (id: number) => void;
}) {
  const [count, setCount] = useState(thought.likes);
  const [burst, setBurst] = useState(0);

  const handleClick = async () => {
    const nowLiked = !isLiked;
    onToggle(thought.id);
    setCount((c) => (nowLiked ? c + 1 : Math.max(c - 1, 0)));
    if (nowLiked) setBurst((b) => b + 1);
    posthog.capture("thought_liked", { thought_id: thought.id, action: nowLiked ? "like" : "unlike" });

    try {
      if (nowLiked) {
        await supabase.rpc("increment_like", { thought_id: thought.id });
      } else {
        await supabase.rpc("decrement_like", { thought_id: thought.id });
      }
    } catch {
      // silent — optimistic UI already updated, worst case count drifts slightly
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs backdrop-blur-xl transition hover:border-pink-400/40"
    >
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <AnimatePresence>
          {burst > 0 && (
            <motion.span
              key={burst}
              initial={{ scale: 0.6, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute text-pink-400"
            >
              ♥
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          animate={isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className={isLiked ? "text-pink-400" : "text-zinc-400"}
        >
          {isLiked ? "♥" : "♡"}
        </motion.span>
      </span>
      <span className={isLiked ? "text-pink-300" : "text-zinc-400"}>
        {count}
      </span>
    </button>
  );
}

/* ---------- Share button ---------- */

function ShareButton({ thought }: { thought: Thought }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/live#t-${thought.id}`
      : "";

  const handleShare = async () => {
    const shareData = {
      title: "Shrikrishna Thodsare — Live",
      text: thought.text || "Check this out",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        posthog.capture("thought_shared", { thought_id: thought.id, method: "native" });
      } catch {
        // user cancelled — no-op
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
        posthog.capture("thought_shared", { thought_id: thought.id, method: "clipboard" });
      } catch {}
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${thought.text ? thought.text + " — " : ""}${shareUrl}`
  )}`;

 return (
  <div className="flex items-center gap-2">
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-cyan-300"
    >
      ↗ {copied ? "Copied!" : "Share"}
    </button>

    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-xl transition hover:border-green-400/40 hover:text-green-300"
    >
      WhatsApp
    </a>
  </div>
);
}

/* ---------- Decoding text ---------- */

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

/* ---------- Generic media (used only for Latest Transmission) ---------- */

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

/* ---------- Signal ring ---------- */

function SignalRing() {
  return (
    <span className="relative flex h-3 w-3">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 1, ease: "easeOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-green-400"
        />
      ))}
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
    </span>
  );
}

/* ---------- Photo lightbox ---------- */

function Lightbox({
  thought,
  onClose,
  isLiked,
  onToggleLike,
}: {
  thought: Thought;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (id: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass max-w-lg overflow-hidden rounded-3xl border border-white/10"
      >
        <img
          src={thought.media_url!}
          alt=""
          className="max-h-[75vh] w-full object-contain bg-black"
        />
        <div className="flex flex-col gap-3 p-5">
          {thought.text && (
            <p className="text-sm leading-7 text-zinc-300">{thought.text}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LikeButton thought={thought} isLiked={isLiked} onToggle={onToggleLike} />
              <ShareButton thought={thought} />
            </div>
            <span className="text-xs text-zinc-500">{timeAgo(thought.created_at)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Section ---------- */

export default function Live({ preview = false }: { preview?: boolean }) {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [lightboxId, setLightboxId] = useState<number | null>(null);
  const { liked, toggle } = useLikedSet();

  useEffect(() => {
    supabase
      .from("thoughts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(preview ? 1 : 50)
      .then(({ data }) => {
        if (data) setThoughts(data as Thought[]);
      });
  }, [preview]);

  const [latest, ...older] = thoughts;

  const photoThoughts = older.filter((t) => t.media_type === "image");
  const videoThoughts = older.filter((t) => t.media_type === "video");
  const textThoughts = older.filter((t) => !t.media_type);

  const lightboxThought = photoThoughts.find((t) => t.id === lightboxId) || null;

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

      {/* Latest transmission */}
      {latest && (
        <motion.article
          id={`t-${latest.id}`}
          initial={{ opacity: 0, y: 60, filter: "blur(16px)", scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-[32px] bg-black p-7 sm:p-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="pointer-events-none absolute -inset-[2px] -z-10 rounded-[32px] opacity-70"
            style={{
              background: "conic-gradient(from 0deg, #3b82f6, #a855f7, #22d3ee, #3b82f6)",
            }}
          />
          <div className="pointer-events-none absolute inset-[1.5px] -z-10 rounded-[32px] bg-black" />

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

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500 backdrop-blur-xl">
                {timeAgo(latest.created_at)}
              </span>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300/70 backdrop-blur-xl">
                via telegram
              </span>
            </div>
            <div className="flex items-center gap-2">
              <LikeButton thought={latest} isLiked={liked.has(latest.id)} onToggle={toggle} />
              <ShareButton thought={latest} />
            </div>
          </div>
        </motion.article>
      )}

      {/* Preview mode: link to full page */}
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
            onClick={() => posthog.capture("live_view_all_clicked")}
            className="glass group relative overflow-hidden rounded-2xl border border-white/10 px-8 py-4 font-semibold transition hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <span className="relative flex items-center gap-2">
              View all transmissions
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.div>
      )}

      {!preview && (
        <>
          {/* Photos — horizontal scroll row */}
          {photoThoughts.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
                Snapshots
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] snap-x snap-mandatory">
                {photoThoughts.map((thought) => (
                  <motion.button
                    key={thought.id}
                    id={`t-${thought.id}`}
                    onClick={() => { setLightboxId(thought.id); posthog.capture("photo_lightbox_opened", { thought_id: thought.id }); }}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-10%" }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    className="group relative h-56 w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:h-64 sm:w-48"
                  >
                    <img
                      src={thought.media_url!}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] text-zinc-300 backdrop-blur-xl">
                      ♥ {thought.likes}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Videos — grid */}
          {videoThoughts.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
                Clips
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {videoThoughts.map((thought) => (
                  <motion.div
                    key={thought.id}
                    id={`t-${thought.id}`}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-10%" }}
                    transition={{ duration: 0.6 }}
                    className="glass overflow-hidden rounded-2xl border border-white/10"
                  >
                    <video
                      src={thought.media_url!}
                      controls
                      playsInline
                      preload="metadata"
                      className="max-h-[360px] w-full bg-black object-contain"
                    />
                    <div className="flex flex-col gap-3 p-4">
                      {thought.text && (
                        <p className="text-sm text-zinc-300">{thought.text}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">
                          {timeAgo(thought.created_at)}
                        </span>
                        <div className="flex items-center gap-2">
                          <LikeButton
                            thought={thought}
                            isLiked={liked.has(thought.id)}
                            onToggle={toggle}
                          />
                          <ShareButton thought={thought} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Text-only thoughts — ghost timeline beam */}
          {textThoughts.length > 0 && (
            <div className="relative mt-16">
              <div className="absolute left-4 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-transparent sm:left-6" />

              <div className="flex flex-col gap-8">
                {textThoughts.map((thought, i) => (
                  <motion.article
                    key={thought.id}
                    id={`t-${thought.id}`}
                    initial={{ opacity: 0, x: 30, filter: "blur(12px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className="glass group relative ml-10 overflow-hidden rounded-3xl border border-white/10 p-6 sm:ml-14 sm:p-8 transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, margin: "-12%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="absolute -left-[26px] top-8 h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)] sm:-left-[34px]"
                    />
                    <motion.div
                      animate={{ x: ["-150%", "150%"] }}
                      transition={{ repeat: Infinity, duration: 6, delay: i * 0.7, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    />

                    <p className="relative text-base leading-8 text-zinc-300 whitespace-pre-line">
                      {thought.text}
                    </p>

                    <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500 backdrop-blur-xl">
                        {timeAgo(thought.created_at)}
                      </span>
                      <div className="flex items-center gap-2">
                        <LikeButton
                          thought={thought}
                          isLiked={liked.has(thought.id)}
                          onToggle={toggle}
                        />
                        <ShareButton thought={thought} />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxThought && (
          <Lightbox
            thought={lightboxThought}
            onClose={() => setLightboxId(null)}
            isLiked={liked.has(lightboxThought.id)}
            onToggleLike={toggle}
          />
        )}
      </AnimatePresence>
    </section>
  );
}