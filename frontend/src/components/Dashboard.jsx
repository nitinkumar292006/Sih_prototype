// Dashboard.jsx
import React, { useEffect, useState } from "react";
import ExtraInfoDashboard from "../components/ExtraInfoDashboard";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaFire, FaRunning, FaBullseye } from "react-icons/fa";


const moodEmojiMap = { 5: "😁", 4: "🙂", 3: "😐", 2: "😞", 1: "😭" };

export default function Dashboard() {
  const [moodData, setMoodData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [avgMood, setAvgMood] = useState("-");
  const [activityStats, setActivityStats] = useState(null);

  const serverUrl = "https://sih-prototype-backend2.onrender.com";

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/summary/dashboard`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const moodsForChart =
        res.data.weeklyMoods?.map((m) => ({
          day: new Date(m.date).toLocaleDateString(),
          mood: Number(m.mood),
        })) || [];
      setMoodData(moodsForChart);

      if (moodsForChart.length > 0) {
        const avg = moodsForChart.reduce((acc, m) => acc + m.mood, 0) / moodsForChart.length;
        setAvgMood(avg.toFixed(1));
      } else setAvgMood("-");

      setTasks(res.data.weeklyTasks || []);
      setActivityStats(res.data.activityStats || null); // ✅ yaha set ho raha hai
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };



  useEffect(() => {
    fetchSummary();
  }, []);

  const getMoodEmoji = (avg) => {
    if (!avg || avg === "-") return "😐";
    const mood = Math.round(avg);
    return moodEmojiMap[mood] || "😐";
  };

  // Mood Progress %
  const moodProgress = (() => {
    if (moodData.length < 2) return 0;
    const first = moodData[0].mood;
    const last = moodData[moodData.length - 1].mood;
    const diff = last - first;
    return Math.round((diff / 5) * 100); // percentage relative to 5
  })();

  const streak = [...new Set(moodData.map((m) => m.day))].length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const weeklyGoalPercent =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const moodMessage = {
    5: "Woah! Your vibes are electric today! ⚡ Spread that joy around!",
    4: "Feeling great! Keep riding this positive wave 🙂 Little wins matter!",
    3: "A steady day! Small steps count, you’re doing just fine 😌",
    2: "It’s a calm moment. Take a deep breath, brighter hours are ahead 🌿",
    1: "Rough day? That’s okay. Let yourself rest today 💛 Tomorrow is yours!",
  };
  const pieData = [
    { name: "Daily Completed", value: tasks.filter(t => t.category === "daily" && t.status === "Completed").length, color: "#22C55E" },
    { name: "Daily Pending", value: tasks.filter(t => t.category === "daily" && t.status !== "Completed").length, color: "#E5E7EB" },
    { name: "Weekly Completed", value: tasks.filter(t => t.category === "weekly" && t.status === "Completed").length, color: "#3B82F6" },
    { name: "Weekly Pending", value: tasks.filter(t => t.category === "weekly" && t.status !== "Completed").length, color: "#D1D5DB" },
    { name: "Challenge Completed", value: tasks.filter(t => t.category === "challenge" && t.status === "Completed").length, color: "#FACC15" },
    { name: "Challenge Pending", value: tasks.filter(t => t.category === "challenge" && t.status !== "Completed").length, color: "#F3F4F6" },
  ];

  return (
    <div className="p-6 sm:p-8 w-full min-h-screen bg-gradient-to-br from-sky-200 via-indigo-100 to-white relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-gradient-to-tr from-sky-400 to-blue-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] rounded-full opacity-30 blur-3xl animate-pulse"></div>

      {/* Title */}
      <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600 mb-8 relative z-10">
        Your Mental Wellness Journey ✨
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-10 z-10 relative">
        {[
          { title: "Avg Mood", value: avgMood, emoji: getMoodEmoji(avgMood), color: "from-blue-500 to-blue-700" },
          { title: "Day Streak", value: streak, emoji: <FaFire className="text-white" />, color: "from-red-500 to-orange-500" },
          { title: "Sessions", value: moodData.length, emoji: <FaRunning className="text-white" />, color: "from-green-500 to-teal-500" },
          { title: "Weekly Goal", value: `${weeklyGoalPercent}%`, emoji: <FaBullseye className="text-white" />, color: "from-purple-500 to-pink-500" },
          { title: "Mood Progress", value: `${moodProgress}%`, emoji: "📊", color: "from-pink-500 to-rose-500" },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`relative p-5 rounded-2xl shadow-xl bg-gradient-to-r ${card.color} text-white transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                <span className="text-2xl">{card.emoji}</span>
              </div>
              <div>
                <p className="text-xl font-bold">{card.value}</p>
                <p className="text-sm opacity-90">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        {/* Mood Line Chart */}
        <div className="p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">📈 Mood Progress</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#6366F1"
                strokeWidth={3}
                dot={(props) => (
                  <text x={props.cx} y={props.cy - 12} textAnchor="middle">
                    {moodEmojiMap[props.payload.mood]}
                  </text>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/* Weekly Goal Pie Chart */}
        {/* Weekly Goal Pie Chart */}
        {/* Weekly Goal Pie Chart */}
        <div className="p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Activity Tasks</h2>

          {activityStats ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Daily Completed", value: activityStats.daily.completed },
                    { name: "Daily Pending", value: activityStats.daily.pending },
                    { name: "Weekly Completed", value: activityStats.weekly.completed },
                    { name: "Weekly Pending", value: activityStats.weekly.pending },
                    { name: "Challenge Completed", value: activityStats.challenge.completed },
                    { name: "Challenge Pending", value: activityStats.challenge.pending },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {[
                    "#22C55E", "#E5E7EB", // Daily
                    "#3B82F6", "#D1D5DB", // Weekly
                    "#FACC15", "#F3F4F6"  // Challenge
                  ].map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>

                {/* 👇 Ye line add kar */}
                <Tooltip />
              </PieChart>

            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 mt-4">No activities yet. Complete some to see your progress!</p>
          )}

          <p className="mt-4 font-bold text-indigo-600 text-lg">
            {activityStats
              ? `${Math.round(
                ((activityStats.daily.completed +
                  activityStats.weekly.completed +
                  activityStats.challenge.completed) /
                  (activityStats.daily.completed + activityStats.daily.pending +
                    activityStats.weekly.completed + activityStats.weekly.pending +
                    activityStats.challenge.completed + activityStats.challenge.pending)) * 100
              )}% Completed`
              : "0% Completed"}
          </p>
        </div>


      </div>

      {/* Motivation Line */}
      <div className="mt-8 bg-gradient-to-r from-indigo-200 to-purple-200 p-5 rounded-2xl text-center text-indigo-900 font-semibold text-base shadow-inner z-10 relative">
        {moodData.length > 0
          ? moodMessage[Math.round(avgMood)]
          : "Start tracking your mood to unlock insights 💡"}
      </div>

      <ExtraInfoDashboard moodData={moodData} tasks={tasks} />
    </div>
  );
}
