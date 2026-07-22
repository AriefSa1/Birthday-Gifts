import { Smile, Coffee, CloudRain, Flame, type LucideIcon } from "lucide-react";

export type MoodId = "senang" | "capek" | "sedih" | "marah";

export interface MoodConfig {
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
export const MOODS: MoodConfig[] = [
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
