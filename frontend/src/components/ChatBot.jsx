import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your wellness buddy. How are you feeling today?",
      time: "01:56 PM",
    },
  ]);

  const [input, setInput] = useState("");

  const quickReplies = [
    "I'm feeling overwhelmed with College",
    "How can I manage stress better?",
    "I'm having trouble sleeping",
    "I feel anxious about exams",
  ];

  const responses = {
    hi: "Hey there! 👋 How are you doing today?",
    hello: "Hello! 😊 I'm here to chat with you.",
    hey: "Hey! How’s it going?",
    bye: "Goodbye! 👋 Take care, and remember you’re not alone.",
    "i'm feeling overwhelmed with college":
      "College can be tough 😔. Try breaking tasks into smaller parts and taking short breaks. You’ve got this 💪!",
    "how can i manage stress better?":
      "Managing stress is about balance 🌱. Try deep breathing, journaling, or a short walk to relax.",
    "i'm having trouble sleeping":
      "Good sleep matters 😴. Avoid screens before bed, try calming music, and keep a regular schedule.",
    "i feel anxious about exams":
      "Exam anxiety is common 📚. Prepare with small study goals and practice mindfulness to stay calm.",
  };

  const getBotReply = (text) => {
    const lowerText = text.toLowerCase();
    return responses[lowerText] || "Thanks for sharing ❤️ I'm here to listen and support you.";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: getBotReply(text),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 700);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white p-10">
      {/* Header */}
      <div className="w-full max-[815px]:max-w-md min-[816px]:w-[70%] bg-white rounded-2xl shadow-xl p-6 flex justify-center items-center gap-3 border border-indigo-100">
        <div className="bg-gradient-to-tr from-indigo-100 to-blue-200 p-2 rounded-xl">
          <FaRobot className="text-indigo-600" size={28} />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-800 text-center">MindCare Chat Companion</h2>
          <p className="text-sm text-gray-500 text-center">Always Free For Students</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="w-full max-[815px]:max-w-md min-[816px]:w-[70%] flex-1 bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-xl mt-4 p-4 overflow-y-auto space-y-4 border border-gray-100">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-br-none"
                  : "bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-gray-500 mt-1 text-right">{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="w-full max-[815px]:max-w-md min-[816px]:w-[70%] flex items-center gap-2 mt-4 bg-white p-2 rounded-full shadow-lg border border-indigo-100">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full focus:outline-none text-sm bg-indigo-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        />
        <button
          onClick={() => handleSend(input)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow transition"
        >
          <FiSend size={18} />
        </button>
      </div>

      {/* Quick replies */}
      <div className="w-full max-[815px]:max-w-md min-[816px]:w-[70%] mt-4 grid grid-cols-2 gap-2">
        {quickReplies.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 px-3 py-2 text-sm rounded-full shadow hover:shadow-md transition text-gray-800 text-left"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatBot;
