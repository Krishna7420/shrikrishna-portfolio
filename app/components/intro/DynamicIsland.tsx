"use client";

import { motion } from "framer-motion";

export default function DynamicIsland() {
  return (
    <motion.div
      initial={{ width: 140 }}
      animate={{ width: 320 }}
      transition={{ delay: 1, duration: 1.2 }}
      style={{ maxWidth: "85vw" }}
      className="
      absolute
      top-6
      left-1/2
      -translate-x-1/2
      h-10
      rounded-full
      bg-black
      border
      border-white/10
      flex
      items-center
      justify-center
      overflow-hidden
      "
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-sm"
      >
        👋 Hello Shrikrishna
      </motion.span>
    </motion.div>
  );
}