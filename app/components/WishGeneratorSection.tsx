"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionState } from "../lib/useSectionState";

const WISH_POOL = [
  "Semoga harimu secerah senyummu hari ini.",
  "Semoga semua rencana kecilmu hari ini berjalan lancar.",
  "Jangan lupa istirahat, kamu sudah kerja keras.",
  "Aku bangga sama kamu, walau kadang lupa bilang.",
  "Semoga hari ini ada satu hal kecil yang bikin kamu ketawa.",
  "Kamu lebih kuat dari yang kamu kira.",
  "Terima kasih sudah jadi bagian dari hidupku.",
  "Semoga makan siangmu enak hari ini.",
  "Pelan-pelan aja, gapapa kalau belum selesai semua.",
  "Aku doain yang terbaik buat kamu, selalu.",
  "Semoga rejekimu lancar hari ini.",
  "Kamu udah hebat sejauh ini, jangan lupa itu.",
  "Semoga ketemu orang-orang baik hari ini.",
  "Istirahat cukup ya, jangan begadang terus.",
  "Semoga hari ini terasa ringan buat kamu.",
];

type WishData = { message: string; drawnAt: string } | null;

export default function WishGeneratorSection() {
  const { data, save, loaded } = useSectionState<WishData>("wish", null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawWish = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    const pool = data ? WISH_POOL.filter((m) => m !== data.message) : WISH_POOL;
    const message = pool[Math.floor(Math.random() * pool.length)];
    window.setTimeout(() => {
      save({ message, drawnAt: new Date().toISOString() });
      setIsDrawing(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-md">
      <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
        ✧ Doa Hari Ini ✧
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
        Tarik Satu Kartu
      </h2>

      <div className="relative w-56 h-36 mb-8 [perspective:1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={data?.message ?? "empty"}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-purple-500/20 border border-fuchsia-300/30 backdrop-blur-md rounded-xl flex items-center justify-center p-5 shadow-[0_0_25px_rgba(147,51,234,0.15)]"
          >
            <p className="text-sm md:text-base text-pink-50 italic leading-relaxed">
              {!loaded
                ? "Memuat..."
                : data?.message ?? "Belum ada kartu yang ditarik."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={drawWish}
        disabled={isDrawing || !loaded}
        className="px-8 py-3 rounded-full border border-fuchsia-300/30 bg-purple-900/20 text-xs md:text-sm text-pink-200 tracking-[0.2em] uppercase hover:bg-purple-900/30 backdrop-blur-xl transition-all duration-300 disabled:opacity-50"
      >
        {data ? "Tarik Kartu Lagi" : "Tarik Kartu"}
      </button>
    </div>
  );
}
