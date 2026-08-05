import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import BlogSidebarList from "@/components/sections/BlogSidebarList";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function BlogsPage() {
  return (
    <div>
     {/* Hero banner */}
<section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">

  <Image
    src={HERO_BG}
    alt=""
    fill
    priority
    className="animate-hero-zoom object-cover object-center"
  />

  <div className="absolute inset-0 bg-primary-dark/65" />

  <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">

    <div className="max-w-4xl text-center text-white">

      <Reveal animation="fadeInUp">
        <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
          Blog Standard
        </h1>
      </Reveal>

      <Reveal animation="fadeInUp" delay={0.15}>
        <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">

          <Link
            href="/"
            className="transition hover:text-accent"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-white/80">
            Blog Standard
          </span>

        </div>
      </Reveal>

    </div>

  </div>

</section>

      {/* Post list + sidebar */}
      <Suspense fallback={null}>
        <BlogSidebarList />
      </Suspense>
    </div>
  );
}
