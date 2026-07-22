export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

// TODO: ganti dengan pertanyaan & jawaban asli tentang kalian berdua
export const QUESTIONS: Question[] = [
  {
    question: "Di mana pertama kali kita ketemu?",
    options: ["Kafe deket kampus", "Konser musik", "Acara ulang tahun teman"],
    correctIndex: 0,
  },
  {
    question: "Warna favoritku apa?",
    options: ["Ungu", "Biru", "Hijau"],
    correctIndex: 0,
  },
  {
    question: "Makanan yang paling sering aku pesan?",
    options: ["Nasi goreng", "Mie ayam", "Ayam geprek"],
    correctIndex: 2,
  },
  {
    question: "Hal yang bikin aku paling seneng?",
    options: ["Ditemenin ngobrol lama", "Dikasih kejutan kecil", "Dibeliin makanan"],
    correctIndex: 1,
  },
  {
    question: "Aku paling takut sama apa?",
    options: ["Ketinggian", "Kecoa", "Gelap"],
    correctIndex: 1,
  },
];
