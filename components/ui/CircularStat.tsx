"use client";

import { useCountUp } from "@/hooks/useCountUp";

export default function CircularStat({
  percent,
  label,
}: {
  percent: number;
  label: string;
}) {
  const { value, ref } = useCountUp({ end: percent, duration: 1400 });
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center text-center">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-semibold text-white">
          {value}%
        </span>
      </div>
      <p className="mt-3 max-w-[8rem] text-sm text-white/80">{label}</p>
    </div>
  );
}