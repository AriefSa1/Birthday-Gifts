'use client';
import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Mengambil file audio dari folder public */}
      <audio ref={audioRef} src="/lagu-romantis.wav" loop />
      
      <button
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 ${
          isPlaying ? 'animate-[spin_4s_linear_infinite] shadow-[0_0_25px_rgba(236,72,153,0.6)]' : 'hover:scale-110'
        }`}
      >
        {isPlaying ? '⏸' : '🎵'}
      </button>
    </div>
  );
}