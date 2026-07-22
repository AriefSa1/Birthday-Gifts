import { forwardRef, HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  tone?: "default" | "strong";
};

const sizeStyles: Record<NonNullable<CardProps["size"]>, string> = {
  sm: "rounded-xl p-4",
  md: "rounded-xl p-5",
  lg: "rounded-2xl px-6 py-8",
};

const toneStyles: Record<NonNullable<CardProps["tone"]>, string> = {
  default: "bg-purple-500/10 border-fuchsia-300/20",
  strong: "bg-purple-500/20 border-fuchsia-300/30",
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { size = "md", tone = "default", className = "", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={`border backdrop-blur-md ${toneStyles[tone]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
});

export default Card;
