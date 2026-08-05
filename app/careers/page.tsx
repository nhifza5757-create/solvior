"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

// Careers Data
const careersData = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 34C10 28.4772 14.4772 24 20 24C25.5228 24 30 28.4772 30 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 16L32 18L38 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Business strategy consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 10V20L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Management consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <path d="M20 10C21.6569 10 23 11.3431 23 13C23 14.6569 21.6569 16 20 16C18.3431 16 17 14.6569 17 13C17 11.3431 18.3431 10 20 10Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 30C24.1421 30 27.5 27.5 27.5 24C27.5 20.5 24.1421 18 20 18C15.8579 18 12.5 20.5 12.5 24C12.5 27.5 15.8579 30 20 30Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="26" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Business process consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 12L20 8M20 32L20 28M12 20L8 20M32 20L28 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Operations consultant",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 10V20L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 20C30 25.5228 25.5228 30 20 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Organizational development",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8 text-[#0075ff]">
        <path d="M10 18L18 26L30 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Performance optimization",
    salary: "$400-$550 / week",
    type: "Full time job/on site",
    tag: "Urgent",
    location: "London,UK",
    link: "#",
  },
];

const ITEMS_PER_PAGE = 3;

export default function CareersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(careersData.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = careersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
    {/* HERO BANNER */}
<section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">

  <Image
    src={HERO_BG}
    alt="Careers background"
    fill
    priority
    className="animate-hero-zoom object-cover object-center"
  />

  <div className="absolute inset-0 bg-[#0a1426]/65" />

  <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">

    <div className="max-w-4xl text-center text-white">

      <Reveal animation="fadeInUp">
        <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
          Careers
        </h1>
      </Reveal>

      <Reveal animation="fadeInUp" delay={0.15}>
        <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">

          <Link href="/" className="transition hover:text-[#0075ff]">
            Home
          </Link>

          <span>/</span>

          <span className="text-white/80">
            Careers
          </span>

        </div>
      </Reveal>

    </div>

  </div>

</section>

      {/* CAREERS GRID SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((job, index) => (
              <Reveal key={job.id} animation="fadeInUp" delay={index * 0.1}>
                <div className="group relative flex flex-col border border-gray-200 bg-white p-8 transition-all duration-500 hover:bg-[#0a1426] active:bg-[#0a1426] hover:shadow-xl active:shadow-xl hover:-translate-y-1 active:-translate-y-1">
                  
                  {/* Icon */}
                  <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F0F5FF] transition-colors duration-500 group-hover:bg-white group-active:bg-white">
                    {job.icon}
                  </div>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-[10px] font-medium text-gray-500 transition-colors duration-500 group-hover:border-white/30 group-active:border-white/30 group-hover:text-white/70 group-active:text-white/70">
                      {job.type}
                    </span>
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-[10px] font-medium text-gray-500 transition-colors duration-500 group-hover:border-white/30 group-active:border-white/30 group-hover:text-white/70 group-active:text-white/70">
                      {job.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold text-[#0a1426] transition-colors duration-500 group-hover:text-white group-active:text-white">
                    {job.title}
                  </h3>

                  {/* Salary */}
                  <p className="mb-6 text-sm font-semibold text-[#0075ff] transition-colors duration-500 group-hover:text-blue-300 group-active:text-blue-300">
                    {job.salary}
                  </p>

                  {/* Footer: Location & Apply Link */}
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 transition-colors duration-500 group-hover:border-white/10 group-active:border-white/10">
                    <span className="flex items-center gap-1 text-xs text-gray-500 transition-colors duration-500 group-hover:text-white/70 group-active:text-white/70">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </span>
                    <Link
                      href={job.link}
                      className="text-xs font-bold text-[#0a1426] transition-colors duration-500 group-hover:text-white group-active:text-white flex items-center gap-1"
                    >
                      Apply now
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* PAGINATION - Now Fully Working */}
          <div className="mt-14 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0075ff] text-white hover:bg-blue-700 active:bg-blue-700"
                      : "border border-gray-200 text-[#0a1426] hover:bg-gray-50 active:bg-gray-50"
                  }`}
                >
                  {String(pageNum).padStart(2, "0")}
                </button>
              );
            })}
            
            {/* Next Arrow Button */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#0a1426] transition-colors hover:bg-gray-50 active:bg-gray-50 cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
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