"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, Camera, Video, Music, ChevronLeft, ChevronRight } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import Card from "@/components/ui/Card";

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function SideContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = [
    {
      id: "surat",
      title: "Halo Butir...",
      tag: "✧ SURAT UNTUKMU ✧",
      component: (
        // PERBAIKAN: text-sm untuk HP, text-base untuk komputer
        <div className="space-y-5 md:space-y-6 text-sm md:text-base text-pink-100/90 leading-relaxed pr-2 font-serif tracking-wide">
          <p className="uppercase text-xs font-bold tracking-widest text-pink-300/80 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]">
            <TypewriterText text="Dear Kamu," />
          </p>
          <p>
            <TypewriterText text="ini surat..." delay={0.5} />
          </p>
          <p>
            <TypewriterText text="Tapi belum ada isinya, wkwkwk... 😅" delay={1.3} />
          </p>
          <p>
            <TypewriterText text="klik next yuk !!!" delay={2.3} />
          </p>
        </div>
      )
    },
    {
      id: "foto",
      title: "Ini Fotonya Mana Ya ?",
      tag: "✧ MEMORI KITA ✧",
      component: (
        <div className="space-y-6 text-center">
          <div className="aspect-[4/3] w-full bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-pink-400/30 backdrop-blur-sm group hover:border-pink-400/60 transition-all duration-300">
            <div className="flex flex-col items-center gap-2 text-pink-300/60 group-hover:text-pink-300 transition-colors">
              <Camera size={32} strokeWidth={1.5} />
              <p className="text-xs tracking-wider uppercase">[ Fotonya Ilang ]</p>
            </div>
          </div>
          <p className="text-sm italic text-pink-200/70">&ldquo;Sebab dalam setiap foto, waktu berhenti untuk mengabadikan kebahagiaan kita.&rdquo;</p>
        </div>
      )
    },
    {
      id: "video",
      title: "Tutor edit video butir",
      tag: "✧ CINEMATIC MOMENT ✧",
      component: (
        <div className="space-y-6 text-center">
          <div className="aspect-video w-full bg-black/40 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden relative group">
            <div className="flex flex-col items-center gap-2 text-pink-300/60">
              <Video size={36} strokeWidth={1.5} />
              <p className="text-xs tracking-wider uppercase">[ Tutor Edit Video Butir ]</p>
            </div>
          </div>
          <p className="text-sm text-pink-200/70">Sebuah pesan singkat yang tak bisa diungkapkan hanya lewat kata-kata tertulis.</p>
        </div>
      )
    },
    {
      id: "musik",
      title: "Lagune Potong Bebek Angsa",
      tag: "✧ OUR SONG ✧",
      component: (
        <div className="space-y-6 text-center py-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-400/20 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(244,114,182,0.15)]">
              <Music size={36} className="text-pink-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-pink-100">Potong Bebek Angsa.mp3</h4>
            <p className="text-xs text-pink-300/60 uppercase tracking-widest">Artist / Penyanyi</p>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-full w-2/3 shadow-[0_0_8px_rgba(244,114,182,0.7)]"></div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentIndex < steps.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const pageTransition: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    // PERBAIKAN: Gunakan min-h-[100dvh] agar menyesuaikan layar browser HP dengan tepat
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-[100dvh] flex flex-col justify-between selection:bg-pink-500/30 selection:text-pink-200">
      <div className="flex-grow flex flex-col justify-center my-auto pt-4 md:pt-0">
        <Card size="lg" tone="strong" className="w-full min-h-[55vh] md:min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={steps[currentIndex].id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              className="w-full h-full flex flex-col text-left relative overflow-hidden transform-gpu"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-[10px] text-center md:text-xs font-bold tracking-[0.25em] text-pink-300/80 uppercase mb-3 drop-shadow-[0_0_6px_rgba(244,114,182,0.3)]">
                {steps[currentIndex].tag}
              </p>

              <h3 className="font-serif text-center text-2xl md:text-4xl font-semibold tracking-wide text-white mb-6 border-b border-white/5 pb-4 shrink-0">
                {steps[currentIndex].title}
              </h3>

              <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar focus:outline-none">
                {steps[currentIndex].component}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>

      {/* Navigasi Control Bar */}
      <div className="flex justify-between items-center w-full mt-8 md:mt-10 border-t border-white/5 pt-6 pb-2 bg-transparent">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 md:px-5 py-2.5 md:py-2.5 rounded-full border border-white/10 text-[10px] md:text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 md:gap-2 bg-purple-900/10 backdrop-blur-xl shadow-xl transition-all duration-300 ${
            currentIndex === 0
              ? "opacity-10 cursor-not-allowed border-transparent text-white/20"
              : "text-pink-200 hover:bg-purple-900/20 active:scale-95"
          }`}
        >
          <ChevronLeft size={14} className={currentIndex === 0 ? "text-white/20" : "text-pink-400"} /> Prev
        </button>

        <div className="flex items-center gap-1.5 md:gap-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-5 md:w-6 bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          className={`px-4 md:px-5 py-2.5 md:py-2.5 rounded-full border border-white/10 text-[10px] md:text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 md:gap-2 bg-purple-900/10 backdrop-blur-xl shadow-xl transition-all duration-300 ${
            currentIndex === steps.length - 1
              ? "opacity-10 cursor-not-allowed border-transparent text-white/20"
              : "text-pink-200 hover:bg-purple-900/20 active:scale-95"
          }`}
        >
          Next 
          {currentIndex === steps.length - 1 ? (
            <ChevronRight size={14} className="text-white/20" />
          ) : (
            <Heart size={13} className="fill-pink-500 text-pink-500 animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}