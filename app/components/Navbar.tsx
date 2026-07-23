"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

/* ---------- Dope Live nav item ---------- */

function LiveNavLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/live" onClick={onClick} className="group relative inline-flex items-center">
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="relative flex items-center gap-2 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5"
      >
        {/* Rotating gradient sheen behind the pill */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="pointer-events-none absolute -inset-4 opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, #22d3ee, transparent 30%)",
          }}
        />

        {/* Signal dot */}
        <span className="relative flex h-2 w-2">
          <motion.span
            animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeOut" }}
            className="absolute inline-flex h-full w-full rounded-full bg-green-400"
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>

        <span className="relative bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-semibold text-transparent">
          Live
        </span>
      </motion.span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">

      {/* Desktop pill */}
      <div className="glass hidden md:flex items-center gap-8 rounded-full px-8 py-4">
        <Link href="#about">About</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#experience">Experience</Link>
        <LiveNavLink />
        <Link href="#contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/support">Support</Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-full max-w-sm">

        {/* Top bar */}
        <div className="glass flex items-center justify-between rounded-full px-6 py-3">
          <span className="font-semibold">Shrikrishna</span>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-5 bg-white transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="glass mt-3 flex flex-col gap-1 rounded-3xl p-4">
            <Link
              href="#about"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              About
            </Link>
            <Link
              href="#projects"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Projects
            </Link>
            <Link
              href="#experience"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Experience
            </Link>

            <div className="px-4 py-2">
              <LiveNavLink onClick={() => setOpen(false)} />
            </div>

            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Privacy
            </Link>
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
            >
              Support
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
}