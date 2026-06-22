interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ text, className = "", onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group z-20 relative px-8 py-4 font-bold text-white uppercase tracking-widest
        transition-all duration-300 active:scale-95 flex items-center justify-center
        min-w-[200px] hover:scale-[1.03] ${className}`}
      style={{ fontFamily: "'CinzelLocal', serif" }}
    >
      {/* Outer neon aura (expands on hover) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600
                   rounded-sm blur-md opacity-40
                   group-hover:opacity-100 group-hover:blur-xl
                   transition-all duration-500 transform -skew-x-12"
      />

      {/* Solid angled body */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700
                   rounded-sm transform -skew-x-12
                   border border-purple-400/50 group-hover:border-purple-200/80
                   shadow-[0_0_18px_rgba(168,85,247,0.55)]
                   group-hover:shadow-[0_0_40px_rgba(168,85,247,0.9),0_0_80px_rgba(139,92,246,0.4)]
                   transition-all duration-300"
      />

      {/* Inner shimmer sweep on hover */}
      <div
        aria-hidden
        className="absolute inset-0 -skew-x-12 overflow-hidden rounded-sm pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                     -translate-x-full group-hover:translate-x-full
                     transition-transform duration-700 ease-out"
        />
      </div>

      {/* Text label */}
      <span
        className="relative z-10 flex items-center justify-center gap-2 text-center w-full
                   group-hover:tracking-[0.22em] transition-all duration-300 text-sm"
      >
        {text}
        <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300">
          →
        </span>
      </span>
    </button>
  );
}