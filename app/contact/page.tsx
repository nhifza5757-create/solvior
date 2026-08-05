"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Navigation,
  Check,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

const contactCards = [
  {
    icon: Mail,
    title: "Email us",
    lines: ["solvior@gmail.com", "support@gmail.com"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["+526-8214-5622", "+226-3565-2552"],
  },
  {
    icon: MapPin,
    title: "Our Location",
    lines: ["993 Renner Burg, West", "Rond, MT 94251-030"],
    accent: true,
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    lines: ["livechat@solvior.com"],
    link: { label: "Need help?", href: "/contact" },
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`New inquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div>
      {/* Hero banner */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[500px]">
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
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Contact</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-accent/60 active:border-accent/60">
              <Link href="/" className="transition-colors duration-300 hover:text-accent active:text-accent">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Contact</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <Reveal animation="fadeInUp" className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Contact us
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl">
              Our contact information
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 divide-y divide-border border border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {contactCards.map((card, i) => (
              <Reveal
                key={card.title}
                animation="fadeInUp"
                delay={i * 0.15}
                className="group relative px-8 py-12 text-center transition-shadow duration-300 hover:z-10 active:z-10 hover:shadow-xl active:shadow-xl"
              >
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 transition-all duration-300 group-hover:scale-110 group-active:scale-110 group-hover:bg-accent group-active:bg-accent">
                  <card.icon className="h-8 w-8 text-accent transition-colors duration-300 group-hover:text-white group-active:text-white" />
                  {card.accent && (
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-transparent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent transition-colors duration-300 group-hover:bg-white group-active:bg-white" />
                    </span>
                  )}
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-primary">
                  {card.title}
                </h3>
                <div className="mt-4 space-y-1">
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
                {card.link && (
                  <Link
                    href={card.link.href}
                    className="mt-1 inline-block text-sm font-semibold text-accent hover:underline active:underline"
                  >
                    {card.link.label}
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-20 lg:pb-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 border border-border lg:grid-cols-2">
            {/* Form */}
            <Reveal animation="fadeInLeft" className="p-8 sm:p-10 lg:p-14">
              <h2 className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">
                Feel free to <span className="text-accent">get in touch</span> or
                visit our location.
              </h2>

              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                  <div className="group relative border-b border-border pb-3 transition-colors duration-300 hover:border-primary-dark active:border-primary-dark focus-within:border-accent">
                    <label className="block text-sm text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                      Full name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-focus-within:w-full"
                    />
                  </div>
                  <div className="group relative border-b border-border pb-3 transition-colors duration-300 focus-within:border-accent">
                    <label className="block text-sm text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                      Email address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-focus-within:w-full"
                    />
                  </div>
                  <div className="group relative border-b border-border pb-3 transition-colors duration-300 focus-within:border-accent">
                    <label className="block text-sm text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                      Phone number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-focus-within:w-full"
                    />
                  </div>
                  <div className="group relative border-b border-border pb-3 transition-colors duration-300 focus-within:border-accent">
                    <label className="block text-sm text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                      Choose a option
                    </label>
                    <div className="relative mt-2">
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full cursor-pointer appearance-none bg-transparent text-sm text-primary focus:outline-none"
                      >
                        <option value="">Chose a option</option>
                        <option>IT consulting</option>
                        <option>Market research</option>
                        <option>Business process</option>
                        <option>Business consultancy</option>
                        <option>Digital marketing</option>
                        <option>Branding design</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-0 top-0 h-4 w-4 text-muted-foreground transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-accent" />
                    </div>
                    <span
                      aria-hidden
                      className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-focus-within:w-full"
                    />
                  </div>
                </div>

                <div className="group relative border-b border-border pb-3 transition-colors duration-300 focus-within:border-accent">
                  <label className="block text-sm text-muted-foreground transition-colors duration-300 group-focus-within:text-accent">
                    Type message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={2}
                    required
                    className="mt-2 w-full resize-none bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-focus-within:w-full"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    data-cursor-hover
                    className="group relative inline-flex items-center overflow-hidden rounded-full bg-primary-dark py-2 pl-3 pr-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:-translate-y-0.5 hover:shadow-lg active:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-3 z-0 my-auto h-9 w-9 rounded-full bg-accent transition-all duration-500 ease-out group-hover:w-[calc(100%-24px)] group-active:w-[calc(100%-24px)]"
                    />
                    <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-transform duration-500 group-hover:translate-x-1 group-active:translate-x-1 group-hover:-rotate-45 group-active:-rotate-45">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="relative z-10 ml-3">Send message</span>
                  </button>

                  {submitted && (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                      <Check className="h-4 w-4" /> Opening your email client...
                    </span>
                  )}
                </div>
              </form>
            </Reveal>

            {/* Map */}
            <Reveal animation="fadeInRight" className="relative min-h-[420px] lg:min-h-full">
              <iframe
                title="Our location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96840.74259815917!2d-74.21035326499913!3d40.66794886378488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1742025261462!5m2!1sen!2sbd"
                className="absolute inset-0 h-full w-full grayscale transition-all duration-500 hover:grayscale-0 active:grayscale-0"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-4 top-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl active:shadow-2xl">
                <div>
                  <p className="text-sm font-semibold text-primary">New York</p>
                  <p className="text-xs text-muted-foreground">New York, NY, USA</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Google Maps"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 hover:border-accent active:border-accent hover:bg-accent active:bg-accent hover:text-white active:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
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