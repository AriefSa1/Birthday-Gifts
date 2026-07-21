"use client";

import { motion } from "framer-motion";
import { useSectionState } from "../lib/useSectionState";

// TODO: ganti dengan mimpi/rencana asli kalian berdua
const ITEMS = [
  "Liburan ke Jepang bareng",
  "Nonton konser artis favorit bareng",
  "Masak makan malam bareng tiap minggu",
  "Roadtrip ke pantai pas sunrise",
  "Piknik sambil bawa playlist lagu kita",
  "Belajar satu hobi baru bareng",
];

type BucketData = { checked: number[] };

export default function BucketListSection() {
  const { data, save, loaded } = useSectionState<BucketData>("bucketlist", { checked: [] });
  const checked = data.checked ?? [];

  const toggle = (index: number) => {
    const next = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index];
    save({ checked: next });
  };

  const progress = (checked.length / ITEMS.length) * 100;

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-md w-full">
      <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
        ✧ Mimpi Kita Berdua ✧
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
        Bucket List
      </h2>
      <p className="text-xs text-purple-300/60 mb-6">
        {loaded ? `${checked.length} dari ${ITEMS.length} tercapai` : "Memuat..."}
      </p>

      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-linear-to-r from-fuchsia-400 to-purple-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full flex flex-col gap-3">
        {ITEMS.map((label, index) => {
          const isChecked = checked.includes(index);
          return (
            <motion.button
              key={index}
              onClick={() => toggle(index)}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border backdrop-blur-md transition-colors ${
                isChecked
                  ? "bg-fuchsia-500/10 border-fuchsia-300/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <span className={isChecked ? "text-yellow-300" : "text-white/20"}>
                {isChecked ? "★" : "☆"}
              </span>
              <span className={`text-sm ${isChecked ? "text-pink-50" : "text-purple-200/70"}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
