"use client";
import { motion, Variants } from "framer-motion";
import { Camera } from "lucide-react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/content/gallery";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] },
  },
};

// Layout selang-seling per baris (2 foto per baris): baris ganjil lebar-sempit,
// baris genap sempit-lebar — mengikuti pola grid 5 kolom (3:2 lalu 2:3).
function isWide(index: number): boolean {
  const row = Math.floor(index / 2);
  const posInRow = index % 2;
  return row % 2 === 0 ? posInRow === 0 : posInRow === 1;
}

export default function GalerySection() {
  return (
    <div className="flex w-full max-w-5xl mx-auto p-4 text-left">
      {/* Box Utama Bergaya Glassmorphism Gelap Premium */}
      <div className="w-full bg-purple-900/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-4xl shadow-xl relative overflow-hidden transform-gpu">

        {/* Dekorasi Aksen Glow Lembut */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Judul Atas Sesi */}
        <div className="flex flex-col mb-6 border-b border-white/5 pb-4">
          <p className="text-[10px] md:text-xs font-bold text-center tracking-[0.25em] text-pink-300/80 uppercase mb-2 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)] flex items-center justify-center gap-2">
            <Camera size={12} /> ✧ MEMORI KITA ✧
          </p>
          <h3 className="font-serif text-center text-2xl md:text-3xl font-semibold text-white tracking-wide">
            Galeri Foto Favorit
          </h3>
        </div>

        {/* AREA GALERI: 2 foto per baris dengan lebar selang-seling, scrollable ke bawah */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar"
        >
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative h-52 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-xl group transform-gpu ${
                isWide(index) ? "md:col-span-3" : "md:col-span-2"
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badge Tanggal Mini di Pojok Kanan Atas */}
              {photo.date && (
                <span className="absolute top-2 right-2 z-20 text-[9px] tracking-widest font-bold text-pink-200 bg-[#1c1219]/80 border border-pink-400/20 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                  {photo.date}
                </span>
              )}

              {/* Caption muncul sebagai overlay saat hover, biar tampilan grid tetap bersih */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 pt-8 pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs md:text-sm text-pink-50 leading-relaxed font-light">
                  &ldquo;{photo.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
