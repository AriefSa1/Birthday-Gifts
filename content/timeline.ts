export type TimelineItem = {
  year: string;
  text: string;
  icon: string;
  color: string;
};

// TODO: sesuaikan dengan momen-momen asli kalian
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2023 • Awal Bertemu",
    text: "Hari di mana semesta mempertemukan kita. Masih malu-malu, tapi percakapan kecil itu menjadi awal dari segalanya.",
    icon: "✨",
    color: "from-pink-400 to-fuchsia-500",
  },
  {
    year: "2024 • Momen Spesial",
    text: "Melewati ribuan tawa, ratusan cerita, dan setiap tantangan yang membuat kita semakin kuat bersama.",
    icon: "💝",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    year: "Hari Ini • Syukur",
    text: "Merayakan hari bertambahnya usiamu. Terima kasih telah lahir dan menjadi bagian terindah dalam hidupku.",
    icon: "🎂",
    color: "from-purple-500 to-indigo-600",
  },
];
