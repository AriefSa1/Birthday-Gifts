"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";

export default function ReasonsSection() {
  const reasons = [
    "Senyummu yang selalu bisa mengubah hari yang buruk menjadi baik.",
    "Kesabaranmu dalam menghadapi segala hal.",
    "Caramu menatap masa depan dengan penuh semangat.",
    "Bagaimana kamu selalu peduli dengan orang-orang di sekitarmu.",
  ];

  // Konfigurasi animasi container agar memunculkan anak-anaknya secara bergantian (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  // Konfigurasi animasi masing-masing kartu
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      // Menggunakan efek spring yang sangat halus agar natural
      transition: { type: "spring", stiffness: 80, damping: 20 } 
    }
  };

  return (
    <section className="py-24 px-6 relative z-10 w-full max-w-5xl mx-auto overflow-hidden">
      
      {/* Header Section dengan Animasi Lembut */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-pink-300/80 mb-3 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">
          Why I Love You
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-purple-300 drop-shadow-md">
          Things I Admire About You
        </h2>
      </motion.div>
      
      {/* Grid Layout untuk Kartu */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {reasons.map((reason, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
            className="group relative bg-white/[0.03] backdrop-blur-lg border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-pink-400/40 hover:bg-white/[0.06] hover:shadow-[0_15px_40px_rgba(244,114,182,0.15)] transition-all duration-500 transform-gpu cursor-default overflow-hidden"
          >
            {/* Watermark Angka Besar Dramatis di Background */}
            <div className="absolute -top-4 -right-2 text-[8rem] font-serif font-bold text-white/[0.02] pointer-events-none group-hover:text-pink-400/[0.05] group-hover:-translate-x-2 transition-all duration-700 select-none">
              {index + 1}
            </div>

            {/* Ikon Quote (Tanda Kutip) */}
            <div className="relative z-10 mb-6">
              <Quote 
                className="w-8 h-8 text-pink-400/40 group-hover:text-pink-400 transition-colors duration-500" 
                strokeWidth={1.5}
              />
            </div>
            
            {/* Teks Alasan */}
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed relative z-10 italic">
              "{reason}"
            </p>

            {/* Aksen Garis Gradien di Bawah */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-pink-400 to-purple-500 group-hover:w-full transition-all duration-700 ease-out" />
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}