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
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl border border-rose-200/60 rounded-4xl p-6 md:p-8 shadow-xl text-center transition-all duration-500 transform-gpu">
        
        {!isSubmitted ? (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-900 mb-4 drop-shadow-md">
              Make a Wish 🌟
            </h2>
            <p className="text-rose-800/90 text-sm md:text-base mb-8">
              Sebelum meniup lilin virtual, tuliskan satu harapan terbesarmu di tahun ini. Semoga semesta mengaminkannya!
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Harapanku adalah..."
                className="w-full h-32 p-4 rounded-xl bg-rose-100/60 border border-rose-200/70 text-rose-900 placeholder-rose-400/70 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 resize-none transition-all"
                required
              />
              <button
                type="submit"
                className="w-full bg-white/60 hover:bg-rose-100/70 text-rose-900 font-semibold py-3 px-6 rounded-full border border-rose-200/60 backdrop-blur-xl shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Kirim Harapan ✨
              </button>
            </form>
          </div>
        ) : (
          /* Tampilan setelah user men-submit harapan */
          <div className="py-10 animate-fade-in">
            <div className="text-6xl mb-6 animate-bounce">🎂</div>
            <h3 className="text-2xl md:text-3xl font-bold text-rose-900 mb-3">
              Harapan Tersimpan!
            </h3>
            <p className="text-rose-800/90 text-sm md:text-base leading-relaxed">
              &ldquo;{wish}&rdquo;
            </p>
            <div className="mt-8 pt-6 border-t border-rose-200/70">
              <p className="text-rose-500 font-medium">
                Selamat Ulang Tahun! Semoga semua hal baik selalu menyertaimu. 🎉
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}