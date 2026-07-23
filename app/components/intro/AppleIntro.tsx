"use client";

import { useEffect, useState } from "react";
import FloatingGreetings from "./FloatingGreetings";

export default function AppleIntro() {
  const [showGreetings, setShowGreetings] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetings(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showGreetings && <FloatingGreetings />}
    </>
  );
}