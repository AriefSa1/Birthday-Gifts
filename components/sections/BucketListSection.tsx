"use client";

import { motion } from "framer-motion";
import { useSectionState } from "@/hooks/useSectionState";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgressBar from "@/components/ui/ProgressBar";
import { BUCKET_LIST_ITEMS as ITEMS } from "@/content/bucket-list";

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
      <SectionHeading eyebrow="✧ Mimpi Kita Berdua ✧" title="Bucket List" className="mb-2" />
      <p className="text-xs text-rose-400/90 mb-6">
        {loaded ? `${checked.length} dari ${ITEMS.length} tercapai` : "Memuat..."}
      </p>

      <ProgressBar value={progress} className="mb-6" />

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
                  ? "bg-pink-400/15 border-rose-300/60"
                  : "bg-rose-100/60 border-rose-200/60"
              }`}
            >
              <span className={isChecked ? "text-amber-500" : "text-rose-900/25"}>
                {isChecked ? "★" : "☆"}
              </span>
              <span className={`text-sm ${isChecked ? "text-rose-900" : "text-rose-700/70"}`}>
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
