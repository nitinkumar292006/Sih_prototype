import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },   // Example: "Meditate 5 min"
  category: { 
    type: String, 
    enum: ["daily", "weekly", "challenge", "general"], 
    required: true 
  }
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
