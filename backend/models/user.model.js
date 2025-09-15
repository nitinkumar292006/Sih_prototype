import mongoose from "mongoose"

const moodSchema = new mongoose.Schema({
  mood: { type: Number, required: true },   // 1-5 scale
  energy: { type: Number, required: false }, // optional: 0-100
  sleep: { type: Number, required: false },  // hours
  stress: { type: Number, required: false }, // 0-100
  journal: { type: String, required: false }, // optional text
  date: { type: Date, default: Date.now },
});

const mentalTestSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  score: { type: Number, required: true },
  answers: { type: Array }, // optional: store user answers if needed
  date: { type: Date, default: Date.now },
});


const AppointmentSchema = new mongoose.Schema({
  therapist: { type: String, required: true }, // therapist name/id
  name: { type: String, required: true }, // patient name
  email: { type: String, required: true },
  date: { type: Date, required: true }, // appointment date
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: false
  },
  moods: [moodSchema],
  appointments: [AppointmentSchema],
  activitiesCompleted: [
    {
      taskId: Number,
      category: { type: String, enum: ["daily", "weekly", "challenge","general"], required: true },
      date: { type: Date, default: Date.now }, // jab complete kiya
    }
  ],
  mentalTests: [mentalTestSchema],
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User