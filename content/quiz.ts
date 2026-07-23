export type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

// TODO: ganti dengan pertanyaan & jawaban asli tentang kalian berdua
export const QUESTIONS: Question[] = [
  {
    question: "Di mana pertama kali kita jalan bareng?",
    options: ["Ke Pantai", "Ke Coffeshop", "Lomba Mancing"],
    correctIndex: 0,
  },
  {
    question: "Bulan apa pertama kali kita ketemu?",
    options: ["Agustus", "Mei", "April"],
    correctIndex: 2,
  },
  {
    question: "Makanan apa yang kita pesen sehabis nonton bareng pertama kali?",
    options: ["Mie ayam", "Nasi goreng", "Ayam geprek"],
    correctIndex: 1,
  },
  {
    question: "Hal yang sering kita lakuin bareng tiap hari?",
    options: ["Telfon / Video Call", "Jalan-Jalan", "Makan Bareng"],
    correctIndex: 0,
  },
  {
    question: "Apa yang kita beli waktu balik dari tulungagung?",
    options: ["Gacoan, Cimol, Martabak", "Sate", "Soto, Donat, Jus"],
    correctIndex: 2,
  },
];
