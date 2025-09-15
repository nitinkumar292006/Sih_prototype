import React, { useRef, useState, useEffect } from "react";
import nature from "../assets/nature.mp3";
import stresFree from "../assets/stresFree.mp3";
import music3 from '../assets/music3.mp3'
import music4 from '../assets/music4.mp3'
import music5 from '../assets/music5.mp3'
import music_image1 from '../assets/music_img1.jpg'
import music_image2 from '../assets/music_img2.jpg'
import music_image3 from '../assets/music_img3.jpg'
import music_image4 from '../assets/music_img4.webp'
import music_image5 from '../assets/music_img5.webp'


const TRACKS = [
  {
    id: 1,
    title: "Relaxing Ambient",
    artist: "Nature",
    src: nature,
    cover: music_image1,
  },
  {
    id: 2,
    title: "Calm Piano",
    artist: "StressFree",
    src: stresFree,
    cover: music_image2,
  },
  {
    id: 3,
    title: "Relax",
    artist: "mindboost",
    src: music3,
    cover: music_image3,
  },
  {
    id: 4,
    title: "piano",
    artist: "StressRelief",
    src: music4,
    cover: music_image4,
  },
  {
    id: 5,
    title: "music",
    artist: "BoostYourmind",
    src: music5,
    cover: music_image5,
  },
  // future tracks add kar sakta hai
];

export default function MusicPage() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const currentTrack = TRACKS[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => { });
      }
    }
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(() => { });
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handleVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  const formatTime = (sec) => {
    if (!sec) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-white flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-wide drop-shadow">
        🎶 Stress-Free Music
      </h1>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[90%] max-w-6xl">
        {/* Music Card */}
        <div className="backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-6 text-center border border-white/30">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md"
          />
          <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{currentTrack.artist}</p>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/70 shadow hover:shadow-lg hover:scale-105 transition"
            >
              ⏮
            </button>
            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg hover:scale-110 transition"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/70 shadow hover:shadow-lg hover:scale-105 transition"
            >
              ⏭
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-gray-500">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="flex-1 accent-sky-500 h-2 rounded-lg"
            />
            <span className="text-xs text-gray-500">{formatTime(duration)}</span>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="flex-1 accent-sky-500 h-2 rounded-lg"
            />
          </div>
        </div>

        {/* Playlist Side Panel */}
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-6 border border-white/30">
          <h3 className="text-xl font-semibold mb-4">🎼 Playlist</h3>
          <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
            {TRACKS.map((track, idx) => (
              <li
                key={track.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(true);
                }}
                className={`cursor-pointer px-4 py-3 rounded-xl flex justify-between items-center shadow-sm transition ${idx === currentIndex
                    ? "bg-sky-200/80 font-medium shadow-md"
                    : "bg-white/60 hover:bg-sky-50"
                  }`}
              >
                <span>{track.title}</span>
                <span className="text-xs text-gray-500">{track.artist}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hidden Audio */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleNext}>
        <source src={currentTrack.src} type="audio/mp3" />
      </audio>
    </div>
  );
}
