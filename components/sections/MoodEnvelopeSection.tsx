"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import TypewriterText from "@/components/ui/TypewriterText";
import Card from "@/components/ui/Card";
import { MOODS, type MoodId } from "@/content/moods";

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function MoodEnvelopeSection() {
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [message, setMessage] = useState("");
  const [lastMessages, setLastMessages] = useState<Partial<Record<MoodId, string>>>({});

  const drawMessage = (moodId: MoodId) => {
    const mood = MOODS.find((m) => m.id === moodId)!;
    const pool = mood.messages.filter((m) => m !== lastMessages[moodId]);
    const picked = pickRandom(pool);
    setLastMessages((prev) => ({ ...prev, [moodId]: picked }));
    setMessage(picked);
    setSelectedMood(moodId);
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
            <p className="text-sm md:text-base text-rose-800/90 text-left leading-relaxed font-serif">
              {/* key={message} me-remount typewriter supaya efek ngetik mengulang tiap tarik pesan baru */}
              <TypewriterText key={message} text={message} delay={0.2} />
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
