"use client";

import { useState } from "react";
import { Smile, Coffee, CloudRain, Flame, type LucideIcon } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import TypewriterText from "./ui/TypewriterText";
import Card from "./ui/Card";

type MoodId = "senang" | "capek" | "sedih" | "marah";

interface MoodConfig {
  id: MoodId;
  label: string;
  icon: LucideIcon;
  border: string;
  bg: string;
  text: string;
  glow: string;
  messages: string[];
}

// TODO: ganti pesan-pesan ini dengan kata-kata asli sesuai kebutuhan
const MOODS: MoodConfig[] = [
  {
    id: "senang",
    label: "Lagi Senang",
    icon: Smile,
    border: "border-green-400/40",
    bg: "bg-green-500/10",
    text: "text-green-200",
    glow: "shadow-[0_0_20px_rgba(74,222,128,0.15)]",
    messages: [
      "Seneng liat kamu seneng. Semoga harimu makin cerah!",
      "Simpan terus senyum itu ya, itu salah satu favoritku.",
      "Ikutan seneng bacanya. Rayain momen ini pelan-pelan.",
      "Semoga rasa bahagia ini nular ke orang-orang di sekitarmu juga.",
    ],
  },
  {
    id: "capek",
    label: "Lagi Capek",
    icon: Coffee,
    border: "border-yellow-400/40",
    bg: "bg-yellow-500/10",
    text: "text-yellow-100",
    glow: "shadow-[0_0_20px_rgba(250,204,21,0.15)]",
    messages: [
      "Istirahat dulu gapapa, semua bisa nunggu sebentar.",
      "Kamu udah kerja keras banget, boleh kok pelan-pelan.",
      "Minum air putih, tarik napas, kamu boleh berhenti sebentar.",
      "Capek itu tanda kamu udah berusaha. Jangan lupa istirahat ya.",
    ],
  },
  {
    id: "sedih",
    label: "Lagi Sediih",
    icon: CloudRain,
    border: "border-orange-400/40",
    bg: "bg-orange-500/10",
    text: "text-orange-100",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.15)]",
    messages: [
      "Gapapa kalau mau nangis dulu, aku di sini kok.",
      "Perasaan sedih itu wajar, pelan-pelan aja ya ngelewatinnya.",
      "Kamu nggak sendirian ngerasain ini. Aku selalu ada.",
      "Semoga ada yang bisa bikin kamu lebih ringan hari ini.",
    ],
  },
  {
    id: "marah",
    label: "Lagi Marah",
    icon: Flame,
    border: "border-red-400/40",
    bg: "bg-red-500/10",
    text: "text-red-100",
    glow: "shadow-[0_0_20px_rgba(248,113,113,0.15)]",
    messages: [
      "Tarik napas dulu, pelan-pelan. Kamu berhak kesel kok.",
      "Boleh marah, tapi jangan lupa sayang sama diri sendiri juga.",
      "Aku di sini kalau kamu butuh cerita soal apa yang bikin kesel.",
      "Semoga rasa itu cepat reda dan kamu balik tenang lagi.",
    ],
  },
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function MoodEnvelopeSection() {
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [message, setMessage] = useState("");
  const [drawCount, setDrawCount] = useState(0);
  const [lastMessages, setLastMessages] = useState<Partial<Record<MoodId, string>>>({});

  const drawMessage = (moodId: MoodId) => {
    const mood = MOODS.find((m) => m.id === moodId)!;
    const pool = mood.messages.filter((m) => m !== lastMessages[moodId]);
    const picked = pickRandom(pool);
    setLastMessages((prev) => ({ ...prev, [moodId]: picked }));
    setMessage(picked);
    setSelectedMood(moodId);
    setDrawCount((c) => c + 1);
  };

  const activeMood = MOODS.find((m) => m.id === selectedMood) ?? null;

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-lg w-full">
      <SectionHeading eyebrow="✧ Lagi Ngerasa Apa? ✧" title="Amplop Sesuai Mood" className="mb-8" />

      {!activeMood ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {MOODS.map((mood) => {
            const Icon = mood.icon;
            return (
              <button
                key={mood.id}
                onClick={() => drawMessage(mood.id)}
                className={`flex flex-col items-center gap-2 px-4 py-6 rounded-2xl border backdrop-blur-md transition-transform hover:scale-[1.03] cursor-pointer ${mood.border} ${mood.bg} ${mood.glow}`}
              >
                <Icon className={mood.text} size={28} strokeWidth={1.5} />
                <span className={`text-xs uppercase tracking-widest ${mood.text}`}>{mood.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 w-full">
          <Card size="lg" tone="strong" className="w-full">
            <p className="text-sm md:text-base text-pink-100/90 text-left leading-relaxed font-serif">
              <TypewriterText text={message} delay={0.2} />
            </p>
          </Card>
          <div className="flex gap-3 flex-wrap justify-center">
            <Button onClick={() => drawMessage(selectedMood!)}>Buka Amplop Lagi</Button>
            <Button onClick={() => setSelectedMood(null)}>Pilih Mood Lain</Button>
          </div>
        </div>
      )}
    </div>
  );
}
