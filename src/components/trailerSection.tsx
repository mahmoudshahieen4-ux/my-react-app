import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const GATES = [
  { rank: "E", name: "Abandoned Mine", difficulty: "Beginner", color: "#6b7280", glow: "rgba(107,114,128,0.3)", desc: "Entry-level gates for newly awakened hunters.", enemies: "48", loot: "Common" },
  { rank: "D", name: "Crumbling Dungeon", difficulty: "Easy", color: "#22c55e", glow: "rgba(34,197,94,0.3)", desc: "Ancient ruins teeming with skeleton soldiers.", enemies: "96", loot: "Uncommon" },
  { rank: "C", name: "Forsaken Citadel", difficulty: "Medium", color: "#3b82f6", glow: "rgba(59,130,246,0.35)", desc: "A fortress of corrupted knights and mages.", enemies: "200", loot: "Rare" },
  { rank: "B", name: "Demon's Keep", difficulty: "Hard", color: "#a855f7", glow: "rgba(168,85,247,0.4)", desc: "The realm where demons breed and chaos reigns.", enemies: "512", loot: "Epic" },
  { rank: "A", name: "Dragon's Nest", difficulty: "Expert", color: "#f59e0b", glow: "rgba(245,158,11,0.4)", desc: "Home of the ancient red dragon Kaisinel.", enemies: "1024", loot: "Legendary" },
  { rank: "S", name: "Shadow Realm", difficulty: "Monarch", color: "#ef4444", glow: "rgba(239,68,68,0.45)", desc: "The ultimate gate. Only Monarchs survive here.", enemies: "∞", loot: "Mythic" },
];

function GateRow({ gate, index }: { gate: typeof GATES[0]; index: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 p-4 rounded-sm cursor-default transition-all duration-300 group"
      style={{
        background: hov ? `linear-gradient(90deg, ${gate.glow.replace("0.3","0.08")}, transparent)` : "transparent",
        border: `1px solid ${hov ? gate.glow : "rgba(255,255,255,0.05)"}`,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      {/* Rank badge */}
      <div
        className="shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-sm font-black transition-all duration-300"
        style={{
          color: gate.color,
          background: gate.glow.replace("0.3","0.12"),
          border: `1px solid ${gate.glow}`,
          boxShadow: hov ? `0 0 18px ${gate.glow}` : "none",
          fontFamily: "'CinzelLocal', serif",
        }}
      >
        {gate.rank}
      </div>

      {/* Gate info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-bold text-white truncate group-hover:text-gray-100 transition-colors"
          style={{ fontFamily: "'CinzelLocal', serif" }}
        >
          {gate.name}
        </p>
        <p className="text-[0.65rem] text-zinc-500 truncate">{gate.desc}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-4 shrink-0 text-right">
        <div>
          <p className="text-[0.55rem] font-mono text-zinc-600 uppercase tracking-widest">Enemies</p>
          <p className="text-xs font-bold" style={{ color: gate.color }}>{gate.enemies}</p>
        </div>
        <div>
          <p className="text-[0.55rem] font-mono text-zinc-600 uppercase tracking-widest">Loot</p>
          <p className="text-xs font-bold" style={{ color: gate.color }}>{gate.loot}</p>
        </div>
        <div
          className="text-[0.6rem] font-mono tracking-widest px-2 py-1 rounded-sm"
          style={{
            color: gate.color,
            background: gate.glow.replace("0.3","0.1"),
            border: `1px solid ${gate.glow}`,
          }}
        >
          {gate.difficulty}
        </div>
      </div>
    </div>
  );
}

export default function TrailerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="gates"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ backgroundColor: "#05020c" }}
    >
      {/* Background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-purple-900/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-cyan-900/8 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-[0.65rem] font-mono tracking-[0.3em] text-purple-400 uppercase mb-4 border border-purple-500/25 px-3 py-1.5 bg-purple-950/20">
            Official Trailer
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'CinzelLocal', serif" }}
          >
            ENTER THE&nbsp;
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              GATE
            </span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Video player mock */}
          <div className="relative rounded-sm overflow-hidden group cursor-pointer"
            onClick={() => setPlaying(!playing)}
            style={{
              background: "linear-gradient(135deg, #0d0824 0%, #06030f 100%)",
              border: "1px solid rgba(139,92,246,0.25)",
              boxShadow: "0 0 60px rgba(124,58,237,0.2)",
              aspectRatio: "16/9",
            }}
          >
            {/* Fake video gradient thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-black/80 to-indigo-950/60" />

            {/* Scanlines */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.05) 2px,rgba(255,255,255,0.05) 4px)",
              }}
            />

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {/* Play button */}
              <div
                className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-purple-400/60 bg-purple-900/40 backdrop-blur-sm group-hover:scale-110 group-hover:border-purple-300 transition-all duration-400 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              >
                <Play className="w-6 h-6 text-white ml-1 fill-white" />
                {/* Ripple ring */}
                <div className="absolute inset-0 rounded-full border border-purple-400/30 scale-100 group-hover:scale-150 opacity-60 group-hover:opacity-0 transition-all duration-700" />
              </div>

              <div className="text-center">
                <p
                  className="text-xs font-mono tracking-[0.2em] text-purple-300 uppercase"
                >
                  Solo Leveling: Arise
                </p>
                <p className="text-[0.6rem] font-mono text-zinc-500 tracking-widest mt-0.5">
                  OFFICIAL LAUNCH TRAILER · 2024
                </p>
              </div>
            </div>

            {/* Corner decorations */}
            <div aria-hidden className="absolute top-3 left-3 w-6 h-6 border-t border-l border-purple-400/50 pointer-events-none" />
            <div aria-hidden className="absolute top-3 right-3 w-6 h-6 border-t border-r border-cyan-400/50 pointer-events-none" />
            <div aria-hidden className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-cyan-400/50 pointer-events-none" />
            <div aria-hidden className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-purple-400/50 pointer-events-none" />

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 text-[0.6rem] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded-sm pointer-events-none">
              2:47
            </div>
          </div>

          {/* Gate list */}
          <div
            className="rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(10,6,24,0.95), rgba(5,2,12,0.98))",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ borderColor: "rgba(139,92,246,0.12)" }}
            >
              <div>
                <h3
                  className="text-base font-black text-white"
                  style={{ fontFamily: "'CinzelLocal', serif" }}
                >
                  DIMENSIONAL GATES
                </h3>
                <p className="text-[0.65rem] font-mono text-zinc-500 tracking-widest mt-0.5">
                  6 RANK TIERS · ALL REGIONS
                </p>
              </div>
              <span className="text-[0.6rem] font-mono text-purple-400 border border-purple-500/30 px-2 py-1 rounded-sm bg-purple-950/20">
                LIVE
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5 mb-0.5 animate-pulse" />
              </span>
            </div>

            {/* Gates list */}
            <div className="p-3 flex flex-col gap-1">
              {GATES.map((gate, i) => (
                <GateRow key={gate.rank} gate={gate} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
