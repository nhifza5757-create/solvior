import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, LayoutGrid } from "lucide-react";
import { projects } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { PlayVideoButton, ShareButtons } from "@/components/ui/MediaInteractions";

const HERO_BG = "/images/project/pheader-bg.webp";
const WIDGET_CTA_IMAGE = "/images/widget-cta.webp";

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  const project = projects.find((p) => p.id === projectId);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
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
            <h1 className="font-display text-4xl font-medium sm:text-5xl">{project.title}</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60 active:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent active:text-accent">Home</Link>
              <span>/</span>
              <Link href="/portfolios" className="transition-colors duration-300 hover:text-accent active:text-accent">Portfolios</Link>
              <span>/</span>
              <span className="text-white/70">{project.title}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="container-custom grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div>
            <div className="relative aspect-[16/10] overflow-hidden ">
              <Image src={project.image} alt={project.title} fill className="object-cover" priority />
            </div>

            <div className="mt-6 flex gap-2">
              <span className="rounded-full bg-[#0075ff] px-4 py-1.5 text-xs font-semibold text-white">
                {project.tags[0]}
              </span>
              <span className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-primary">
                {project.tags[1]}
              </span>
            </div>

            <h2 className="mt-6 font-display text-2xl font-medium text-primary sm:text-3xl">
              Transforming operational efficiency with {project.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{project.description}</p>

            <h3 className="mt-10 font-display text-xl font-medium text-primary">Projects overview</h3>
            <p className="mt-4 text-muted-foreground">{project.overview}</p>

            <ul className="mt-6 space-y-3">
              {project.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0075ff]/10 text-[#0075ff]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-primary">{item}</span>
                </li>
              ))}
            </ul>

            <div className="group relative mt-10 aspect-[16/10] overflow-hidden ">
              <Image
                src={project.secondaryImage}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105 group-active:scale-105"
              />
              <PlayVideoButton />
            </div>

            <h3 className="mt-10 font-display text-xl font-medium text-primary">Final result</h3>
            <p className="mt-4 text-muted-foreground">{project.finalResult}</p>

            {/* Prev / Next */}
            <div className="mt-12 flex items-center justify-between rounded-none border border-border px-6 py-5">
              <Link
                href={`/portfolios/${prevProject.id}`}
                data-cursor-hover
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent active:text-accent"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Previous
              </Link>
              <Link
                href="/portfolios"
                aria-label="All portfolios"
                data-cursor-hover
                className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white"
              >
                <LayoutGrid className="h-4 w-4" />
              </Link>
              <Link
                href={`/portfolios/${nextProject.id}`}
                data-cursor-hover
                className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-accent active:text-accent"
              >
                Next
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-none border border-border p-6">
              <h4 className="font-display text-lg font-semibold text-primary">Portfolio Information</h4>
              <span className="mt-2 block h-0.5 w-8 bg-[#0075ff]" />

              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["Clients", project.client],
                  ["Portfolio", project.portfolioType],
                  ["Service", project.service],
                  ["Category", project.category],
                  ["Date", project.date],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-semibold text-primary">{value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Share</dt>
                  <dd>
                    <ShareButtons title={project.title} />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative overflow-hidden bg-primary p-8 text-white">
              <Image src={WIDGET_CTA_IMAGE} alt="" fill className="object-cover opacity-40" aria-hidden />
              <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0075ff]">
                  <Check className="h-5 w-5" />
                </span>
                <h5 className="mt-6 font-display text-xl font-medium leading-tight">
                  Need help?
                  <br />
                  Feel free contact us
                </h5>
                <p className="mt-3 text-sm text-white/70">
                  Our mission is to empower businesses of all sizes.
                </p>
                <Link
                  href="/contact"
                  data-cursor-hover
                  className="group/btn relative mt-6 inline-flex items-center overflow-hidden rounded-full bg-white py-2 pl-3 pr-6 text-sm font-semibold text-primary"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-3 z-0 my-auto h-7 w-7 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover/btn:w-[calc(100%-24px)]"
                  />
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center text-white">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="relative z-10 ml-3 whitespace-nowrap transition group-hover/btn:text-white">
                    Get in touch
                  </span>
                </Link>
              </div>
            </div>
          </div>
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