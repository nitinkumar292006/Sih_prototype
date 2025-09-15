import React, { useState, useEffect } from "react";

export default function BreathingBubbles() {
  const [size, setSize] = useState(120);
  const [growing, setGrowing] = useState(true);
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const interval = setInterval(() => {
      setSize((prev) => {
        if (prev >= 250) {
          setGrowing(false);
          setPhase("Exhale");
        }
        if (prev <= 120) {
          setGrowing(true);
          setPhase("Inhale");
        }
        return growing ? prev + 10 : prev - 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [growing]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white text-center px-4">
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-4 text-sky-700 drop-shadow-md">
        Breathing Bubbles
      </h2>
      <p className="mb-6 text-gray-600 max-w-md">
        Follow the bubble: <span className="font-semibold text-sky-600">{phase}</span> as it grows
        and shrinks. Sync your breath with the motion for a calming effect.
      </p>

      {/* Bubble */}
      <div
        className="rounded-full shadow-2xl flex items-center justify-center transition-all duration-500"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 30% 30%, rgba(135, 206, 250, 0.9), rgba(0, 191, 255, 0.7))",
          boxShadow:
            "0 0 25px rgba(0, 191, 255, 0.6), 0 0 50px rgba(0, 191, 255, 0.4)",
        }}
      >
        <span className="text-white font-bold text-lg drop-shadow-lg">{phase}</span>
      </div>

      {/* Bottom Tip */}
      <p className="mt-6 text-sm italic text-gray-500">
        🌸 Tip: Try 5–6 cycles for quick relaxation
      </p>
    </div>
  );
}
