import { useEffect, useRef, useState } from "react";
import { Clock, ChevronRight } from "lucide-react";

const NEWS = [
  {
    tag: "Update",
    tagColor: "#22d3ee",
    tagBg: "rgba(6,182,212,0.1)",
    tagBorder: "rgba(6,182,212,0.3)",
    date: "Jun 18, 2026",
    title: "Season 3: The Monarch War Begins",
    desc: "The final confrontation has arrived. New story chapters, 12 exclusive raid bosses, and the ultimate S+ artifact set.",
    readTime: "4 min",
    accent: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.2)",
  },
  {
    tag: "Event",
    tagColor: "#c084fc",
    tagBg: "rgba(168,85,247,0.1)",
    tagBorder: "rgba(168,85,247,0.3)",
    date: "Jun 15, 2026",
    title: "Shadow Extraction World Event",
    desc: "For 14 days, extract shadows from fallen event bosses to build an exclusive platinum-tier Shadow Army.",
    readTime: "3 min",
    accent: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.2)",
  },
  {
    tag: "New Hunter",
    tagColor: "#fbbf24",
    tagBg: "rgba(245,158,11,0.1)",
    tagBorder: "rgba(245,158,11,0.3)",
    date: "Jun 10, 2026",
    title: "Thomas Andre Joins the Roster",
    desc: "America's National Level Hunter is now playable. Unlock him through the new Scavenger Guild storyline.",
    readTime: "2 min",
    accent: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    tag: "Patch Notes",
    tagColor: "#86efac",
    tagBg: "rgba(34,197,94,0.08)",
    tagBorder: "rgba(34,197,94,0.25)",
    date: "Jun 5, 2026",
    title: "v3.2.1 Balance & QoL Update",
    desc: "Critical mana regeneration rebalance, 8 new weapons, guild hall expansions, and performance optimizations.",
    readTime: "6 min",
    accent: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.18)",
  },
];

export default function NewsSection() {
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
      id="news"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05020c 0%, #07041a 50%, #05020c 100%)" }}
    >
      {/* Background elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-purple-900/10 blur-[90px]" />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full bg-indigo-900/8 blur-[70px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="inline-block text-[0.65rem] font-mono tracking-[0.3em] text-purple-400 uppercase mb-3 border border-purple-500/25 px-3 py-1.5 bg-purple-950/20">
              System Broadcasts
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white tracking-tight"
              style={{ fontFamily: "'CinzelLocal', serif" }}
            >
              LATEST&nbsp;
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                NEWS
              </span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-zinc-500 hover:text-purple-400 transition-colors uppercase group"
          >
            All Articles
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* News grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {NEWS.map((item, i) => (
            <article
              key={item.title}
              className="group relative rounded-sm overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${item.accent}, rgba(5,2,12,0.95))`,
                border: `1px solid ${item.border}`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Hover top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(to right, transparent, ${item.tagColor}, transparent)` }}
              />

              <div className="p-6 sm:p-7">
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[0.6rem] font-mono tracking-widest px-2 py-1 rounded-sm"
                    style={{ color: item.tagColor, background: item.tagBg, border: `1px solid ${item.tagBorder}` }}
                  >
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[0.65rem] font-mono text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {item.date} · {item.readTime} read
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-base sm:text-lg font-bold text-white mb-3 leading-snug group-hover:text-gray-100 transition-colors"
                  style={{ fontFamily: "'CinzelLocal', serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-500 leading-relaxed mb-5 group-hover:text-zinc-400 transition-colors">
                  {item.desc}
                </p>

                {/* Read more link */}
                <div className="flex items-center gap-1.5 text-[0.7rem] font-mono tracking-widest uppercase group-hover:gap-2.5 transition-all duration-300"
                  style={{ color: item.tagColor }}
                >
                  Read More
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
