"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const HERO_IMAGE = "/images/hero/h4-hero.webp";
const HERO_SIDE_IMAGE = "/images/hero/h4-hero-side.webp";
const HERO_STAT_BG = "/images/hero/h4-hero-stat-bg.jpg";

const CLIENT_AVATARS = [
  "/images/about/thumb-1.webp",
  "/images/about/thumb-2.webp",
  "/images/about/thumb-3.webp",
  "/images/about/thumb-4.webp",
];

function Stat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { value, ref } = useCountUp({ end, duration: 1200 });
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
        {value}
        {suffix}
      </span>
      <p className="mt-1 text-xs text-white/60">{label}</p>
    </div>
  );
}

function ExploreBadge() {
  const letters = "EXPLORE MORE • EXPLORE MORE •".split("");
  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <div className="absolute inset-0 animate-spin-slow">
        {letters.map((char, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 text-[8px] font-medium tracking-wide text-white/60"
            style={{
              transform: `rotate(${(360 / letters.length) * i}deg) translateY(-30px)`,
              transformOrigin: "0 0",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative -mt-[140px] overflow-hidden bg-muted pt-[140px] lg:-mt-[150px] lg:pt-[150px]">
      <div className="absolute inset-0 bg-muted" aria-hidden />

      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 hidden h-32 w-32 opacity-40 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-accent) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="container-custom relative mx-auto grid max-w-[1440px] grid-cols-1 gap-1 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-1 lg:py-14">
        <div className="relative flex flex-col justify-center py-6 lg:py-10">
          <AnimatedTitle
            text="Tailored consulting for the modern business"
             highlightWords={["consulting"]}
            className="font-display text-4xl font-medium leading-[1.1] text-primary sm:text-5xl lg:text-6xl"
          />

          <Reveal animation="fadeInUp" delay={0.1}>
            <p className="mt-6 max-w-md text-muted-foreground">
              Transform your business with expert consultancy services — our
              team of seasoned consultants delivers unparalleled results.
            </p>
          </Reveal>

          <Reveal animation="fadeInUp" delay={0.3} className="relative mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
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
              <span className="relative z-10 ml-3">Free consultation</span>
            </Link>
            <div className="flex -space-x-3">
              {CLIENT_AVATARS.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Client ${i + 1}`}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover grayscale"
                />
              ))}
            </div>
            <svg aria-hidden viewBox="0 0 40 46" className="absolute -right-4 top-full mt-3 hidden h-8 w-7 text-accent/40 sm:block">
              <path
                d="M20 1 L38 12 V34 L20 45 L2 34 V12 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Reveal>

          <Reveal
            animation="fadeInUp"
            delay={0.4}
            className="relative ml-auto mt-14 w-fit overflow-hidden rounded-2xl rounded-tr-none bg-primary"
          >
            <Image
              src={HERO_STAT_BG}
              alt=""
              fill
              className="object-cover opacity-25"
              aria-hidden
            />
            <div className="relative flex items-center gap-8 px-7 py-4">
              <Stat end={8.5} suffix="x" label="Faster growth" />
              <span className="h-19 w-2px bg-white/15" />
              <Stat end={20} suffix="M" label="Reach worldwide" />
              <span className="hidden sm:block">
                <ExploreBadge />
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal animation="fadeInRight" delay={0.3} className="relative hidden lg:block">
          {/* Background: building photo — bleeds all the way up behind the header pill to the
              very top of the viewport, and down to the hero section's true bottom edge, and to
              the viewport's right edge. */}
          <div className="absolute -right-[calc((100vw-100%)/2)] -bottom-10 left-[34%] -top-[140px] z-0 lg:-bottom-14 lg:-top-[150px]">
            <Image
              src={HERO_SIDE_IMAGE}
              alt="Modern office skyscraper"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/70" aria-hidden />
            <div className="absolute inset-0 bg-primary mix-blend-color" aria-hidden />
          </div>
          {/* Foreground: couple/tablet photo — overlaid on top, offset down-left so the
              background peeks out on the top, right, and bottom edges */}
          <div className="absolute left-0 bottom-[-1] top-3 z-10 h-[500px] w-[81%] shadow-2xl">
            <Image
              src={HERO_IMAGE}
              alt="Business consulting team reviewing data on a tablet"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div className="relative -mx-4 aspect-[16/10] sm:-mx-6 lg:hidden">
          <Image
            src={HERO_IMAGE}
            alt="Business consulting team"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}