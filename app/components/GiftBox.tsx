"use client";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function GiftBox({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onOpen}>
      <p className="text-xs tracking-widest text-pink-300 mb-8 uppercase">✦ Ada sesuatu untukmu ✦</p>
      
      {/* Animasi Kado Bergetar (Wiggle) */}
      <motion.div
        animate={{ rotate: [-5, 5, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="relative"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 bg-pink-550/30 border-2 border-pink-400/40 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)] backdrop-blur-sm">
          <Gift size={64} className="text-pink-200" strokeWidth={1.5} />
        </div>
      </motion.div>

      <p className="mt-8 text-sm text-pink-200/80 italic flex items-center gap-2">
        <span className="animate-pulse">🎵</span> Klik untuk membuka kadonya
      </p>
    </div>
  );
}