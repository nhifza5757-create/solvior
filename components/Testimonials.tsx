"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";

const quotes = [
  {
    text: "Northbound didn't hand us a strategy deck and disappear. They stayed until the new pricing model actually stuck, and walked our team through every regulatory question along the way.",
    name: "Dana Whitfield",
    role: "CEO, Lumen Retail Group",
  },
  {
    text: "The clearest, most specific advice we've had from any outside firm — every recommendation came with a number and a deadline attached.",
    name: "Marcus Feld",
    role: "COO, Fernbank Health",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const q = quotes[i];
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#c7d2ea] to-[#dfe6f4]">
          <div className="absolute left-6 bottom-6 bg-navy/90 backdrop-blur rounded-xl px-5 py-4 text-white">
            <p className="font-display text-2xl font-bold">3.8K+</p>
            <p className="text-xs text-white/70 mt-1">Clients served worldwide</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">// Client feedback</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-5 mb-6">Our client testimonials</h2>
          <svg viewBox="0 0 32 24" className="w-9 h-9 text-blue mb-4" fill="currentColor">
            <path d="M0 24V13.9C0 9.5 1.1 6.1 3.3 3.7 5.5 1.2 8.5 0 12.3 0v4.8c-2.1 0-3.7.6-4.9 1.9-1.1 1.2-1.7 2.9-1.7 5.1h6.4V24H0zm18 0V13.9c0-4.4 1.1-7.8 3.3-10.2C23.5 1.2 26.5 0 30.3 0v4.8c-2.1 0-3.7.6-4.9 1.9-1.1 1.2-1.7 2.9-1.7 5.1h6.4V24H18z" />
          </svg>
          <p className="text-lg sm:text-xl leading-relaxed text-ink max-w-xl">{q.text}</p>

          <div className="flex items-center justify-between mt-9 pt-7 border-t border-line">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c7d2ea]" />
              <div>
                <div className="flex gap-0.5 text-blue text-sm mb-1" aria-hidden="true">
                  {"★★★★★"}
                </div>
                <p className="font-semibold text-ink">{q.name}</p>
                <p className="text-sm text-slate">{q.role}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                aria-label="Previous testimonial"
                onClick={() => setI((i - 1 + quotes.length) % quotes.length)}
                className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink"
              >
                <ArrowIcon className="w-4 h-4 rotate-180" />
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setI((i + 1) % quotes.length)}
                className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white"
              >
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
