"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Check } from "lucide-react";
import { useSectionState } from "@/hooks/useSectionState";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { COUPONS } from "@/content/coupons";

type CouponData = { opened: string[]; redeemed: string[] };

export default function SurpriseSection() {
  const { data, save, loaded } = useSectionState<CouponData>("coupons", { opened: [], redeemed: [] });
  const opened = data.opened ?? [];
  const redeemed = data.redeemed ?? [];
  const [flippingId, setFlippingId] = useState<string | null>(null);

  const openCoupon = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (opened.includes(id) || flippingId) return;
    setFlippingId(id);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 45,
      spread: 65,
      startVelocity: 28,
      scalar: 0.8,
      colors: ["#f9a8d4", "#fda4af", "#fbcfe8", "#e8c39a"],
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });

    window.setTimeout(() => {
      save({ opened: [...opened, id], redeemed });
      setFlippingId(null);
    }, 350);
  };

  const toggleRedeemed = (id: string) => {
    const next = redeemed.includes(id) ? redeemed.filter((r) => r !== id) : [...redeemed, id];
    save({ opened, redeemed: next });
  };

  const openedCount = opened.length;

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-2xl w-full">
      <SectionHeading eyebrow="✧ Kupon Kejutan ✧" title="Kado yang Bisa Ditukar Kapan Saja" className="mb-2" />
      <p className="text-xs md:text-sm text-rose-600/80 mb-6 max-w-md">
        Ini bukan kado yang habis dibaca sekali. Buka satu-satu, simpan, dan tukarkan ke aku kapan pun kamu mau — nggak ada tanggal kedaluwarsa.
      </p>
      <p className="text-xs text-rose-400/90 mb-6">
        {loaded ? `${openedCount} dari ${COUPONS.length} kupon dibuka` : "Memuat..."}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 w-full">
        {COUPONS.map((coupon) => {
          const isOpen = opened.includes(coupon.id);
          const isRedeemed = redeemed.includes(coupon.id);
          const isFlipping = flippingId === coupon.id;

          return (
            <div key={coupon.id} className="relative h-40 [perspective:1000px]">
              <AnimatePresence mode="wait" initial={false}>
                {!isOpen ? (
                  <motion.button
                    key="sealed"
                    onClick={(e) => openCoupon(coupon.id, e)}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: -8 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isFlipping}
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-rose-300 to-pink-400 shadow-lg border border-rose-200/70 flex flex-col items-center justify-center gap-2 cursor-pointer overflow-hidden"
                  >
                    {/* Pita silang kado */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-white/70" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-white/70" />
                    <div className="relative z-10 flex flex-col items-center gap-1.5">
                      <Gift size={26} className="text-white drop-shadow-sm" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">
                        Buka Kado
                      </span>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Card
                      size="sm"
                      tone={isRedeemed ? "default" : "strong"}
                      className={`w-full h-full flex flex-col items-center justify-center gap-1 text-center relative ${
                        isRedeemed ? "opacity-60" : ""
                      }`}
                    >
                      <span className="text-2xl">{coupon.icon}</span>
                      <p className="text-[11px] font-bold text-rose-900 leading-tight">{coupon.title}</p>
                      <p className="text-[9px] text-rose-600/80 leading-snug line-clamp-3">
                        {coupon.description}
                      </p>
                      <button
                        onClick={() => toggleRedeemed(coupon.id)}
                        className={`mt-1 inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border transition-colors cursor-pointer ${
                          isRedeemed
                            ? "bg-green-500/10 border-green-400/40 text-green-700"
                            : "bg-pink-400/10 border-rose-300/60 text-rose-600 hover:bg-pink-400/20"
                        }`}
                      >
                        {isRedeemed && <Check size={9} />}
                        {isRedeemed ? "Sudah Ditukar" : "Tandai Ditukar"}
                      </button>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
