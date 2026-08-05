import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function PortfoliosPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[500px]">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Portfolios</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent">Home</Link>
              <span>/</span>
              <span className="text-white/70">Portfolios</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/portfolios/${p.id}`}
                data-cursor-hover
                className="group relative block aspect-[4/3] overflow-hidden "
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-semibold text-white transition-all duration-300 group-hover:tracking-wide group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <div className="mt-3 flex gap-2">
                    {p.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur transition-colors duration-300 hover:bg-[#0075ff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              01
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-semibold text-primary">
              02
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
              →
            </span>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-accent py-16">
        <span
          aria-hidden
          className="shape-zoominout absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/20"
        />
        <span
          aria-hidden
          className="shape-move absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-white/20"
        />
        <Reveal
          animation="fadeInUp"
          className="container-custom relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center"
        >
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            Get consultant now!
          </h2>
          <Link
            href="/contact"
            data-cursor-hover
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-primary-dark transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-primary-dark transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
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