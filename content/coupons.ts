export interface Coupon {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// TODO: ganti dengan janji-janji nyata versi kalian berdua
export const COUPONS: Coupon[] = [
  {
    id: "traktir",
    icon: "🍽️",
    title: "1x Traktir Makan",
    description: "Kapan pun kamu mau, tinggal tunjukin kupon ini. Aku yang bayar, kamu yang pilih tempatnya.",
  },
  {
    id: "movie-night",
    icon: "🎬",
    title: "1x Movie Night Pilihanmu",
    description: "Film apa pun itu, genre apa pun, aku nonton bareng sampai habis tanpa protes.",
  },
  {
    id: "pijat",
    icon: "💆",
    title: "1x Pijit Manja 30 Menit",
    description: "Capek abis kerja? Tinggal bilang, aku pijitin sampai kamu ketiduran.",
  },
  {
    id: "peluk",
    icon: "🤗",
    title: "1x Free Hug Kapan Aja",
    description: "Nggak perlu alasan. Kalau lagi butuh peluk, kupon ini berlaku 24 jam nonstop.",
  },
  {
    id: "curhat",
    icon: "👂",
    title: "1x Sesi Curhat Tanpa Interupsi",
    description: "Aku dengerin sampai selesai, nggak motong, nggak buru-buru ngasih solusi.",
  },
  {
    id: "masak",
    icon: "🍳",
    title: "1x Dimasakin Menu Favoritmu",
    description: "Sebut menunya, aku yang belanja dan masak. Kamu tinggal duduk manis.",
  },
  {
    id: "gaming",
    icon: "🎮",
    title: "1x Nemenin Ngerjain Hobimu",
    description: "Apa pun yang lagi kamu suka lakuin, aku ikut nemenin seharian penuh.",
  },
  {
    id: "kejutan",
    icon: "🎁",
    title: "1x Kejutan Rahasia",
    description: "Isinya rahasia. Tukar kupon ini dan biarkan aku yang atur semuanya.",
  },
];
