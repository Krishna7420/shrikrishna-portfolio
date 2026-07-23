"use client";

import { motion } from "framer-motion";

/* ---------- EDIT with your real links ---------- */

const contacts = [
  {
    label: "GitHub",
    handle: "@Krishna7420",
    href: "https://github.com/Krishna7420",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 sm:h-10 sm:w-10">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "Shrikrishna Thodsare",
    href: "https://www.linkedin.com/in/shrikrishna-thodsare-06733b228/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 sm:h-10 sm:w-10">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Email",
    handle: "shrikrishnathodsare21@gmail.com",
    href: "mailto:shrikrishnathodsare21@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 sm:h-10 sm:w-10">
        <rect x="2.5" y="5" width="19" height="14" rx="3" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    ),
  },
];

/* ---------- Floating ghost orb ---------- */

function GhostOrb({
  contact,
  index,
}: {
  contact: (typeof contacts)[number];
  index: number;
}) {
  return (
    <motion.a
      href={contact.href}
      target={contact.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, filter: "blur(16px)", scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, y: -6 }}
      className="group relative block"
    >
      {/* Perpetual levitation, desynced per orb */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4.5 + index * 0.8,
          ease: "easeInOut",
        }}
        className="glass relative flex flex-col items-center gap-4 overflow-hidden rounded-[32px] border border-white/10 px-6 py-10 text-center transition-shadow duration-500 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.35)]"
      >
        {/* Breathing aura */}
        <motion.div
          animate={{ opacity: [0.06, 0.18, 0.06], scale: [1, 1.06, 1] }}
          transition={{
            repeat: Infinity,
            duration: 3.6 + index,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-cyan-400/20"
        />

        {/* Passing wisp of light */}
        <motion.div
          animate={{ x: ["-150%", "150%"] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: index * 1.4,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />

        {/* Icon with spring hover */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.5 }}
          className="relative text-zinc-200 transition-colors duration-300 group-hover:text-cyan-300"
        >
          {contact.icon}

          {/* Sonar ring behind the icon */}
          <motion.span
            animate={{ scale: [1, 1.9], opacity: [0.35, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.6,
              delay: index * 0.5,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-cyan-400/50"
          />
        </motion.div>

        <div className="relative">
          <p className="text-lg font-semibold">{contact.label}</p>
          <p className="mt-1 break-all text-xs text-zinc-500 sm:text-sm">
            {contact.handle}
          </p>
        </div>

        <span className="relative text-xs text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {contact.href.startsWith("mailto") ? "Write to me →" : "Visit →"}
        </span>
      </motion.div>
    </motion.a>
  );
}

/* ---------- Section ---------- */

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 sm:px-6 py-16 sm:py-24"
    >
      {/* Drifting background phantom */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/40 blur-[120px]"
      />

      {/* Heading materializes from mist */}
      <motion.h2
        initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1 }}
        className="relative mb-4 text-3xl sm:text-4xl font-bold"
      >
        Let's Connect
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mb-14 max-w-2xl text-zinc-400"
      >
        Open to iOS roles, collaborations, and good conversations.
      </motion.p>

      <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
        {contacts.map((contact, i) => (
          <GhostOrb key={contact.label} contact={contact} index={i} />
        ))}
      </div>
    </section>
  );
}