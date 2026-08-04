import Image from "next/image";
import Link from "next/link";
import BlogSidebarList from "@/components/sections/BlogSidebarList";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function BlogsPage() {
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
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Blog Standard</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2  border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Blog Standard</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Post list + sidebar */}
      <BlogSidebarList />
    </div>
  );
}
