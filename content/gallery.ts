export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  date?: string;
}

// TODO: ganti properti url dengan path foto asli kalian
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
    caption: "Momen tawa lepas pertama kali kita jalan bareng ✨",
    date: "14 Februari",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop",
    caption: "Waktu nemu tempat kopi lucu yang kamu suka banget ☕",
    date: "22 Maret",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",
    caption: "Kamu yang selalu cantik, difoto candid pas lagi ngambek 🥞",
    date: "05 Mei",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop",
    caption: "Senja terbaik tahun ini, dilewati bareng favoritku 🌅",
    date: "19 Juni",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
    caption: "Genggaman tangan yang selalu bikin tenang 🤍",
    date: "02 Juli",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
    caption: "Piknik dadakan yang berakhir jadi cerita favorit 🧺",
    date: "27 Juli",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop",
    caption: "Jalan sore tanpa tujuan, tapi rasanya paling jauh 🚶",
    date: "15 Agustus",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
    caption: "Bunga kecil yang kamu simpan sampai kering 🌼",
    date: "03 September",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=900&auto=format&fit=crop",
    caption: "Makan malam spesial yang kita rencanain seminggu penuh 🍝",
    date: "21 Oktober",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    caption: "Dan semua momen yang akan datang setelah ini 💫",
    date: "Segera...",
  },
];
