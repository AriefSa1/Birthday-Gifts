"use client";
import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  depth: number;
  color: string;
  isFlare: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
}

interface LoveParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number; 
  angle: number; 
  color: string;
  opacity: number;
  blur: number; 
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number; 
    let stars: Star[] = [];
    let meteors: Meteor[] = []; 
    let loveParticles: LoveParticle[] = []; 
    
    let targetX = 0; 
    let targetY = 0; 
    
    let currentX = 0;
    let currentY = 0;

    const resizeCanvas = () => { 
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initLoveParticles(); 
    };

    const initStars = () => {
      stars = [];
      const numberOfStars = Math.floor((canvas.width * canvas.height) / 1100); 

      for (let i = 0; i < numberOfStars; i++) {
        const isNear = Math.random() > 0.7; 
        const radius = isNear ? Math.random() * 1.8 + 1.2 : Math.random() * 1 + 0.5; 
        const depth = radius * 0.5; 
        
        const isFlare = isNear && Math.random() > 0.8; 
        
        const colorPicks = [
          "255, 255, 255", 
          "253, 164, 255", 
          "233, 213, 255", 
          "191, 219, 254"  
        ];
        const color = colorPicks[Math.floor(Math.random() * colorPicks.length)];

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          alpha: Math.random(),
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          depth,
          color,
          isFlare
        });
      }
    };

    //Berfungsi untuk menginisialisasi partikel hati yang melayang
    const initLoveParticles = () => {
      loveParticles = [];
      //Berfungsi untuk menentukan jumlah partikel hati berdasarkan ukuran canvas. contoh ubah 50000 menjadi 30000 untuk lebih banyak partikel
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 80000);
      //Berfungsi untuk menentukan warna partikel
      const colors = [
        "255, 175, 204", 
        "205, 180, 219", 
        "244, 143, 177"  
      ];
      //Berfungsi untuk membuat partikel hati dengan properti acak
      for (let i = 0; i < numberOfParticles; i++) {
        loveParticles.push({
          //Ubah value x dan y untuk menentukan posisi awal partikel hati. contoh ubah 0 menjadi canvas.width untuk memulai dari sisi kanan
          x: Math.random() * canvas.width,
          //Ubah value y untuk menentukan posisi awal partikel hati. contoh ubah 0 menjadi canvas.height untuk memulai dari sisi bawah
          y: Math.random() * canvas.height, 
          //Ubah value size untuk menentukan ukuran partikel hati. contoh ubah 16 menjadi 20 untuk partikel lebih besar
          size: Math.random() * 25 + 25, 
          //Ubah value speed untuk menentukan kecepatan partikel hati. contoh ubah 0.4 menjadi 0.6 untuk partikel lebih cepat
          speed: Math.random() * 0 + 0.02, 
          //Ubah value drift untuk menentukan arah horizontal partikel hati. contoh ubah 0.8 menjadi 1.2 untuk partikel lebih banyak bergerak ke kanan
          drift: Math.random() * 2 - 1.5, 
          //Ubah value angle untuk menentukan arah rotasi partikel hati. contoh ubah 4 menjadi 6 untuk partikel lebih banyak berputar
          angle: Math.random() * Math.PI * 0.5,
          //Ubah value color untuk menentukan warna partikel hati. contoh ubah colors[Math.floor(Math.random() * colors.length)] menjadi "255, 0, 0" untuk semua partikel berwarna merah
          color: colors[Math.floor(Math.random() * colors.length)],
          //Ubah value opacity untuk menentukan tingkat transparansi partikel hati. contoh ubah 0.2 menjadi 0.3 untuk partikel lebih terlihat
          opacity: Math.random() * 0.02 + 0.05,
          //Ubah value blur untuk menentukan tingkat blur partikel hati. contoh ubah 1 menjadi 2 untuk partikel lebih blur 
          blur: Math.random() * 4 + 5, // Perbesar sedikit nilai blur untuk kompensasi shadowBlur
        });
      }
    };

    const drawGalaxyBackground = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "#07010a"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 0,
        canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.6
      );
      gradient2.addColorStop(0, "rgba(35, 6, 63, 0.12)"); 
      gradient2.addColorStop(0.6, "rgba(189, 103, 146, 0.05)"); 
      gradient2.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawFlare = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      
      const flareSize = radius * 6; 

      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(radius * 0.3, -radius * 0.3, flareSize, 0);
        ctx.quadraticCurveTo(radius * 0.3, radius * 0.3, 0, 0);
      }
      
      ctx.arc(0, 0, radius, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(${color}, ${Math.max(0, alpha)})`;
      ctx.shadowColor = `rgba(${color}, ${alpha})`;
      ctx.shadowBlur = radius * 4;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    // PERBAIKAN 1: Tambahkan parameter shadow ke fungsi drawHeart
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, glowColor: string, blur: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x + size / 2, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      ctx.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
      ctx.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
      ctx.quadraticCurveTo(x, y, x, y + size / 4);
      ctx.closePath();

      // Menggunakan shadowBlur sebagai ganti filter untuk efek soft/out-of-focus
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = blur;
      ctx.fillStyle = color;
      ctx.fill();
    };

    const handleMeteors = (ctx: CanvasRenderingContext2D) => {
      if (Math.random() < 0.035) {
        meteors.push({
          x: Math.random() * canvas.width, 
          y: Math.random() * -canvas.height * 0.3, 
          length: Math.random() * 80 + 60, 
          speed: Math.random() * 6 + 12, 
          angle: (Math.PI / 4) + (Math.random() * 0.1 - 0.05), 
          opacity: 1,
        });
      }

      meteors.forEach((meteor) => {
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`); 
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`); 

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5; 
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.fill();
        
        ctx.restore();
      });

      meteors = meteors.filter(
        (meteor) =>
          meteor.x < canvas.width + meteor.length &&
          meteor.y < canvas.height + meteor.length
      );
    };

    const handleLoveParticles = (ctx: CanvasRenderingContext2D) => {
      loveParticles.forEach((p) => {
        p.y -= p.speed;
        p.angle += 0.02;
        p.x += Math.sin(p.angle) * 0.5 + p.drift;

        if (p.y < -p.size * 2) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }

        const offsetX = currentX * 100 * (p.size * 0.02);
        const offsetY = currentY * 100 * (p.size * 0.02);

        let drawX = (p.x + offsetX) % canvas.width;
        if (drawX < 0) drawX += canvas.width;
        let drawY = p.y + offsetY;

        ctx.save();
        
        // PERBAIKAN 2: Hilangkan ctx.filter = `blur(...)` yang bikin lag
        const fillColor = `rgba(${p.color}, ${p.opacity})`;
        const glowColor = `rgba(${p.color}, ${p.opacity * 1.5})`; // Warna shadow sedikit lebih terang
        
        // Operkan pengaturan shadow langsung ke fungsi drawHeart
        drawHeart(ctx, drawX, drawY, p.size, fillColor, glowColor, p.blur);
        
        ctx.restore(); 
      });
    };

    const drawAndAnimate = () => {
      drawGalaxyBackground(ctx);

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha >= 1 || star.alpha <= 0.1) {
          star.twinkleSpeed *= -1; 
        }

        const offsetX = currentX * 100 * star.depth;
        const offsetY = currentY * 100 * star.depth;

        let drawX = (star.x + offsetX) % canvas.width;
        let drawY = (star.y + offsetY) % canvas.height;

        if (drawX < 0) drawX += canvas.width;
        if (drawY < 0) drawY += canvas.height;

        if (star.isFlare) {
          drawFlare(ctx, drawX, drawY, star.radius, star.alpha, star.color);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
          
          if (star.radius > 1.2) {
            ctx.shadowColor = `rgba(${star.color}, 0.8)`;
            ctx.shadowBlur = star.radius * 2;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = `rgba(${star.color}, ${Math.max(0, star.alpha)})`;
          ctx.fill();
          ctx.closePath();
        }
      });

      handleMeteors(ctx);
      handleLoveParticles(ctx);

      animationFrameId = requestAnimationFrame(drawAndAnimate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        let normalizedX = e.gamma / 45; 
        let normalizedY = (e.beta - 45) / 45; 

        targetX = Math.max(-1, Math.min(1, normalizedX));
        targetY = Math.max(-1, Math.min(1, normalizedY));
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    } else {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    resizeCanvas();
    drawAndAnimate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full bg-[#13041a] pointer-events-none -z-10"
    />
  );
}