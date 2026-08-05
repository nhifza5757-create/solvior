import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Check,
  Quote,
  LayoutGrid,
  Search,
} from "lucide-react";
import { blogPosts, blogCategories, blogTags, blogComments } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { PlayVideoButton, ShareButtons, CommentsSection } from "./BlogInteractive";

const HERO_BG = "/images/project/pheader-bg.webp";
const NEED_HELP_BG = "/images/widget-cta.webp";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.id === postId);
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];
  const recentPosts = blogPosts.slice(0, 3);
  const totalComments =
    blogComments.length + blogComments.reduce((sum, c) => sum + c.replies.length, 0);

  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
        <Image src={HERO_BG} alt="" fill className="animate-hero-zoom object-cover" priority />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Blog Details</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60 active:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent active:text-accent">
                Home
              </Link>
              <span>/</span>
              <Link href="/blogs" className="transition-colors duration-300 hover:text-accent active:text-accent">
                Blogs
              </Link>
              <span>/</span>
              <span className="max-w-[220px] truncate text-white/70 sm:max-w-none">
                {post.title}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>

            <h2 className="mt-8 font-display text-2xl font-medium text-primary sm:text-3xl">
              {post.title}
            </h2>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-border py-5 sm:gap-8">
              <div className="flex items-center gap-3">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image src={post.authorAvatar} alt={post.author} fill className="object-cover" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Authored by</span>
                  <span className="block text-sm font-semibold text-primary">{post.author}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Calendar className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Date Released</span>
                  <span className="block text-sm font-semibold text-primary">
                    {post.dateReleased}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Comments</span>
                  <span className="block text-sm font-semibold text-primary">{post.comments} Comments</span>
                </span>
              </div>
            </div>

            <p className="mt-6 text-muted-foreground">{post.excerpt}</p>

            {/* Quote */}
            <div className="relative mt-8 overflow-hidden bg-background-soft p-8 sm:p-10">
              <Quote className="h-8 w-8 fill-accent text-accent" />
              <p className="mt-4 font-display text-lg font-medium leading-relaxed text-primary sm:text-xl">
                {post.quote}
              </p>
              <span className="mt-5 block text-sm font-semibold text-muted-foreground before:mr-2 before:content-['—']">
                {post.quoteAuthor}
              </span>
            </div>

            <p className="mt-8 text-muted-foreground">{post.afterQuote}</p>

            <h3 className="mt-10 font-display text-xl font-medium text-primary">
              {post.subheading}
            </h3>
            <p className="mt-4 text-muted-foreground">{post.subheadingText}</p>

            <ul className="mt-6 space-y-3">
              {post.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-primary">{item}</span>
                </li>
              ))}
            </ul>

            <div className="group relative mt-10 aspect-[16/9] overflow-hidden">
              <Image
                src={post.secondaryImage}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105"
              />
              <div className="absolute inset-0 bg-primary-dark/20" aria-hidden />
              <PlayVideoButton />
            </div>

            <h3 className="mt-10 font-display text-xl font-medium text-primary">Conclusions</h3>
            {post.conclusion.map((para, i) => (
              <p key={i} className="mt-4 text-muted-foreground">
                {para}
              </p>
            ))}

            {/* Tags + Share */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-primary">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ShareButtons title={post.title} />
            </div>

            {/* Prev / Next */}
            <div className="mt-8 flex items-center justify-between rounded-none border border-border px-6 py-5">
              <Link
                href="/blogs"
                aria-label="All blogs"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary hover:bg-accent active:bg-accent hover:text-white active:text-white"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link
                href={`/blogs/${nextPost.id}`}
                data-cursor-hover
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent active:text-accent"
              >
                Next
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            <CommentsSection initialComments={blogComments} totalCount={totalComments} />
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Search */}
            <Reveal animation="fadeInUp">
              <h4 className="mb-4 font-display text-lg font-semibold text-primary">
                Search here
                <span className="mt-2 block h-[2px] w-8 bg-accent" />
              </h4>
              <form action="/blogs" className="group flex items-center gap-3 rounded-full border border-border bg-background-soft px-5 py-3 transition-colors duration-300 focus-within:border-accent">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" aria-label="Search" data-cursor-hover>
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-focus-within:text-accent" />
                </button>
              </form>
            </Reveal>

            {/* Recent posts */}
            <Reveal animation="fadeInUp" delay={0.1}>
              <h4 className="mb-5 font-display text-lg font-semibold text-primary">
                Recent Post
                <span className="mt-2 block h-[2px] w-8 bg-accent" />
              </h4>
              <div className="flex flex-col gap-4">
                {recentPosts.map((p) => (
                  <Link key={p.id} href={`/blogs/${p.id}`} data-cursor-hover className="group flex items-center gap-4">
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-110 group-active:scale-110" />
                    </span>
                    <span>
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-accent group-active:text-accent">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {p.month} {p.date}
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
                {blogCategories.map((cat) => (
                  <div
                    key={cat.name}
                    data-cursor-hover
                    className="flex items-center justify-between rounded-xl border border-border px-5 py-3 text-sm font-medium text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground">({cat.count})</span>
                  </div>
                ))}
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
                  <span
                    key={tag}
                    data-cursor-hover
                    className="rounded-full border border-border px-4 py-2 text-xs font-medium text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                  >
                    {tag}
                  </span>
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
                <span
                  aria-hidden
                  className="shape-zoominout absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20"
                />
                <h4 className="relative font-display text-xl font-semibold leading-tight">
                  Need help?
                  <br />
                  Feel free contact us
                </h4>
                <p className="relative mt-3 text-sm text-white/70">
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
            </Reveal>
          </aside>
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