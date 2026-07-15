"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Camera, Video, Music, ChevronLeft, ChevronRight } from "lucide-react";

export default function MainContent() {
  // 1. State berbasis INDEKS angka (dimulai dari 0 untuk konten pertama)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Skema Data Konten - Anda bisa dengan mudah menambah atau mengurangi sesi di sini!
  const steps = [
    {
      id: "surat",
      component: (
        <div className="space-y-12">
          <section className="text-center">
            <p className="text-xs tracking-[0.3em] text-pink-300 uppercase mb-4">✧ ... ✧</p>
            <h2 className="font-serif text-5xl md:text-7xl font-bold mb-4">.....<br/>...</h2>
            <p className="italic text-pink-200/80">...</p>
          </section>
          <section className="bg-[#241a22]/60 border border-white/50 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl">
            <h3 className="font-serif text-3xl mb-8 text-center">Halo...</h3>
            <div className="space-y-6 text-sm md:text-base text-pink-100/90 leading-relaxed max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              <p>...</p>
            </div>
          </section>
        </div>
      )
    },
    {
      id: "foto",
      component: (
        <div className="bg-[#241a22]/60 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-md mx-auto w-full text-center">
          <h3 className="font-serif text-3xl mb-6 text-pink-200 flex items-center justify-center gap-2">
            <Camera size={24} className="text-pink-400" /> Galeri...
          </h3>
          <div className="aspect-square w-full bg-white/10 rounded-xl flex items-center justify-center border border-dashed border-pink-300/30">
            <p className="text-sm text-pink-200/60">📸 [Taruh Foto Indah di Sini]</p>
          </div>
          <p className="mt-4 text-sm text-pink-100/80 italic">"Momen yang takkan pernah pudar."</p>
        </div>
      )
    },
    {
      id: "video",
      component: (
        <div className="bg-[#241a22]/60 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-lg mx-auto w-full text-center">
          <h3 className="font-serif text-3xl mb-6 text-pink-200 flex items-center justify-center gap-2">
            <Video size={24} className="text-pink-400" /> Video
          </h3>
          <div className="aspect-video w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden">
            {/* Ganti dengan tag <video> atau iframe youtube kamu */}
            <p className="text-sm text-pink-200/60">🎥 [Tempat Pemutar Video Kamu]</p>
          </div>
        </div>
      )
    },
    {
      id: "musik",
      component: (
        <div className="bg-[#241a22]/60 border border-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-sm mx-auto w-full text-center space-y-6">
          <h3 className="font-serif text-3xl text-pink-200 flex items-center justify-center gap-2">
            <Music size={24} className="text-pink-400" /> Soundtrack
          </h3>
          <div className="py-8 bg-white/5 rounded-full border border-pink-300/10 animate-pulse flex items-center justify-center">
            <Heart size={40} className="fill-pink-500 text-pink-500 animate-bounce" />
          </div>
          <p className="text-sm text-pink-100/70">Mendengarkan lagu favorit bersama...</p>
        </div>
      )
    }
  ];

  // 3. Fungsi Navigasi dinamis
  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Varian animasi
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-between">
      
      {/* Konten Utama */}
      <div className="flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[currentIndex].id} // Unique key agar animasi mentrigger setiap ganti indeks
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeUp}
            className="w-full"
          >
            {steps[currentIndex].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigasi Button */}
      <div className="flex justify-between items-center w-full mt-16 border-t border-white/5 pt-6">
        {/* Tombol Prev */}
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-6 py-2 rounded-full border border-pink-300/30 text-sm tracking-widest uppercase inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
            currentIndex === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/10 active:scale-95"
          }`}
        >
          <ChevronLeft size={14} className="text-pink-300"/> Prev
        </button>

        {/* Indikator Halaman (Opsional - Bagus untuk estetika) */}
        <div className="text-xs tracking-widest text-pink-300/50">
          {currentIndex + 1} / {steps.length}
        </div>
        
        {/* Tombol Next */}
        <button 
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className={`px-6 py-2 rounded-full border border-pink-300/30 text-sm tracking-widest uppercase inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm transition-all duration-300 ${
            currentIndex === steps.length - 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/10 active:scale-95"
          }`}
        >
          Next <ChevronRight size={14} className="text-pink-300"/>
        </button>
      </div>

    </div>
  );
}