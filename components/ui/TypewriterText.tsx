import { motion, type Variants } from "framer-motion";

export default function TypewriterText({
  text,
  delay = 0,
  start = true,
}: {
  text: string;
  delay?: number;
  start?: boolean;
}) {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline",
      transition: { duration: 0 },
    },
  };

  return (
    <motion.span variants={containerVariants} initial="hidden" animate={start ? "visible" : "hidden"}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
