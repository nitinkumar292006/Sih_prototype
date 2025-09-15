// DrawingCanvas.jsx
import React, { useRef, useState, useEffect } from "react";

const COLORS = [
  "#1E90FF", "#FF4C4C", "#28A745", "#FFA500",
  "#8A2BE2", "#FF7F50", "#20C997", "#FF69B4",
  "#6C757D", "#000000", "#FFFFFF",
];

export default function DrawingCanvas() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#1E90FF");
  const [size, setSize] = useState(4);
  const [suggestion, setSuggestion] = useState("");

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = tool === "brush" ? color : "#F3F4F6";
      ctxRef.current.lineWidth = size;
    }
  }, [tool, color, size]);

  // Manual drawing handlers
  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctxRef.current.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctxRef.current.stroke();
  };
  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setSuggestion("");
  };

  const saveCanvas = () => {
    const link = document.createElement("a");
    link.download = "my-art.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  // AI Drawing function (clears canvas and draws full picture)
  const drawAI = () => {
    clearCanvas(); // remove previous AI drawing
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    // Funny AI suggestions
    const suggestions = [
      "Sleepy cat floating on a rainbow 🌈",
      "Dancing broccoli doing yoga 🥦🧘",
      "Tiny alien sipping coffee on the moon 👽☕",
      "Happy cloud with sunglasses 😎☁️",
      "Pizza slice doing a backflip 🍕🤸",
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setSuggestion(randomSuggestion);

    // Draw full AI picture depending on suggestion
    ctx.save();
    ctx.lineWidth = 3;

    if (randomSuggestion.includes("cat")) {
      // Cat with rainbow
      // Rainbow arcs
      const colors = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#8F00FF"];
      colors.forEach((c, i) => {
        ctx.beginPath();
        ctx.strokeStyle = c;
        ctx.arc(canvas.width/2, canvas.height/2 + 100, 80 - i*10, Math.PI, 2*Math.PI);
        ctx.stroke();
      });
      // Cat head
      ctx.fillStyle = "#FFA500";
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 40, 0, Math.PI*2);
      ctx.fill();
      // Eyes
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(canvas.width/2 - 15, canvas.height/2 - 10, 5, 0, Math.PI*2);
      ctx.arc(canvas.width/2 + 15, canvas.height/2 - 10, 5, 0, Math.PI*2);
      ctx.fill();
      // Smile
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2 + 5, 15, 0, Math.PI);
      ctx.stroke();
    }

    if (randomSuggestion.includes("broccoli")) {
      ctx.fillStyle = "#228B22";
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2 - 20, 40, 0, Math.PI*2); // top
      ctx.fill();
      ctx.fillRect(canvas.width/2 - 10, canvas.height/2 - 20, 20, 60); // stem
    }

    if (randomSuggestion.includes("alien")) {
      ctx.fillStyle = "#00FF00";
      ctx.beginPath();
      ctx.ellipse(canvas.width/2, canvas.height/2, 50, 70, 0, 0, Math.PI*2);
      ctx.fill();
      // Eyes
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(canvas.width/2 - 20, canvas.height/2 - 10, 10, 20, 0, 0, Math.PI*2);
      ctx.ellipse(canvas.width/2 + 20, canvas.height/2 - 10, 10, 20, 0, 0, Math.PI*2);
      ctx.fill();
    }

    if (randomSuggestion.includes("cloud")) {
      ctx.fillStyle = "#E0E0E0";
      ctx.beginPath();
      ctx.arc(canvas.width/2 - 30, canvas.height/2, 30, 0, Math.PI*2);
      ctx.arc(canvas.width/2, canvas.height/2 - 20, 30, 0, Math.PI*2);
      ctx.arc(canvas.width/2 + 30, canvas.height/2, 30, 0, Math.PI*2);
      ctx.fill();
      // Sunglasses
      ctx.fillStyle = "#000";
      ctx.fillRect(canvas.width/2 - 25, canvas.height/2 - 10, 20, 5);
      ctx.fillRect(canvas.width/2 + 5, canvas.height/2 - 10, 20, 5);
    }

    if (randomSuggestion.includes("pizza")) {
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2 - 50);
      ctx.lineTo(canvas.width/2 + 60, canvas.height/2 + 60);
      ctx.lineTo(canvas.width/2 - 60, canvas.height/2 + 60);
      ctx.closePath();
      ctx.fill();
      // Toppings
      ctx.fillStyle = "#FF0000";
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 5, 0, Math.PI*2);
      ctx.arc(canvas.width/2 + 20, canvas.height/2 + 20, 5, 0, Math.PI*2);
      ctx.arc(canvas.width/2 - 20, canvas.height/2 + 10, 5, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.restore();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white p-6">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Mindful & Funny Drawing
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Click the AI button to generate a funny picture. Draw over it or clear for another!
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center">
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-transform transform shadow-md hover:scale-105 ${
            tool === "brush" ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"
          }`}
          onClick={() => setTool("brush")}
        >Brush</button>
        <button
          className={`px-5 py-2 rounded-full font-semibold transition-transform transform shadow-md hover:scale-105 ${
            tool === "eraser" ? "bg-gradient-to-r from-gray-400 to-gray-600 text-white" : "bg-white text-gray-800 border border-gray-300"
          }`}
          onClick={() => setTool("eraser")}
        >Eraser</button>
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md">
          <label className="text-gray-700 font-medium text-sm">Size</label>
          <input type="range" min="1" max="20" value={size} onChange={(e)=>setSize(e.target.value)} className="cursor-pointer"/>
        </div>
        <button className="px-5 py-2 bg-red-400 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform" onClick={clearCanvas}>Clear</button>
        <button className="px-5 py-2 bg-green-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform" onClick={saveCanvas}>Save</button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        {COLORS.map(c => (
          <div key={c} onClick={()=>setColor(c)} style={{backgroundColor: c}}
               className={`w-10 h-10 rounded-full cursor-pointer border-4 ${color===c?"border-gray-800":"border-gray-200"} shadow-md`}></div>
        ))}
      </div>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] touch-none"
          onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
        />
      </div>

      <div className="flex flex-col items-center mt-6 gap-2">
        <button onClick={drawAI} className="px-5 py-2 bg-indigo-500 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform">
          Generate Funny AI Drawing
        </button>
        {suggestion && <p className="text-gray-700 italic mt-2 max-w-lg text-center">{suggestion}</p>}
      </div>

      <div className="mt-6 bg-white/80 backdrop-blur-md p-6 rounded-2xl max-w-4xl text-gray-700 text-base shadow-lg">
        <ul className="list-disc list-inside space-y-2">
          <li>Click the AI button to auto-generate a funny picture.</li>
          <li>You can still draw manually on top using brush or eraser.</li>
          <li>Click AI again to replace the previous picture.</li>
          <li>Save your creations as a cheerful visual journal!</li>
        </ul>
      </div>
    </div>
  );
}
