"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { testimonials, testimonialMainImage } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

const AUTO_SLIDE_INTERVAL = 5000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const { value: count, ref: counterRef } = useCountUp({
    end: 3800,
    duration: 1800,
  });

  const formattedCount =
    count >= 1000 ? `${(count / 1000).toFixed(1)}K+` : `${count}`;

  const goNext = useCallback(() => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const goPrev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section className="bg-white py-20 text-dark lg:py-28">
      <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left: FIXED main image with animated + blurry badge */}
        <Reveal animation="fadeInUp" className="relative">
          <div className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
            <Image
              src={testimonialMainImage}
              alt="Our clients"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div
            ref={counterRef as React.RefObject<HTMLDivElement>}
            className="absolute bottom-6 left-6 rounded-xl border border-white/20 bg-white/10 px-6 py-5 text-white backdrop-blur-md"
          >
            <p className="font-display text-3xl font-semibold">
              {formattedCount}
            </p>
            <p className="mt-1 text-sm text-white/80">
              Happy clients all over
              <br />
              world now.
            </p>
          </div>
        </Reveal>

        {/* Right: content */}
        <div>
          <span className="eyebrow">— // Clients feedback</span>
          <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
            Our clients testimonials
          </h2>

          <svg
            className="mt-8 h-9 w-9 text-accent"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6.5v-6.5H7.2c0-1.8 1.5-3.3 3.3-3.3V6h-1zM19 6c-3 0-5.5 2.5-5.5 5.5V18H20v-6.5h-3.3c0-1.8 1.5-3.3 3.3-3.3V6h-1z" />
          </svg>

          <div key={t.id} className="animate-fadein">
            <p className="mt-6 text-lg leading-relaxed text-dark/80">
              {t.quote}
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-dark/10 pt-6">
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-full object-cover"
                />
                <div>
                  <div className="mb-1 text-accent">★★★★★</div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-dark/60">{t.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0a1e42] bg-[#0a1e42] text-white transition hover:border-[#0075ff] hover:bg-[#0075ff]"
                >
                  ←
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0a1e42] bg-[#0a1e42] text-white transition hover:border-[#0075ff] hover:bg-[#0075ff]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}