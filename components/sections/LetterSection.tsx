"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { LETTER_STEPS } from "@/content/letter-steps";

const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
};

export default function LetterSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < LETTER_STEPS.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    // PERBAIKAN: Gunakan min-h-[100dvh] agar menyesuaikan layar browser HP dengan tepat
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-[100dvh] flex flex-col justify-between selection:bg-pink-500/30 selection:text-rose-700">
      <div className="flex-grow flex flex-col justify-center my-auto pt-4 md:pt-0">

        {/* KERTAS SURAT: sedikit miring seperti diletakkan di meja, dengan
            bayangan lebar yang meredupkan sekeliling agar terasa intim */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="letter-paper relative w-full min-h-[55vh] md:min-h-[60vh] rounded-lg border border-rose-200/70 px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_45px_rgba(183,110,121,0.28),0_0_100px_60px_rgba(183,110,121,0.18)]"
        >
          {/* Selotip washi di dua sudut atas */}
          <div className="washi-tape absolute -top-3 left-6 w-24 h-6 -rotate-6 rounded-[2px] shadow-sm opacity-90" />
          <div className="washi-tape absolute -top-2 right-10 w-16 h-6 rotate-3 rounded-[2px] shadow-sm opacity-90" />

          {/* Perangko Love Mail di pojok kanan atas */}
          <div className="absolute top-4 right-4 rotate-6 border-2 border-dashed border-rose-300/80 rounded-sm bg-white/80 px-2 py-1.5 flex flex-col items-center gap-0.5 shadow-sm select-none">
            <Heart size={14} className="fill-pink-400 text-pink-400" />
            <span className="text-[7px] font-bold tracking-[0.15em] text-rose-400 uppercase">Love Mail</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={LETTER_STEPS[currentIndex].id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              className="w-full h-full flex flex-col text-left relative transform-gpu"
            >
              <p className="text-[10px] text-center md:text-xs font-bold tracking-[0.25em] text-rose-500/90 uppercase mb-3 drop-shadow-[0_0_6px_rgba(244,114,182,0.3)]">
                {LETTER_STEPS[currentIndex].tag}
              </p>

              <h3 className="font-serif text-center text-2xl md:text-4xl font-semibold tracking-wide text-rose-900 mb-6 border-b border-rose-200/60 pb-4 shrink-0">
                {LETTER_STEPS[currentIndex].title}
              </h3>

              <div className="flex-1 min-h-0 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar focus:outline-none">
                {LETTER_STEPS[currentIndex].component}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigasi: stiker emoji per halaman (bisa langsung diklik) + Prev/Next */}
      <div className="flex justify-between items-center w-full mt-8 md:mt-10 border-t border-rose-100/70 pt-6 pb-2 bg-transparent">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 md:px-5 py-2.5 md:py-2.5 rounded-full border border-rose-200/60 text-[10px] md:text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 md:gap-2 bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-300 ${
            currentIndex === 0
              ? "opacity-10 cursor-not-allowed border-transparent text-rose-900/25"
              : "text-rose-700 hover:bg-rose-100/70 active:scale-95"
          }`}
        >
          <ChevronLeft size={14} className={currentIndex === 0 ? "text-rose-900/25" : "text-pink-400"} /> Prev
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          {LETTER_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Buka halaman ${step.title}`}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base md:text-lg transition-all duration-300 cursor-pointer border ${
                index === currentIndex
                  ? "bg-white shadow-[0_0_12px_rgba(244,114,182,0.5)] border-pink-300 scale-110"
                  : "bg-white/50 border-rose-200/60 opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              {step.icon}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === LETTER_STEPS.length - 1}
          className={`px-4 md:px-5 py-2.5 md:py-2.5 rounded-full border border-rose-200/60 text-[10px] md:text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 md:gap-2 bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-300 ${
            currentIndex === LETTER_STEPS.length - 1
              ? "opacity-10 cursor-not-allowed border-transparent text-rose-900/25"
              : "text-rose-700 hover:bg-rose-100/70 active:scale-95"
          }`}
        >
          Next
          {currentIndex === LETTER_STEPS.length - 1 ? (
            <ChevronRight size={14} className="text-rose-900/25" />
          ) : (
            <Heart size={13} className="fill-pink-500 text-pink-500 animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}
