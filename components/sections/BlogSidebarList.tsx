"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { blogCategories, blogPosts, blogTags } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const NEED_HELP_BG = "/images/widget-cta.webp";
const POSTS_PER_PAGE = 3;

export default function BlogSidebarList() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const urlQuery = searchParams.get("search");
    if (urlQuery) setQuery(urlQuery);
  }, [searchParams]);

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
    <section className="py-20 lg:py-28">
      <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* ---- Posts column ---- */}
        <div className="flex flex-col gap-10 lg:col-span-2">
          {paginated.length === 0 && (
            <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
          )}

          {paginated.map((post, i) => (
            <Reveal key={post.id} animation="fadeInUp" delay={i * 0.1}>
              <article className="group overflow-hidden  border-border bg-background transition-shadow duration-300 hover:shadow-2xl active:shadow-2xl hover:shadow-black/10 active:shadow-black/10">
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
                  <span className="absolute right-5 top-5 flex h-10 w-10 -translate-y-3 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-active:translate-y-0 group-hover:opacity-100 group-active:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center gap-3 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(post.category)}
                      className="text-accent transition-colors duration-300 hover:text-accent-dark active:text-accent-dark"
                    >
                      {post.category}
                    </button>
                    <span className="text-border">•</span>
                    <span className="text-muted-foreground">{post.comments} Comments</span>
                  </div>

                  <Link href={`/blogs/${post.id}`} data-cursor-hover>
                    <h3 className="font-display text-xl font-semibold text-primary transition-all duration-300 group-hover:translate-x-1 group-active:translate-x-1 group-hover:text-accent group-active:text-accent sm:text-2xl">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blogs/${post.id}`}
                    data-cursor-hover
                    className="group/btn relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
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
                        ? "border-accent bg-accent text-white"
                        : "border-border text-primary hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
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
            <h4 className="mb-4 font-display text-lg font-semibold text-primary">
              Search here
              <span className="mt-2 block h-[2px] w-8 bg-accent" />
            </h4>
            <div className="group flex items-center gap-3 rounded-full border border-border bg-background-soft px-5 py-3 transition-colors duration-300 focus-within:border-accent">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
              <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-focus-within:text-accent" />
            </div>
          </Reveal>

          {/* Recent posts */}
          <Reveal animation="fadeInUp" delay={0.1}>
            <h4 className="mb-5 font-display text-lg font-semibold text-primary">
              Recent Post
              <span className="mt-2 block h-[2px] w-8 bg-accent" />
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
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-accent group-active:text-accent">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {post.month} {post.date}, 2025
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Categories */}
          <Reveal animation="fadeInUp" delay={0.15}>
            <h4 className="mb-5 font-display text-lg font-semibold text-primary">
              Categories
              <span className="mt-2 block h-[2px] w-8 bg-accent" />
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
                        ? "border-accent bg-accent text-white"
                        : "border-border text-primary hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs ${isActive ? "text-white/80" : "text-muted-foreground group-hover:text-white/80 group-active:text-white/80"}`}
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
            <h4 className="mb-5 font-display text-lg font-semibold text-primary">
              Tags
              <span className="mt-2 block h-[2px] w-8 bg-accent" />
            </h4>
            <div className="flex flex-wrap gap-2">
              {blogTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  data-cursor-hover
                  onClick={() => handleCategoryClick(tag)}
                  className="rounded-full border border-border px-4 py-2 text-xs font-medium text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Contact widget */}
          <Reveal animation="fadeInUp" delay={0.25}>
            <div className="relative overflow-hidden bg-primary p-8 text-white">
              <Image
                src={NEED_HELP_BG}
                alt=""
                fill
                className="object-cover opacity-20"
                aria-hidden
              />
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 shape-zoominout"
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
                    className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
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
  );
}