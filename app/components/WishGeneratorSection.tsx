"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSectionState } from "../lib/useSectionState";
import Card from "./ui/Card";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";

const MotionCard = motion.create(Card);

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
      <SectionHeading eyebrow="✧ Doa Hari Ini ✧" title="Tarik Satu Kartu" className="mb-8" />

      <div className="relative w-56 h-36 mb-8 [perspective:1000px]">
        <AnimatePresence mode="wait">
          <MotionCard
            key={data?.message ?? "empty"}
            tone="strong"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center shadow-[0_0_25px_rgba(147,51,234,0.15)]"
          >
            <p className="text-sm md:text-base text-pink-50 italic leading-relaxed">
              {!loaded
                ? "Memuat..."
                : data?.message ?? "Belum ada kartu yang ditarik."}
            </p>
          </MotionCard>
        </AnimatePresence>
      </div>

      <Button onClick={drawWish} disabled={isDrawing || !loaded}>
        {data ? "Tarik Kartu Lagi" : "Tarik Kartu"}
      </Button>
    </div>
  );
}
