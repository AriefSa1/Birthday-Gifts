"use client";

import { motion } from "framer-motion";
import { useSectionState } from "../lib/useSectionState";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

// TODO: ganti dengan pertanyaan & jawaban asli tentang kalian berdua
const QUESTIONS: Question[] = [
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

type QuizData = { answers: Record<number, number> };

export default function QuizSection() {
  const { data, save, loaded } = useSectionState<QuizData>("quiz", { answers: {} });
  const answers = data.answers ?? {};
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([qIndex, optIndex]) => QUESTIONS[Number(qIndex)].correctIndex === optIndex
  ).length;
  const isDone = answeredCount === QUESTIONS.length;

  const selectAnswer = (qIndex: number, optIndex: number) => {
    if (answers[qIndex] !== undefined) return;
    save({ answers: { ...answers, [qIndex]: optIndex } });
  };

  return (
    <div className="flex flex-col items-center text-center px-4 max-w-lg w-full">
      <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
        ✧ Seberapa Kenal Kamu ✧
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
        Love Quiz
      </h2>

      {!loaded ? (
        <p className="text-sm text-purple-300/60">Memuat...</p>
      ) : isDone ? (
        <div className="bg-purple-500/10 border border-fuchsia-300/20 backdrop-blur-md rounded-2xl px-6 py-8">
          <p className="text-lg text-pink-100 mb-2">
            Skor kamu: {correctCount} / {QUESTIONS.length}
          </p>
          <p className="text-sm text-purple-300/70">
            {correctCount === QUESTIONS.length
              ? "Sempurna, kamu emang paling kenal aku."
              : "Makasih udah nyoba jawab semuanya."}
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {QUESTIONS.slice(0, answeredCount + 1).map((q, qIndex) => {
            const selected = answers[qIndex];
            const isAnswered = selected !== undefined;
            return (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-500/10 border border-fuchsia-300/20 backdrop-blur-md rounded-xl p-4 text-left"
              >
                <p className="text-[10px] uppercase tracking-widest text-purple-300/60 mb-2">
                  Pertanyaan {qIndex + 1} dari {QUESTIONS.length}
                </p>
                <p className="text-sm md:text-base text-pink-50 mb-3">{q.question}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = optIndex === q.correctIndex;
                    const isPicked = optIndex === selected;
                    let style = "bg-white/5 border-white/10 text-purple-100";
                    if (isAnswered && isPicked && isCorrect) {
                      style = "bg-green-500/15 border-green-400/40 text-green-200";
                    } else if (isAnswered && isPicked && !isCorrect) {
                      style = "bg-red-500/15 border-red-400/40 text-red-200";
                    } else if (isAnswered && isCorrect) {
                      style = "bg-green-500/10 border-green-400/20 text-green-200/70";
                    }
                    return (
                      <button
                        key={optIndex}
                        onClick={() => selectAnswer(qIndex, optIndex)}
                        disabled={isAnswered}
                        className={`text-xs md:text-sm text-left px-3 py-2 rounded-lg border transition-colors ${style} disabled:cursor-default`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-6">
        <div
          className="h-full bg-linear-to-r from-fuchsia-400 to-purple-400 transition-all duration-500"
          style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
