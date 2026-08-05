import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

const ICONS: Record<number, React.ReactNode> = {
  1: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 1 0 9 9c0-1.5-.4-2.9-1.1-4.1M12 3v4m0-4c2 0 3.8.8 5.1 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  ),
  3: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="7" r="2.3" fill="currentColor" />
      <path d="M15.5 20c.2-2.8 1.9-5 4.5-5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  4: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 21V9l8-5 8 5v12M4 21h16M9 21v-6h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  5: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3a9 9 0 0 1 9 9h-9V3Z" fill="currentColor" />
    </svg>
  ),
  6: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12h13M11 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
        <Image src={HERO_BG} alt="" fill className="animate-hero-zoom object-cover" priority />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Services</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60 active:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent active:text-accent">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Services</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} animation="fadeInUp" delay={i * 0.08}>
                <Link
                  href={`/services/${service.id}`}
                  data-cursor-hover
                  className="group relative flex h-full min-h-[380px] flex-col overflow-hidden border border-border bg-background p-8 transition-all duration-500 sm:p-10"
                >
                  {/* Hover background image */}
                  <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/85" />
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 flex h-full flex-col">
                    <span className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-soft text-accent transition-colors duration-500 group-hover:bg-white group-active:bg-white">
                      {ICONS[service.id] ?? ICONS[1]}
                    </span>

                    <span className="mb-3 block text-sm font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-white/70 group-active:text-white/70">
                      {String(service.id).padStart(2, "0")}
                    </span>

                    <h3 className="mb-4 font-display text-2xl font-bold text-primary transition-colors duration-300 group-hover:text-white group-active:text-white">
                      {service.title}
                    </h3>

                    <p className="mb-8 flex-1 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/80 group-active:text-white/80">
                      {service.description}
                    </p>

                    <span className="mt-auto inline-flex items-center text-sm font-bold text-primary transition-colors duration-300 group-hover:text-white group-active:text-white">
                      Get optimization
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          <Reveal animation="fadeInUp" className="mt-16 flex items-center justify-center gap-3">
            <span
              data-cursor-hover
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-accent text-sm font-semibold text-white"
            >
              01
            </span>
            <span
              data-cursor-hover
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-muted active:bg-muted"
            >
              02
            </span>
            <span
              data-cursor-hover
              aria-label="Next page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-muted active:bg-muted"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </Reveal>
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
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-primary-dark transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-primary-dark transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
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
