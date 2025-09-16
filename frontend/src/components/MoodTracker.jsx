import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Range } from "react-range";
import Confetti from "react-confetti";
import axios from "axios";
import { FaRunning, FaCheckCircle, FaBookOpen, FaSmile, FaHeart, FaLeaf, FaBrain, FaDumbbell, FaMusic, FaBed, FaHeartBroken,FaFrown ,FaMeh,        // 👈 yeh missing tha
  FaBolt  } from "react-icons/fa";

/* ---------------- Mood Data ---------------- */
const moods = [
  { label: "Terrible", icon: <FaHeartBroken className="w-14 h-14 text-pink-500 drop-shadow-lg" />, value: 1 },
  { label: "Poor", icon: <FaFrown className="w-14 h-14 text-red-500 drop-shadow-lg" />, value: 2 },
  { label: "Okay", icon: <FaMeh className="w-14 h-14 text-yellow-500 drop-shadow-lg" />, value: 3 },
  { label: "Good", icon: <FaSmile className="w-14 h-14 text-blue-500 drop-shadow-lg" />, value: 4 },
  { label: "Excellent", icon: <FaBolt className="w-14 h-14 text-green-500 drop-shadow-lg" />, value: 5 },
];

/* ---------------- ActivityHub Data ---------------- */
const activities = {
  daily: [
    { id: 1, task: "Meditate 5 min", icon: <FaRunning />, category: "daily" },
    { id: 2, task: "Drink Water 2L", icon: <FaCheckCircle />, category: "daily" },
    { id: 3, task: "Read 10 pages", icon: <FaBookOpen />, category: "daily" },
    { id: 4, task: "Go for a walk", icon: <FaRunning />, category: "daily" },
    { id: 5, task: "Journal 3 things", icon: <FaBookOpen />, category: "daily" },
    { id: 6, task: "Practice gratitude", icon: <FaHeart />, category: "daily" },
    { id: 7, task: "Stretch 10 min", icon: <FaDumbbell />, category: "daily" },
    { id: 8, task: "Sleep 7+ hours", icon: <FaBed />, category: "daily" },
    { id: 9, task: "Listen to music", icon: <FaMusic />, category: "daily" },
    { id: 10, task: "Eat 1 fruit", icon: <FaLeaf />, category: "daily" },
  ],

  weekly: [
    { id: 11, task: "Workout 3 times", icon: <FaRunning />, category: "weekly" },
    { id: 12, task: "Call family twice", icon: <FaCheckCircle />, category: "weekly" },
    { id: 13, task: "Clean your room", icon: <FaBookOpen />, category: "weekly" },
    { id: 14, task: "Try a new recipe", icon: <FaSmile />, category: "weekly" },
    { id: 15, task: "Digital detox 1 day", icon: <FaBrain />, category: "weekly" },
    { id: 16, task: "Do a kind act", icon: <FaHeart />, category: "weekly" },
    { id: 17, task: "Read 50 pages", icon: <FaBookOpen />, category: "weekly" },
    { id: 18, task: "Outdoor walk 5km", icon: <FaRunning />, category: "weekly" },
    { id: 19, task: "Plan weekly goals", icon: <FaCheckCircle />, category: "weekly" },
    { id: 20, task: "Watch less TV", icon: <FaBed />, category: "weekly" },
  ],

  challenges: [
    { id: 21, task: "No sugar 1 day", icon: <FaCheckCircle />, category: "challenge" },
    { id: 22, task: "Wake up 6AM", icon: <FaRunning />, category: "challenge" },
    { id: 23, task: "Social media fast 24h", icon: <FaBrain />, category: "challenge" },
    { id: 24, task: "Drink 3L water", icon: <FaCheckCircle />, category: "challenge" },
    { id: 25, task: "Write a poem", icon: <FaBookOpen />, category: "challenge" },
    { id: 26, task: "Cold shower", icon: <FaRunning />, category: "challenge" },
    { id: 27, task: "Run 5km", icon: <FaDumbbell />, category: "challenge" },
    { id: 28, task: "Eat no junk food", icon: <FaLeaf />, category: "challenge" },
    { id: 29, task: "Try meditation 20min", icon: <FaSmile />, category: "challenge" },
    { id: 30, task: "Learn new skill", icon: <FaBookOpen />, category: "challenge" },
  ],
};

const serverUrl = "https://sih-prototype-backend2.onrender.com";

export default function MoodTracker() {
  /* ---------------- State ---------------- */
  const [tab, setTab] = useState("mood"); // mood or activity
  const [index, setIndex] = useState(2); // current mood index

  const [energy, setEnergy] = useState([60]);
  const [sleep, setSleep] = useState([7]);
  const [stress, setStress] = useState([40]);
  const [journal, setJournal] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [completedTasks, setCompletedTasks] = useState({
    daily: [],
    weekly: [],
    challenges: [],
  });
  const [tabSection, setTabSection] = useState("daily"); // activity category

  const currentMood = moods[index];

  /* ---------------- Mood Carousel Functions ---------------- */
  const nextMood = () => setIndex((prev) => (prev + 1) % moods.length);
  const prevMood = () => setIndex((prev) => (prev - 1 + moods.length) % moods.length);

  /* ---------------- Submit Mood ---------------- */
  const handleSubmitMood = async () => {
    setSubmitted(true);
    try {
      await axios.post(
        `${serverUrl}/api/add`,
        {
          mood: currentMood.value,
          energy: energy[0],
          sleep: sleep[0],
          stress: stress[0],
          journal,
          date: new Date().toISOString(),
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (err) {
      console.error("Error saving mood:", err);
    }
    setTimeout(() => setSubmitted(false), 4000);
  };

  /* ---------------- Fetch Activity Summary ---------------- */
  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/activity/summary`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const summary = { daily: [], weekly: [], challenges: [] };
      res.data.todaysTasks.forEach((t) => {
        if (t.category === "daily") summary.daily.push(t.taskId);
        else if (t.category === "weekly") summary.weekly.push(t.taskId);
        else if (t.category === "challenge") summary.challenges.push(t.taskId);
      });

      setCompletedTasks(summary);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  /* ---------------- Complete Task ---------------- */
  const handleCompleteTask = async (task) => {
    const cat = task.category === "challenge" ? "challenges" : task.category;
    if (completedTasks[cat]?.includes(task.id)) return;

    // Optimistic UI
    setCompletedTasks((prev) => ({
      ...prev,
      [cat]: [...(prev[cat] || []), task.id],
    }));

    try {
      await axios.post(
        `${serverUrl}/api/activity/complete`,
        { taskId: task.id, category: task.category },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      {submitted && <Confetti recycle={false} numberOfPieces={150} />}

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["mood", "activity"].map((t) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-all
              ${tab === t
                ? "bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg"
                : "bg-white/40 text-gray-800 shadow-md backdrop-blur-md"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t === "mood" ? "Mood Tracker" : "Activity Hub"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ---------------- Mood Tracker ---------------- */}
        {tab === "mood" && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            {/* Mood Carousel */}
            <div className="relative flex items-center justify-center mb-10 w-full max-w-2xl">
              <button onClick={prevMood} className="absolute left-0 text-gray-600 hover:text-gray-900 text-3xl z-10">⟵</button>
              <div className="flex items-center justify-center w-full h-44 overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  {moods.map((mood, i) => {
                    const offset = i - index;
                    const isActive = i === index;
                    return (
                      <motion.div
                        key={mood.value}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                          if (info.offset.x < -50) nextMood();
                          if (info.offset.x > 50) prevMood();
                        }}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{
                          scale: isActive ? 1.2 : 0.8,
                          opacity: isActive ? 1 : 0.3,
                          x: offset * 180,
                          zIndex: isActive ? 2 : 1,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute flex flex-col items-center justify-center px-8 py-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50"
                      >
                        {mood.icon}
                        <span className="mt-3 text-lg font-bold text-gray-800">{mood.label}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              <button onClick={nextMood} className="absolute right-0 text-gray-600 hover:text-gray-900 text-3xl z-10">⟶</button>
            </div>

            {/* Sliders */}
            <div className="w-full max-w-2xl grid gap-5">
              <Card title="Energy 🔋" color="from-emerald-300/40 to-emerald-500/30">
                <CustomSlider values={energy} setValues={setEnergy} min={0} max={100} unit="%" />
              </Card>
              <Card title="Sleep Hours 🌙" color="from-indigo-300/40 to-violet-400/30">
                <CustomSlider values={sleep} setValues={setSleep} min={0} max={12} unit="h" step={0.5} />
              </Card>
              <Card title="Stress 😰" color="from-rose-300/40 to-pink-400/30">
                <CustomSlider values={stress} setValues={setStress} min={0} max={100} unit="%" />
              </Card>
            </div>

            {/* Journal */}
            <motion.div whileHover={{ scale: 1.01 }} className="w-full max-w-2xl mt-8 bg-sky-300 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-white/50">
              <h3 className="text-base font-semibold text-gray-800 mb-2">How was your day? 📝</h3>
              <textarea
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 resize-none bg-white/60 backdrop-blur-md text-sm"
                rows="3"
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitMood}
              className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold shadow-lg hover:shadow-2xl transition-all"
            >
              Save My Mood 🚀
            </motion.button>
          </motion.div>
        )}

        {/* ---------------- Activity Hub ---------------- */}
        {tab === "activity" && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            {/* Activity Container */}
            <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-4 mb-6 border border-white/40">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Activity Hub</h2>
                  <p className="text-xs text-gray-500">Choose a category to see related tasks</p>
                </div>
                <div className="w-48">
                  <div className="text-xs text-gray-600 mb-1 flex justify-between">
                    <span className="uppercase tracking-wide text-[10px]">{tabSection}</span>
                    <span className="text-[11px] font-medium">
                      {activities[tabSection].filter(t => completedTasks[t.category === "challenge" ? "challenges" : t.category]?.includes(t.id)).length}/{activities[tabSection].length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-2 rounded-full shadow-sm bg-gradient-to-r from-sky-500 to-sky-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${(activities[tabSection].filter(t => completedTasks[t.category === "challenge" ? "challenges" : t.category]?.includes(t.id)).length / activities[tabSection].length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-3 mb-4">
                {["daily", "weekly", "challenges"].map(section => {
                  const active = tabSection === section;
                  return (
                    <button
                      key={section}
                      onClick={() => setTabSection(section)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${active ? "text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg" : "text-gray-700 bg-white/60 hover:bg-white/80"}`}
                    >
                      <span className="text-sm">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                      {active && <span className="text-xs bg-white/20 px-2 rounded-full">Active</span>}
                    </button>
                  );
                })}
              </div>

              {/* Task List */}
              <div className="grid gap-3">
                <AnimatePresence mode="wait">
                  {activities[tabSection].map(t => {
                    const cat = t.category === "challenge" ? "challenges" : t.category;
                    const done = completedTasks[cat]?.includes(t.id);
                    return (
                      <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.28 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/60 shadow backdrop-blur-sm border border-white/40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-white/50 to-white/30 text-xl shadow-inner">
                            {t.icon}
                          </div>
                          <div>
                            <div className={`font-medium ${done ? "line-through text-gray-400" : "text-gray-800"}`}>{t.task}</div>
                            <div className="text-xs text-gray-500 mt-0.5">Suggested</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCompleteTask(t)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold transition ${done ? "bg-emerald-500 text-white shadow-md" : "bg-white/60 text-gray-700 hover:bg-white/80"}`}
                        >
                          {done ? <><FaCheckCircle /> Done</> : "Complete"}
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Helpers ---------------- */
function Card({ title, children, color }) {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-2xl p-4 shadow-lg`}>
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      {children}
    </div>
  );
}

function CustomSlider({ values, setValues, min, max, unit, step = 1 }) {
  return (
    <Range
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={(vals) => setValues(vals)}
      renderTrack={({ props, children }) => (
        <div {...props} className="w-full h-2 rounded-full bg-gradient-to-r from-indigo-200 to-purple-300 flex items-center">
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div {...props} className="w-6 h-6 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 shadow-md flex items-center justify-center text-white text-[10px]">
          {values[0]}{unit}
        </div>
      )}
    />
  );
}
