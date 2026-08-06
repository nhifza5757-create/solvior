"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { features, team, testimonials, testimonialMainImage } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp"; // Import your custom hook

const featureIcons: Record<string, React.ReactNode> = {
  "01": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <rect x="3" y="3" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
      <rect x="15" y="15" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <path
        d="M20 2 36.3 11 36.3 29 20 38 3.7 29 3.7 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 13v3M20 24v3M13 20h3M24 20h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <circle cx="16" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="24" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8">
      <path
        d="M15 3 28 11.5 28 28.5 15 37 2 28.5 2 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M30 13 38 20 30 27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
const HERO_BG = "/images/project/pheader-bg.webp";

const COMPANY_LOGOS: { name: string; icon?: string; subtitle?: string; badge?: string }[] = [
  { name: "monceau", icon: "m" },
  { name: "tse", subtitle: "Energie de confiance" },
  { name: "coudac" },
  { name: "WEGLOT" },
  { name: "flomodia" },
  { name: "Influence", badge: "4You" },
];

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = testimonials[activeTestimonial] ?? testimonials[0];
  const [aboutVideoOpen, setAboutVideoOpen] = useState(false);

  function prevTestimonial() {
    setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length);
  }
  function nextTestimonial() {
    setActiveTestimonial((i) => (i + 1) % testimonials.length);
  }

  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
        <Image
          src={HERO_BG}
          alt="About background"
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1426]/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">About</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-[#0075ff]/60 active:border-[#0075ff]/60">
              <Link href="/" className="transition-colors duration-300 hover:text-[#0075ff] active:text-[#0075ff]">Home</Link>
              <span>/</span>
              <span className="text-white/70">About</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT COMPANY SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal animation="fadeInUp" className="flex flex-col">
            <span className="text-[#0075ff] text-sm font-semibold tracking-widest uppercase mb-3">
              • About our company •
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] leading-tight mb-6">
              Crafting success tailored solution for each & every challenges
            </h2>
          </Reveal>

          <Reveal animation="fadeInUp" delay={0.1} className="flex flex-col justify-center">
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to empowers businesses off all size to thrive in an businesses ever changing
              marketplace. We are committed to the delivering exceptional in the value through our strategic
              inset, innovative approaches. Our mission is to empower businesses of all sizes to thrive.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Committed to the delivering exceptional in the value through our strategic inset, innovative
              approaches empower.
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex w-fit items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
              />
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="relative z-10 ml-3">Learn more</span>
            </Link>
          </Reveal>
        </div>
{/* Features Grid */}
<div className="container mx-auto max-w-7xl px-4 mt-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {features.map((feature, index) => (
      <Reveal key={feature.id} animation="fadeInUp" delay={index * 0.1}>
        <div className="group relative overflow-hidden rounded-none border border-gray-100 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:border-[#0075ff]/40 active:border-[#0075ff]/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] origin-bottom scale-y-0 opacity-0 blur-2xl transition-all duration-500 ease-out group-hover:scale-y-100 group-active:scale-y-100 group-hover:opacity-60 group-active:opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 220% 100% at bottom, rgba(125,190,255,0.9) 0%, rgba(125,190,255,0.4) 40%, rgba(125,190,255,0.15) 65%, transparent 85%)",
            }}
          />
          <div className="relative bg-gradient-to-b from-white via-gray-50/40 to-gray-50 px-8 pb-12 pt-12">
            <div className="flex h-16 w-16 items-center justify-center border border-gray-200 bg-white">
              <span className="text-[#0a1426] transition group-hover:text-[#0075ff] group-active:text-[#0075ff]">
                {featureIcons[feature.id]}
              </span>
            </div>
            <h4 className="mt-10 text-lg font-bold text-[#0a1426]">{feature.title}</h4>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
</div>
      
      </section>

      {/* EVOLUTION & VIDEO SECTION */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-12 items-stretch">
          <Reveal animation="fadeInUp" className="bg-[#E7F2FF] p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden lg:w-[60%]">
            <div>
              <span className="inline-block bg-[#0075ff] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                ★ Our evolution
              </span>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                "Founded in 2002 by Burdee Ncolase en. our firm started with our great vision to bring
                innovative solutions of businesses facing unprecedented challenges. That began as a small
                consultings firm quickly evolved into a trusted partner for companies around the globe.
                Our journey into began with a simple idea thats offer unparalleled consulting services
                empower Our core values of integrity, innovation, and excellence guide everything we do
                leading the wave in consulting's."
              </p>
            </div>

            {/* ANIMATED STATS AREA */}
            <div className="flex gap-12 mt-8 pt-8 border-t border-[#0075ff]/20">
              <div>
                <StatNumber end={93} suffix="%" />
                <span className="text-gray-600 text-sm">Complete project</span>
              </div>
              <div>
                <StatNumber end={20} suffix="M" />
                <span className="text-gray-600 text-sm">Reach worldwide</span>
              </div>
              <div>
                <StatNumber end={8.5} suffix="x" decimals={1} />
                <span className="text-gray-600 text-sm">Faster growth</span>
              </div>
            </div>
          </Reveal>

          <Reveal animation="fadeInUp" delay={0.1} className="relative lg:w-[40%] h-[400px] lg:h-auto overflow-hidden group">
            <Image
              src="/images/project/h1-project-2.webp"
              alt="Our evolution video"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0a1426]/40 group-hover:bg-[#0a1426]/30 group-active:bg-[#0a1426]/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <button
                type="button"
                aria-label="Play video"
                data-cursor-hover
                onClick={() => setAboutVideoOpen(true)}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 hover:scale-110 active:scale-110 transition-transform duration-300"
              >
                <Play className="ml-1 h-6 w-6 fill-white" />
              </button>
              <span className="text-white/80 text-xs tracking-wider uppercase mb-1">Click for watch</span>
              <span className="text-xl font-bold">See our latest video</span>
            </div>
          </Reveal>
        </div>
      </section>

      {aboutVideoOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setAboutVideoOpen(false)}
        >
          <div className="relative aspect-video w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setAboutVideoOpen(false)}
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:bg-white/20"
            >
              ✕
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full rounded-xl"
            />
          </div>
        </div>
      )}

      {/* TEAM SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Reveal animation="fadeInUp">
              <span className="text-[#0075ff] text-sm font-semibold tracking-widest uppercase">
                • Meet our team •
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] mt-2">Expert team members</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Reveal key={member.id} animation="fadeInUp" delay={index * 0.1}>
                <div className="group relative overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1426] via-transparent to-transparent opacity-90" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white text-center">
                    <h4 className="text-xl font-bold">{member.name}</h4>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0075ff]" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
          </div>
        </div>
      </section>

      {/* SKILLS & EXPERIENCE SECTION WITH ANIMATED BARS */}
      <section className="relative py-24 bg-[#0a1426] text-white overflow-hidden">
        <Image
          src="/images/project/pheader-bg.webp"
          alt="Skills Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#0a1426]/70" />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10 flex flex-col lg:flex-row justify-end">
           <Reveal animation="fadeInUp" className="bg-white/10 backdrop-blur-md p-10 lg:p-14 rounded-lg border border-white/10 w-full lg:w-[500px]">
             <h2 className="text-3xl font-bold mb-4">Skill and experience</h2>
             <p className="text-white/70 text-sm leading-relaxed mb-8">
               In today's dynamic business environment, the key to success lies in strategic planning and operational
             </p>

             {/* ANIMATED SKILL BARS */}
             <div className="space-y-6">
               <AnimatedSkillBar label="Business consultants" percentage={90} />
               <AnimatedSkillBar label="Client communication" percentage={82} />
             </div>
           </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS SECTION WITH ANIMATED COUNTER */}
      <section className="py-20 lg:py-28 bg-[#F8F9FA]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Reveal animation="fadeInUp">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426]">Our clients testimonials</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side image with ANIMATED stats */}
            <Reveal animation="fadeInUp" className="relative h-[400px] lg:h-[500px] overflow-hidden shadow-xl">
              <Image
                src={testimonialMainImage || "/images/testimonial/h2-test-1.webp"}
                alt="Testimonial"
                fill
                className="object-cover"
              />
              
              {/* ANIMATED 3.8 K+ CARD */}
              <div className="absolute left-6 bottom-6 bg-[#0a1426]/80 backdrop-blur-sm p-5 text-white min-w-[140px]">
                <div className="flex items-end gap-1">
                  <StatNumber end={3.8} decimals={1} className="text-3xl font-bold" />
                  <span className="text-xl font-bold mb-1">K+</span>
                </div>
                <span className="text-xs text-white/70 mt-1 block">Happy clients all over world now.</span>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1} className="flex flex-col relative">
              <div className="absolute -top-10 -left-6 text-[#0075ff] opacity-20 text-8xl font-bold">“</div>
              <p className="text-gray-700 text-lg leading-relaxed relative z-10 mb-8">
                {testimonial?.quote || "Partnering with Solvior has been a transformative experience for our organization."}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                     <Image src={testimonial?.avatar || "/images/testimonial/h1-test-2.webp"} alt={testimonial?.author || "Author"} fill className="object-cover" />
                  </div>
                  <div>
                     <div className="flex text-[#0075ff] text-xs mb-0.5">★★★★★</div>
                     <h5 className="font-bold text-[#0a1426]">{testimonial?.author || "Natalie Harry"}</h5>
                     <p className="text-xs text-gray-500">{testimonial?.role || "Sr. Executive"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    data-cursor-hover
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white hover:border-[#0075ff] active:border-[#0075ff] transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    data-cursor-hover
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white hover:border-[#0075ff] active:border-[#0075ff] transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* JOIN 1000+ COMPANIES LOGO MARQUEE */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-6">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="whitespace-nowrap rounded-full bg-[#F0F4FF] px-6 py-2 text-sm font-medium text-[#0a1426]">
              Join the <span className="font-semibold text-[#0075ff]">1000+</span> companies benefiting from solvior
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div
            className="mt-10 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div className="animate-marquee flex w-max gap-6">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((logo, i) => (
                <span
                  key={`${logo.name}-${i}`}
                  className="flex h-20 min-w-[180px] items-center justify-center gap-2 bg-[#F5F7FA] px-8 text-lg font-semibold text-gray-800"
                >
                  {logo.icon && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1426] text-xs font-bold text-white">
                      {logo.icon}
                    </span>
                  )}
                  <span className="flex flex-col leading-tight">
                    <span>
                      {logo.name}
                      {logo.badge && (
                        <span className="ml-1 rounded-full border border-gray-300 px-2 py-0.5 text-[10px] font-medium text-gray-400">
                          {logo.badge}
                        </span>
                      )}
                    </span>
                    {logo.subtitle && (
                      <span className="text-[9px] font-normal uppercase tracking-wide text-gray-400">
                        {logo.subtitle}
                      </span>
                    )}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
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

// ------------------- HELPER COMPONENTS BELOW -------------------

// 1. Animated Numbers (Accepts custom className for responsiveness)
function StatNumber({ end, suffix = "", decimals = 0, className = "text-4xl font-bold text-[#0a1426]" }: { end: number; suffix?: string; decimals?: number; className?: string }) {
  const { value, ref } = useCountUp({ end, duration: 2000, start: 0 });
  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}

// 2. Animated Skill Bars
function AnimatedSkillBar({ label, percentage }: { label: string; percentage: number }) {
  const { value, ref } = useCountUp({ end: percentage, duration: 2000, start: 0 });

  return (
    <div>
      <div className="flex justify-between text-sm mb-1 font-semibold">
        <span>{label}</span>
        <span ref={ref} className="bg-[#0075ff] text-white px-2 py-0.5 rounded text-xs">
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-[#0075ff] rounded-full transition-all duration-100 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}