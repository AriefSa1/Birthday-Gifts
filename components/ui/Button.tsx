import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-8 py-3 rounded-full border border-rose-300/60 bg-white/70 text-xs md:text-sm text-rose-700 tracking-[0.2em] uppercase hover:bg-rose-100 hover:border-pink-200 backdrop-blur-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    />
  );
}
