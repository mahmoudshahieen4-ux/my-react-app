import { useEffect, useRef, useCallback, useState } from "react";
import Button from "../ui/button";
import BottomBorder from "../ui/bottomBorder";
import soloImg from "../assets/images/solo.png";
import soloLogo from "../assets/images/Solo-Leveling-Logo-anime-manga-popular-series-transparent-PNG-image.png";
import FlowedItems from "./flowedItems";

/* ─────────────────────────────────────────────
   Stable SVG hex-grid pattern URI (built once)
───────────────────────────────────────────── */
const HEX_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92.38' viewBox='0 0 80 92.38'%3E%3Cg stroke-width='0.8' fill='none'%3E%3Cpolygon points='40,2 78,23.2 78,69.18 40,90.38 2,69.18 2,23.2' stroke='%233d1189' stroke-opacity='0.45'/%3E%3Cpolygon points='40,18 62,30.6 62,61.78 40,74.38 18,61.78 18,30.6' stroke='%2306b6d4' stroke-opacity='0.18'/%3E%3Ccircle cx='40' cy='46.19' r='2.5' fill='%2306b6d4' fill-opacity='0.35'/%3E%3C/g%3E%3C/svg%3E")`;

/* ─────────────────────────────────────────────
   Particle rain data (stable, memo'd outside)
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + 1.2) % 100}%`,
  delay: `${(i * 0.41) % 4}s`,
  duration: `${3 + (i % 5) * 0.6}s`,
  size: i % 3 === 0 ? 2 : 1.5,
  color: i % 2 === 0 ? "rgba(168,85,247,0.7)" : "rgba(6,182,212,0.6)",
}));

export default function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  /* smooth cursor glow follower */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`;
      }
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden flex flex-col"
      style={{ minHeight: "88vh", maxHeight: "92vh", backgroundColor: "#05020c" }}
    >
      {/* ── Layer 1 · Hex Grid ─────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: HEX_SVG,
          backgroundSize: "80px 92.38px",
        }}
      />

      {/* ── Layer 2 · Radial Vignette ──────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #05020c 90%)",
        }}
      />

      {/* ── Layer 3 · Ambient corner glows ─────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
      >
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/15 blur-[100px]" />
      </div>

      {/* ── Layer 4 · Interactive cursor glow ──────────────── */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute z-[3] w-[480px] h-[480px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 45%, transparent 70%)",
          filter: "blur(32px)",
          transition: "transform 0.12s cubic-bezier(0.25,0.46,0.45,0.94)",
          top: 0,
          left: 0,
          transform: `translate(${mousePos.x - 240}px, ${mousePos.y - 240}px)`,
        }}
      />

      {/* ── Layer 5 · Particle rain ─────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute top-[-4px] animate-particle-fall"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: `${p.size}px`,
              height: `${p.size * 6}px`,
              background: p.color,
              borderRadius: "9999px",
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </div>

      {/* ── Scan-line overlay ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* ── Main content wrapper ────────────────────────────── */}
      <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-center flex-1 gap-0 md:gap-8 px-6 sm:px-10 lg:px-20 pt-20 pb-10">

        {/* ══ CHARACTER IMAGE ══════════════════════════════════ */}
        <div className="flex-1 flex items-center justify-center md:justify-end relative w-full md:max-w-[52%]">
          {/* Atmospheric halo behind character */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[70%] h-[70%] rounded-full bg-purple-700/20 blur-[80px] animate-pulse-slow" />
            <div className="absolute w-[45%] h-[45%] rounded-full bg-cyan-600/10 blur-[60px] animate-pulse-slower" />
          </div>

          {/* Corner tech frame decorations */}
          <div aria-hidden className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-400/60 z-10" />
          <div aria-hidden className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/60 z-10" />
          <div aria-hidden className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/60 z-10" />
          <div aria-hidden className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-400/60 z-10" />

          {/* Glitch character image */}
          <div
            className="glitch-wrapper relative select-none"
            style={
              {
                "--image-url": `url(${soloImg})`,
              } as React.CSSProperties
            }
          >
            {/* Energy ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-purple-500/20 scale-110 animate-spin-ultra-slow"
            />

            <img
              src={soloImg}
              alt="Sung Jin-Woo – Shadow Monarch"
              width={680}
              height={720}
              onLoad={() => setImgLoaded(true)}
              className={`
                relative z-10 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[680px]
                object-contain select-none
                transition-all duration-1000
                drop-shadow-[0_0_30px_rgba(88,28,135,0.4)]
                hover:drop-shadow-[0_0_55px_rgba(139,92,246,0.65)]
                ${imgLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              draggable={false}
            />

            {/* Ground shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-8 bg-purple-800/40 blur-2xl rounded-full"
            />
          </div>
        </div>

        {/* ══ TYPOGRAPHY & CTA ═════════════════════════════════ */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5 md:max-w-[48%] mt-6 md:mt-0">

          {/* System tag badge */}
          <div className="flex items-center gap-3 opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <span className="flex items-center gap-2 text-[0.6rem] sm:text-[0.65rem] font-mono tracking-[0.25em] text-cyan-400 uppercase border border-cyan-500/30 px-3 py-1.5 rounded-sm bg-cyan-950/30 backdrop-blur-sm shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping-slow inline-block" />
              System Online · Shadow Realm Active
            </span>
          </div>

          {/* Solo Leveling Logo */}
          <img
            src={soloLogo}
            alt="Solo Leveling Logo"
            className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[340px] object-contain opacity-0 animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards] drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          />

          {/* Main title */}
          <h1
            className="solo-leveling-title opacity-0 animate-fade-in-up [animation-delay:0.35s] [animation-fill-mode:forwards] text-left"
            style={{ textAlign: "inherit" }}
          >
            SOLO<br />
            LEVELING
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-purple-400 uppercase opacity-0 animate-fade-in-up [animation-delay:0.5s] [animation-fill-mode:forwards]"
            style={{
              textShadow:
                "0 0 10px rgba(168,85,247,0.8), 0 0 30px rgba(168,85,247,0.4)",
            }}
          >
            ✦ &nbsp; THE SHADOW MONARCH &nbsp; ✦
          </p>

          {/* Divider line with glow */}
          <div
            aria-hidden
            className="w-[60%] h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-0 animate-fade-in-up [animation-delay:0.6s] [animation-fill-mode:forwards]"
          />

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-[430px] opacity-0 animate-fade-in-up [animation-delay:0.7s] [animation-fill-mode:forwards]">
            From the weakest hunter to the mightiest sovereign.&nbsp;
            <span className="text-purple-300 font-semibold">Sung Jin-Woo</span> rises
            through death and shadow to claim dominion over all realms.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 opacity-0 animate-fade-in-up [animation-delay:0.85s] [animation-fill-mode:forwards]">
            {[
              { label: "Rank", value: "S+" },
              { label: "Class", value: "Necromancer" },
              { label: "Guild", value: "Ahjin" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start">
                <span className="text-[0.6rem] font-mono text-zinc-500 tracking-widest uppercase">{stat.label}</span>
                <span className="text-sm font-bold text-purple-300" style={{ fontFamily: "'CinzelLocal', serif" }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2 opacity-0 animate-fade-in-up [animation-delay:1s] [animation-fill-mode:forwards]">
            <Button text="THE FIRST GATE" className="hero-cta-primary" />

            {/* Secondary ghost button */}
            <button
              className="group relative px-6 py-3.5 font-bold text-xs text-cyan-300 uppercase tracking-[0.2em] transition-all duration-300
                         border border-cyan-500/40 hover:border-cyan-400/80
                         bg-cyan-950/20 hover:bg-cyan-950/40 backdrop-blur-sm
                         shadow-[0_0_12px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]
                         active:scale-95 flex items-center gap-2"
              style={{ fontFamily: "'CinzelLocal', serif" }}
            >
              <span className="group-hover:text-white transition-colors duration-300">Watch Trailer</span>
              <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-300">▶</span>
            </button>
          </div>

          {/* Episode counter */}
          <p className="text-[0.6rem] font-mono text-zinc-600 tracking-widest uppercase opacity-0 animate-fade-in-up [animation-delay:1.1s] [animation-fill-mode:forwards]">
            Season 2 · Episode 12 · Now Streaming
          </p>
        </div>
      </div>

      {/* ── Bottom section divider ──────────────────────────── */}
      <BottomBorder />

      {/* ── Social floating items ───────────────────────────── */}
      <FlowedItems />
    </section>
  );
}
