"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TIMELINE_ITEMS as timelines } from "@/content/timeline";

export default function TimelineSection() {

  return (
    <section className="relative py-24 px-6 overflow-hidden w-full max-w-5xl mx-auto">
      {/* Dekorasi Latar Belakang - Glow Lembut */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Judul dengan Animasi */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-center mb-20 relative z-10"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-rose-500/80 mb-3 flex items-center justify-center gap-2">
          <Sparkles size={14} /> Our Story
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-pink-400 to-rose-400 drop-shadow-[0_0_15px_rgba(216,112,147,0.25)]">
          Perjalanan Indah Kita
        </h2>
      </motion.div>
      
      <div className="relative z-10">
        {/* Garis Tengah (Desktop & Mobile) */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-pink-500/30 to-transparent" />

        <div className="space-y-12">
          {timelines.map((item, index) => (
            <div key={index} className="relative">
              {/* Animasi Wrapper */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }}
                className={`flex flex-col md:flex-row items-center justify-between ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot Indicator (Titik Timeline) */}
                <div className="absolute left-1.75 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 z-20 mt-2">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="w-full h-full bg-pink-500 rounded-full border-4 border-[#fdf4ec] shadow-[0_0_15px_rgba(236,72,153,0.6)] relative"
                  >
                    <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20" />
                  </motion.div>
                </div>

                {/* Card Konten */}
                <div className="w-full md:w-[45%] ml-24 md:ml-0">
                  <motion.div 
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group relative bg-white/60 backdrop-blur-xl border border-rose-200/60 p-6 md:p-8 rounded-4xl shadow-xl overflow-hidden transform-gpu"
                  >
                    {/* Aksen Gradient pada Hover */}
                    <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl filter drop-shadow-md">{item.icon}</span>
                        <div className="h-px grow bg-linear-to-r from-rose-300/50 to-transparent" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-rose-700 mb-3 tracking-wide">
                        {item.year}
                      </h3>
                      <p className="text-sm md:text-base text-rose-800/70 leading-relaxed font-light">
                        {item.text}
                      </p>
                    </div>

                    {/* Dekorasi Lingkaran Kecil */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-colors" />
                  </motion.div>
                </div>

                {/* Spacer Kosong (Desktop) */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}