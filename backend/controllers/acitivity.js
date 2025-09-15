import User from "../models/user.model.js";

export const completeActivity = async (req, res) => {
  try {
    const { taskId, category } = req.body;
    const user = await User.findById(req.user.id);

    const now = new Date();
    const today = now.toISOString().split("T")[0]; // YYYY-MM-DD

    // check if task already done (category-wise)
    const alreadyDone = user.activitiesCompleted.some((t) => {
      if (t.taskId !== taskId) return false;

      const tDate = new Date(t.date);
      if (category === "daily") {
        return tDate.toISOString().split("T")[0] === today;
      } else if (category === "weekly") {
        return getWeekNumber(tDate) === getWeekNumber(now);
      } else if (category === "challenge") {
        return tDate.toISOString().split("T")[0] === today; // challenge reset daily
      }
      return false;
    });

    if (!alreadyDone) {
      user.activitiesCompleted.push({
        taskId,
        category, // category must come from frontend: daily/weekly/challenge
        date: now,
      });
      await user.save();
    }

    // return only today's/this week's tasks
    const filteredTasks = user.activitiesCompleted.filter((t) => {
      const tDate = new Date(t.date);
      if (t.category === "daily") return tDate.toISOString().split("T")[0] === today;
      if (t.category === "weekly") return getWeekNumber(tDate) === getWeekNumber(now);
      if (t.category === "challenge") return tDate.toISOString().split("T")[0] === today;
      return true;
    });

    res.json({ success: true, activitiesCompleted: filteredTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// helper: ISO week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}



export const getActivitySummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const activities = user.activitiesCompleted || [];

    const totalCompleted = activities.length;

    // last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekCount = activities.filter(
      (a) => new Date(a.date) >= lastWeek
    ).length;

    // today
    const today = new Date().toISOString().split("T")[0];
    const todaysTasks = activities.filter(
      (a) => new Date(a.date).toISOString().split("T")[0] === today
    );

    res.json({ totalCompleted, lastWeekCount, todaysTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const submitMentalTest = async (req, res) => {
  try {
    const { testId, score } = req.body;
    const user = await User.findById(req.user.id);

    user.mentalTests = user.mentalTests || [];
    user.mentalTests.push({ testId, score, date: new Date() });

    await user.save();
    res.json({ success: true, mentalTests: user.mentalTests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMentalTestSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const tests = user.mentalTests || [];

    // Example: last 5 tests
    const lastTests = tests.slice(-5).map(t => ({ date: t.date, score: t.score }));
    res.json({ lastTests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMonthlySummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const moods = user.moods || [];

    const monthly = {};
    moods.forEach((m) => {
      const d = new Date(m.date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`; // Month 1-12
      if (!monthly[key]) monthly[key] = [];
      monthly[key].push(m.mood);
    });

    const monthlyAvg = Object.entries(monthly).map(([month, values]) => ({
      month,
      avgMood: values.reduce((a, b) => a + b, 0) / values.length
    }));

    res.json({ monthlyAvg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
