import { useEffect, useRef, useState } from "react";
import { Swords, Shield, Zap, Crown, Globe, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Swords,
    title: "Real-Time Combat",
    tag: "ACTION RPG",
    desc: "Master over 100 unique skills across 5 combat classes. Execute devastating combos in fluid, real-time 3D battles.",
    color: "purple",
    glow: "rgba(168,85,247,0.4)",
    border: "rgba(168,85,247,0.25)",
  },
  {
    icon: Crown,
    title: "Shadow Army",
    tag: "MONARCH POWER",
    desc: "Extract the shadows of fallen enemies and build your own unstoppable army. Command hundreds of Shadow Soldiers.",
    color: "indigo",
    glow: "rgba(99,102,241,0.4)",
    border: "rgba(99,102,241,0.25)",
  },
  {
    icon: Globe,
    title: "Open World Gates",
    tag: "EXPLORATION",
    desc: "Venture through dimensional rifts spanning 6 unique realms. Each Gate hides legendary loot and elite bosses.",
    color: "cyan",
    glow: "rgba(6,182,212,0.4)",
    border: "rgba(6,182,212,0.25)",
  },
  {
    icon: Zap,
    title: "S-Rank Awakening",
    tag: "POWER SYSTEM",
    desc: "Unlock hidden abilities and ascend beyond human limits. Rise through E→S rank with the System's exclusive power.",
    color: "violet",
    glow: "rgba(139,92,246,0.4)",
    border: "rgba(139,92,246,0.25)",
  },
  {
    icon: Shield,
    title: "Guild Warfare",
    tag: "PVP ARENA",
    desc: "Form elite Guilds and wage war in massive PvP arenas. Claim dominance over territory and earn legendary titles.",
    color: "purple",
    glow: "rgba(168,85,247,0.4)",
    border: "rgba(168,85,247,0.25)",
  },
  {
    icon: Star,
    title: "Artifact System",
    tag: "PROGRESSION",
    desc: "Craft, enhance and combine thousands of unique artifacts. Build the perfect loadout to challenge the Monarchs.",
    color: "cyan",
    glow: "rgba(6,182,212,0.4)",
    border: "rgba(6,182,212,0.25)",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative rounded-sm overflow-hidden cursor-default group transition-all duration-500 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 0.1}s`,
        background: "linear-gradient(135deg, rgba(15,10,30,0.9) 0%, rgba(8,5,20,0.95) 100%)",
        border: `1px solid ${feature.border}`,
        boxShadow: hovered
          ? `0 0 40px ${feature.glow}, 0 20px 60px rgba(0,0,0,0.5)`
          : `0 0 0px transparent, 0 4px 20px rgba(0,0,0,0.4)`,
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Spotlight effect */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, ${feature.glow.replace("0.4", "0.12")}, transparent 70%)`,
          }}
        />
      )}

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] group-hover:opacity-100 opacity-40 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${feature.glow}, transparent)`,
        }}
      />

      <div className="relative z-10 p-7">
        {/* Tag */}
        <span
          className="inline-block text-[0.6rem] font-mono tracking-[0.25em] mb-4 px-2 py-1 rounded-sm"
          style={{
            color: feature.color === "cyan" ? "#22d3ee" : feature.color === "indigo" ? "#818cf8" : "#c084fc",
            background: feature.border.replace("0.25", "0.08"),
            border: `1px solid ${feature.border}`,
          }}
        >
          {feature.tag}
        </span>

        {/* Icon */}
        <div
          className="w-12 h-12 mb-5 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: feature.glow.replace("0.4", "0.12"),
            border: `1px solid ${feature.border}`,
          }}
        >
          <feature.icon
            className="w-6 h-6 transition-colors duration-300"
            style={{
              color: feature.color === "cyan" ? "#22d3ee" : feature.color === "indigo" ? "#818cf8" : "#c084fc",
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-purple-100 transition-colors"
          style={{ fontFamily: "'CinzelLocal', serif" }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">
          {feature.desc}
        </p>

        {/* Bottom learn more */}
        <div className="mt-5 flex items-center gap-2 text-[0.7rem] font-mono tracking-widest text-zinc-600 group-hover:text-purple-400 transition-colors duration-300 uppercase">
          <span>Explore</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="database"
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ backgroundColor: "#05020c" }}
    >
      {/* Background gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-900/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-indigo-900/10 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-[0.65rem] font-mono tracking-[0.3em] text-cyan-400 uppercase mb-4 border border-cyan-500/25 px-3 py-1.5 bg-cyan-950/20">
            System Database
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight"
            style={{ fontFamily: "'CinzelLocal', serif" }}
          >
            CORE&nbsp;
            <span
              className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent"
            >
              MECHANICS
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
            Wield powers beyond mortal comprehension. Every feature of Solo Leveling: Arise
            is forged from the lore of the Shadow Monarch himself.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
