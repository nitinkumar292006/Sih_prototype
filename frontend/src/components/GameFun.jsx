// GameFun.jsx
import React from "react";
import { Link } from "react-router-dom";
import BreathingBubbles from "./activity/BreathingBubbles";
import GratitudeMemoryMatch from "./activity/GratitudeMemoryMatch";
import MoodColorTherapy from "./activity/MoodColorTherapy";


import {
  FaBrain,
  FaLeaf,
  FaPalette,
  FaBookOpen,
  FaTree,
  FaTheaterMasks,
} from "react-icons/fa";

const activities = [
  {
    id: 1,
    title: "Breathing Bubbles",
    desc: "Follow the expanding bubble to practice deep breathing exercises",
    time: "5 min",
    level: "easy",
    icon: <FaLeaf className="text-sky-500 text-3xl" />,
    benefits: ["Reduces anxiety", "Improves focus", "+1 more"],
    link: "/breathing-bubbles",
    comingSoon: false,
  },
  {
    id: 2,
    title: "Gratitude Memory Match",
    desc: "Match positive affirmations and gratitude statements to boost mood",
    time: "10 min",
    level: "medium",
    icon: <FaBrain className="text-yellow-500 text-3xl" />,
    benefits: ["Boosts positivity", "Enhances memory", "+1 more"],
    link: "/gratitude-memory-match",
    comingSoon: false,
  },
  {
    id: 3,
    title: "Mood Color Therapy",
    desc: "Create beautiful color patterns that reflect your current emotions",
    time: "15 min",
    level: "easy",
    icon: <FaPalette className="text-pink-500 text-3xl" />,
    benefits: ["Self-expression", "Emotional awareness", "+1 more"],
    link: "/mood-color-therapy",
    comingSoon: false,
  },
  {
    id: 4,
    title: "Mindful Word Building",
    desc: "Build words related to wellness and positive thinking",
    time: "8 min",
    level: "medium",
    icon: <FaBookOpen className="text-green-600 text-3xl" />,
    benefits: ["Mental stimulation", "Vocabulary building", "+1 more"],
    comingSoon: true,
  },
  {
    id: 5,
    title: "Zen Garden Designer",
    desc: "Design and arrange a virtual zen garden for relaxation",
    time: "20 min",
    level: "easy",
    icon: <FaTree className="text-emerald-600 text-3xl" />,
    benefits: ["Creativity boost", "Mindfulness", "+1 more"],
    comingSoon: true,
  },
  {
    id: 6,
    title: "Emotion Charades",
    desc: "A fun way to explore and express different emotions",
    time: "12 min",
    level: "medium",
    icon: <FaTheaterMasks className="text-purple-600 text-3xl" />,
    benefits: ["Emotional intelligence", "Social skills", "+1 more"],
    comingSoon: true,
  },
];

export default function GameFun() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white py-12 px-6 md:px-16">
      {/* Top Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Mental Wellness Games & Activities
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Engage in fun, therapeutic games designed to boost your mental
          well-being. Each activity is crafted to promote mindfulness, cognitive
          health, and emotional balance.
        </p>
      </div>

      {/* Activities Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-6 flex flex-col"
          >
            {/* Icon */}
            <div className="mb-4">{activity.icon}</div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {activity.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4">{activity.desc}</p>

            {/* Time & Level */}
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="text-gray-500">⏱ {activity.time}</span>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs ${
                  activity.level === "easy"
                    ? "bg-green-400"
                    : "bg-yellow-400 text-black"
                }`}
              >
                {activity.level}
              </span>
            </div>

            {/* Benefits */}
            <div className="mb-4 flex flex-wrap gap-2">
              {activity.benefits.map((benefit, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Button */}
            {activity.comingSoon ? (
              <button
                disabled
                className="mt-auto text-center bg-gray-300 text-gray-600 rounded-xl py-2 px-4 font-medium cursor-not-allowed"
              >
                🚧 Coming Soon
              </button>
            ) : (
              <Link
                to={activity.link}
                className="mt-auto text-center bg-sky-500 hover:bg-sky-600 text-white rounded-xl py-2 px-4 font-medium transition"
              >
                ▶ Start Activity
              </Link>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
