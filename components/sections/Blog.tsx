import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

export default function Blog() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <Reveal animation="fadeInUp" className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow">Latest news</span>
            <h2 className="mt-4 font-display text-3xl font-medium text-primary sm:text-4xl">
              Tips and tricks for success
            </h2>
          </div>
          <Link
            href="/blogs"
            data-cursor-hover
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary py-2 pl-3 pr-7 text-sm font-semibold text-white"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
            />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3">More blog</span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.id} animation="fadeInUp" delay={i * 0.1} as="div">
              <Link
                href={`/blogs/${post.id}`}
                data-cursor-hover
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                {/* Background image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105"
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Date badge — blurry glass style */}
                <div className="absolute left-5 top-5 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-center leading-tight text-white backdrop-blur-md">
                  <span className="block text-sm font-bold">{post.date}</span>
                  <span className="block text-[10px] font-medium tracking-wide text-white/80">
                    {post.month}
                  </span>
                </div>

                {/* Text content overlaid at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {/* Category + comments as pill badges */}
                  <div className="mb-3 flex items-center gap-2 text-xs text-white">
                    <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
                      {post.category}
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
                      03 Comments
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                    {post.title}
                  </h3>

                  {/* Read more — hidden by default, slides in on hover */}
                  <span className="mt-3 flex max-h-0 items-center gap-2 overflow-hidden text-sm font-semibold text-white opacity-0 transition-all duration-500 ease-out group-hover:mt-4 group-active:mt-4 group-hover:max-h-8 group-active:max-h-8 group-hover:opacity-100 group-active:opacity-100">
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}