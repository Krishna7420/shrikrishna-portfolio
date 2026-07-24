"use client";

import { motion } from "framer-motion";

function SudarshanChakra({ color }: { color: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      className="relative h-28 w-28 sm:h-36 sm:w-36"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="chakraGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="86" fill="none" stroke="url(#chakraGold)" strokeWidth="2" opacity="0.6" />
        <circle cx="100" cy="100" r="20" fill="url(#chakraGold)" opacity="0.9" />
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path
                d="M100 20 L106 42 L100 50 L94 42 Z"
                fill="url(#chakraGold)"
              />
              <line x1="100" y1="50" x2="100" y2="80" stroke="url(#chakraGold)" strokeWidth="1.5" opacity="0.7" />
            </g>
          );
        })}
      </svg>
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 rounded-full blur-xl"
        style={{ background: `${color}40` }}
      />
    </motion.div>
  );
}

function Padma({ color }: { color: string }) {
  return (
    <div className="relative h-28 w-28 sm:h-36 sm:w-36">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="lotusGold" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.path
            key={i}
            d="M100 100 Q80 60 100 25 Q120 60 100 100 Z"
            fill="url(#lotusGold)"
            opacity="0.85"
            transform={`rotate(${angle} 100 100)`}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "100px 100px" }}
          />
        ))}
        <circle cx="100" cy="100" r="14" fill="#fef3c7" />
      </svg>
    </div>
  );
}

function Shankh({ color }: { color: string }) {
  return (
    <motion.div
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="relative h-28 w-28 sm:h-36 sm:w-36"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <linearGradient id="shankhGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
        <path
          d="M60 150 Q40 110 60 70 Q80 40 120 45 Q150 50 155 85 Q158 110 135 125 Q145 100 130 80 Q115 62 95 68 Q75 75 72 100 Q70 125 90 140 Q75 148 60 150 Z"
          fill="url(#shankhGold)"
          opacity="0.9"
        />
        <path
          d="M95 68 Q75 75 72 100 Q70 125 90 140"
          fill="none"
          stroke="#78350f"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <ellipse cx="60" cy="150" rx="14" ry="8" fill="#fef3c7" opacity="0.95" />
      </svg>
    </motion.div>
  );
}

export default function DivineSymbols({ color }: { color: string }) {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <motion.h2
        initial={{ opacity: 0, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-3 text-2xl font-bold sm:text-3xl"
      >
        The Divine Emblems
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 text-sm text-zinc-400"
      >
        Sudarshan Chakra, Padma, and Shankh — timeless symbols carried by Vitthal's Krishna form
      </motion.p>

      <div className="flex flex-wrap items-start justify-center gap-12 sm:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <SudarshanChakra color={color} />
          <span className="text-sm text-zinc-400">Sudarshan Chakra</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center gap-4"
        >
          <Padma color={color} />
          <span className="text-sm text-zinc-400">Padma</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Shankh color={color} />
          <span className="text-sm text-zinc-400">Shankh</span>
        </motion.div>
      </div>
    </section>
  );
}