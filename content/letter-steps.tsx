import type { ReactNode } from "react";
import Image from "next/image";
import { Music } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";

export type LetterStep = {
  id: string;
  title: string;
  tag: string;
  icon: string;
  component: ReactNode;
};

// TODO: sesuaikan isi surat, foto, video, dan judul lagu dengan versi kalian
export const LETTER_STEPS: LetterStep[] = [
  {
    id: "surat",
    title: "Halo Butir...",
    tag: "✧ SURAT UNTUKMU ✧",
    icon: "💌",
    component: (
      <div className="space-y-5 md:space-y-6 text-sm md:text-base text-rose-800/90 leading-relaxed pr-2 font-serif tracking-wide">
        <p className="uppercase text-xs font-bold tracking-widest text-rose-500/90 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]">
          <TypewriterText text="Dear kamu, orang paling spesial hari ini," />
        </p>
        <p>
          <TypewriterText
            text="Selamat ulang tahun ya sayang. Hari ini bumi ngerayain satu hal yang paling aku syukuri: kamu lahir ke dunia."
            delay={1.2}
          />
        </p>
        <p>
          <TypewriterText
            text="Aku nggak jago ngerangkai kata-kata puitis. Tapi yang aku tau, sejak ada kamu, hari-hari biasa jadi punya alasan buat ditunggu. Ketawamu, ngambekmu, cerewetmu — semuanya jadi bagian favoritku."
            delay={4.2}
          />
        </p>
        <p>
          <TypewriterText
            text="Makasih udah bertahan di tahun yang nggak selalu gampang. Makasih udah jadi tempat pulang paling nyaman. Doaku simpel: semoga kamu sehat terus, bahagiamu nggak habis-habis, dan semua mimpi yang kamu bisikin pelan-pelan itu satu per satu jadi nyata."
            delay={9.5}
          />
        </p>
        <p>
          <TypewriterText
            text="Bertambahnya umur, bertambah juga sayangku. Selamat bertambah usia, cintaku. 🤍"
            delay={16}
          />
        </p>
        <p className="text-right italic text-rose-500/90 pt-2">
          <TypewriterText text="— dari aku, yang sayangnya nggak pernah habis" delay={19} />
        </p>
      </div>
    ),
  },
  {
    id: "foto",
    title: "Momen Favoritku",
    tag: "✧ MEMORI KITA ✧",
    icon: "📸",
    component: (
      <div className="space-y-6 text-center">
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-pink-400/30 relative shadow-lg">
          <Image
            src="/8.jpeg"
            alt="Momen favorit kita"
            fill
            sizes="(max-width: 768px) 90vw, 40rem"
            className="object-cover object-center"
          />
        </div>
        <p className="text-sm italic text-rose-600/80">
          &ldquo;Dari sekian banyak foto di galeriku, yang ini paling susah dilewatin tanpa senyum-senyum sendiri.&rdquo;
        </p>
      </div>
    ),
  },
  {
    id: "video",
    title: "Pesan Kecil Untukmu",
    tag: "✧ CINEMATIC MOMENT ✧",
    icon: "🎬",
    component: (
      <div className="space-y-6 text-center">
        <div className="aspect-video w-full bg-black/40 rounded-xl flex items-center justify-center border border-rose-200/60 overflow-hidden relative group">
          <div className="flex flex-col items-center gap-2 text-rose-500/80">
            <video controls preload="none">
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <p className="text-xs tracking-wider uppercase">[ Putar videonya ya ]</p>
          </div>
        </div>
        <p className="text-sm text-rose-600/80">
          Ada beberapa hal yang nggak cukup ditulis. Jadi aku rekam, biar kamu bisa dengar langsung.
        </p>
      </div>
    ),
  },
  {
    id: "musik",
    title: "Lagu Kita",
    tag: "✧ OUR SONG ✧",
    icon: "🎵",
    component: (
      <div className="space-y-6 text-center py-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-400/20 flex items-center justify-center animate-pulse shadow-[0_0_20px_rgba(244,114,182,0.15)]">
            <Music size={36} className="text-pink-400" />
          </div>
        </div>
        <div className="space-y-2">
          {/* TODO: ganti dengan judul & penyanyi lagu kalian */}
          <h4 className="font-medium text-rose-800">Lagu yang lagi kamu dengar sekarang 🎵</h4>
          <p className="text-xs text-rose-500/80 uppercase tracking-widest">
            Setiap kali lagu ini bunyi, yang muncul di kepalaku cuma kamu
          </p>
        </div>
        <div className="w-full bg-rose-100/60 h-1.5 rounded-full overflow-hidden border border-rose-100/70">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 h-full w-2/3 shadow-[0_0_8px_rgba(244,114,182,0.7)]"></div>
        </div>
      </div>
    ),
  },
];
