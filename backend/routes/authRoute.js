import express from "express";
import { login, logout, signup } from "../controllers/auth.controll.js";
import { addMood, getAllMoods,getMe, getMoodSummary,getDashboardSummary} from "../controllers/mood.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { addAppointment,cancelAppointment,rescheduleAppointment, } from "../controllers/appointment.js";
import {completeActivity,submitMentalTest, getMentalTestSummary, getActivitySummary , getMonthlySummary } from '../controllers/acitivity.js';
import { addTask, getTasks } from "../controllers/task.js";

const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/add", authMiddleware, addMood);
authRouter.get("/all", authMiddleware, getAllMoods);
authRouter.post("/mental-test/submit", authMiddleware, submitMentalTest);
authRouter.get("/mental-test/summary", authMiddleware, getMentalTestSummary);
authRouter.get("/activity/summary", authMiddleware, getActivitySummary);
authRouter.get("/mood/monthly-summary", authMiddleware, getMonthlySummary);
authRouter.get("/summary/dashboard", authMiddleware, getDashboardSummary);
authRouter.get("/me", authMiddleware, getMe);
authRouter.post("/appointment", authMiddleware, addAppointment);
authRouter.put("/appointment/:id/cancel", authMiddleware, cancelAppointment);
authRouter.put("/appointment/:id/reschedule", authMiddleware, rescheduleAppointment);
authRouter.post("/activity/complete", authMiddleware, completeActivity);
authRouter.get("/summary/mood", authMiddleware, getMoodSummary);


authRouter.post("/tasks", authMiddleware, addTask);   // Add master task
authRouter.get("/tasks", authMiddleware, getTasks); 

export default authRouter;