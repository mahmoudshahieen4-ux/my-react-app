import { useState, useEffect } from "react";
import logo from "../assets/images/Solo-Leveling-Logo-anime-manga-popular-series-transparent-PNG-image.png";

const NAV_LINKS = [
  { label: "Database", href: "#database" },
  { label: "Hunters", href: "#hunters" },
  { label: "Gates", href: "#gates" },
  { label: "News", href: "#news" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? "rgba(5,2,12,0.92)"
          : "linear-gradient(to bottom, rgba(5,2,12,0.85), transparent)",
        backdropFilter: isScrolled ? "blur(14px)" : "blur(4px)",
        borderBottom: isScrolled ? "1px solid rgba(139,92,246,0.15)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 4px 40px rgba(0,0,0,0.8), 0 0 20px rgba(88,28,135,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="shrink-0">
          <img
            src={logo}
            alt="Solo Leveling: Arise"
            className="w-28 object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.7)] transition-all duration-300"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'CinzelLocal', serif" }}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-[0.75rem] text-zinc-400 hover:text-white uppercase tracking-[0.18em] py-2 transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-350 shadow-[0_0_8px_#a855f7]" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Download button */}
          <a
            href="#download"
            className="group relative px-6 py-2.5 text-[0.7rem] font-bold text-white uppercase tracking-[0.18em] transition-all duration-300 active:scale-95 flex items-center gap-2"
            style={{ fontFamily: "'CinzelLocal', serif" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 transform -skew-x-12 border border-purple-400/40 group-hover:border-purple-300 transition-all duration-300 shadow-[0_0_14px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_28px_rgba(168,85,247,0.65)]" />
            <span className="relative z-10 group-hover:text-purple-100 transition-colors">Play Now</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none p-2"
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-[9px]" : "w-6"}`} />
            <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
            <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-[9px]" : "w-5"}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          background: "rgba(5,2,12,0.97)",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-col items-center gap-5 py-7" style={{ fontFamily: "'CinzelLocal', serif" }}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-zinc-400 hover:text-white uppercase tracking-[0.2em] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setIsOpen(false)}
            className="group relative px-10 py-3 text-[0.75rem] font-bold text-white uppercase tracking-widest w-10/12 max-w-[300px] text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 -skew-x-12 border border-purple-400/40" />
            <span className="relative z-10">Play Now</span>
          </a>
        </div>
      </div>
    </nav>
  );
}