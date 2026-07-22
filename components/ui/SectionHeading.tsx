import { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <>
      <p className="text-xs tracking-[0.3em] uppercase text-fuchsia-300/90 mb-3 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]">
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white via-pink-100 to-purple-400 drop-shadow-[0_0_20px_rgba(233,213,255,0.4)] ${className}`}
      >
        {title}
      </h2>
    </>
  );
}
