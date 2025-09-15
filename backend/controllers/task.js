import Task from "../models/task.model.js";

// Add new task
export const addTask = async (req, res) => {
  try {
    const { taskId, title, category } = req.body;
    const task = new Task({ taskId, title, category });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    // map only required fields for frontend
    const mapped = tasks.map(t => ({
      taskId: t.taskId,
      title: t.title,
      category: t.category,
    }));
    res.json({ success: true, tasks: mapped });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

