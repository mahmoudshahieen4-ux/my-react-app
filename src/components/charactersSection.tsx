import { useEffect, useRef, useState } from "react";
import sung from "../assets/images/purple.png";
import cha from "../assets/images/cyan.png";
import goto from "../assets/images/orange.png";
import igris from "../assets/images/igris-red.png";

// ربط كل معرف (id) بمتغير الصورة المستوردة أعلاه
const CHARACTER_IMAGES: Record<string, string> = {
  sung,
  cha,
  goto,
  igris,
};

const CHARACTERS = [
  {
    id: "sung",
    name: "Sung Jin-Woo",
    title: "Shadow Monarch",
    rank: "S+",
    role: "Assassin",
    roleColor: "#a855f7",
    skills: ["Shadow Extraction", "Ruler's Authority", "Dominator's Touch"],
    description:
      "The weakest hunter who became the strongest. Through the System's trials, he rose to claim the title of Shadow Monarch.",
    accentColor: "#7c3aed",
    glowColor: "rgba(124,58,237,0.5)",
    borderColor: "rgba(139,92,246,0.4)",
    tagColor: "#c084fc",
    imgBg: "from-purple-950/80 to-indigo-950/80",
    initial: "SJ",
    badge: "PROTAGONIST",
    badgeColor: "rgba(168,85,247,0.2)",
    badgeBorder: "rgba(168,85,247,0.4)",
  },
  {
    id: "cha",
    name: "Cha Hae-In",
    title: "S-Rank Hunter",
    rank: "S",
    role: "Swordsmaster",
    roleColor: "#06b6d4",
    skills: ["Quick Draw", "Mana Sense", "Sword Dance"],
    description:
      "Korea's only female S-Rank hunter. Her exceptional mana sensitivity makes her uniquely attuned to the shadow's power.",
    accentColor: "#0891b2",
    glowColor: "rgba(8,145,178,0.45)",
    borderColor: "rgba(6,182,212,0.35)",
    tagColor: "#22d3ee",
    imgBg: "from-cyan-950/80 to-sky-950/80",
    initial: "CH",
    badge: "S-RANK",
    badgeColor: "rgba(6,182,212,0.15)",
    badgeBorder: "rgba(6,182,212,0.4)",
  },
  {
    id: "goto",
    name: "Goto Ryuji",
    title: "Japan's Strongest",
    rank: "S",
    role: "Warrior",
    roleColor: "#f59e0b",
    skills: ["Thunder God Strike", "Mjolnir", "Lightning Body"],
    description:
      "Japan's National Level Hunter and leader of the Hunters Guild. Wields the legendary weapon Mjolnir in battle.",
    accentColor: "#d97706",
    glowColor: "rgba(217,119,6,0.4)",
    borderColor: "rgba(245,158,11,0.3)",
    tagColor: "#fbbf24",
    imgBg: "from-amber-950/80 to-yellow-950/80",
    initial: "GR",
    badge: "NATIONAL",
    badgeColor: "rgba(245,158,11,0.12)",
    badgeBorder: "rgba(245,158,11,0.4)",
  },
  {
    id: "igris",
    name: "Igris",
    title: "Shadow Knight",
    rank: "Marshal",
    role: "Tank",
    roleColor: "#ef4444",
    skills: ["Blood-Red Slash", "Knight's Guard", "Death Aura"],
    description:
      "The most powerful of Sung Jin-Woo's shadow soldiers. A former knight of the Demon Castle, now bound in eternal loyalty.",
    accentColor: "#dc2626",
    glowColor: "rgba(220,38,38,0.4)",
    borderColor: "rgba(239,68,68,0.3)",
    tagColor: "#f87171",
    imgBg: "from-red-950/80 to-rose-950/80",
    initial: "IG",
    badge: "SHADOW",
    badgeColor: "rgba(239,68,68,0.12)",
    badgeBorder: "rgba(239,68,68,0.4)",
  },
];

function CharacterCard({ char, isActive, onClick }: {
  char: typeof CHARACTERS[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative text-left w-full rounded-sm overflow-hidden transition-all duration-500 group"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${char.glowColor.replace("0.5", "0.12")}, rgba(5,2,12,0.95))`
          : "linear-gradient(135deg, rgba(12,8,25,0.8), rgba(5,2,12,0.95))",
        border: `1px solid ${isActive ? char.borderColor : "rgba(255,255,255,0.06)"}`,
        boxShadow: isActive ? `0 0 30px ${char.glowColor}, inset 0 0 20px ${char.glowColor.replace("0.5","0.05")}` : "none",
        transform: isActive ? "translateY(-2px)" : "none",
      }}
    >
      {/* Active indicator bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
        style={{ background: isActive ? `linear-gradient(to bottom, transparent, ${char.accentColor}, transparent)` : "transparent" }}
      />

      <div className="px-5 py-5 flex items-center gap-4">
        {/* Avatar Image / Circle fallback */}
        <div
          className={`shrink-0 w-12 h-12 rounded-sm flex items-center justify-center text-base font-black transition-all duration-300 bg-gradient-to-br ${char.imgBg} overflow-hidden`}
          style={{
            border: `1px solid ${char.borderColor}`,
            boxShadow: isActive ? `0 0 16px ${char.glowColor}` : "none",
            color: char.tagColor,
            fontFamily: "'CinzelLocal', serif",
          }}
        >
          {CHARACTER_IMAGES[char.id] ? (
            <img 
              src={CHARACTER_IMAGES[char.id]} 
              alt={char.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            char.initial
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[0.55rem] font-mono tracking-widest px-1.5 py-0.5 rounded-sm"
              style={{
                color: char.tagColor,
                background: char.badgeColor,
                border: `1px solid ${char.badgeBorder}`,
              }}
            >
              {char.badge}
            </span>
          </div>
          <p
            className="text-sm font-bold text-white truncate transition-colors"
            style={{ fontFamily: "'CinzelLocal', serif", color: isActive ? char.tagColor : "white" }}
          >
            {char.name}
          </p>
          <p className="text-[0.7rem] text-zinc-500 truncate">{char.title}</p>
        </div>

        {/* Rank badge */}
        <div
          className="shrink-0 text-xs font-black px-2 py-1 rounded-sm"
          style={{
            color: char.tagColor,
            background: char.badgeColor,
            border: `1px solid ${char.badgeBorder}`,
            fontFamily: "'CinzelLocal', serif",
          }}
        >
          {char.rank}
        </div>
      </div>
    </button>
  );
}

export default function CharactersSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const char = CHARACTERS[active];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="hunters"
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #05020c 0%, #08051a 50%, #05020c 100%)" }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700"
          style={{ background: char.glowColor.replace("0.5", "0.06") }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block text-[0.65rem] font-mono tracking-[0.3em] text-purple-400 uppercase mb-4 border border-purple-500/25 px-3 py-1.5 bg-purple-950/20">
            Hunter Registry
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
            style={{ fontFamily: "'CinzelLocal', serif" }}
          >
            SHADOW&nbsp;
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ARMY
            </span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm">
            Choose your hunter and step into a world where rank determines destiny.
          </p>
        </div>

        {/* Main layout */}
        <div className={`flex flex-col lg:flex-row gap-8 items-start transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* LEFT: Character list */}
          <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-3 shrink-0">
            {CHARACTERS.map((c, i) => (
              <CharacterCard
                key={c.id}
                char={c}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* RIGHT: Character detail panel */}
          <div
            key={char.id}
            className="flex-1 rounded-sm overflow-hidden relative animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, rgba(12,8,28,0.95), rgba(5,2,12,0.98))",
              border: `1px solid ${char.borderColor}`,
              boxShadow: `0 0 60px ${char.glowColor.replace("0.5","0.2")}, 0 0 120px ${char.glowColor.replace("0.5","0.08")}`,
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${char.accentColor}, ${char.tagColor}, ${char.accentColor}, transparent)` }}
            />

            <div className="p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start">
              {/* Big avatar image */}
              <div
                className={`shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-sm flex items-center justify-center text-3xl sm:text-4xl font-black bg-gradient-to-br ${char.imgBg} overflow-hidden`}
                style={{
                  border: `1px solid ${char.borderColor}`,
                  boxShadow: `0 0 40px ${char.glowColor}`,
                  color: char.tagColor,
                  fontFamily: "'CinzelLocal', serif",
                }}
              >
                {CHARACTER_IMAGES[char.id] ? (
                  <img 
                    src={CHARACTER_IMAGES[char.id]} 
                    alt={char.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  char.initial
                )}
              </div>

              <div className="flex-1">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="text-[0.6rem] font-mono tracking-widest px-2 py-1 rounded-sm"
                    style={{ color: char.tagColor, background: char.badgeColor, border: `1px solid ${char.badgeBorder}` }}
                  >
                    {char.badge}
                  </span>
                  <span
                    className="text-[0.6rem] font-mono tracking-widest px-2 py-1 rounded-sm"
                    style={{ color: char.roleColor, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {char.role}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="text-2xl sm:text-3xl font-black mb-1 text-white"
                  style={{ fontFamily: "'CinzelLocal', serif", textShadow: `0 0 20px ${char.glowColor}` }}
                >
                  {char.name}
                </h3>
                <p
                  className="text-sm font-mono tracking-widest mb-5"
                  style={{ color: char.tagColor, textShadow: `0 0 10px ${char.glowColor}` }}
                >
                  ✦ {char.title} ✦
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-lg">
                  {char.description}
                </p>

                {/* Skills */}
                <div>
                  <p className="text-[0.6rem] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-3">
                    Signature Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {char.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-sm font-mono tracking-wide"
                        style={{
                          color: char.tagColor,
                          background: char.badgeColor,
                          border: `1px solid ${char.badgeBorder}`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats bar */}
            <div
              className="px-8 sm:px-10 py-5 flex flex-wrap gap-6 border-t"
              style={{ borderColor: char.borderColor.replace("0.4","0.15") }}
            >
              {[
                { label: "Rank", val: char.rank },
                { label: "Class", val: char.role },
                { label: "Status", val: "Active" },
                { label: "Origin", val: char.id === "sung" ? "Korea" : char.id === "cha" ? "Korea" : char.id === "goto" ? "Japan" : "Shadow Realm" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-[0.55rem] font-mono tracking-widest text-zinc-600 uppercase">{s.label}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: char.tagColor, fontFamily: "'CinzelLocal', serif" }}
                  >
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}