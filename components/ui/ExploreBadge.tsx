"use client";

export default function ExploreBadge({
  text = "EXPLORE MORE",
  href = "https://www.youtube.com/watch?v=GGf1JjSAKP4",
}: {
  text?: string;
  href?: string;
}) {
  const repeated = `${text} • ${text} • `;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor-hover
      aria-label={text}
      className="group relative flex h-28 w-28 items-center justify-center"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_9s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id="explore-circle-path"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text fill="white" fontSize="8.2" letterSpacing="1.5" fontWeight="600">
          <textPath href="#explore-circle-path" startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </svg>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform group-hover:scale-105">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </a>
  );
}
