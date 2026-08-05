"use client";

import Image from "next/image";
import { marqueeItems } from "@/data/site";
import CircularStat from "@/components/ui/CircularStat";
import { useParallax } from "@/hooks/useParallax";

const BG_IMAGE = "/images/home-4/cta/h4-skill-bg.webp";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  const { ref, offset } = useParallax(0.2);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="relative h-[320px] w-full sm:h-[480px] lg:h-[560px]">
        {/* Parallax background layer — oversized so it never shows edges while translating */}
        <div
          className="absolute inset-0 -top-[15%] -bottom-[15%] will-change-transform"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <Image
            src={BG_IMAGE}
            alt="Consultants collaborating"
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-x-0 top-0 overflow-hidden bg-accent py-4">
          <div className="animate-marquee flex w-max gap-8">
            {items.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex items-center gap-8 font-display text-xl font-semibold text-white sm:text-2xl"
              >
                {item}
                <span aria-hidden className="inline-block h-2 w-2 rotate-45 bg-white" />
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 flex w-fit -translate-x-1/2 justify-center gap-3 border border-white/10 bg-primary/30 px-5 py-1.5 shadow-xl backdrop-blur-xl sm:inset-x-auto sm:bottom-10 sm:left-auto sm:right-10 sm:w-auto sm:translate-x-0 sm:justify-start sm:gap-10 sm:px-10 sm:py-6">
          <CircularStat percent={88} label="Business consultants" />
          <CircularStat percent={75} label="Clients communication" />
        </div>
      </div>
    </section>
  );
}