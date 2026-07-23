"use client";

import { motion } from "framer-motion";

const greetings = [
  { text: "Bonjour", top: "18%", left: "18%" },
  { text: "Hola", top: "28%", left: "72%" },
  { text: "नमस्ते", top: "48%", left: "15%" },
  { text: "こんにちは", top: "42%", left: "70%" },
  { text: "안녕하세요", top: "65%", left: "30%" },
  { text: "Ciao", top: "72%", left: "72%" },
  { text: "Olá", top: "80%", left: "15%" },
  { text: "مرحبا", top: "14%", left: "52%" },
];

export default function FloatingGreetings() {
  return (
    <>
      {greetings.map((item, index) => (
        <motion.div
          key={item.text}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [40, 0, -50],
          }}
          transition={{
            delay: index * 0.4,
            duration: 5,
          }}
          className="absolute text-2xl sm:text-4xl text-white/25 font-light"
          style={{
            top: item.top,
            left: item.left,
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </>
  );
}