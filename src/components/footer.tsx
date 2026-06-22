import soloLogo from "../assets/images/Solo-Leveling-Logo-anime-manga-popular-series-transparent-PNG-image.png";
import { Globe, BookOpen, Tv, ExternalLink } from "lucide-react";

const LINKS = {
  Game: ["Download", "Patch Notes", "System Requirements", "Official Site"],
  Hunters: ["Character Database", "Skill Trees", "Shadow Army", "Rankings"],
  World: ["Story Arc", "Dimensional Gates", "Guilds", "Lore Archive"],
  Support: ["Contact Us", "Bug Report", "Community", "Privacy Policy"],
};

const SOCIALS = [
  { icon: Globe, label: "Official Site", color: "#22d3ee" },
  { icon: BookOpen, label: "Manhwa", color: "#c084fc" },
  { icon: Tv, label: "Anime", color: "#fbbf24" },
  { icon: ExternalLink, label: "Discord", color: "#818cf8" },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full pt-20 pb-8 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ backgroundColor: "#03010a" }}
    >
      {/* Top gradient separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.4), rgba(6,182,212,0.25), transparent)" }}
      />

      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-[300px]"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(88,28,135,0.07) 0%, transparent 80%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <img
              src={soloLogo}
              alt="Solo Leveling: Arise"
              className="w-36 object-contain mb-5 opacity-90 drop-shadow-[0_0_14px_rgba(139,92,246,0.5)]"
            />
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-[260px]">
              The official Solo Leveling: Arise action RPG. Rise from the weakest
              to the strongest. Claim the shadows. Rule all realms.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = s.color;
                    el.style.boxShadow = `0 0 14px ${s.color}66`;
                    el.style.background = `${s.color}14`;
                    (el.querySelector("svg") as SVGElement | null)?.setAttribute("color", s.color);
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.boxShadow = "none";
                    el.style.background = "rgba(255,255,255,0.04)";
                    (el.querySelector("svg") as SVGElement | null)?.setAttribute("color", "#71717a");
                  }}
                >
                  <s.icon className="w-4 h-4 text-zinc-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-black text-white mb-4 tracking-[0.15em] uppercase"
                style={{ fontFamily: "'CinzelLocal', serif" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-purple-400 transition-colors duration-200 hover:translate-x-0.5 inline-block font-mono tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t"
          style={{ borderColor: "rgba(139,92,246,0.1)" }}
        >
          <p className="text-[0.65rem] font-mono text-zinc-600 tracking-widest">
            © 2024 Netmarble Corp. All rights reserved. Solo Leveling: Arise is a trademark of Chugong / D&C Media.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[0.6rem] font-mono text-zinc-600 tracking-widest uppercase">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
