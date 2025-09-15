// Home.jsx
import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaRobot, FaMusic } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; 

import VantaNetBackground from "../components/background/VantaNetBackground.jsx";
import bg from "../assets/bg.webp";
import Dashboard from "./Dashboard";
import ChatBot from "./ChatBot";

export default function Home() {
    const [selectedResource, setSelectedResource] = useState(null);

    const features = [
        { icon: <FaRobot size={28} className="text-blue-500" />, title: "24/7 Support", desc: "AI-powered mental health assistance anytime you need." },
        { icon: <CiHeart size={28} className="text-pink-500" />, title: "Safe & Private", desc: "Confidential and encrypted conversations." },
        { icon: <MdDashboard size={28} className="text-green-500" />, title: "Student-Focused", desc: "Specially designed for academic challenges." },
        { icon: <FaPhoneAlt size={28} className="text-purple-500" />, title: "Instant Help", desc: "Get resources and quick mental health support." },
    ];

    const resources = [
        {
            title: "📝 Self-Help Articles",
            type: "article",
            color: "blue",
            resources: [
                {
                    title: "Managing Academic Stress",
                    desc: "Practical strategies for handling coursework pressure",
                    time: "5 min read",
                    tag: "Popular",
                    content:
                        "Full article: Academic stress can be reduced by effective time management, relaxation techniques, healthy sleep, and peer discussions. Try planning your study schedule and taking breaks to recharge.",
                },
                {
                    title: "Understanding Anxiety in Students",
                    desc: "Learn about anxiety symptoms and coping mechanisms",
                    time: "7 min read",
                    tag: "Essential",
                    content:
                        "Anxiety in students is common. Symptoms include overthinking, sweating, and lack of focus. To manage it, try breathing exercises, journaling, and seeking support from trusted peers or counselors.",
                },
                {
                    title: "Building Healthy Study Habits",
                    desc: "Create sustainable routines for academic success",
                    time: "6 min read",
                    tag: "Practical",
                    content:
                        "Building healthy study habits requires consistency. Use the Pomodoro technique, avoid multitasking, and study in a distraction-free environment. This can help improve focus and reduce burnout.",
                },
            ],
        },
        {
            title: "🧘 Guided Meditations",
            type: "article",
            color: "blue",
            resources: [
                {
                    title: "Stress Relief Meditation",
                    desc: "10-minute guided session for immediate calm",
                    time: "10 min",
                    tag: "Beginner",
                    content:
                        "Close your eyes, focus on your breath, and let go of tension. Guided meditation helps reduce stress instantly and brings mental clarity.",
                },
                {
                    title: "Sleep Stories for Students",
                    desc: "Calming narratives to help you fall asleep",
                    time: "20 min",
                    tag: "Popular",
                    content:
                        "Sleep stories combine soothing narration and relaxation techniques to improve sleep quality. Listening daily can help maintain a healthy routine.",
                },
                {
                    title: "Exam Anxiety Relief",
                    desc: "Pre-test meditation to reduce performance anxiety",
                    time: "8 min",
                    tag: "Targeted",
                    content:
                        "Exam anxiety can be managed with breathing techniques, grounding exercises, and positive affirmations. Try this 8-min guided meditation before exams.",
                },
            ],
        },
        {
            title: "🎥 Video Workshops",
            type: "video",
            color: "blue",
            resources: [
                {
                    title: "Cognitive Behavioral Techniques",
                    desc: "Learn CBT strategies for managing negative thoughts",
                    time: "45 min",
                    tag: "Expert-led",
                    videoUrl: "https://www.youtube.com/embed/5L7vvxjPENc",
                },
                {
                    title: "Mindfulness for Students",
                    desc: "Introduction to mindfulness practice in daily life",
                    time: "30 min",
                    tag: "Interactive",
                    videoUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
                },
                {
                    title: "Building Resilience",
                    desc: "Develop emotional resilience for academic challenges",
                    time: "35 min",
                    tag: "Workshop",
                    videoUrl: "https://www.youtube.com/embed/2Ndcsp8dG4U",
                },
            ],
        },
    ];

    return (
        <div className="w-full bg-blue-50">
            {/* === Hero Section === */}
            <section className="relative w-full overflow-hidden text-center py-16 bg-gradient-to-b from-blue-50 to-blue-100">
                <VantaNetBackground />
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Your Mental Health <br />
                        <span className="text-blue-500 animate-bounce">Matters</span>
                    </h1>
                    <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                        Connect with AI-powered support, track your mood, and access
                        resources designed specifically for students navigating academic and
                        personal challenges.
                    </p>

                    {/* Features */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-16">
                        {features.map((f, i) => (
                            <div key={i} className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-md transition">
                                <div className="flex justify-center mb-3">{f.icon}</div>
                                <h3 className="font-semibold text-lg">{f.title}</h3>
                                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Crisis Support */}
            <section className="px-6 md:px-16 py-10 bg-blue-100 border-t border-blue-200 border-b">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <h2 className="text-lg font-bold text-red-600 mb-4">
                        🚨 Crisis Support - Get Immediate Help
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[{ title: "National Suicide Prevention Lifeline", contact: "Call: 1-800-273-8255" },
                          { title: "Crisis Text Line", contact: "Text HOME to 741741" },
                          { title: "Campus Counseling Center", contact: "Contact your school's services" },
                        ].map((c, i) => (
                            <div key={i} className="p-4 bg-white rounded-lg shadow">
                                <p className="font-semibold">{c.title}</p>
                                <p className="text-red-500 mt-1">{c.contact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Resources */}
            <section className="px-6 md:px-16 py-16   relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-300"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-10 text-center text-white tracking-wide drop-shadow-lg">
                        🌿 Mental Health Resources
                    </h2>
                    {resources.map((section, idx) => (
                        <div key={idx} className="mb-12">
                            <h3 className={`text-2xl font-semibold mb-6 flex items-center gap-2 text-${section.color}-400`}>
                                {section.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                {section.resources.map((r, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedResource({ ...r, type: section.type })}
                                        className="p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                    >
                                        <div>
                                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-${section.color}-400 to-${section.color}-600 text-white mb-4`}>
                                                {r.tag}
                                            </span>
                                            <h3 className="font-bold text-lg text-white drop-shadow-sm">{r.title}</h3>
                                            <p className="text-gray-900 mt-2 text-sm">{r.desc}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-5 text-gray-900 text-sm">
                                            <span>⏱ {r.time}</span>
                                            <span className={`hover:text-${section.color}-300`}>↗</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedResource && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative">
                            <button className="absolute top-3 right-3 text-gray-600 hover:text-black" onClick={() => setSelectedResource(null)}>
                                <AiOutlineClose size={24} />
                            </button>
                            <h2 className="text-2xl font-bold mb-4">{selectedResource.title}</h2>
                            <p className="text-gray-700 mb-4">{selectedResource.desc}</p>
                            {selectedResource.type === "article" && <p className="text-gray-600">{selectedResource.content}</p>}
                            {selectedResource.type === "video" && <iframe className="w-full h-64 rounded-lg" src={selectedResource.videoUrl} title={selectedResource.title} allowFullScreen></iframe>}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}



















