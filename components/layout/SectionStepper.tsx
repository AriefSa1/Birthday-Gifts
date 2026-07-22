"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
  type MotionStyle,
} from "framer-motion";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";

export type SectionVariant =
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

export interface StepperSection {
  id: string;
  variant?: SectionVariant;
  content: ReactNode;
}

export default function SectionStepper({
  sections,
  buttonDelayMs = 5000,
}: {
  sections: StepperSection[];
  buttonDelayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);

  // Tombol Lanjut baru muncul setelah delay; timer jalan ulang tiap ganti section
  // (reset ke tersembunyi dilakukan di goNext, bukan di sini, agar tidak setState sinkron dalam effect).
  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), buttonDelayMs);
    return () => clearTimeout(timer);
  }, [index, buttonDelayMs]);

  const goNext = () => {
    setShowNext(false);
    setIndex((i) => i + 1);
  };

  const section = sections[index];
  const isLast = index === sections.length - 1;
  const preset = sectionVariants[section.variant ?? "fadeUp"];

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar">
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={preset.initial}
          animate={preset.animate}
          exit={{ opacity: 0, y: -30, transition: { duration: 0.4, ease: "easeIn" } }}
          transition={preset.transition}
          style={preset.style}
          className="w-full min-h-full flex flex-col items-center justify-center px-4 py-10"
        >
          {section.content}

          {/* Tombol di dalam alur konten (bukan overlay) supaya tidak menimpa
              nav internal section seperti LetterSection. */}
          {!isLast && (
            <div className="h-16 mt-6 flex items-center justify-center">
              <AnimatePresence>
                {showNext && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Button onClick={goNext} className="inline-flex items-center gap-2">
                      Lanjut
                      <Heart size={13} className="fill-pink-500 text-pink-500 animate-pulse" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
