// ExtraInfoDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { FiCheckCircle, FiTarget, FiSun, FiTrendingUp } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ExtraInfoDashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/summary/dashboard", {
          withCredentials: true,
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
      }
    };
    fetchData();
  }, []);

  if (!summary) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  // helper to normalize energy/stress from 0-100 to 0-5 scale safely
  const toFiveScale = (v) => {
    if (v == null) return 0;
    const num = Number(v);
    if (isNaN(num)) return 0;
    // clamp 0..100 then map to 0..5
    const clamped = Math.max(0, Math.min(100, num));
    return Math.round((clamped / 100) * 5 * 10) / 10; // keep one decimal
  };

  // labels (weekday short or date if single entry)
  const labels = summary.weeklyMoods.map((m) =>
    new Date(m.date).toLocaleDateString("en-US", { weekday: "short" })
  );

  // Mood trend line (kept as before)
  const moodData = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: summary.weeklyMoods.map((m) => (m.mood != null ? m.mood : 0)),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.12)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#6366F1",
        pointRadius: 4,
      },
    ],
  };

  const moodOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 },
        grid: { color: "#eee" },
      },
    },
  };

  // Wellness histogram (grouped bar)
  const wellnessData = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: summary.weeklyMoods.map((m) => (m.mood != null ? m.mood : 0)),
        backgroundColor: "#6366F1",
        borderColor: "#6366F1",
        borderWidth: 1,
        categoryPercentage: 0.7,
        barPercentage: 0.22,
      },
      {
        label: "Energy",
        data: summary.weeklyMoods.map((m) => toFiveScale(m.energy)),
        backgroundColor: "#FACC15",
        borderColor: "#FACC15",
        borderWidth: 1,
        categoryPercentage: 0.7,
        barPercentage: 0.22,
      },
      {
        label: "Stress",
        data: summary.weeklyMoods.map((m) => toFiveScale(m.stress)),
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 1,
        categoryPercentage: 0.7,
        barPercentage: 0.22,
      },
      {
        label: "Sleep",
        data: summary.weeklyMoods.map((m) => (m.sleep != null ? m.sleep : 0)),
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        borderWidth: 1,
        categoryPercentage: 0.7,
        barPercentage: 0.22,
      },
    ],
  };

  const wellnessOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { usePointStyle: true },
        // disable click/toggle
        onClick: () => { },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        stacked: false,
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  const sections = [
    {
      title: "Daily Check-in",
      description: "Answer quick questions to stay mindful every day.",
      icon: <FiCheckCircle className="text-indigo-500" size={28} />,
    },
    {
      title: "Wellness Goals",
      description: "Set goals and track progress towards better mental health.",
      icon: <FiTarget className="text-green-500" size={28} />,
    },
    {
      title: "Daily Inspiration",
      description: "Get motivational quotes & tips to boost positivity.",
      icon: <FiSun className="text-yellow-500" size={28} />,
    },
    {
      title: "Growth Journey",
      description: "Track your overall self-growth and achievements.",
      icon: <FiTrendingUp className="text-pink-500" size={28} />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen bg-gradient-to-br from-sky-200 via-indigo-100 to-white">


      {/* Charts Section */}
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} className=" p-6 rounded-2xl shadow-lg bg-white/70">
          <h2 className="text-lg font-semibold mb-4">Daily Insights</h2>
          <div className="bg-sky-400 text-white p-4 rounded-lg mb-4">
            Based on your recent entries, you're showing <strong>positive momentum</strong> in your wellness journey. Here are personalized insights to help you continue growing.
          </div>

          <div className="space-y-3">
            {/* Mood Stability */}
            <div className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Mood Stability</span>
                <span className="text-green-600 font-semibold">Good</span>
              </div>
              <p className="text-gray-700 text-sm">Your mood has been consistently positive over the past 5 days.</p>
              <p className="text-gray-500 text-xs">Recommendation: Continue your current wellness practices to maintain this positive trend.</p>
            </div>

            {/* Sleep Pattern */}
            <div className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Sleep Pattern</span>
                <span className="text-red-600 font-semibold">Attention</span>
              </div>
              <p className="text-gray-700 text-sm">You've been getting less than 6 hours of sleep for 3 consecutive nights.</p>
              <p className="text-gray-500 text-xs">Recommendation: Try to establish a bedtime routine and aim for 7-8 hours of sleep.</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg">View Detailed Report</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Share with Therapist</button>

            <h2 className="text-sky-400 font-bold ml-7 mt-2">This feature Updated Soon</h2>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white/70 p-5 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Wellness Stats (Histogram)</h2>
          <Bar data={wellnessData} options={wellnessOptions} />
        </motion.div>
      </div>

      {/* Functional Sections */}
      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="flex items-start gap-4 bg-white/70 p-5 rounded-xl shadow-md"
          >
            {sec.icon}
            <div>
              <h2 className="text-xl font-semibold">{sec.title}</h2>
              <p className="text-gray-600">{sec.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraInfoDashboard;
