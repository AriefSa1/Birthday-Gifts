"use client";
import { useState, useEffect, useRef } from "react";
// PERBAIKAN: Impor framer-motion untuk animasi flip
import { AnimatePresence, motion } from "framer-motion";

export default function Countdown({ 
  targetDate, 
  onComplete 
}: { 
  targetDate: string; 
  onComplete?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{ Hari: number; Jam: number; Menit: number; Detik: number } | null>(null);

  const hasCompleted = useRef(false);

  useEffect(() => {
    const hitungWaktu = () => {
      const tanggalAman = targetDate.replace(/-/g, '/').replace('T', ' ');
      const target = new Date(tanggalAman).getTime();
      const sekarang = new Date().getTime();
      const jarak = target - sekarang;

      if (jarak > 0) {
        setTimeLeft({
          Hari: Math.floor(jarak / (1000 * 60 * 60 * 24)),
          Jam: Math.floor((jarak % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          Menit: Math.floor((jarak % (1000 * 60 * 60)) / (1000 * 60)),
          Detik: Math.floor((jarak % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ Hari: 0, Jam: 0, Menit: 0, Detik: 0 });
        if (onComplete && !hasCompleted.current) {
          hasCompleted.current = true;
          onComplete(); 
        }
      }
    };

    hitungWaktu();
    const interval = setInterval(hitungWaktu, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          
          {/* KOTAK KACA KOSMIK DENGAN EFEK PERSPECTIVE UNTUK 3D FLIP */}
          <div className="w-16 h-20 md:w-20 md:h-24 bg-purple-500/30 border border-fuchsia-300/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.15)] mb-3 relative overflow-hidden [perspective:1000px]">
            
            {/* Pantulan Cahaya (Highlight) di atas kotak */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-200/40 to-transparent z-10" />
            
            {/* LOGIKA ANIMASI FLIP (OPEN BOOK) */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={value} // Key sangat penting! Ini memberitahu Framer Motion kapan harus memutar animasi (saat nilai berubah)
                initial={{ rotateX: -90, y: -15, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                exit={{ rotateX: 90, y: 15, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="absolute flex items-center justify-center origin-center"
              >
                {/* ANGKA: Gradasi putih ke ungu muda dengan drop-shadow fuchsia */}
                <span className="text-3xl md:text-5xl glow-text font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 drop-shadow-[0_0_12px_rgba(217,70,239,0.4)]">
                  {value.toString().padStart(2, '0')}
                </span>
              </motion.div>
            </AnimatePresence>

          </div>
          
          {/* LABEL (Hari, Jam, Menit, Detik) */}
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-purple-300/70">
            {unit}
          </span>
          
        </div>
      ))}
    </div>
  );
}