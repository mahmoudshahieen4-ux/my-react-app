export default function BottomBorder() {
  return (
    <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 z-20">
      {/* Main glowing gradient line */}
      <div className="bottom-divider-glow">
        {/* Left cyan diamond */}
        <div
          className="absolute left-[12%] top-1/2 -translate-y-1/2
                     w-2 h-2 bg-cyan-400 rotate-45
                     shadow-[0_0_14px_#22d3ee,0_0_28px_#22d3ee66]
                     animate-pulse"
        />

        {/* Centre purple diamond */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-2.5 h-2.5 bg-purple-400 rotate-45
                     shadow-[0_0_18px_#c084fc,0_0_36px_#a855f766]
                     animate-pulse [animation-delay:0.5s]"
        />

        {/* Right cyan diamond */}
        <div
          className="absolute right-[12%] top-1/2 -translate-y-1/2
                     w-2 h-2 bg-cyan-400 rotate-45
                     shadow-[0_0_14px_#22d3ee,0_0_28px_#22d3ee66]
                     animate-pulse [animation-delay:1s]"
        />
      </div>

      {/* Pulsing underaura */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6
                   bg-purple-600/10 blur-xl
                   animate-pulse [animation-duration:3s]"
      />
    </div>
  );
}