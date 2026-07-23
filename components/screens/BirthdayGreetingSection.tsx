"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/ui/Button";

const SKIP_LOCK_SECONDS = 10;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function BirthdayGreetingSection({
  name,
  onContinue,
}: {
  name: string;
  onContinue: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(SKIP_LOCK_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // resize & useWorker dimatikan: keduanya memasang listener/state di level
    // window/canvas yang tidak sepenuhnya dibersihkan oleh confetti.create,
    // dan bentrok dengan React Strict Mode yang sengaja mount-unmount-mount
    // ulang tiap komponen sekali di dev. Ukuran canvas di-set manual sekali saja.
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const fire = confetti.create(canvas, { resize: false, useWorker: false });

    const duration = (SKIP_LOCK_SECONDS + 4) * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      fire({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      fire({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-xs tracking-[0.3em] uppercase text-rose-500/90 mb-4 drop-shadow-[0_0_8px_rgba(217,112,147,0.35)]">
          ✧ Hari Ini Spesial ✧
        </p>

        <h1 className="font-serif font-extrabold text-4xl md:text-6xl text-transparent bg-clip-text bg-linear-to-br from-rose-500 via-pink-400 to-rose-400 drop-shadow-[0_0_20px_rgba(216,112,147,0.25)] leading-tight">
          <TypewriterText text="Selamat Ulang Tahun," delay={0.3} />
          <br />
          <TypewriterText text={`${name}! 🎉`} delay={1} />
        </h1>

        <div className="mt-10 h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {secondsLeft > 0 ? (
              <motion.p
                key="countdown"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-rose-400/90 tracking-widest uppercase animate-pulse"
              >
                Nikmati dulu momennya... {secondsLeft}
              </motion.p>
            ) : (
              <motion.div
                key="skip-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Button onClick={onContinue}>Lanjutkan ✧</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
