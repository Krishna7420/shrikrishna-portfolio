"use client";

const tech = [
  "Swift",
  "UIKit",
  "SwiftUI",
  "MVVM",
  "Firebase",
  "Vision",
  "AVFoundation",
  "REST APIs",
  "Git",
  "GitHub",
  "MapKit",
  "CoreData",
];

export default function FloatingTech() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 sm:mt-14">

      {tech.map((item) => (
        <div
          key={item}
          className="glass rounded-full px-4 py-2 sm:px-6 sm:py-3
          text-xs sm:text-sm
          hover:scale-110
          transition"
        >
          {item}
        </div>
      ))}

    </div>
  );
}