import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StarBackground from "./components/StarBackground"; // Mengimpor StarBackground yang baru dibuat
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Special Gift For You ✧",
  description: "Created with love, just for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      // PERBAIKAN 1: Ganti 'overflow-hidden' dengan 'overflow-x-hidden'
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-hidden overflow-x-hidden antialiased`}
    >
      {/* PERBAIKAN 2: Gunakan 'overflow-x-hidden', 'overflow-y-auto', dan 'overscroll-x-none'. Hapus 'overscroll-none' global */}
      <body className="h-dvh w-full flex flex-col bg-[#0b060a] text-pink-50 relative overflow-x-hidden overflow-y-hidden overscroll-y-none overscroll-x-none select-none">
        
        {/* FITUR ESTETIK 1: Efek Kerlipan Bintang Animatif */}
        <StarBackground />

        {/* FITUR ESTETIK 2: Ambient Glowing Aura Overlay */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-900/10 blur-[120px] pointer-events-none -z-20 animate-pulse transform-gpu will-change-transform" 
          style={{ animationDuration: '8s' }} 
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-950/15 blur-[150px] pointer-events-none -z-20 animate-pulse transform-gpu will-change-transform" 
          style={{ animationDuration: '12s' }} 
        />

        {/* FITUR ESTETIK 3: Efek Vignette Film Sinematik */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,2,5,0.7)_100%)] pointer-events-none -z-10" />

        {/* Konten Halaman Web Utama */}
        <main className="grow z-10 relative h-full w-full">
          {children}
        </main>

      </body>
    </html>
  );
}