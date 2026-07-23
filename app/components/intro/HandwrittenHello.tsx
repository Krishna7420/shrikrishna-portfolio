"use client";

import { motion } from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
});

export default function HandwrittenHello() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <motion.h1
        className={`${caveat.className} text-[90px] sm:text-[130px] md:text-[170px] text-white`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8 }}
      >
        Hello
      </motion.h1>
    </div>
  );
}