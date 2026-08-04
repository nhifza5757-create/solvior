export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-blue text-white shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-[62%] h-[62%]" fill="none">
        <path
          d="M12 3.5c4.7 0 8.5 3.8 8.5 8.5 0 3.4-2 6.3-4.9 7.7"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 20.5c-4.7 0-8.5-3.8-8.5-8.5 0-3.4 2-6.3 4.9-7.7"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path d="M15.5 18.5l1.3 1.6-2 .6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      </svg>
    </span>
  );
}

export function ArrowIcon({ className = "w-4 h-4", direction = "right" }: { className?: string; direction?: "right" | "up-right" }) {
  const rotate = direction === "up-right" ? "-rotate-45" : "";
  return (
    <svg viewBox="0 0 24 24" className={`${className} ${rotate}`} fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DotRing() {
  return (
    <span className="relative inline-flex w-3 h-3">
      <span className="absolute inline-flex h-full w-full rounded-full border border-blue" />
      <span className="absolute inline-flex h-1.5 w-1.5 m-auto inset-0 rounded-full bg-blue" />
    </span>
  );
}

export function DotCloud({ className = "w-32 h-32" }: { className?: string }) {
  const dots = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      dots.push({ x: c * 12, y: r * 12 });
    }
  }
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x + 4} cy={d.y + 4} r="1.6" fill="var(--blue)" opacity="0.5" />
      ))}
    </svg>
  );
}

export function FeatureIcon({ variant }: { variant: 0 | 1 | 2 | 3 }) {
  const common = "w-9 h-9 text-ink";
  if (variant === 0) {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none">
        <rect x="6" y="6" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="16" y="16" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none">
        <path d="M20 4 L34 12 V28 L20 36 L6 28 V12 Z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (variant === 2) {
    return (
      <svg viewBox="0 0 40 40" className={common} fill="none">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={common} fill="none">
      <path d="M20 4 L27 20 L20 36 L13 20 Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M27 12 L34 20 L27 28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
