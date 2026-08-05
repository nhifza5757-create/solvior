"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { projects } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

export default function CaseStudies() {
  const [activeId, setActiveId] = useState<number | null>(projects[0]?.id ?? null);

  return (
    <section className="bg-muted py-20 lg:py-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.3fr] lg:gap-16">
          {/* Left: heading + CTA — stays fixed/sticky while the right accordion scrolls */}
          <Reveal animation="fadeInUp" className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow">Our case study</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary sm:text-4xl">
              Explore our outstanding client projects
            </h2>
            <Link
              href="/portfolios"
              data-cursor-hover
              className="group relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
              />
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="relative z-10 ml-3">Explore more</span>
            </Link>
          </Reveal>

          {/* Right: accordion list — one project image expands at a time */}
          <Reveal animation="fadeInUp" delay={0.1}>
            <div className="border-t border-border">
              {projects.map((p) => {
                const isActive = p.id === activeId;
                return (
                  <div key={p.id} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setActiveId(isActive ? null : p.id)}
                      data-cursor-hover
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-display text-lg font-medium text-primary">
                        <span className="text-[#0075ff]">{p.number}</span> {p.title}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 ${
                          isActive ? "rotate-180 border-accent bg-accent text-white" : ""
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className="grid overflow-hidden transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <Link
                          href={`/portfolios/${p.id}`}
                          data-cursor-hover
                          className="group relative mb-6 block aspect-[16/10] overflow-hidden "
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105"
                          />
                          <span className="absolute bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-center text-xs font-semibold text-white">
                            View
                            <br />
                            Project
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}