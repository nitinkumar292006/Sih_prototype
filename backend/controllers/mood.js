import User from "../models/user.model.js";

// Add or update today's mood
export const addMood = async (req, res) => {
  try {
    const { mood, energy, sleep, stress, journal } = req.body;
    const user = await User.findById(req.user.id);
    const today = new Date();

    const existing = user.moods.find(
      (m) => m.date.toDateString() === today.toDateString()
    );

    if (existing) {
      // update today's mood
      existing.mood = mood;
      existing.energy = energy;
      existing.sleep = sleep;
      existing.stress = stress;
      existing.journal = journal;
    } else {
      user.moods.push({ mood, energy, sleep, stress, journal, date: today });
    }

    await user.save();
    res.json({ success: true, moods: user.moods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


// Get all moods for dashboard
export const getAllMoods = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ moods: user.moods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};




export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // password exclude
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// mood.js
// mood.js
export const getMoodSummary = async (req, res) => {
  const user = await User.findById(req.user.id);
  const moods = user.moods || [];

  // group by week
  const weekly = {};
  moods.forEach((m) => {
    const d = new Date(m.date);
    const week = `${d.getFullYear()}-W${getWeekNumber(d)}`;
    if (!weekly[week]) weekly[week] = [];
    weekly[week].push(m.mood);
  });

  const weeklyAvg = Object.entries(weekly).map(([week, values]) => ({
    week,
    avgMood: values.reduce((a, b) => a + b, 0) / values.length,
  }));

  res.json({ weeklyAvg });
};

// helper to get ISO week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}


// Dashboard summary
export const getDashboardSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Last 7 din ke moods
    const weeklyMoods = user.moods.slice(-7).map((m) => ({
      date: m.date,
      mood: m.mood ?? null,
      energy: m.energy ?? null,
      stress: m.stress ?? null,
      sleep: m.sleep ?? null,
    }));

    // ✅ Last 7 din ke tasks
    const weeklyTasks = user.activitiesCompleted.slice(-7).map((a) => ({
      category: a.category,
      taskId: a.taskId,
      date: a.date,
    }));

    // ✅ Activity stats calculate
    let activityStats = {
      daily: { completed: 0, pending: 0 },
      weekly: { completed: 0, pending: 0 },
      challenge: { completed: 0, pending: 0 }
    };

    weeklyTasks.forEach((task) => {
      if (activityStats[task.category]) {
        activityStats[task.category].completed += 1;
      }
    });

    // ⚡ Yahan "total tasks" fix karne padenge (example: daily=5, weekly=3, challenge=2)
    const total = { daily: 5, weekly: 3, challenge: 2 };

    Object.keys(activityStats).forEach((cat) => {
      activityStats[cat].pending = total[cat] - activityStats[cat].completed;
    });

    res.json({
      weeklyMoods,
      weeklyTasks,
      activityStats, // ✅ ab frontend pie chart ke liye ready
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
