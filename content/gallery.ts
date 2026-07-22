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
    url: "/7.jpeg",
    caption: "Momen tawa lepas pertama kali kita jalan bareng ✨",
    date: "14 Februari",
  },
  {
    id: 2,
    url: "/2.jpeg",
    caption: "Waktu nemu tempat kopi lucu yang kamu suka banget ☕",
    date: "22 Maret",
  },
  {
    id: 3,
    url: "/6.jpeg",
    caption: "Kamu yang selalu cantik, difoto candid pas lagi ngambek 🥞",
    date: "05 Mei",
  },
  {
    id: 4,
    url: "/9.jpeg",
    caption: "Senja terbaik tahun ini, dilewati bareng favoritku 🌅",
    date: "19 Juni",
  },
  {
    id: 5,
    url: "/15.jpeg",
    caption: "Genggaman tangan yang selalu bikin tenang 🤍",
    date: "02 Juli",
  },
  {
    id: 6,
    url: "/5.jpeg",
    caption: "Piknik dadakan yang berakhir jadi cerita favorit 🧺",
    date: "27 Juli",
  },
  {
    id: 7,
    url: "/11.jpeg",
    caption: "Jalan sore tanpa tujuan, tapi rasanya paling jauh 🚶",
    date: "15 Agustus",
  },
  {
    id: 8,
    url: "/4.jpeg",
    caption: "Bunga kecil yang kamu simpan sampai kering 🌼",
    date: "03 September",
  },
  {
    id: 9,
    url: "/12.jpeg",
    caption: "Makan malam spesial yang kita rencanain seminggu penuh 🍝",
    date: "21 Oktober",
  },
  {
    id: 10,
    url: "/3.jpeg",
    caption: "Dan semua momen yang akan datang setelah ini 💫",
    date: "Segera...",
  },
];
