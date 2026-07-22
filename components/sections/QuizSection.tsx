"use client";

import { motion } from "framer-motion";
import { useSectionState } from "@/hooks/useSectionState";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgressBar from "@/components/ui/ProgressBar";
import { QUESTIONS } from "@/content/quiz";

const MotionCard = motion.create(Card);

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
      <SectionHeading eyebrow="✧ Seberapa Kenal Kamu ✧" title="Love Quiz" className="mb-6" />

      {!loaded ? (
        <p className="text-sm text-rose-400/90">Memuat...</p>
      ) : isDone ? (
        <Card size="lg">
          <p className="text-lg text-rose-800 mb-2">
            Skor kamu: {correctCount} / {QUESTIONS.length}
          </p>
          <p className="text-sm text-rose-400/90">
            {correctCount === QUESTIONS.length
              ? "Sempurna, kamu emang paling kenal aku."
              : "Makasih udah nyoba jawab semuanya."}
          </p>
        </Card>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {QUESTIONS.slice(0, answeredCount + 1).map((q, qIndex) => {
            const selected = answers[qIndex];
            const isAnswered = selected !== undefined;
            return (
              <MotionCard
                key={qIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left"
              >
                <p className="text-[10px] uppercase tracking-widest text-rose-400/90 mb-2">
                  Pertanyaan {qIndex + 1} dari {QUESTIONS.length}
                </p>
                <p className="text-sm md:text-base text-rose-900 mb-3">{q.question}</p>
                <div className="flex flex-col gap-2">
                  {q.options.map((opt, optIndex) => {
                    const isCorrect = optIndex === q.correctIndex;
                    const isPicked = optIndex === selected;
                    let style = "bg-rose-100/60 border-rose-200/60 text-rose-800";
                    if (isAnswered && isPicked && isCorrect) {
                      style = "bg-green-500/15 border-green-400/40 text-green-700";
                    } else if (isAnswered && isPicked && !isCorrect) {
                      style = "bg-red-500/15 border-red-400/40 text-red-700";
                    } else if (isAnswered && isCorrect) {
                      style = "bg-green-500/10 border-green-400/20 text-green-700/60";
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
              </MotionCard>
            );
          })}
        </div>
      )}

      <ProgressBar value={(answeredCount / QUESTIONS.length) * 100} className="mt-6" />
    </div>
  );
}
