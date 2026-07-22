"use client";

import React from "react";
import { useState, useRef } from 'react';
import { motion, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { PolaroidPhotos } from "@/content/Polaroid";
import { SparkContent } from "@/content/Polaroid";

export default function PolaroidSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Logika 3D Parallax untuk Hati
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 1.2, x: "-50%", y: "-50%" },
    show: (rotate: number) => ({
      opacity: 1, 
      scale: 1, 
      x: "-50%", 
      y: "-50%", 
      rotate: rotate, 
      // Gunakan transform-gpu untuk memaksa hardware acceleration
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }),
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 z-20 overflow-hidden">
      <audio ref={audioRef} src="/lagu-romantis.wav" loop />
      
      {/* VIGNETTE & AURA */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(240,205,196,0.7)_100%)] pointer-events-none z-0" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        // PERBAIKAN: Tambahkan transform-gpu dan will-change-transform
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[100vw] max-w-200 max-h-200 bg-[radial-gradient(circle_at_center,rgba(244,164,196,0.45)_0%,rgba(217,140,160,0.18)_40%,transparent_70%)] blur-[50px] pointer-events-none z-0 transform-gpu will-change-transform"
      />

      {/* CINCIN KOSMIK (Latar Belakang Estetik) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-212.5 max-h-212.5 border border-rose-300/50 rounded-full border-dashed pointer-events-none z-0 hidden md:block transform-gpu"
      />

      {/* ========================================= */}
      {/* KONTEN TAMBAHAN KIRI: KARTU SURAT ROMANTIS */}
      {/* ========================================= */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-6 lg:left-12 xl:left-24 top-1/2 -translate-y-1/2 w-64 lg:w-72 hidden md:flex flex-col gap-4 p-6 bg-white/60 backdrop-blur-xl border border-rose-200/60 rounded-4xl shadow-xl z-30 transform-gpu"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">✨</span>
          <h3 className="text-rose-800 font-serif text-xl italic tracking-wide">Pesan Kosmik</h3>
        </div>
        <p className="text-sm text-rose-800/80 font-light leading-relaxed drop-shadow-sm">
          &ldquo;Seperti bintang di galaksi yang tak terhitung jumlahnya, begitu juga kenangan yang kita buat. Setiap detiknya sangat berharga, dan aku ingin menyimpannya di sini selamanya.&rdquo;
        </p>
        <div className="w-full h-px bg-linear-to-r from-rose-400/60 to-transparent mt-2" />
        <p className="text-[10px] text-rose-400/90 tracking-widest uppercase">Chapter 1 • Kenangan</p>
      </motion.div>

      {/* ========================================== */}
      {/* KONTEN TAMBAHAN KANAN: MUSIC PLAYER & INFO */}
      {/* ========================================== */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute right-6 lg:right-12 xl:right-24 top-1/2 -translate-y-1/2 w-64 lg:w-72 hidden md:flex flex-col gap-4 p-6 bg-white/60 backdrop-blur-xl border border-rose-200/60 rounded-4xl shadow-xl z-30 transform-gpu"
      >
        {/* Widget Musik */}
        <div className="flex items-center gap-4 bg-rose-100/60 p-3 rounded-xl border border-rose-100/70">
          {/* Piringan Hitam Berputar */}
          <div className="w-12 h-12 rounded-full border border-rose-300/60 bg-[radial-gradient(circle_at_center,#111_30%,#333_100%)] flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <button onClick={togglePlay} className={`w-4 h-4 bg-pink-400 rounded-full shadow-[0_0_10px_#f472b6] flex items-center justify-center text-2xl transition-all duration-300`}>
                {!isPlaying ? '▶' : '⏸'}
            </button>
          </div>
          <div>
            <h4 className="text-rose-800 text-xs font-bold tracking-widest uppercase mb-1">Now Playing</h4>
            <p className="text-sm text-rose-700/90 font-serif italic">Our Favorite Song</p>
          </div>
        </div>
        {/* Progress Bar Musik */}
        <div className="w-full bg-rose-100/70 h-1 mt-1 rounded-full overflow-hidden">
          <div className="w-2/3 h-full bg-pink-400 rounded-full shadow-[0_0_5px_#f472b6]" />
        </div>
        <p className="text-xs text-rose-800/60 font-light mt-2 text-right">
          01:43 / 03:00
        </p>
        <div className="w-full h-0.5 bg-linear-to-l from-rose-400/60 to-transparent my-1" />
        <p className="text-[10px] text-rose-400/90 tracking-widest uppercase text-right">Timeless</p>
      </motion.div>

      {/* SPARKS / PARTIKEL KOSMIK */}
      {SparkContent.map((spark) => (
        <motion.div
          key={`spark-${spark.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [-10, -30], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: spark.duration, repeat: Infinity, delay: spark.delay, ease: "easeInOut" }}
          // PERBAIKAN: Tambahkan transform-gpu
          className="absolute bg-pink-300 rounded-full shadow-[0_0_10px_rgba(244,164,196,0.9)] z-10 pointer-events-none transform-gpu will-change-transform"
          style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size }}
        />
      ))}

      {/* --- JUDUL UTAMA --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="mb-8 md:mb-12 text-center z-30 relative"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-rose-500/90 mb-3 drop-shadow-[0_0_8px_rgba(217,112,147,0.35)]">
          ✧ Our Memories ✧
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-pink-400 to-rose-400 drop-shadow-[0_0_15px_rgba(216,112,147,0.25)]">
          A Glimpse of Us
        </h2>
        <p className="mt-4 text-sm font-light italic text-rose-700/70 drop-shadow-md">
          &ldquo;Setiap sudut waktu yang berhenti, khusus untukmu.&rdquo;
        </p>
      </motion.div>

      {/* --- AREA TUMPUKAN POLAROID (INTI HATI) --- */}
      <div 
        className="relative w-full flex items-center justify-center perspective-distant"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          animate={{ y: [-5, 5, -5] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          // PERBAIKAN: Tambahkan transform-gpu agar kalkulasi 3D Parallax tidak membebani CPU
          className="relative w-[90vw] max-w-137.5 lg:max-w-162.5 aspect-square flex items-center justify-center z-20 transform-gpu"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-50px" }}
            className="w-full h-full relative"
          >
            {PolaroidPhotos.map((item) => (
              <motion.div
                key={item.id}
                custom={item.rotate} 
                variants={itemVariants}
                // PERBAIKAN: Tambahkan will-change-transform agar transisi saat dihover jauh lebih smooth
                className="absolute w-[20%] md:w-[18%] aspect-[3/3.8] origin-center cursor-pointer will-change-transform"
                style={{ 
                  top: item.top, 
                  left: item.left, 
                  zIndex: item.zIndex 
                }}
                whileHover={{
                  scale: 1.8, 
                  x: "-50%",
                  y: "-50%",
                  rotate: 0, 
                  zIndex: 50, 
                  boxShadow: "0 20px 40px rgba(90,50,60,0.30)", // Sedikit dikurangi opasitas shadow agar render lebih ringan
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{
                  scale: 1.8,
                  x: "-50%",
                  y: "-50%",
                  rotate: 0,
                  zIndex: 50,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="w-full h-full bg-white rounded-sm shadow-[0_10px_20px_rgba(90,50,60,0.25)] p-[5%] pb-[20%] flex flex-col border border-gray-200 transform-gpu">
                  <div className="w-full grow bg-gray-200 overflow-hidden relative border border-gray-300/50 flex items-center justify-center">
                    {/* PERBAIKAN: Gunakan Next Image agar 15 gambar ini tidak memenuhi RAM browser */}
                    <Image 
                      src={item.src} 
                      alt={`Memory ${item.id}`} 
                      fill
                      sizes="(max-width: 768px) 25vw, 15vw"
                      className="object-cover"
                      priority={item.id <= 5} // Prioritaskan 5 gambar pertama
                    />
                    <span className="absolute text-gray-400 text-[8px] sm:text-[10px] md:text-xs font-semibold z-0 mix-blend-multiply">
                      Foto {item.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-rose-400/80 z-30"
      >
        <span className="text-[10px] md:text-xs tracking-widest uppercase">Tap on memories</span>
        <div className="w-px h-10 bg-linear-to-b from-rose-400/60 to-transparent" />
      </motion.div>

    </section>
  );
}