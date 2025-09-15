// GratitudeMemoryMatch.jsx
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const initialCards = ["Hope", "Peace", "Love", "Calm", "Hope", "Peace", "Love", "Calm"];

// Shuffle function (Fisher-Yates)
const shuffleArray = (array) => {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function GratitudeMemoryMatch() {
  const [cardsData, setCardsData] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setCardsData(shuffleArray(initialCards));
  }, []);

  const handleFlip = (index) => {
    if (flipped.length === 2 || matched.includes(cardsData[index])) return;

    setFlipped((prev) => [...prev, index]);

    if (flipped.length === 1) {
      const first = cardsData[flipped[0]];
      const second = cardsData[index];
      if (first === second) {
        setMatched((prev) => {
          const updated = [...prev, first];
          if (updated.length === initialCards.length / 2) {
            setGameOver(true);
            fireConfetti();
          }
          return updated;
        });
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const fireConfetti = () => {
    let duration = 2 * 1000;
    let end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const resetGame = () => {
    setCardsData(shuffleArray(initialCards));
    setFlipped([]);
    setMatched([]);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 via-sky-100 to-white px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700 drop-shadow-md">
        Gratitude Memory Match
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cardsData.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card);

          return (
            <div
              key={index}
              className="w-24 h-24 [perspective:1000px]"
              onClick={() => handleFlip(index)}
            >
              <div
                className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full flex items-center justify-center bg-purple-400 text-white text-2xl rounded-xl shadow-md [backface-visibility:hidden]">
                  ❓
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full flex items-center justify-center bg-white text-purple-700 text-lg font-bold rounded-xl shadow-md rotate-y-180 [backface-visibility:hidden]">
                  <span className="whitespace-nowrap">{card}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Over Section */}
      {gameOver && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-4 animate-bounce">
            🎉 Congratulations! You did it! 🎉
          </h3>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            🔄 Start Again
          </button>
        </div>
      )}
    </div>
  );
}
