"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { services } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<number, ReactNode> = {
  1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 1 0 9 9c0-1.5-.4-2.9-1.1-4.1M12 3v4m0-4c2 0 3.8.8 5.1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="10" height="10" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="11" y="11" width="10" height="10" rx="2" fill="currentColor" />
    </svg>
  ),
  3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="7" r="2.3" fill="currentColor" />
      <path d="M15.5 20c.2-2.8 1.9-5 4.5-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  4: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(i);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const pos = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let min = Infinity;
    cards.forEach((c, i) => {
      const center = c.offsetLeft - track.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(center - pos);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActive(closest);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal animation="fadeInUp" className="max-w-xl">
            <span className="eyebrow">Transformative solution</span>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-primary sm:text-4xl">
              In comprehensive service offer.
            </h2>
          </Reveal>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              data-cursor-hover
              onClick={() => scrollToIndex(Math.max(0, active - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition hover:border-accent active:border-accent hover:text-accent active:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              data-cursor-hover
              onClick={() => scrollToIndex(Math.min(services.length - 1, active + 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition hover:border-accent active:border-accent hover:text-accent active:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              animation="fadeInUp"
              delay={i * 0.1}
              as="div"
              className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[calc(33.333%-1.1rem)]"
            >
              <Link href={`/services/${s.id}`} data-cursor-hover className="group block border border-border shadow-sm transition-shadow duration-300 hover:shadow-md active:shadow-md">
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 85vw"
                      className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105"
                    />
                  </div>
                  <span className="absolute -bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-accent shadow-md transition-colors duration-300 group-hover:bg-accent group-active:bg-accent group-hover:text-white group-active:text-white">
                    {ICONS[s.id] ?? ICONS[1]}
                  </span>
                </div>
                <div className="mt-11 flex items-start justify-between gap-3 px-5 pb-5">
                  <h3 className="font-display text-xl font-medium leading-snug text-primary">
                    {s.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition group-hover:bg-accent group-active:bg-accent">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {services.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              data-cursor-hover
              onClick={() => scrollToIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                active === i ? "w-6 bg-accent" : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}