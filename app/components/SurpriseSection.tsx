'use client';
import { useState } from 'react';

export default function SurpriseSection() {
  const [wish, setWish] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.trim() !== '') {
      // Di sini kamu bisa menambahkan logika untuk menyimpan data ke database jika diperlukan
      setIsSubmitted(true);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 z-10">
      {/* Container utama dengan efek Glassmorphism */}
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl text-center transition-all duration-500">
        
        {!isSubmitted ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
              Make a Wish 🌟
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8">
              Sebelum meniup lilin virtual, tuliskan satu harapan terbesarmu di tahun ini. Semoga semesta mengaminkannya!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Harapanku adalah..."
                className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none transition-all"
                required
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transform hover:-translate-y-1 transition-all duration-300"
              >
                Kirim Harapan ✨
              </button>
            </form>
          </div>
        ) : (
          /* Tampilan setelah user men-submit harapan */
          <div className="py-10 animate-fade-in">
            <div className="text-6xl mb-6 animate-bounce">🎂</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Harapan Tersimpan!
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              &ldquo;{wish}&rdquo;
            </p>
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-pink-300 font-medium">
                Selamat Ulang Tahun! Semoga semua hal baik selalu menyertaimu. 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}