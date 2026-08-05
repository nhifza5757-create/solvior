"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

// Timeline Data
const timelineSteps = [
  {
    id: "01",
    year: "2008",
    title: "Founding and early years",
    description:
      "Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value.",
    images: ["/images/project/h2-project-1.webp", "/images/project/h2-project-2.webp"],
    side: "left", 
  },
  {
    id: "02",
    year: "2012",
    title: "Expansion and growth",
    description:
      "Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value.",
    images: ["/images/project/h2-project-2.webp", "/images/project/h2-project-3.webp"],
    side: "right",
  },
  {
    id: "03",
    year: "2016",
    title: "Innovation and industry leadership",
    description:
      "Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value.",
    images: ["/images/project/h2-project-3.webp", "/images/project/h2-project-4.webp"],
    side: "left",
  },
  {
    id: "04",
    year: "2020",
    title: "Global expansion and diversification",
    description:
      "Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value.",
    images: ["/images/project/h2-project-4.webp", "/images/project/h2-project-1.webp"],
    side: "right",
  },
  {
    id: "05",
    year: "2024",
    title: "Looking ahead",
    description:
      "Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value.",
    images: ["/images/project/h2-project-2.webp", "/images/project/h2-project-3.webp"],
    side: "left",
  },
];

export default function HistoryPage() {
  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[500px]">
        <Image
          src={HERO_BG}
          alt="History background"
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1426]/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Company history</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-[#0075ff]/60">
              <Link href="/" className="transition-colors duration-300 hover:text-[#0075ff]">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Company history</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT BACKGROUND INTRO SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal animation="fadeInUp" className="flex flex-col">
            <span className="text-[#0075ff] text-sm font-semibold tracking-widest uppercase mb-3">
              • Our background •
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] leading-tight mb-6">
              Discover how we have evolved our company's <span className="text-[#0075ff]">on legacy.</span>
            </h2>
          </Reveal>

          <Reveal animation="fadeInUp" delay={0.1} className="flex flex-col justify-center">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to empowers businesses off all size to thrive in an businesses ever changing
              marketplace. We are committed to the delivering exceptional in the value through our strategic
              inset, innovative approaches. Our mission is to empower businesses of all sizes to thrive.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Committed to the delivering exceptional in the value through our strategic inset, innovative
              approaches empower.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex w-fit items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
              />
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="relative z-10 ml-3">Learn more</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FIXED TIMELINE SECTION */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="container mx-auto max-w-6xl px-4 relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2 hidden sm:block" />

          {timelineSteps.map((step, index) => (
            <div
              key={step.id}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center mb-16 lg:mb-24 ${
                step.side === "right" ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* 
                 FIXED MARKER: 
                 Center Year Marker absolute positioned independently 
                 so it stays locked to the line regardless of column reversal 
              */}
              <div className="absolute left-1/2 top-6 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 hidden sm:flex items-center justify-center z-10">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0075ff] bg-white">
                  <div className="h-2 w-2 rounded-full bg-[#0075ff]" />
                </div>
                {/* 
                   FIXED LOGIC: 
                   Agar side "right" hai, toh year left shift hoga (neg margin).
                   Agar side "left" hai, toh year right shift hoga (normal positioning).
                */}
                <span 
                  className={`absolute text-4xl font-bold text-gray-300 select-none whitespace-nowrap ${
                    step.side === "right" ? "right-6" : "left-6"
                  }`}
                >
                  {step.year}
                </span>
              </div>

              {/* Mobile Year Marker */}
              <div className="sm:hidden flex items-center gap-3 mb-4 w-full">
                <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0075ff] bg-white shrink-0">
                  <div className="h-2 w-2 rounded-full bg-[#0075ff]" />
                </div>
                <span className="text-2xl font-bold text-gray-300">{step.year}</span>
              </div>

              {/* Card Box */}
              <div
                className={`w-full sm:w-[calc(50%-40px)] relative border border-gray-200 bg-white p-6 sm:p-8 transition-all duration-500 hover:shadow-xl ${
                  step.side === "right" ? "sm:ml-auto" : "sm:mr-auto"
                }`}
              >
                <Reveal animation="fadeInUp" delay={index * 0.1}>
                  <span className="mb-3 block text-sm font-semibold text-gray-400">
                    {step.id}. {step.title}
                  </span>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  {/* Two Images Side by Side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                      <Image
                        src={step.images[0]}
                        alt={`${step.title} image 1`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                      <Image
                        src={step.images[1]}
                        alt={`${step.title} image 2`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-[#0075ff] py-16">
        <span
          aria-hidden
          className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/20"
        />
        <span
          aria-hidden
          className="absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/20"
        />
        <Reveal
          animation="fadeInUp"
          className="container mx-auto max-w-7xl px-4 relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
        >
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            Get consultant now!
          </h2>
          <Link
            href="/contact"
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-[#0a1426] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0a1426] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
            />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3 transition-colors duration-300 group-hover:text-white">
              Lets talk now
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}