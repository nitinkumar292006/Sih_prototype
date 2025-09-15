import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout/Layout";
import ChatBot from "./components/ChatBot";
import MoodTracker from "./components/MoodTracker";
import Home from "./components/Home";
import Consult from "./components/Consult";
import MusicPage from "./components/MusicPage";
import GameFun from "./components/GameFun";
import SupportGroup from "./components/SupportGroup";
import DrawingCanva from "./components/DrawingCanva";
import MentalTest from "./components/MentalTest";
import BreathingBubbles from "./components/activity/BreathingBubbles";
import GratitudeMemoryMatch from "./components/activity/GratitudeMemoryMatch";
import MoodColorTherapy from "./components/activity/MoodColorTherapy";


function App() {
  return (
    <Routes>
      {/* Without sidebar */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* With sidebar layout */}
      <Route element={<Layout />}>
        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/consult" element={<Consult />} />
        <Route path="/gamefun" element={<GameFun />} />
        <Route path="/drawing" element={<DrawingCanva />} />
        <Route path="/support-groups" element={<SupportGroup />} />
        <Route path="/mental-test" element={<MentalTest />} />
        <Route path="/breathing-bubbles" element={<BreathingBubbles />} />
        <Route path="/gratitude-memory-match" element={<GratitudeMemoryMatch />} />
        <Route path="/mood-color-therapy" element={<MoodColorTherapy />} />
      </Route>
    </Routes>
  );
}

export default App;
