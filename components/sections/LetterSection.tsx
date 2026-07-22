"use client";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Card from "@/components/ui/Card";
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
        {/* Bayangan gelap ekstra-lebar meredupkan sekeliling — momen surat terasa lebih intim */}
        <Card
          size="lg"
          tone="strong"
          className="w-full min-h-[55vh] md:min-h-[60vh] shadow-[0_0_100px_60px_rgba(183,110,121,0.22)]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={LETTER_STEPS[currentIndex].id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={pageTransition}
              className="w-full h-full flex flex-col text-left relative overflow-hidden transform-gpu"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-[10px] text-center md:text-xs font-bold tracking-[0.25em] text-rose-500/90 uppercase mb-3 drop-shadow-[0_0_6px_rgba(244,114,182,0.3)]">
                {LETTER_STEPS[currentIndex].tag}
              </p>

              <h3 className="font-serif text-center text-2xl md:text-4xl font-semibold tracking-wide text-rose-900 mb-6 border-b border-rose-100/70 pb-4 shrink-0">
                {LETTER_STEPS[currentIndex].title}
              </h3>

              <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar focus:outline-none">
                {LETTER_STEPS[currentIndex].component}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>

      {/* Navigasi Control Bar */}
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

        <div className="flex items-center gap-1.5 md:gap-2">
          {LETTER_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-5 md:w-6 bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" : "w-1.5 bg-rose-200/60"
              }`}
            />
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
