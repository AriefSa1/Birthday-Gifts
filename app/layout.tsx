import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import StarBackground from "@/components/layout/StarBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
      className={`${inter.variable} ${cormorant.variable} h-full overflow-hidden overflow-x-hidden antialiased`}
    >
      <body className="h-dvh w-full flex flex-col bg-[#fdf4ec] text-rose-900 relative overflow-x-hidden overflow-y-hidden overscroll-y-none overscroll-x-none select-none">

        {/* FITUR ESTETIK 1: Efek Kerlipan Bintang Animatif */}
        <StarBackground />

        {/* FITUR ESTETIK 2: Ambient Glowing Aura Overlay */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/40 blur-[120px] pointer-events-none -z-20 animate-pulse transform-gpu will-change-transform"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-rose-200/50 blur-[150px] pointer-events-none -z-20 animate-pulse transform-gpu will-change-transform"
          style={{ animationDuration: '12s' }}
        />

        {/* FITUR ESTETIK 3: Efek Vignette Film Sinematik */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(240,205,196,0.65)_100%)] pointer-events-none -z-10" />

        {/* FITUR ESTETIK 4: Grain halus supaya terasa seperti film analog */}
        <div className="film-grain pointer-events-none absolute inset-0 -z-10" />

        {/* Konten Halaman Web Utama */}
        <main className="grow z-10 relative h-full w-full">
          {children}
        </main>

      </body>
    </html>
  );
}
