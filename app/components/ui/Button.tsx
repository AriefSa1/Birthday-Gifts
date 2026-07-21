import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-8 py-3 rounded-full border border-fuchsia-300/30 bg-purple-900/20 text-xs md:text-sm text-pink-200 tracking-[0.2em] uppercase hover:bg-purple-500/30 hover:border-pink-200 backdrop-blur-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    />
  );
}
