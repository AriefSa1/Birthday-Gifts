"use client";

// PERBAIKAN 1: Tambahkan useEffect
import { useState, useRef, useEffect } from "react"; 
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "./components/Countdown";
import GiftBox from "./components/GiftBox";
import MainContent from "./components/MainContent";
import SideContent from "./components/LatterSection";
import Galery from "./components/GalerySection";
import HeroCelebration from "./components/HeroSection";
import PolaroidSection from "./components/PolaroidSection";

export default function Home() {
  const [step, setStep] = useState(0);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // PERBAIKAN 2: Gunakan useEffect untuk mendengarkan perubahan 'step'
  // Jika step sudah mencapai angka 3, maka mainkan lagunya
  useEffect(() => {
    if (step === 3 && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay dicegah oleh browser. Pengguna harus berinteraksi dulu dengan halaman.", error);
      });
    }
  }, [step]);

  return (
    <main className="h-[100dvh] w-screen flex flex-col items-center justify-center overflow-hidden relative z-10">
      {/* PERBAIKAN 3: Cukup letakkan satu tag audio di atas sini */}
      <audio ref={audioRef} src="/....mp3" loop />

      <AnimatePresence mode="wait">
        
        {/* LAYAR 1: COUNTDOWN */}
        {step === 0 && (
          <motion.div
            key="layar1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center px-4"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
              ✧ Menghitung Hari ✧
            </p>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
              Your Special Day <br/> is Coming
            </h1>
            
            <p className="italic text-sm text-purple-200/80 mb-12 font-light drop-shadow-md">
              Sesuatu yang indah sedang menunggu untukmu 🤍
            </p>
            
            <Countdown targetDate="2026-06-31T00:00:00" onComplete={() => setIsCountdownFinished(true)} />
            
            <p className="mt-10 text-xs text-purple-300/40 mb-2 tracking-[0.5em]">
              ✧ ✧ ✧
            </p>
            
            <div className="mt-8 h-20 flex flex-col items-center justify-start">
              {isCountdownFinished ? (
                <motion.button 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  onClick={() => setStep(1)}
                  className="px-8 py-3 rounded-full border border-fuchsia-300/40 bg-purple-550/30 hover:bg-fuchsia-550/30 backdrop-blur-md transition-all duration-300 flex items-center gap-3 text-sm tracking-widest uppercase text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]"
                >
                  <span className="text-lg font-bold font-serif drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">🎁</span> Open Her Gift
                </motion.button>
              ) : (
                <p className="text-xs text-purple-300/60 mb-2 animate-pulse tracking-widest uppercase drop-shadow-sm">
                  Tunggu sampai waktunya tiba...
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* LAYAR 2: KOTAK KADO */}
        {step === 1 && (
          <motion.div
            key="layar2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center"
          >
            <GiftBox onOpen={() => setStep(2)} />
          </motion.div>
        )}

        {/* LAYAR 3: SELEBRASI AWAL */}
        {step === 2 && (
          <motion.div
            key="layar3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <HeroCelebration onStart={() => setStep(3)} />
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* LAYAR 4 (STEP 3): KONTEN UTAMA DENGAN SCROLL SNAP MAGNET */}
        {/* ======================================================== */}
        {step === 3 && (
          <motion.div
            key="layar4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scroll"
          >
            <style>{`
              .hide-scroll::-webkit-scrollbar {
                display: none;
              }
              .hide-scroll {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {/* HALAMAN 1: POLAROID */}
            <div className="snap-start snap-always w-full min-h-[100dvh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full h-full"
              >
                <PolaroidSection />
              </motion.div>
            </div>

            {/* HALAMAN 2: SIDE CONTENT */}
            <div className="snap-start snap-always w-full min-h-[100dvh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full h-full"
              >
                <SideContent />
              </motion.div>
            </div>

            {/* HALAMAN 3: GALERY SECTION */}
            <div className="snap-start snap-always w-full min-h-[100dvh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full h-full"
              >
                <Galery />
              </motion.div>
            </div>

            {/* HALAMAN 3: MAIN CONTENT */}
            <div className="snap-start snap-always w-full min-h-[100dvh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="w-full h-full"
              >
                <MainContent />
              </motion.div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}