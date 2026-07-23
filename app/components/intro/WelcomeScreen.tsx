"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "नमस्ते",
];

export default function WelcomeScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4">

      <motion.h1
        key={greetings[index]}
        initial={{
          opacity: 0,
          scale: 0.7,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="
          font-[var(--font-dancing)]
          text-[72px]
          sm:text-[140px]
          md:text-[260px]
          text-white
        "
      >
        {greetings[index]}
      </motion.h1>

    </div>
  );
}