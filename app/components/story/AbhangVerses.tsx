"use client";

import { motion } from "framer-motion";

const verses = [
  "पंढरीच्या वाटे, मन धावे तुझ्यापाशी,\nविठ्ठला रे विठ्ठला, तूच माझी काशी.",
  "चंद्रभागेच्या तीरी, शांत वाहे पाणी,\nतुझ्या नामात विसरे, जगाची कहाणी.",
  "रुक्मिणी माते, तुझी छाया शीतल,\nभक्तांच्या मनी वसे, प्रेमाचे अमोल.",
  "विटेवरी उभा तू, युगे युगे वाट पाहसी,\nपुंडलिकाच्या प्रेमाची, तूच खरी राशी.",
];

export default function AbhangVerses({ color }: { color: string }) {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-3 text-2xl font-bold sm:text-3xl"
      >
        A Few Verses of Devotion
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-10 text-xs uppercase tracking-[0.2em] text-zinc-500"
      >
        Original verses, written in devotion — not attributed to any saint-poet
      </motion.p>

      <div className="flex flex-col gap-8">
        {verses.map((verse, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="glass relative overflow-hidden rounded-3xl border p-6 sm:p-8"
            style={{ borderColor: `${color}30` }}
          >
            <motion.div
              animate={{ opacity: [0.06, 0.14, 0.06] }}
              transition={{ repeat: Infinity, duration: 5, delay: i * 0.6, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(circle, ${color}30, transparent 70%)` }}
            />
            <p
              className="relative whitespace-pre-line text-lg font-medium leading-9 sm:text-xl"
              style={{ color }}
            >
              {verse}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}