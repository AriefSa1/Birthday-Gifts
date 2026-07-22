type ProgressBarProps = {
  value: number;
  className?: string;
};

export default function ProgressBar({ value, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`w-full h-1 bg-rose-100/70 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-linear-to-r from-pink-400 to-rose-400 transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
