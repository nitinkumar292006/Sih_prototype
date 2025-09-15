import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiBrain, GiMeditation, GiSleepy, GiHealthNormal } from "react-icons/gi";

const testsData = [
  {
    id: 1,
    title: "Depression Screening",
    desc: "Assess symptoms of depression over the past two weeks.",
    tags: ["screening", "beginner"],
    duration: "5-10 minutes",
    questions: [
      { question: "Feeling down, depressed, or hopeless?", options: ["Not at all","Several days","More than half the days","Nearly every day"], score: [0,1,2,3] },
      { question: "Little interest or pleasure in doing things?", options: ["Not at all","Several days","More than half the days","Nearly every day"], score: [0,1,2,3] }
    ],
    totalScore: 6,
    icon: GiBrain,
    iconColor: "text-purple-500"
  },
  {
    id: 2,
    title: "Anxiety Assessment",
    desc: "Evaluate anxiety levels and symptoms.",
    tags: ["screening", "beginner"],
    duration: "3-5 minutes",
    questions: [
      { question: "Feeling nervous, anxious or on edge?", options: ["Not at all","Several days","More than half the days","Nearly every day"], score: [0,1,2,3] },
      { question: "Not being able to stop worrying?", options: ["Not at all","Several days","More than half the days","Nearly every day"], score: [0,1,2,3] }
    ],
    totalScore: 6,
    icon: GiHealthNormal,
    iconColor: "text-red-500"
  },
  {
    id: 3,
    title: "Stress Management",
    desc: "Measure your stress and coping strategies.",
    tags: ["assessment", "intermediate"],
    duration: "15-20 minutes",
    questions: [
      { question: "Feeling overwhelmed by tasks?", options: ["Not at all","Sometimes","Often","Always"], score: [0,1,2,3] },
      { question: "Difficulty relaxing?", options: ["Not at all","Sometimes","Often","Always"], score: [0,1,2,3] }
    ],
    totalScore: 6,
    icon: GiMeditation,
    iconColor: "text-green-500"
  },
  {
    id: 4,
    title: "Sleep Quality Index",
    desc: "Evaluate your sleep patterns.",
    tags: ["wellness", "beginner"],
    duration: "8-12 minutes",
    questions: [
      { question: "Difficulty falling asleep?", options: ["Not at all","Sometimes","Often","Always"], score: [0,1,2,3] },
      { question: "Waking up during night?", options: ["Not at all","Sometimes","Often","Always"], score: [0,1,2,3] }
    ],
    totalScore: 6,
    icon: GiSleepy,
    iconColor: "text-blue-500"
  },
];

export default function MentalTest() {
  const [tests, setTests] = useState(testsData);
  const [activeTest, setActiveTest] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score) => {
    const newScore = userScore + score;
    if (currentQ + 1 < activeTest.questions.length) {
      setUserScore(newScore);
      setCurrentQ(currentQ + 1);
    } else {
      const updatedTests = tests.map((t) =>
        t.id === activeTest.id
          ? {
              ...t,
              lastScore: newScore,
              completed: "Just now",
              status: getStatus(newScore, t.totalScore),
            }
          : t
      );
      setTests(updatedTests);
      setUserScore(newScore);
      setShowResult(true);
    }
  };

  const getStatus = (score, total) => {
    const percent = (score / total) * 100;
    if (percent < 33) return "Low";
    if (percent < 66) return "Moderate";
    return "High";
  };

  const restartQuiz = () => {
    setActiveTest(null);
    setCurrentQ(0);
    setUserScore(0);
    setShowResult(false);
  };

  const viewResult = (test) => {
    setActiveTest(test);
    setUserScore(test.lastScore);
    setShowResult(true);
  };

  return (
    <div className="w-full px-6 md:px-16 py-12 bg-gradient-to-b from-sky-300 via-sky-100 to-white">
      <h2 className="text-4xl font-extrabold mb-4 text-gray-900 text-center">
        Mental Health Assessments
      </h2>
      <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-center">
        Take scientifically-backed assessments to understand your mental health.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-3">
              {React.createElement(test.icon, { className: `w-10 h-10 ${test.iconColor}` })}
              <h3 className="text-xl font-bold text-gray-800">{test.title}</h3>
              {test.completed && (
                <AiOutlineCheckCircle className="text-teal-500 w-6 h-6 ml-auto"/>
              )}
            </div>

            <p className="text-gray-600 mb-4">{test.desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {test.tags.map((tag,i)=>(
                <span key={i} className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">{tag}</span>
              ))}
            </div>

            {test.lastScore && (
              <div className="mb-4">
                <p className="text-gray-500 text-sm mb-1">Last Score</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all"
                    style={{width:`${(test.lastScore/test.totalScore)*100}%`}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Completed {test.completed}</span>
                  <span className="text-yellow-600 font-semibold">{test.status}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => setActiveTest(test)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-2xl shadow-md hover:scale-105 transition transform"
              >
                {test.lastScore ? "Retake Test" : "Start Assessment"}
              </button>
              {test.lastScore && (
                <button
                  onClick={() => viewResult(test)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-2xl shadow-md hover:bg-gray-50 transition"
                >
                  View Results
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Modal */}
      {activeTest && !showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 md:w-1/2 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">{activeTest.title}</h3>
            <p className="text-gray-700 mb-2">Question {currentQ + 1}/{activeTest.questions.length}</p>
            <p className="text-gray-600 mb-4">{activeTest.questions[currentQ].question}</p>
            <div className="flex flex-col gap-3">
              {activeTest.questions[currentQ].options.map((opt,i)=>(
                <button key={i} onClick={()=>handleAnswer(activeTest.questions[currentQ].score[i])} 
                  className="px-4 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition">{opt}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && activeTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 md:w-1/2 shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">{activeTest.title} - Results</h3>
            <p className="text-gray-700 mb-2">Your Score: {userScore}/{activeTest.totalScore}</p>
            <p className="text-gray-700 mb-6">Stress Level: {getStatus(userScore, activeTest.totalScore)}</p>
            <button onClick={restartQuiz} className="px-6 py-2 bg-teal-500 text-white rounded-2xl shadow-md hover:bg-teal-600 transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
