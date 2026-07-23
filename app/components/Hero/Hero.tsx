"use client";

import { useEffect, useState } from "react";

import AppleIntro from "../intro/AppleIntro";
import HeroContent from "./HeroContent";

export default function Hero() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden bg-black">
      {!showHero ? <AppleIntro /> : <HeroContent />}
    </section>
  );
}