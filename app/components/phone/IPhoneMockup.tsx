"use client";

import { motion } from "framer-motion";
import DynamicIsland from "../intro/DynamicIsland";

export default function IPhoneMockup() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: 4,
        duration: 1.5,
      }}
      className="
      absolute
      left-1/2
      top-1/2
      -translate-x-1/2
      -translate-y-1/2
      z-10
      "
    >
      <div
        className="
        relative
        h-[520px]
        w-[252px]
        sm:h-[600px]
        sm:w-[290px]
        md:h-[700px]
        md:w-[340px]
        rounded-[44px]
        md:rounded-[60px]
        border-4
        border-zinc-700
        bg-black
        shadow-[0_0_120px_rgba(59,130,246,.4)]
        overflow-hidden
        "
      >
        <DynamicIsland />

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-b
          from-blue-500/10
          via-purple-500/10
          to-black
          "
        />
      </div>
    </motion.div>
  );
}