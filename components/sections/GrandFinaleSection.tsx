"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock, Mail } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FINALE, SECRET } from "@/content/finale";

const HOLD_MS = 1800;
const TICK_MS = 50;

type Phase = "candle" | "dark" | "celebrate";
type SecretState = "hidden" | "locked" | "revealed";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function GrandFinaleSection() {
  const [phase, setPhase] = useState<Phase>("candle");
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const [secretState, setSecretState] = useState<SecretState>("hidden");
  const [guess, setGuess] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stopHold = () => {
    if (holdTimer.current) {
      clearInterval(holdTimer.current);
      holdTimer.current = null;
    }
    setHoldProgress(0);
  };

  const startHold = () => {
    if (phase !== "candle" || holdTimer.current) return;
    const startedAt = Date.now();
    holdTimer.current = setInterval(() => {
      const progress = Math.min(1, (Date.now() - startedAt) / HOLD_MS);
      setHoldProgress(progress);
      if (progress >= 1) {
        stopHold();
        setPhase("dark");
      }
    }, TICK_MS);
  };

  // Bersihkan interval kalau komponen dilepas di tengah hold
  useEffect(() => stopHold, []);

  // Blackout singkat, lalu masuk fase perayaan
  useEffect(() => {
    if (phase !== "dark") return;
    const t = setTimeout(() => setPhase("celebrate"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  // Konfeti saat fase perayaan (pola sama dengan BirthdayGreetingSection:
  // resize & worker dimatikan supaya aman dari Strict Mode)
  useEffect(() => {
    if (phase !== "celebrate") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const fire = confetti.create(canvas, { resize: false, useWorker: false });

    const duration = 6000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 0 };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        window.clearInterval(interval);
        return;
      }
      const particleCount = 40 * (timeLeft / duration);
      fire({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } });
      fire({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } });
    }, 300);

    return () => window.clearInterval(interval);
  }, [phase]);

  // Tombol amplop rahasia muncul beberapa saat setelah pesan penutup selesai diketik
  useEffect(() => {
    if (phase !== "celebrate") return;
    const t = setTimeout(() => setSecretState("locked"), 7000);
    return () => clearTimeout(t);
  }, [phase]);

  const submitGuess = () => {
    const normalized = guess.replace(/\D/g, "");
    if (normalized === SECRET.answer) {
      setSecretState("revealed");
      return;
    }
    setWrongCount((c) => c + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center text-center px-4 min-h-[70vh] justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Blackout sesaat setelah lilin ditiup */}
      <AnimatePresence>
        {phase === "dark" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {phase === "candle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-champagne/80 uppercase mb-2 drop-shadow-[0_0_8px_rgba(232,195,154,0.4)]">
            {FINALE.eyebrow}
          </p>
          <h3 className="font-serif text-3xl md:text-5xl font-semibold text-white mb-10">
            {FINALE.title}
          </h3>

          {/* Lilin: area sentuh besar supaya nyaman di HP */}
          <button
            onPointerDown={startHold}
            onPointerUp={stopHold}
            onPointerLeave={stopHold}
            onPointerCancel={stopHold}
            className="relative flex flex-col items-center cursor-pointer select-none touch-none bg-transparent border-0 p-6"
            aria-label={FINALE.holdHint}
          >
            {/* Api */}
            <div className="relative mb-1">
              <div
                className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-orange-300 to-yellow-100 animate-candle-flicker shadow-[0_0_25px_rgba(251,191,36,0.8),0_0_60px_rgba(251,146,60,0.4)]"
                style={{ opacity: 1 - holdProgress * 0.75, transform: `scale(${1 - holdProgress * 0.4})` }}
              />
              {/* Titik biru di pangkal api */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-300/70 blur-[1px]" />
            </div>
            {/* Sumbu */}
            <div className="w-0.5 h-2 bg-stone-300" />
            {/* Batang lilin */}
            <div className="w-8 h-24 rounded-t-md rounded-b-sm bg-gradient-to-b from-pink-100 via-rose-200 to-rose-300 shadow-lg relative overflow-hidden">
              <div className="absolute inset-y-0 left-1 w-1.5 bg-white/40 rounded-full" />
            </div>
            {/* Kue */}
            <div className="w-40 h-10 -mt-1 rounded-[50%] bg-gradient-to-b from-rose-400 to-rose-500 shadow-xl" />
            <div className="w-48 h-12 -mt-4 rounded-[50%] bg-gradient-to-b from-purple-800 to-purple-900 border border-white/10" />
          </button>

          {/* Progress hold */}
          <div className="w-40 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-rose-400 rounded-full transition-[width] duration-75"
              style={{ width: `${holdProgress * 100}%` }}
            />
          </div>
          <p className="text-xs text-purple-300/60 tracking-widest uppercase mt-4 animate-pulse">
            {FINALE.holdHint}
          </p>
        </motion.div>
      )}

      {phase === "celebrate" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <div className="space-y-4">
            {FINALE.closingLines.map((line, i) => (
              <p
                key={i}
                className="font-serif italic text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-champagne via-pink-100 to-rosegold leading-relaxed drop-shadow-[0_0_15px_rgba(232,195,154,0.25)]"
              >
                <TypewriterText text={line} delay={0.8 + i * 1.8} />
              </p>
            ))}
          </div>

          {/* Amplop pesan rahasia */}
          <div className="min-h-[60px] w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              {secretState === "locked" && (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`w-full flex flex-col items-center gap-4 ${isShaking ? "animate-shake" : ""}`}
                >
                  <p className="text-xs tracking-[0.2em] uppercase text-pink-300/70 flex items-center gap-2">
                    <Mail size={14} /> {SECRET.buttonLabel}
                  </p>
                  <Card size="md" tone="strong" className="w-full max-w-xs flex flex-col gap-3 items-center">
                    <p className="text-[11px] text-purple-200/70 flex items-center gap-1.5">
                      <Lock size={11} /> {SECRET.hint}
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={guess}
                      onChange={(e) => setGuess(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submitGuess()}
                      placeholder="····"
                      className="w-28 text-center text-lg tracking-[0.5em] py-2 rounded-lg bg-white/5 border border-white/15 text-pink-50 placeholder-white/25 focus:outline-none focus:border-pink-400 transition-colors"
                    />
                    {wrongCount > 0 && (
                      <p className="text-[11px] text-rose-300/80 italic">
                        {SECRET.wrongMessages[(wrongCount - 1) % SECRET.wrongMessages.length]}
                      </p>
                    )}
                    <Button onClick={submitGuess} className="!px-6 !py-2 text-[10px]">
                      Buka
                    </Button>
                  </Card>
                </motion.div>
              )}

              {secretState === "revealed" && (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full"
                >
                  <Card size="lg" tone="strong" className="w-full border-champagne/30">
                    <p className="font-serif italic text-base md:text-lg text-pink-50/95 leading-relaxed">
                      <TypewriterText text={SECRET.message} delay={0.3} />
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}
