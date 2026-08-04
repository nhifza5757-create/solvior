import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  MessageSquare,
  Check,
  Quote,
  Play,
  Facebook,
  Twitter,
  Linkedin,
  LayoutGrid,
  Search,
  Reply,
} from "lucide-react";
import { blogPosts, blogCategories, blogTags, blogComments } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

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
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[500px]">
        <Image src={HERO_BG} alt="" fill className="animate-hero-zoom object-cover" priority />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Blog Details</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent">
                Home
              </Link>
              <span>/</span>
              <Link href="/blogs" className="transition-colors duration-300 hover:text-accent">
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
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-dark/20" aria-hidden />
              <button
                type="button"
                aria-label="Play video"
                data-cursor-hover
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary transition hover:bg-white"
              >
                <Play className="h-5 w-5 fill-primary" />
              </button>
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
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-primary">Share:</span>
                {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Share"
                    data-cursor-hover
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary transition hover:bg-accent hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Prev / Next */}
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-border px-6 py-5">
              <Link
                href="/blogs"
                aria-label="All blogs"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary hover:bg-accent hover:text-white"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link
                href={`/blogs/${nextPost.id}`}
                data-cursor-hover
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent"
              >
                Next
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            {/* Comments */}
            <h3 className="mt-14 font-display text-xl font-medium text-primary">
              Comments ({totalComments})
            </h3>
            <div className="mt-6 space-y-6">
              {blogComments.map((comment) => (
                <div key={comment.id} className="space-y-6">
                  <div className="rounded-2xl border border-border p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                          <Image src={comment.avatar} alt={comment.name} fill className="object-cover" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-primary">
                            {comment.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">{comment.date}</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        data-cursor-hover
                        className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent"
                      >
                        <Reply className="h-3.5 w-3.5" />
                        Reply
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{comment.text}</p>
                  </div>

                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="ml-6 rounded-2xl border border-border p-6 sm:ml-14">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                            <Image src={reply.avatar} alt={reply.name} fill className="object-cover" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-primary">
                              {reply.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">{reply.date}</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          data-cursor-hover
                          className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent"
                        >
                          <Reply className="h-3.5 w-3.5" />
                          Reply
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{reply.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Leave a reply */}
            <h3 className="mt-14 font-display text-xl font-medium text-primary">Leave a reply</h3>
            <form className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Enter email"
                  className="rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
                />
              </div>
              <input
                type="text"
                placeholder="Your website"
                className="w-full rounded-full border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
              />
              <textarea
                placeholder="Enter your comments"
                rows={5}
                className="w-full rounded-2xl border border-border bg-background-soft px-5 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground focus:border-accent"
              />
              <button
                type="submit"
                data-cursor-hover
                className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)]"
                />
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="relative z-10 ml-3">Leave comment</span>
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Search */}
            <Reveal animation="fadeInUp">
              <h4 className="mb-4 font-display text-lg font-semibold text-primary">
                Search here
                <span className="mt-2 block h-[2px] w-8 bg-accent" />
              </h4>
              <div className="group flex items-center gap-3 rounded-full border border-border bg-background-soft px-5 py-3 transition-colors duration-300 focus-within:border-accent">
                <input
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
                {recentPosts.map((p) => (
                  <Link key={p.id} href={`/blogs/${p.id}`} data-cursor-hover className="group flex items-center gap-4">
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
                    </span>
                    <span>
                      <span className="line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors duration-300 group-hover:text-accent">
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
                    className="flex items-center justify-between rounded-xl border border-border px-5 py-3 text-sm font-medium text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
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
                    className="rounded-full border border-border px-4 py-2 text-xs font-medium text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Contact widget */}
            <Reveal animation="fadeInUp" delay={0.25}>
              <div className="relative overflow-hidden bg-primary p-8 text-white">
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