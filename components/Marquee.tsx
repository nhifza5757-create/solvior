const words = [
  "Passion and progress",
  "Founders and vision",
  "Growth and impact",
  "Team and values",
  "Innovation and future",
];

export function Marquee() {
  const items = [...words, ...words];
  return (
    <div className="bg-blue overflow-hidden py-5">
      <div className="marquee-track flex whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-5 mx-6 text-white font-display text-2xl font-semibold">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80" fill="none">
              <path d="M12 2 L22 12 L12 22 L2 12 Z" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
