import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, LayoutGrid, Zap, Award, Sparkles } from "lucide-react";
import { serviceHighlights, serviceFeatures } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import ServiceFAQ from "@/components/sections/ServiceFAQ";
import { PlayVideoButton } from "@/components/ui/MediaInteractions";

const HERO_BG = "/images/project/pheader-bg.webp";
const MAIN_IMAGE = "/images/project/h2-project-1.webp";
const CHECKLIST_IMAGE_1 = "/images/project/h1-project-2.webp";
const CHECKLIST_IMAGE_2 = "/images/project/h1-project-4.webp";
const VIDEO_BG = "/images/hero/h4-hero.webp";
const NEED_HELP_BG = "/images/widget-cta.webp";

const FEATURE_ICONS = [Zap, Award, Sparkles];

interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string | null;
  description: string;
  image: string | null;
}

async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getAllServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
  ]);

  if (!service) notFound();

  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const prevService = allServices[(currentIndex - 1 + allServices.length) % allServices.length];
  const nextService = allServices[(currentIndex + 1) % allServices.length];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">
        <Image src={HERO_BG} alt="" fill priority className="object-cover object-center md:object-center" />
        <div className="absolute inset-0 bg-primary-dark/65" />
        <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">
          <div className="text-center text-white max-w-4xl">
            <Reveal animation="fadeInUp">
              <h1 className="font-display text-[34px] leading-tight font-bold sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </Reveal>
            <Reveal animation="fadeInUp" delay={0.15}>
              <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">
                <Link href="/" className="transition hover:text-accent">Home</Link>
                <span>/</span>
                <Link href="/services" className="hidden sm:inline transition hover:text-accent">Services</Link>
                <span className="hidden sm:inline">/</span>
                <span className="text-white/80">{service.title}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div>
            <Reveal animation="fadeInUp" className="relative aspect-[16/10] overflow-hidden">
              <Image src={service.image || MAIN_IMAGE} alt={service.title} fill className="object-cover" priority />
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1}>
              <h2 className="mt-8 font-display text-2xl font-medium leading-snug text-primary sm:text-3xl">
                {service.title} in the comprehensive process of formulating goals
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our service guides you through the entire strategic process, from initial goal
                formulation to precise execution. We start with a thorough assessment of your
                current position and market landscape, then help define clear, actionable
                objectives aligned with your vision. Our approach includes detailed action plans,
                measurable KPIs, and hands-on support to ensure seamless execution.
              </p>
              <p className="mt-4 text-muted-foreground">
                {service.description} We begin with an in-depth analysis of your business and
                market to identify opportunities and challenges, then work with you to define
                clear, actionable objectives and a detailed roadmap for delivery.
              </p>
            </Reveal>

            {/* Service overview */}
            <Reveal animation="fadeInUp" delay={0.15}>
              <h3 className="mt-10 font-display text-xl font-medium text-primary">Service overview</h3>
              <p className="mt-4 text-muted-foreground">
                Our mission is to empower businesses of every size to thrive in an ever-changing
                marketplace. We are committed to delivering exceptional value through strategic
                insight and innovative approaches.
              </p>
            </Reveal>

            {/* Checklist grid */}
            <Reveal animation="fadeInUp" delay={0.2} className="mt-6 grid grid-cols-1 border border-border sm:grid-cols-2">
              {serviceHighlights.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 p-5 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : ""} border-border`}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-primary">{item.title}</span>
                </div>
              ))}
            </Reveal>

            {/* Two images row */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal animation="fadeInUp" delay={0.1} className="relative aspect-[4/3] overflow-hidden">
                <Image src={CHECKLIST_IMAGE_1} alt="" fill className="object-cover" />
              </Reveal>
              <Reveal animation="fadeInUp" delay={0.2} className="relative aspect-[4/3] overflow-hidden">
                <Image src={CHECKLIST_IMAGE_2} alt="" fill className="object-cover" />
              </Reveal>
            </div>

            {/* Key features */}
            <Reveal animation="fadeInUp" delay={0.1}>
              <h3 className="mt-10 font-display text-xl font-medium text-primary">Kye features</h3>
              <p className="mt-4 text-muted-foreground">
                Our service guides you through the entire strategic planning process, from initial
                goal formulation to precise execution — starting with a thorough assessment of
                your current position and market landscape, then defining clear, actionable
                objectives aligned with your vision.
              </p>
              <p className="mt-4 text-muted-foreground">
                From there, we work with you to define clear, actionable objectives and develop a
                detailed roadmap covering resourcing, timelines and measurable outcomes.
              </p>
            </Reveal>

            {/* Feature cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {serviceFeatures.map((feature, i) => {
                const Icon = FEATURE_ICONS[i] ?? Zap;
                return (
                  <Reveal
                    key={feature.title}
                    animation="fadeInUp"
                    delay={i * 0.1}
                    className="bg-background-soft p-6 transition-colors duration-300 hover:bg-accent active:bg-accent hover:text-white active:text-white"
                  >
                    <span className="group flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="mt-5 font-display text-base font-semibold text-primary transition-colors duration-300 group-hover:text-white group-active:text-white">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300">
                      {feature.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            {/* Video block */}
            <div className="group relative mt-10 aspect-[16/9] overflow-hidden">
              <Image src={VIDEO_BG} alt="" fill className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105" />
              <div className="absolute inset-0 bg-primary-dark/30" />
              <PlayVideoButton />
            </div>

            {/* FAQ */}
            <h3 className="mt-10 font-display text-xl font-medium text-primary">General questions</h3>
            <ServiceFAQ />

            {/* Prev / Next */}
            <div className="mt-12 flex items-center justify-between  border-border px-6 py-5">
              <Link href={`/services/${prevService.slug}`} data-cursor-hover className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent active:text-accent">
                <span className="flex h-9 w-9 items-center justify-center border border-border">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Previous
              </Link>
              <Link href="/services" aria-label="All services" data-cursor-hover className="flex h-9 w-9 items-center justify-center  bg-muted text-primary hover:bg-accent active:bg-accent hover:text-white active:text-white">
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link href={`/services/${nextService.slug}`} data-cursor-hover className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent active:text-accent">
                Next
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Reveal animation="fadeInUp">
              <h4 className="font-display text-lg font-semibold text-primary">Related service</h4>
              <span className="mt-2 block h-0.5 w-8 bg-accent" />
              <div className="mt-6 flex flex-col gap-3">
                {allServices.map((s) => {
                  const isActive = s.slug === service.slug;
                  return (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      data-cursor-hover
                      className={`group flex items-center justify-between  px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                        isActive ? "bg-accent text-white" : "bg-muted text-primary hover:bg-accent active:bg-accent hover:text-white active:text-white"
                      }`}
                    >
                      <span>{s.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
                    </Link>
                  );
                })}
              </div>
            </Reveal>

            {/* Need help widget */}
            <Reveal animation="fadeInUp" delay={0.15}>
              <div className="relative overflow-hidden bg-primary p-8 text-white">
                <Image src={NEED_HELP_BG} alt="" fill className="object-cover opacity-20" aria-hidden />
                <span aria-hidden className="absolute -bottom-6 -right-6 h-32 w-32 border-white/10" />
                <span aria-hidden className="absolute bottom-10 right-10 h-2 w-2  bg-accent" />
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="relative" aria-hidden>
                  <circle cx="20" cy="20" r="20" fill="#0075ff" />
                  <path d="M20 11l6.5 9-6.5 9-6.5-9L20 11Z" fill="white" />
                </svg>
                <div className="relative">
                  <h5 className="mt-6 font-display text-xl font-medium leading-tight">
                    Need help?
                    <br />
                    Feel free contact us
                  </h5>
                  <p className="mt-3 text-sm text-white/70">
                    Our mission is to empowers businesses off all size in an businesses.
                  </p>
                  <Link href="/contact" data-cursor-hover className="group/btn relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-6 text-sm font-semibold text-primary">
                    <span aria-hidden className="absolute inset-y-0 left-3 z-0 my-auto h-7 w-7 rounded-full bg-accent transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]" />
                    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center text-white">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                    <span className="relative z-10 ml-3 whitespace-nowrap transition group-hover/btn:text-white">Get in touch</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-accent py-16">
        <span aria-hidden className="shape-zoominout absolute -left-10 top-1/1 h-40 w-40 -translate-y-1/2 border-white/20" />
        <span aria-hidden className="shape-move absolute -right-10 top-1/2 h-56 w-56 -translate-y-1/2  border-white/20" />
        <Reveal animation="fadeInUp" className="container-custom relative flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">Get consultant now!</h2>
          <Link href="/contact" data-cursor-hover className="group relative inline-flex shrink-0 items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-7 text-sm font-semibold text-primary-dark transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl">
            <span aria-hidden className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-primary-dark transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]" />
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="relative z-10 ml-3 transition-colors duration-300 group-hover:text-white group-active:text-white">Lets talk now</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}