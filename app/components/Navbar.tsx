"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
{ label: "Live", href: "#live" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">

      {/* Desktop pill */}
      <div className="glass hidden md:flex gap-8 rounded-full px-8 py-4">
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
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
          <div className="glass mt-3 flex flex-col rounded-3xl p-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
}