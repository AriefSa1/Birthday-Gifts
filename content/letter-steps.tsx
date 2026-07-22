import type { ReactNode } from "react";
import { Camera, Music } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";

export type LetterStep = {
  id: string;
  title: string;
  tag: string;
  component: ReactNode;
};

// TODO: isi surat, foto, video, dan lagu asli di sini
export const LETTER_STEPS: LetterStep[] = [
  {
    id: "surat",
    title: "Halo Butir...",
    tag: "✧ SURAT UNTUKMU ✧",
    component: (
      // PERBAIKAN: text-sm untuk HP, text-base untuk komputer
      <div className="space-y-5 md:space-y-6 text-sm md:text-base text-rose-800/90 leading-relaxed pr-2 font-serif tracking-wide">
        <p className="uppercase text-xs font-bold tracking-widest text-rose-500/90 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]">
          <TypewriterText text="Dear Kamu," />
        </p>
        <p>
          <TypewriterText text="ini surat..." delay={0.5} />
        </p>
        <p>
          <TypewriterText text="Tapi belum ada isinya, wkwkwk... 😅" delay={1.3} />
        </p>
        <p>
          <TypewriterText text="klik next yuk !!!" delay={2.3} />
        </p>
      </div>
    ),
  },
  {
    id: "foto",
    title: "Ini Fotonya Mana Ya ?",
    tag: "✧ MEMORI KITA ✧",
    component: (
      <div className="space-y-6 text-center">
        <div className="aspect-[4/3] w-full bg-rose-100/60 rounded-xl flex items-center justify-center border border-dashed border-pink-400/30 backdrop-blur-sm group hover:border-pink-400/60 transition-all duration-300">
          <div className="flex flex-col items-center gap-2 text-rose-500/80 group-hover:text-rose-500 transition-colors">
            <Camera size={32} strokeWidth={1.5} />
            <p className="text-xs tracking-wider uppercase">[ Fotonya Ilang ]</p>
          </div>
        </div>
        <p className="text-sm italic text-rose-600/80">&ldquo;Sebab dalam setiap foto, waktu berhenti untuk mengabadikan kebahagiaan kita.&rdquo;</p>
      </div>
    ),
  },
  {
    id: "video",
    title: "Tutor edit video butir",
    tag: "✧ CINEMATIC MOMENT ✧",
    component: (
      <div className="space-y-6 text-center">
        <div className="aspect-video w-full bg-black/40 rounded-xl flex items-center justify-center border border-rose-200/60 overflow-hidden relative group">
          <div className="flex flex-col items-center gap-2 text-rose-500/80">
            <video controls preload="none">
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <p className="text-xs tracking-wider uppercase">[ Tutor Edit Video Butir ]</p>
          </div>
        </div>
        <p className="text-sm text-rose-600/80">Sebuah pesan singkat yang tak bisa diungkapkan hanya lewat kata-kata tertulis.</p>
      </div>
    ),
  },
  {
    id: "musik",
    title: "Lagune Potong Bebek Angsa",
    tag: "✧ OUR SONG ✧",
    component: (
      <div className="space-y-6 text-center py-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-400/20 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(244,114,182,0.15)]">
            <Music size={36} className="text-pink-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-rose-800">Potong Bebek Angsa.mp3</h4>
          <p className="text-xs text-rose-500/80 uppercase tracking-widest">Artist / Penyanyi</p>
        </div>
        <div className="w-full bg-rose-100/60 h-1.5 rounded-full overflow-hidden border border-rose-100/70">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-full w-2/3 shadow-[0_0_8px_rgba(244,114,182,0.7)]"></div>
        </div>
      </div>
    ),
  },
];
