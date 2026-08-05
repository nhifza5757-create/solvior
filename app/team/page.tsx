"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function TeamPage() {
  return (
    <div>
      {/* HERO BANNER - Exact match to all other pages */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
        <Image
          src={HERO_BG}
          alt="Team background"
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1426]/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Team</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-[#0075ff]/60 active:border-[#0075ff]/60">
              <Link href="/" className="transition-colors duration-300 hover:text-[#0075ff] active:text-[#0075ff]">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Team</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEAM GRID SECTION - With exact hover effects from screenshots */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Reveal key={member.id} animation="fadeInUp" delay={index * 0.1}>
                <div className="group relative overflow-hidden bg-white transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
                    />
                    
                    {/* Gradient Overlay that appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1426] via-[#0a1426]/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90 group-active:opacity-90" />
                  </div>
                  
                  {/* Name & Role - Slides up slightly on hover */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white text-center transition-all duration-500 group-hover:-translate-y-1 group-active:-translate-y-1">
                    <h4 className="text-xl font-bold">{member.name}</h4>
                    <p className="text-sm text-white/80 mt-1">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* PAGINATION (Exactly like screenshot) */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0075ff] text-sm font-semibold text-white cursor-pointer transition-colors hover:bg-blue-700 active:bg-blue-700">
              01
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-[#0a1426] cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-50">
              02
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#0a1426] cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-50">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </section>

      {/* CTA BANNER - Exact match from portfolios page */}
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
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-[#0a1426] transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0a1426] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
            />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3 transition-colors duration-300 group-hover:text-white group-active:text-white">
              Lets talk now
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}