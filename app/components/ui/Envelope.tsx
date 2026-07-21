"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

type EnvelopeProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  cardTone?: "light" | "dark";
};

const cardToneStyles: Record<NonNullable<EnvelopeProps["cardTone"]>, string> = {
  light: "bg-linear-to-b from-pink-50 to-white text-gray-700",
  dark: "bg-purple-950/70 border border-white/10 text-pink-100",
};

export default function Envelope({
  isOpen,
  children,
  className = "",
  cardTone = "light",
}: EnvelopeProps) {
  return (
    <div className={`relative [perspective:1000px] ${className}`}>
      {/* Badan amplop - pastel pink solid, tidak transparan */}
      <div className="absolute inset-0 rounded-2xl border-2 border-pink-300 bg-linear-to-b from-pink-200 to-rose-300 shadow-[0_15px_40px_rgba(244,114,182,0.4)]" />

      {/* Dekorasi hati di pojok amplop */}
      <Heart
        className="absolute -top-3 -left-3 w-6 h-6 text-pink-400 fill-pink-200 rotate-[-20deg] z-30 drop-shadow-md"
        strokeWidth={1.5}
      />
      <Heart
        className="absolute -bottom-3 -right-2 w-5 h-5 text-rose-400 fill-rose-200 rotate-[15deg] z-30 drop-shadow-md"
        strokeWidth={1.5}
      />

      {/* Aksen titik/confetti kecil */}
      <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-white/90 z-30" />
      <div className="absolute bottom-6 left-5 w-1.5 h-1.5 rounded-full bg-yellow-100 z-30" />
      <div className="absolute top-1/3 right-2 w-1.5 h-1.5 rounded-full bg-white/80 z-30" />

      {/* Kartu/kertas yang meluncur keluar saat amplop dibuka */}
      <motion.div
        initial={{ y: "4%", opacity: 0 }}
        animate={isOpen ? { y: "-8%", opacity: 1 } : { y: "4%", opacity: 0 }}
        transition={{ duration: 0.6, delay: isOpen ? 0.45 : 0, ease: "easeOut" }}
        className={`absolute inset-x-3 top-3 bottom-3 rounded-xl shadow-2xl overflow-hidden z-10 ${cardToneStyles[cardTone]}`}
      >
        {children}
      </motion.div>

      {/* Penutup/flap segitiga amplop - pastel rose lebih tua untuk depth, tidak transparan */}
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isOpen ? -160 : 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          transformOrigin: "top",
          transformPerspective: 1000,
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
        }}
        className="absolute top-0 left-0 right-0 h-2/5 z-20 border-2 border-pink-300 bg-linear-to-b from-rose-300 to-pink-400"
      >
        {/* Pita vertikal di tengah flap */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 bg-rose-500" />

        {/* Segel pita berbentuk hati di ujung flap - ikut berputar bersama flap */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10 w-7 h-7 rounded-full bg-linear-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 shadow-md flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" strokeWidth={1.5} />
        </div>
      </motion.div>
    </div>
  );
}
