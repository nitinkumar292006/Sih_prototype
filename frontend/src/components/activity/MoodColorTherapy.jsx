// MoodColorTherapyGame.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const moods = {
  Happy: {
    color: "bg-yellow-200",
    sounds: ["/sounds/pop1.mp3", "/sounds/pop2.mp3"],
  },
  Calm: {
    color: "bg-blue-200",
    sounds: ["/sounds/chime1.mp3", "/sounds/chime2.mp3"],
  },
  Energetic: {
    color: "bg-red-200",
    sounds: ["/sounds/spark1.mp3", "/sounds/spark2.mp3"],
  },
  Relaxed: {
    color: "bg-green-200",
    sounds: ["/sounds/softpop1.mp3", "/sounds/softpop2.mp3"],
  },
};

export default function MoodColorTherapyGame() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [shapes, setShapes] = useState([]);

  // Generate floating shapes
  useEffect(() => {
    if (!selectedMood) return;

    const interval = setInterval(() => {
      const id = Date.now();
      setShapes((prev) => [
        ...prev,
        {
          id,
          x: Math.random() * 90 + "vw",
          y: Math.random() * 80 + "vh",
          size: Math.random() * 60 + 40, // 40px - 100px
        },
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [selectedMood]);

  // Function to play random relaxing sound
  const playSound = () => {
    const sounds = moods[selectedMood].sounds;
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(sound);
    audio.volume = 0.2; // soft and soothing
    audio.play();
  };

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ${
        selectedMood ? moods[selectedMood].color : "bg-white"
      }`}
    >
      <h2 className="text-4xl font-bold mb-2 text-gray-700 drop-shadow-md">
        Mood Color Therapy
      </h2>

      {/* Instruction */}
      {selectedMood && (
        <p className="text-lg text-gray-700 mb-6 drop-shadow-md">
          Click or tap on the floating shapes to release calm energy ✨
        </p>
      )}

      {/* Mood Buttons */}
      {!selectedMood && (
        <div className="flex gap-4 flex-wrap justify-center mt-8 z-10">
          {Object.keys(moods).map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className="px-6 py-3 rounded-full bg-white shadow-lg hover:scale-105 transition font-semibold text-gray-700"
            >
              {mood}
            </button>
          ))}
        </div>
      )}

      {/* Floating Shapes */}
      <AnimatePresence>
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
            onClick={() => {
              setShapes((prev) => prev.filter((s) => s.id !== shape.id));
              playSound(); // play relaxing sound
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
