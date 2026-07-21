"use client";

import { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  type TargetAndTransition,
  type Transition,
  type MotionStyle,
} from "framer-motion";
import Countdown from "./components/Countdown";
import BirthdayGreetingSection from "./components/BirthdayGreetingSection";
import GiftBox from "./components/GiftBox";
import PolaroidSection from "./components/PolaroidSection";
import SurpriseSection from "./components/SurpriseSection";
import GalerySection from "./components/GalerySection";
import HeroSection from "./components/HeroSection";
import LatterSection from "./components/LatterSection";
import ReasonsSection from "./components/ReasonsSection";
import TimelineSection from "./components/TimelineSection";
import WishGeneratorSection from "./components/WishGeneratorSection";
import QuizSection from "./components/QuizSection";
import BucketListSection from "./components/BucketListSection";
import MoodEnvelopeSection from "./components/MoodEnvelopeSection";

// Didefinisikan di luar Home agar identitas komponen stabil antar render
// (di dalam Home, setiap perubahan state membuat ulang fungsi ini dan me-remount seluruh section).
type SectionVariant =
  | "fadeUp"
  | "slideLeft"
  | "slideRight"
  | "zoomIn"
  | "blurFade"
  | "flipUp";

interface SectionAnimationPreset {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
  style?: MotionStyle;
}

const sectionVariants: Record<SectionVariant, SectionAnimationPreset> = {
  fadeUp: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  slideLeft: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  slideRight: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  blurFade: {
    initial: { opacity: 0, y: 30, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, ease: "easeOut" },
  },
  flipUp: {
    initial: { opacity: 0, rotateX: -40, y: 40 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    style: { transformPerspective: 1200 },
  },
};

function SnapSection({
  children,
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  variant?: SectionVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // whileInView saja tidak reset ke `initial` saat section keluar layar, jadi
  // animasinya cuma main sekali. Drive `animate` manual pakai useInView supaya
  // section benar-benar kembali ke initial saat keluar viewport dan replay saat balik.
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const preset = sectionVariants[variant];

  return (
    <div className="snap-start w-full min-h-dvh flex flex-col items-center justify-center px-4 overflow-hidden">
      <motion.div
        ref={ref}
        initial={preset.initial}
        animate={isInView ? preset.animate : preset.initial}
        transition={preset.transition}
        style={preset.style}
        className="w-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play musik saat mencapai step 4 (konten utama)
  useEffect(() => {
    if (step === 4 && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay dicegah oleh browser. Pengguna harus berinteraksi dulu dengan halaman.", error);
      });
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
            <GiftBox onOpen={() => setStep(3)} />
          </motion.div>
        )}

        {/* LAYAR 4: SELEBRASI AWAL (HERO SECTION) */}
        {step === 3 && (
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
        )}

        {/* ======================================================== */}
        {/* LAYAR 5 (STEP 4): KONTEN UTAMA DENGAN SCROLL SNAP MAGNET */}
        {/* ======================================================== */}
        {step === 4 && (
          <motion.div
            key="layar4"
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
              <LatterSection />
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