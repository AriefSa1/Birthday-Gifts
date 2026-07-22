"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type TargetAndTransition,
  type Transition,
  type MotionStyle,
} from "framer-motion";

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

export default function SnapSection({
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
