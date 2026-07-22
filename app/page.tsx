"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SnapSection from "@/components/layout/SnapSection";
import Countdown from "@/components/screens/Countdown";
import BirthdayGreetingSection from "@/components/screens/BirthdayGreetingSection";
import GiftBox from "@/components/screens/GiftBox";
import PolaroidSection from "@/components/sections/PolaroidSection";
import SurpriseSection from "@/components/sections/SurpriseSection";
import GalerySection from "@/components/sections/GalerySection";
import HeroSection from "@/components/screens/HeroSection";
import LetterSection from "@/components/sections/LetterSection";
import ReasonsSection from "@/components/sections/ReasonsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import WishGeneratorSection from "@/components/sections/WishGeneratorSection";
import QuizSection from "@/components/sections/QuizSection";
import BucketListSection from "@/components/sections/BucketListSection";
import MoodEnvelopeSection from "@/components/sections/MoodEnvelopeSection";

export default function Home() {
  const [step, setStep] = useState(0);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play musik saat mencapai step 4 (konten utama)
  useEffect(() => {
    if (step === 4 && audioRef.current) {
      // Autoplay bisa dicegah browser sebelum ada interaksi user — biarkan gagal diam-diam.
      audioRef.current.play().catch(() => {});
    }
  }, [step]);

  // Auto transition dari Countdown ke GiftBox
  useEffect(() => {
    if (isCountdownFinished) {
      const timer = setTimeout(() => {
        setStep(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCountdownFinished]);

  return (
    <main className="h-dvh w-screen flex flex-col items-center justify-center overflow-hidden relative z-10">
      <audio ref={audioRef} src="/lagu-romantis1.wav" loop />

      <AnimatePresence mode="wait">
        
        {/* LAYAR 1: COUNTDOWN */}
        {step === 0 && (
          <motion.div
            key="layar1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center px-4 w-full h-full"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
              ✧ Menghitung Hari ✧
            </p>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
              Your Special Day <br/> is Coming
            </h1>
            
            <p className="italic text-sm text-purple-200/80 mb-12 font-light drop-shadow-md">
              Sesuatu yang indah sedang menunggu untukmu 🤍
            </p>
            
            {/* TODO: ganti ke tanggal ulang tahun asli, format "YYYY-MM-DDTHH:mm:ss" */}
            <Countdown targetDate="2026-06-31T00:00:00" onComplete={() => setIsCountdownFinished(true)} />
            
            <p className="mt-10 text-xs text-purple-300/40 mb-2 tracking-[0.5em]">
              ✧ ✧ ✧
            </p>
            
            <div className="mt-8 h-20 flex flex-col items-center justify-center">
              {!isCountdownFinished && (
                <p className="text-xs text-purple-300/60 mb-2 animate-pulse tracking-widest uppercase drop-shadow-sm">
                  Tunggu sampai waktunya tiba...
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* LAYAR 2: SAMBUTAN ULANG TAHUN + KEMBANG API */}
        {step === 1 && (
          <motion.div
            key="layar-sambutan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* TODO: ganti "Nama" dengan nama penerima asli */}
            <BirthdayGreetingSection name="Nama" onContinue={() => setStep(2)} />
          </motion.div>
        )}

        {/* LAYAR 3: KOTAK KADO */}
        {step === 2 && (
          <motion.div
            key="layar2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center w-full h-full"
          >
            <HeroSection onStart={() => setStep(3)} />
          </motion.div>
        )}

        {/* LAYAR 4: SELEBRASI AWAL (HERO SECTION) */}
        {/* {step === 3 && (
          <motion.div
            key="layar3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            // Menambahkan flex layout agar konten di dalam hero section berada di tengah
            className="w-full h-full flex items-center justify-center"
          >
            <HeroSection onStart={() => setStep(4)} />
          </motion.div>
        )} */}

        {/* ======================================================== */}
        {/* LAYAR 5 (STEP 4): KONTEN UTAMA DENGAN SCROLL SNAP MAGNET */}
        {/* ======================================================== */}
        {step === 3 && (
          <motion.div
            key="layar3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth hide-scrollbar"
          >
            <SnapSection variant="zoomIn">
              <PolaroidSection />
            </SnapSection>

            <SnapSection variant="slideLeft">
              <TimelineSection />
            </SnapSection>

            <SnapSection variant="fadeUp">
              <ReasonsSection />
            </SnapSection>

            <SnapSection variant="flipUp">
              <GalerySection />
            </SnapSection>

            <SnapSection variant="blurFade">
              <LetterSection />
            </SnapSection>

            <SnapSection variant="slideRight">
              <WishGeneratorSection />
            </SnapSection>

            <SnapSection variant="zoomIn">
              <QuizSection />
            </SnapSection>

            <SnapSection variant="fadeUp">
              <BucketListSection />
            </SnapSection>

            <SnapSection variant="slideLeft">
              <MoodEnvelopeSection />
            </SnapSection>

            <SnapSection variant="flipUp">
              <SurpriseSection />
            </SnapSection>

          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}