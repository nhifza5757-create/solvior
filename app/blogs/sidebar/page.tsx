"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { blogCategories, blogPosts, blogTags } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";
const NEED_HELP_BG = "/images/widget-cta.webp";
const POSTS_PER_PAGE = 3;

export default function BlogSidebarPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory ? post.category === activeCategory : true;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const recentPosts = blogPosts.slice(0, 3);

  function handleCategoryClick(name: string) {
    setActiveCategory((prev) => (prev === name ? null : name));
    setPage(1);
  }

  return (
    <div>
     {/* HERO BANNER */}
<section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">

  <Image
    src={HERO_BG}
    alt="Blog background"
    fill
    priority
    className="animate-hero-zoom object-cover object-center"
  />

  <div className="absolute inset-0 bg-primary-dark/65" />

  <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">

    <div className="max-w-4xl text-center text-white">

      <Reveal animation="fadeInUp">
        <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
          Blog With Sidebar
        </h1>
      </Reveal>

      <Reveal animation="fadeInUp" delay={0.15}>
        <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">

          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>

          <span>/</span>

          <span className="text-white/80">
            Blog With Sidebar
          </span>

        </div>
      </Reveal>

    </div>

  </div>

</section>

      {/* BLOG SIDEBAR SECTION - Your exact code */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* ---- Posts column ---- */}
          <div className="flex flex-col gap-10 lg:col-span-2">
            {paginated.length === 0 && (
              <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
            )}

            {paginated.map((post, i) => (
              <Reveal key={post.id} animation="fadeInUp" delay={i * 0.1}>
                <article className="group overflow-hidden border-border bg-background transition-shadow duration-300 hover:shadow-2xl active:shadow-2xl hover:shadow-black/10 active:shadow-black/10">
                  {/* Image */}
                  <Link
                    href={`/blogs/${post.id}`}
                    data-cursor-hover
                    className="relative block aspect-[16/9] overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-110 group-active:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

                    {/* Date badge */}
                    <div className="absolute left-5 top-5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center leading-tight text-white backdrop-blur-md">
                      <span className="block text-lg font-bold">{post.date}</span>
                      <span className="block text-[10px] font-medium uppercase text-white/80">{post.month}</span>
                    </div>

                    {/* Slide-in arrow icon, appears on hover */}
                    <span className="absolute right-5 top-5 flex h-10 w-10 -translate-y-3 items-center justify-center rounded-full bg-[#0075ff] text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-active:translate-y-0 group-hover:opacity-100 group-active:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-3 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(post.category)}
                        className="text-[#0075ff] transition-colors duration-300 hover:text-blue-800 active:text-blue-800"
                      >
                        {post.category}
                      </button>
                      <span className="text-border">•</span>
                      <span className="text-muted-foreground">{post.comments} Comments</span>
                    </div>

                    <Link href={`/blogs/${post.id}`} data-cursor-hover>
                      <h3 className="font-display text-xl font-semibold text-[#0a1426] transition-all duration-300 group-hover:translate-x-1 group-active:translate-x-1 group-hover:text-[#0075ff] group-active:text-[#0075ff] sm:text-2xl">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blogs/${post.id}`}
                      data-cursor-hover
                      className="group/btn relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
                      />
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="relative z-10 ml-3">Read more</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}

            {/* Pagination */}
            {filtered.length > 0 && (
              <Reveal animation="fadeInUp" className="flex items-center justify-center gap-3 pt-4">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const num = idx + 1;
                  const isActive = num === currentPage;
                  return (
                    <button
                      key={num}
                      type="button"
                      data-cursor-hover
                      onClick={() => setPage(num)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-[#0075ff] bg-[#0075ff] text-white"
                          : "border-border text-[#0a1426] hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                      }`}
                    >
                      {String(num).padStart(2, "0")}
                    </button>
                  );
                })}
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-[#0a1426] transition-all duration-300 hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Reveal>
            )}
          </div>

          {/* ---- Sidebar ---- */}
          <aside className="flex flex-col gap-8">
            {/* Search */}
            <Reveal animation="fadeInUp">
              <h4 className="mb-4 font-display text-lg font-semibold text-[#0a1426]">
                Search here
                <span className="mt-2 block h-[2px] w-8 bg-[#0075ff]" />
              </h4>
              <div className="group flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 transition-colors duration-300 focus-within:border-[#0075ff]">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-[#0a1426] outline-none placeholder:text-gray-400"
                />
                <Search className="h-4 w-4 shrink-0 text-gray-400 transition-colors duration-300 group-focus-within:text-[#0075ff]" />
              </div>
            </Reveal>

            {/* Recent posts */}
            <Reveal animation="fadeInUp" delay={0.1}>
              <h4 className="mb-5 font-display text-lg font-semibold text-[#0a1426]">
                Recent Post
                <span className="mt-2 block h-[2px] w-8 bg-[#0075ff]" />
              </h4>
              <div className="flex flex-col gap-4">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.id}`}
                    data-cursor-hover
                    className="group flex items-center gap-4"
                  >
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110 group-active:scale-110"
                      />
                    </span>
                    <span>
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-[#0a1426] transition-colors duration-300 group-hover:text-[#0075ff] group-active:text-[#0075ff]">
                        {post.title}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {post.month} {post.date}, 2025
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>

            {/* Categories */}
            <Reveal animation="fadeInUp" delay={0.15}>
              <h4 className="mb-5 font-display text-lg font-semibold text-[#0a1426]">
                Categories
                <span className="mt-2 block h-[2px] w-8 bg-[#0075ff]" />
              </h4>
              <div className="flex flex-col gap-2">
                {blogCategories.map((cat) => {
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      data-cursor-hover
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`flex items-center justify-between rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "border-[#0075ff] bg-[#0075ff] text-white"
                          : "border-gray-200 text-[#0a1426] hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`text-xs ${isActive ? "text-white/80" : "text-gray-500 group-hover:text-white/80 group-active:text-white/80"}`}
                      >
                        ({cat.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* Tags */}
            <Reveal animation="fadeInUp" delay={0.2}>
              <h4 className="mb-5 font-display text-lg font-semibold text-[#0a1426]">
                Tags
                <span className="mt-2 block h-[2px] w-8 bg-[#0075ff]" />
              </h4>
              <div className="flex flex-wrap gap-2">
                {blogTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    data-cursor-hover
                    onClick={() => handleCategoryClick(tag)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-[#0a1426] transition-all duration-300 hover:border-[#0075ff] active:border-[#0075ff] hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Contact widget */}
            <Reveal animation="fadeInUp" delay={0.25}>
              <div className="relative overflow-hidden bg-[#0a1426] p-8 text-white">
                <Image
                  src={NEED_HELP_BG}
                  alt=""
                  fill
                  className="object-cover opacity-20"
                  aria-hidden
                />
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0075ff]/20"
                />
                <div className="relative">
                  <h4 className="font-display text-xl font-semibold">
                    Need help? Feel free contact us
                  </h4>
                  <p className="mt-3 text-sm text-white/70">
                    Our mission is to empowers businesses off all size in an businesses.
                  </p>
                  <Link
                    href="/contact"
                    data-cursor-hover
                    className="group/btn relative z-10 mt-6 inline-flex items-center overflow-hidden rounded-full bg-white/10 py-2 pl-3 pr-7 text-sm font-semibold text-white backdrop-blur-md"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
                    />
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="relative z-10 ml-3">Get in touch</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
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