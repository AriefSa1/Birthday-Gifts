"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import Image from "next/image";

// Definisikan tipe data untuk foto agar rapi
interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  date?: string;
}

export default function Galery() {
  // Contoh data foto (Ganti properti 'url' dengan path foto asli Anda nanti)
  const photos: PhotoItem[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop", 
      caption: "Momen tawa lepas pertama kali kita jalan bareng ✨",
      date: "14 Februari"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
      caption: "Waktu nemu tempat kopi lucu yang kamu suka banget ☕",
      date: "22 Maret"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
      caption: "Kamu yang selalu cantik, difoto candid pas lagi ngambek 🥞",
      date: "05 Mei"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
      caption: "Senja terbaik tahun ini, dilewati bareng favoritku 🌅",
      date: "19 Juni"
    }
  ];

  // Variasi animasi saat grid foto muncul
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { 
        duration: 0.5, 
        ease: [0.215, 0.610, 0.355, 1.000] // Menggunakan koordinat Cubic Bezier sebagai pengganti "easeOut" agar 100% aman dari Error Type
        } 
    }
    };

  return (
    <div className="flex w-full max-w-5xl mx-auto p-4 text-left">
      {/* Box Utama Bergaya Glassmorphism Gelap Premium */}
      <div className="bg-purple-900/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-4xl shadow-xl relative overflow-hidden transform-gpu">
        
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

        {/* AREA GRID FOTO (Custom Scrollbar untuk menampung banyak foto tanpa ngerusak layout luar) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-purple-900/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-3 flex flex-col group transition-all duration-300 transform-gpu"
            >
              {/* Bingkai Luar Gambar */}
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-black/20 relative">
                {/* Efek gradasi gelap tipis di atas foto saat di-hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                
                {/* Gambar/Foto */}
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Tanggal Mini di Pojok Kanan Atas */}
                {photo.date && (
                  <span className="absolute top-2 right-2 z-20 text-[9px] tracking-widest font-bold text-pink-200 bg-[#1c1219]/80 border border-pink-400/20 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                    {photo.date}
                  </span>
                )}
              </div>

              {/* Teks Keterangan Foto di bagian bawah */}
              <div className="mt-3 flex-grow flex flex-col justify-between">
                <p className="text-xs md:text-sm text-pink-100/80 leading-relaxed font-light pl-1 group-hover:text-pink-100 transition-colors">
                  &ldquo;{photo.caption}&rdquo;
                </p>
                
                {/* Hiasan ikon love kecil di pojok bawah kanan teks */}
                <div className="flex justify-end mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <Heart size={12} className="text-pink-400 fill-pink-500/20 group-hover:fill-pink-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}