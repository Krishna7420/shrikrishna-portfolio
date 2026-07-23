"use client";

import { motion } from "framer-motion";

export default function HelloCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="
      absolute
      left-10
      top-1/2
      hidden
      lg:block
      -translate-y-1/2
      "
    >
      <div
        className="
        w-[320px]
        rounded-[40px]
        border border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
        shadow-[0_0_60px_rgba(59,130,246,.3)]
        "
      >
        <h2 className="text-5xl font-bold">
          👋 Hello,
        </h2>

        <h3 className="mt-4 text-3xl font-semibold">
          I'm
          <br />
          Shrikrishna
          <br />
          Thodsare
        </h3>

        <p className="mt-6 text-zinc-400">
          iOS Developer crafting beautiful
          Apple experiences with Swift &
          SwiftUI.
        </p>
      </div>
    </motion.div>
  );
}