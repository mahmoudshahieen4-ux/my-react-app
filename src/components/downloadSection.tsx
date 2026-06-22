import { useEffect, useRef, useState } from "react";
import { Smartphone, Monitor, Download } from "lucide-react";

const PLATFORMS = [
  { icon: Smartphone, label: "iOS", sub: "App Store", glow: "rgba(168,85,247,0.35)" },
  { icon: Smartphone, label: "Android", sub: "Google Play", glow: "rgba(6,182,212,0.35)" },
  { icon: Monitor, label: "PC", sub: "Windows Client", glow: "rgba(99,102,241,0.35)" },
];

const STATS = [
  { value: "50M+", label: "Downloads" },
  { value: "4.8★", label: "Rating" },
  { value: "150+", label: "Countries" },
  { value: "#1", label: "RPG Worldwide" },
];

export default function DownloadSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ backgroundColor: "#05020c" }}
    >
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-purple-950/20 blur-[120px]" />
      </div>

      {/* Top divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px]"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Main card */}
        <div
          className={`rounded-sm overflow-hidden transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            background: "linear-gradient(135deg, rgba(18,10,40,0.95) 0%, rgba(8,5,18,0.98) 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
            boxShadow: "0 0 80px rgba(124,58,237,0.2), 0 0 160px rgba(124,58,237,0.08)",
          }}
        >
          {/* Top color band */}
          <div
            className="h-1"
            style={{ background: "linear-gradient(90deg, #7c3aed, #6366f1, #06b6d4, #7c3aed)" }}
          />

          <div className="px-8 sm:px-12 py-14 text-center">
            {/* Badge */}
            <span className="inline-block text-[0.65rem] font-mono tracking-[0.3em] text-cyan-400 uppercase mb-6 border border-cyan-500/25 px-3 py-1.5 bg-cyan-950/20">
              Available Now · Free to Play
            </span>

            {/* Title */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
              style={{ fontFamily: "'CinzelLocal', serif" }}
            >
              BEGIN YOUR&nbsp;
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent">
                ASCENT
              </span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed mb-10">
              Download Solo Leveling: Arise for free and join 50 million hunters worldwide.
              Your journey from E-Rank to Shadow Monarch starts now.
            </p>

            {/* Platform buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.label}
                  className="group flex items-center gap-3 px-6 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${plat.glow}`;
                    (e.currentTarget as HTMLElement).style.borderColor = plat.glow.replace("0.35", "0.5");
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <Download className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <div className="text-left">
                    <p className="text-[0.6rem] font-mono tracking-widest text-zinc-500 uppercase">{plat.sub}</p>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: "'CinzelLocal', serif" }}>{plat.label}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap justify-center gap-8 pt-8 border-t"
              style={{ borderColor: "rgba(139,92,246,0.12)" }}
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-2xl sm:text-3xl font-black bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent"
                    style={{ fontFamily: "'CinzelLocal', serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[0.65rem] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
