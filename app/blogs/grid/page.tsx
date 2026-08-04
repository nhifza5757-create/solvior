import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

export default function BlogGridPage() {
  return (
    <div>
      {/* HERO BANNER - exact match to portfolios page */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[500px]">
        <Image
          src={HERO_BG}
          alt="Blog background"
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Blog grid</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent">Home</Link>
              <span>/</span>
              <span className="text-white/70">Blog grid</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOG GRID SECTION - exactly matching your screenshot */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Section with Date Badge */}
                <div className="relative block aspect-[4/3] overflow-hidden">
                  <Link href={`/blogs/${post.id}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Date Badge Overlay (Exactly like screenshot) */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-center justify-center bg-[#1b2a4a] px-3 py-2 text-center text-white shadow-md">
                    <span className="text-2xl font-bold leading-none">{post.date}</span>
                    <span className="text-[10px] uppercase tracking-wider">{post.month}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-6 sm:p-8">
                  {/* Meta Info (Category & Comments) */}
                  <div className="mb-3 flex items-center text-xs text-gray-500">
                    <span className="text-gray-400">{post.category}</span>
                    <span className="mx-2 text-gray-300">/</span>
                    <span>{post.comments} Comments</span>
                  </div>

                  {/* Title */}
                  <Link href={`/blogs/${post.id}`}>
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-[#0066FF]">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blogs/${post.id}`}
                    className="inline-flex items-center text-sm font-bold text-gray-900 transition-colors duration-300 hover:text-[#0066FF]"
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION (Exact match to screenshot) */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066FF] text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              01
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100">
              02
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </section>

      {/* CTA BANNER - exact match from your portfolios page */}
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
            className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-primary-dark transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
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