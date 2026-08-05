"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

const HERO_BG = "/images/project/pheader-bg.webp";

// Helper for animated progress bars
function AnimatedSkillBar({ label, percentage }: { label: string; percentage: number }) {
  const { value, ref } = useCountUp({ end: percentage, duration: 2000, start: 0 });

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-semibold text-[#0a1426] mb-1">
        <span>{label}</span>
        <span ref={ref} className="bg-[#0075ff] text-white px-2 py-0.5 rounded text-xs">
          {Math.round(value)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-[#0075ff] rounded-full transition-all duration-100 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function TeamDetailsClient({ member }: { member: any }) {
  const [teamForm, setTeamForm] = useState({ name: "", email: "", phone: "", topic: "", message: "" });
  const [teamFormSent, setTeamFormSent] = useState(false);

  function handleTeamFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setTeamForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleTeamFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message for ${member?.name || "team member"}`);
    const body = encodeURIComponent(
      `Name: ${teamForm.name}\nEmail: ${teamForm.email}\nPhone: ${teamForm.phone}\nTopic: ${teamForm.topic}\n\nMessage:\n${teamForm.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setTeamFormSent(true);
    setTeamForm({ name: "", email: "", phone: "", topic: "", message: "" });
    setTimeout(() => setTeamFormSent(false), 5000);
  }

  return (
    <div>
     {/* Hero banner */}
<section className="relative -mt-[104px] flex min-h-[500px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
  <Image
    src={HERO_BG}
    alt="Team Details Background"
    fill
    priority
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-primary-dark/65" />

  <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">
    <div className="max-w-4xl text-center text-white">
      <Reveal animation="fadeInUp">
        <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
          Team Details
        </h1>
      </Reveal>

      <Reveal animation="fadeInUp" delay={0.15}>
        <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-accent"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/team"
            className="hidden transition-colors duration-300 hover:text-accent sm:inline"
          >
            Team
          </Link>

          <span className="hidden sm:inline">/</span>

          <span className="text-white/80">
            Team Details
          </span>
        </div>
      </Reveal>
    </div>
  </div>
</section>

      {/* MAIN DETAILS SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 relative">
            <Reveal animation="fadeInUp">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <Reveal animation="fadeInUp">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] mb-2">
                Hello, I am {member.name}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{member.role}</p>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Our mission is to empowers businesses size thrive businesses ev changing marketplace We are committed to the delivering exceptional value through strategic inset innovative approaches. Our consulting of our missing empower.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 p-4 rounded">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Email address</p>
                  <p className="font-medium text-[#0a1426] text-sm mt-1">{siteConfig.email}</p>
                </div>
                <div className="border border-gray-200 p-4 rounded">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Phone number</p>
                  <p className="font-medium text-[#0a1426] text-sm mt-1">{siteConfig.phone}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-10">
                <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" data-cursor-hover className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#0a1426] transition-colors hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" data-cursor-hover className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#0a1426] transition-colors hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" data-cursor-hover className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#0a1426] transition-colors hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-hover className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#0a1426] transition-colors hover:bg-[#0075ff] active:bg-[#0075ff] hover:text-white active:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1}>
              <h3 className="text-2xl font-bold text-[#0a1426] mb-4">Work experience</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Our mission is to empowers businesses size to thrive in ses ever changing marketplace We are committed to the delivering exceptionals the value thro strategic ins innovative approaches. Our consulting of our missing empowers businesses of all sizes Committed to the delivering exceptional in the values thro.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Our mission is to empowers businesses size to thrive in ses ever changing marketplace We are committed to the delivering exceptionals the value thro strategic ins innovative approaches. Our consulting of our missing empowers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-start gap-3 border border-gray-200 p-4 rounded">
                  <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">We believe that the human essential start any successful project.</p>
                </div>
                <div className="flex items-start gap-3 border border-gray-200 p-4 rounded">
                  <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">We believe that the human essential start any successful project.</p>
                </div>
                <div className="flex items-start gap-3 border border-gray-200 p-4 rounded">
                  <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">We believe that the human essential start any successful project.</p>
                </div>
                <div className="flex items-start gap-3 border border-gray-200 p-4 rounded">
                  <Check className="h-4 w-4 text-[#0075ff] shrink-0 mt-1" />
                  <p className="text-sm text-gray-600">We believe that the human essential start any successful project.</p>
                </div>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.2}>
              <h3 className="text-2xl font-bold text-[#0a1426] mb-4">Professional skills</h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Our mission is to empowers businesses size to thrive in ses ever changing marketplace We are committed to the delivering exceptionals the value thro strategic ins innovative approaches. Our consulting of our missing empowers.
              </p>

              <div className="space-y-2">
                <AnimatedSkillBar label="Business consultants" percentage={90} />
                <AnimatedSkillBar label="Client communication" percentage={82} />
                <AnimatedSkillBar label="Business strategy" percentage={86} />
                <AnimatedSkillBar label="Digital marketing" percentage={75} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 lg:py-28 bg-[#F0F5FF]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="bg-white shadow-sm rounded-none p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Reveal animation="fadeInUp">
                <span className="text-[#0075ff] text-sm font-semibold tracking-widest uppercase mb-2">
                  // Contact us
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0a1426] leading-tight mb-4">
                  Let's discuss further to get better results
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our mission is to empowers businesses off our all size too thrive in an businesses ever changing marketplaces. In today's dynamics business environment, the key to success lies.
                </p>
                <p className="flex items-center gap-2 text-[#0075ff] font-medium text-sm">
                  <span className="text-xl">💬</span> livechat@solvior.com
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal animation="fadeInUp" delay={0.1}>
                <form onSubmit={handleTeamFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input type="text" name="name" value={teamForm.name} onChange={handleTeamFormChange} required placeholder="Full name*" className="w-full bg-[#F8F9FA] border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  </div>
                  <div>
                    <input type="email" name="email" value={teamForm.email} onChange={handleTeamFormChange} required placeholder="Email address*" className="w-full bg-[#F8F9FA] border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  </div>
                  <div>
                    <input type="tel" name="phone" value={teamForm.phone} onChange={handleTeamFormChange} required placeholder="Phone number*" className="w-full bg-[#F8F9FA] border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#0075ff] transition-colors" />
                  </div>
                  <div>
                    <select name="topic" value={teamForm.topic} onChange={handleTeamFormChange} className="w-full bg-[#F8F9FA] border border-gray-200 rounded px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#0075ff] transition-colors">
                      <option value="">Choose a option</option>
                      <option>Consulting</option>
                      <option>Support</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <textarea name="message" value={teamForm.message} onChange={handleTeamFormChange} required placeholder="Type message" rows={4} className="w-full bg-[#F8F9FA] border border-gray-200 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#0075ff] transition-colors resize-none"></textarea>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <button type="submit" data-cursor-hover className="group relative inline-flex w-fit items-center overflow-hidden rounded-full bg-[#0a1426] py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-xl active:shadow-xl">
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-[#0075ff] transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
                      />
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="relative z-10 ml-3">Send message</span>
                    </button>
                    {teamFormSent && (
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[#0075ff]">
                        <Check className="h-4 w-4" /> Opening your email client...
                      </span>
                    )}
                  </div>
                </form>
              </Reveal>
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