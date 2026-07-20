"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function HeroCelebration({ onStart }: { onStart?: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const leftPolaroids = [
    { id: 1, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300", moment:"pantai", rotate: "-12deg", top: "15%", left: "4%" },
    { id: 2, src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=300", moment:"gunung", rotate: "8deg", top: "42%", left: "2%" },
    { id: 3, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300", moment:"laut", rotate: "-6deg", top: "70%", left: "5%" },
  ];

  const rightPolaroids = [
    { id: 4, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300", moment:"laut", rotate: "10deg", top: "18%", right: "4%" },
    { id: 5, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300", moment:"gunung", rotate: "-15deg", top: "45%", right: "2%" },
    { id: 6, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300", moment:"pantai", rotate: "5deg", top: "72%", right: "5%" },
  ];

  const mobilePolaroids = [
    leftPolaroids[0], rightPolaroids[1], leftPolaroids[2], 
    rightPolaroids[0], leftPolaroids[1], rightPolaroids[2]
  ];

  const mobileTransforms = [
    { x: -75, y: 25, rotate: -24 }, 
    { x: -45, y: 10, rotate: -14 }, 
    { x: -15, y: 0,  rotate: -4 },  
    { x: 15,  y: 0,  rotate: 6 },   
    { x: 45,  y: 10, rotate: 16 },  
    { x: 75,  y: 25, rotate: 26 },  
  ];

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* 1. LATAR BELAKANG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
      
      <div className="absolute top-[25%] left-[20%] w-32 h-32 bg-pink-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[30%] right-[25%] w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      {/* 2. SISI KIRI & KANAN: POLAROID DESKTOP */}
      <div className="hidden md:block">
        {leftPolaroids.map((item) => (
          <motion.div
            key={`desktop-left-${item.id}`}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: item.id * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.15, zIndex: 50 }} 
            onClick={() => setSelectedPhoto(item.src)} 
            style={{ top: item.top, left: item.left, rotate: item.rotate }}
            className="absolute bg-white p-2.5 pb-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-36 border border-gray-200/10 pointer-events-auto cursor-pointer"
          >
            <div className="w-full aspect-square bg-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <p className="text-white text-xs font-medium tracking-widest drop-shadow-md">ZOOM</p>
              </div>
              <Image
                src={item.src}
                alt="Memory"
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
        {rightPolaroids.map((item) => (
          <motion.div
            key={`desktop-right-${item.id}`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: item.id * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.15, zIndex: 50 }}
            onClick={() => setSelectedPhoto(item.src)}
            style={{ top: item.top, right: item.right, rotate: item.rotate }}
            className="absolute bg-white p-2.5 pb-7 shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-36 border border-gray-200/10 pointer-events-auto cursor-pointer"
          >
            <div className="w-full aspect-square bg-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <p className="text-white text-xs font-medium tracking-widest drop-shadow-md">ZOOM</p>
              </div>
              <Image
                src={item.src}
                alt="Memory"
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. KONTEN TENGAH UTAMA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center z-10 max-w-xl px-6 space-y-6 mt-10 md:mt-0 pointer-events-none"
      >
        <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-pink-300/60 uppercase drop-shadow-[0_0_6px_rgba(244,114,182,0.3)]">
          ✦ A Love Letter For You ✦
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)]">
          Ini Fotonya <br className="md:hidden"/> Mana ya ?
        </h1>
        
        <p className="text-xs md:text-sm text-pink-200/40 font-light italic tracking-wider">
          Created with love, just for you
        </p>

        <div className="pt-6 relative z-20 pointer-events-auto">
          <button 
            onClick={onStart}
            className="px-8 py-3 rounded-full border border-fuchsia-300/40 bg-purple-500/30 text-xs md:text-sm text-pink-200 tracking-[0.2em] uppercase hover:bg-fuchsia-500/30 backdrop-blur-md transition-all duration-300 gap-3 text-sm tracking-widest uppercase text-white shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]"
          >
            ✦ Read My Letter ✦
          </button>
          <p className="text-center pt-4 text-xs text-pink-200/40 font-light italic tracking-wider">
            Click Tombolnya, Baca Surat Untukmu 🤍
          </p>
        </div>
      </motion.div>

      {/* 4. TAMPILAN POLAROID KHUSUS HP */}
      <div className="flex md:hidden relative w-full h-48 mt-8 justify-center items-center pointer-events-none z-0">
        {mobilePolaroids.map((item, index) => (
          <motion.div
            key={`mobile-${item.id}-${index}`}
            initial={{ opacity: 0, y: 150, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              y: mobileTransforms[index].y, 
              x: mobileTransforms[index].x,
              rotate: mobileTransforms[index].rotate 
            }}
            transition={{ duration: 0.9, delay: 0.5 + (index * 0.15), ease: [0.215, 0.610, 0.355, 1.000] }}
            whileHover={{ scale: 1.15, zIndex: 50, y: mobileTransforms[index].y - 10 }}
            onClick={() => setSelectedPhoto(item.src)}
            className="absolute bg-white p-1.5 pb-6 shadow-[0_10px_20px_rgba(0,0,0,0.4)] w-24 border border-gray-200/10 pointer-events-auto cursor-pointer transform-origin-bottom"
            style={{ zIndex: index }}
          >
            <div className="w-full aspect-square bg-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 opacity-0 active:opacity-100 transition-opacity duration-300 z-10" />
              <Image
                src={item.src}
                alt="Memory Mobile"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 5. MODAL LIGHTBOX UNTUK ZOOM FOTO */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex items-center justify-center cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- ukuran asli tidak diketahui (foto eksternal berbeda-beda), kontainer bergantung pada intrinsic size gambar untuk menentukan tinggi modal */}
              <img
                src={selectedPhoto}
                alt="Zoomed Memory"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              />
              
              {/* PERBAIKAN: Logika pencarian moment yang lebih bersih & aman */}
              <div>
                <p className="absolute bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 text-xs md:text-sm text-pink-200/60 font-light italic tracking-wider uppercase">
                  {[...leftPolaroids, ...rightPolaroids].find(photo => photo.src === selectedPhoto)?.moment || "Memory"}
                </p>
              </div>
              
              {/* Tombol Close */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 md:-top-4 md:-right-14 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}