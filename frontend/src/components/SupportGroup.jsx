// SupportGru.jsx
import React, { useState } from "react";
import { FaPlus, FaShieldAlt } from "react-icons/fa";

const initialGroups = [
  {
    id: 1,
    name: "Anxiety Support Circle",
    members: 124,
    type: "anxiety",
    description: "Safe space for anxiety management and coping strategies",
    messages: [
      { id: 1, sender: "Sarah M.", text: "Good morning everyone! How is everyone feeling today?", time: "9:15 AM", self: false },
      { id: 2, sender: "You", text: "Morning Sarah! Feeling a bit anxious but trying to stay positive", time: "9:22 AM", self: true },
      { id: 3, sender: "Dr. Thompson", text: "I completely understand that feeling. Have you tried the 4-7-8 breathing technique?", time: "9:25 AM", self: false }
    ]
  },
  {
    id: 2,
    name: "Depression Warriors",
    members: 89,
    type: "depression",
    description: "Peer support for depression recovery journey",
    messages: [
      { id: 1, sender: "Alex T.", text: "Having a better day today, hope everyone is doing well", time: "15 min ago", self: false }
    ]
  },
  {
    id: 3,
    name: "Stress Management Hub",
    members: 156,
    type: "stress",
    description: "Share stress relief techniques and support",
    messages: [
      { id: 1, sender: "Mike R.", text: "Work stress is really getting to me lately", time: "1h ago", self: false }
    ]
  }
];

export default function SupportGru() {
  const [groups, setGroups] = useState(initialGroups);
  const [activeGroupId, setActiveGroupId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  const activeGroup = groups.find(g => g.id === activeGroupId);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedGroups = groups.map(g => {
      if (g.id === activeGroupId) {
        return {
          ...g,
          messages: [...g.messages, { id: g.messages.length + 1, sender: "You", text: newMessage, time: "Now", self: true }]
        };
      }
      return g;
    });
    setGroups(updatedGroups);
    setNewMessage("");
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      members: 1,
      type: "custom",
      description: "Newly created support group",
      messages: []
    };
    setGroups([...groups, newGroup]);
    setActiveGroupId(newGroup.id);
    setNewGroupName("");
  };

  return (
    <div className="flex flex-col min-[846px]:flex-row h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white p-4 md:p-6 md:justify-center md:gap-6">

      {/* Sidebar */}
      <div className="w-full min-[846px]:w-100 bg-white rounded-3xl shadow-2xl p-5 flex flex-col mb-6 md:mb-0">
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800">Community Support Groups</h2>

        {/* Create Group Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 text-gray-900 rounded-2xl shadow-lg">
          <h3 className="font-semibold mb-2">Create Your Own Group</h3>
          <p className="text-sm mb-3 opacity-90">Start a new safe space for sharing and support.</p>

          <div className="flex flex-col gap-2 items-center">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Group Name..."
              className="flex-1 px-3 py-2 w-full rounded-xl border border-white/40 bg-white/20 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleCreateGroup}
              className="px-4 py-2 bg-white text-sky-500 font-semibold rounded-xl hover:bg-white/90 transition flex items-center justify-center gap-1 w-full "
            >
              <FaPlus /> Create
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {groups.map(group => (
            <div
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all hover:shadow-md hover:bg-purple-50/50 ${activeGroupId === group.id ? "bg-purple-50 shadow-lg border-l-4 border-purple-400" : ""
                }`}
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800">{group.name}</h3>
                <span className="text-sm text-gray-500">{group.members} members</span>
              </div>
              <p className="text-sm text-gray-500">{group.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-5xl flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden min-h-screen">
        <div className="flex justify-between items-center p-5 border-l md:border-l-0 md:border-t-0 border-gray-200 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200">
          <h3 className="text-xl font-bold text-gray-800">{activeGroup.name}</h3>
          <div className="flex items-center gap-2 text-gray-600 font-semibold">
            <FaShieldAlt /> Safe Space
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-blue-50/30 min-h-[150px]">
          {activeGroup.messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.self ? "items-end" : "items-start"}`}
            >
              <div className={`px-5 py-3 rounded-2xl max-w-md break-words ${msg.self ? "bg-sky-500 text-white shadow-lg" : "bg-white text-gray-800 shadow"}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
              <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-5 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3 bg-blue-50/50">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a supportive message..."
            className="w-full flex-1 border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-sky-500 text-white px-5 py-3 rounded-2xl hover:bg-sky-300 transition shadow-lg w-full sm:w-auto"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}
