"use client";

import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

// Tombol kecil mengambang untuk pause/lanjutkan musik latar,
// muncul hanya saat konten utama sudah terbuka.
export default function MusicToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={onToggle}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
      className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full border border-rose-200/70 bg-white/75 backdrop-blur-xl shadow-lg flex items-center justify-center text-rose-700 hover:bg-rose-100/80 active:scale-95 transition-all cursor-pointer"
    >
      {playing ? (
        <Music size={16} className="animate-pulse" />
      ) : (
        <VolumeX size={16} className="opacity-60" />
      )}
    </motion.button>
  );
}
