import { useEffect, useRef, useCallback, useState } from "react";
import Button from "../ui/button";
import BottomBorder from "../ui/bottomBorder";
import soloImg from "../assets/images/solo.png";
import soloLogo from "../assets/images/Solo-Leveling-Logo-anime-manga-popular-series-transparent-PNG-image.png";
import FlowedItems from "./flowedItems";

/* Stable hex-grid SVG — defined outside to prevent re-render flicker */
const HEX_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92.38' viewBox='0 0 80 92.38'%3E%3Cg stroke-width='0.8' fill='none'%3E%3Cpolygon points='40,2 78,23.2 78,69.18 40,90.38 2,69.18 2,23.2' stroke='%233d1189' stroke-opacity='0.45'/%3E%3Cpolygon points='40,18 62,30.6 62,61.78 40,74.38 18,61.78 18,30.6' stroke='%2306b6d4' stroke-opacity='0.18'/%3E%3Ccircle cx='40' cy='46.19' r='2.5' fill='%2306b6d4' fill-opacity='0.35'/%3E%3C/g%3E%3C/svg%3E")`;

/* Particle data defined outside — stable across renders */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.6 + 1.5) % 100}%`,
  delay: `${(i * 0.38) % 4}s`,
  duration: `${3.2 + (i % 5) * 0.5}s`,
  size: i % 3 === 0 ? 2 : 1.5,
  color: i % 2 === 0 ? "rgba(168,85,247,0.7)" : "rgba(6,182,212,0.6)",
}));

export default function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  /* rAF-throttled cursor glow — only touches the DOM, no state */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
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
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", backgroundColor: "#05020c" }}
    >
      {/* ── BG Layer 1: Hex grid ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{ backgroundImage: HEX_SVG, backgroundSize: "80px 92.38px" }}
      />

      {/* ── BG Layer 2: Radial vignette ───────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, #05020c 88%)",
        }}
      />

      {/* ── BG Layer 3: Ambient corner glows ─────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute -top-20 -left-10 w-[45vw] h-[45vw] rounded-full bg-purple-900/20 blur-[110px]" />
        <div className="absolute -bottom-20 -right-10 w-[35vw] h-[35vw] rounded-full bg-cyan-900/15 blur-[90px]" />
      </div>

      {/* ── BG Layer 4: Cursor glow follower ─────────────── */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute z-[3] w-[480px] h-[480px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(6,182,212,0.07) 45%, transparent 70%)",
          filter: "blur(32px)",
          top: 0,
          left: 0,
          transform: "translate(-999px,-999px)",
          transition: "transform 0.1s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      />

      {/* ── BG Layer 5: Particle rain ─────────────────────── */}
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

      {/* ── BG Layer 6: Scanlines ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.06) 2px,rgba(255,255,255,0.06) 4px)",
        }}
      />

      {/* ── Main content: fills the section height ────────── */}
      <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-center min-h-screen gap-6 md:gap-10 px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-16">

        {/* ══ RIGHT: Character image ════════════════════════ */}
        <div className="flex-shrink-0 flex items-center justify-center relative md:w-[44%] lg:w-[46%] xl:w-[48%]">

          {/* Atmospheric halo */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] rounded-full bg-purple-700/15 blur-[90px] animate-pulse-slow" />
            <div className="absolute w-[50%] h-[50%] rounded-full bg-cyan-600/8 blur-[60px] animate-pulse-slower" />
          </div>

          {/* HUD corner brackets */}
          <div aria-hidden className="absolute top-2 left-2 w-7 h-7 border-t-2 border-l-2 border-purple-400/50" />
          <div aria-hidden className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-cyan-400/50" />
          <div aria-hidden className="absolute bottom-2 left-2 w-7 h-7 border-b-2 border-l-2 border-cyan-400/50" />
          <div aria-hidden className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-purple-400/50" />

          {/* Glitch image wrapper */}
          <div
            className="glitch-wrapper relative select-none"
            style={{ "--image-url": `url(${soloImg})` } as React.CSSProperties}
          >
            <img
              src={soloImg}
              alt="Sung Jin-Woo – Shadow Monarch"
              onLoad={() => setImgLoaded(true)}
              draggable={false}
              className={[
                "relative z-10 object-contain select-none w-full",
                "max-w-[260px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[540px]",
                "drop-shadow-[0_0_30px_rgba(88,28,135,0.45)]",
                "hover:drop-shadow-[0_0_55px_rgba(139,92,246,0.7)]",
                "transition-all duration-700",
                imgLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
            />

            {/* Ground shadow puddle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-purple-800/35 blur-2xl rounded-full"
            />
          </div>
        </div>

        {/* ══ LEFT: Typography + CTA ════════════════════════ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 flex-1 max-w-[560px]">

          {/* System status badge */}
          <div className="opacity-0 animate-fade-in-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <span className="inline-flex items-center gap-2 text-[0.6rem] sm:text-[0.62rem] font-mono tracking-[0.22em] text-cyan-400 uppercase border border-cyan-500/30 px-3 py-1.5 bg-cyan-950/30 backdrop-blur-sm shadow-[0_0_12px_rgba(6,182,212,0.18)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping-slow" />
              System Online · Shadow Realm Active
            </span>
          </div>

          {/* Logo image */}
          <img
            src={soloLogo}
            alt="Solo Leveling"
            className="w-[180px] sm:w-[220px] md:w-[260px] object-contain opacity-0 animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:forwards] drop-shadow-[0_0_18px_rgba(139,92,246,0.5)]"
          />

          {/* Main title */}
          <h1
            className="solo-leveling-title opacity-0 animate-fade-in-up [animation-delay:0.35s] [animation-fill-mode:forwards]"
            style={{ textAlign: "inherit" }}
          >
            SOLO<br />LEVELING
          </h1>

          {/* Subtitle */}
          <p
            className="font-mono text-[0.65rem] sm:text-xs tracking-[0.3em] text-purple-400 uppercase opacity-0 animate-fade-in-up [animation-delay:0.5s] [animation-fill-mode:forwards]"
            style={{ textShadow: "0 0 10px rgba(168,85,247,0.8), 0 0 28px rgba(168,85,247,0.35)" }}
          >
            ✦ &nbsp;THE SHADOW MONARCH&nbsp; ✦
          </p>

          {/* Divider */}
          <div
            aria-hidden
            className="w-[55%] h-px bg-gradient-to-r from-transparent via-purple-500/55 to-transparent opacity-0 animate-fade-in-up [animation-delay:0.6s] [animation-fill-mode:forwards]"
          />

          {/* Description */}
          <p className="text-sm text-zinc-400 leading-relaxed max-w-[400px] opacity-0 animate-fade-in-up [animation-delay:0.7s] [animation-fill-mode:forwards]">
            From the weakest hunter to the mightiest sovereign.{" "}
            <span className="text-purple-300 font-semibold">Sung Jin-Woo</span>{" "}
            rises through death and shadow to claim dominion over all realms.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 opacity-0 animate-fade-in-up [animation-delay:0.85s] [animation-fill-mode:forwards]">
            {[
              { label: "Rank", value: "S+" },
              { label: "Class", value: "Necromancer" },
              { label: "Guild", value: "Ahjin" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center md:items-start">
                <span className="text-[0.55rem] font-mono text-zinc-500 tracking-widest uppercase">
                  {stat.label}
                </span>
                <span
                  className="text-sm font-bold text-purple-300"
                  style={{ fontFamily: "'CinzelLocal', serif" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up [animation-delay:1s] [animation-fill-mode:forwards]">
            <Button text="THE FIRST GATE" />

            <button
              className="group relative px-6 py-3.5 font-bold text-xs text-cyan-300 uppercase tracking-[0.2em]
                         border border-cyan-500/40 hover:border-cyan-400/80
                         bg-cyan-950/20 hover:bg-cyan-950/40 backdrop-blur-sm
                         shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.4)]
                         active:scale-95 flex items-center gap-2 transition-all duration-300"
              style={{ fontFamily: "'CinzelLocal', serif" }}
            >
              <span className="group-hover:text-white transition-colors duration-300">Watch Trailer</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-300 inline-block">▶</span>
            </button>
          </div>

          {/* Footnote */}
          <p className="text-[0.58rem] font-mono text-zinc-600 tracking-widest uppercase opacity-0 animate-fade-in-up [animation-delay:1.1s] [animation-fill-mode:forwards]">
            Season 2 · Episode 12 · Now Streaming
          </p>
        </div>
      </div>

      {/* Bottom glowing divider */}
      <BottomBorder />

      {/* Floating social icons */}
      <FlowedItems />
    </section>
  );
}
