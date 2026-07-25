"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { festivals, type Festival } from "../data/festivals";
import posthog from "posthog-js";

function localDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function checkFestivals(): { festival: Festival; when: "today" | "tomorrow" } | null {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayFestival = festivals.find((f) => f.date === localDateKey(today));
  const tomorrowFestival = festivals.find((f) => f.date === localDateKey(tomorrow));

  if (todayFestival) return { festival: todayFestival, when: "today" };
  if (tomorrowFestival) return { festival: tomorrowFestival, when: "tomorrow" };
  return null;
}

export default function TodaysEventCard() {
  const [match, setMatch] = useState<{ festival: Festival; when: "today" | "tomorrow" } | null>(null);

  useEffect(() => {
    // Check immediately on mount
    setMatch(checkFestivals());

    // Then re-check every minute, so it flips from "Tomorrow" to "Today"
    // automatically at midnight without needing a page refresh
    const interval = setInterval(() => {
      setMatch(checkFestivals());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 mx-auto mb-8 w-fit px-4 pt-28 sm:pt-32"
        >
          <Link
            href={`/festival/${match.festival.slug}`}
            onClick={() => posthog.capture("festival_card_clicked", { festival_name: match.festival.name, festival_slug: match.festival.slug, when: match.when })}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="glass group flex items-center gap-4 overflow-hidden rounded-2xl border p-3 pr-5 backdrop-blur-xl"
              style={{ borderColor: `${match.festival.glowColor}40` }}
            >
              <div
                className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-center"
                style={{ background: `${match.festival.glowColor}22` }}
              >
                <span className="text-[9px] uppercase leading-none text-zinc-400">
                  {new Date(match.festival.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
                <span className="text-lg font-bold leading-none" style={{ color: match.festival.glowColor }}>
                  {new Date(match.festival.date + "T00:00:00").getDate()}
                </span>
              </div>

              <div className="text-left">
                <span
                  className="mr-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    background: `${match.festival.glowColor}33`,
                    color: match.festival.glowColor,
                  }}
                >
                  {match.when === "today" ? "Today" : "Tomorrow"}
                </span>
                <span className="font-semibold">
                  {match.festival.emoji} {match.festival.name}
                </span>
                <p className="text-xs text-zinc-400 transition-colors group-hover:text-zinc-300">
                  Tap to view →
                </p>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}