"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative">
        <Image
          src="/images/home-4/cta/h4-cta-bg.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="container-custom relative py-20 text-center lg:py-28">
          <Reveal animation="fadeInUp">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-medium text-white sm:text-4xl">
            Subscribe to our newsletter
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              data-cursor-hover
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white active:bg-white hover:text-primary-dark active:text-primary-dark"
            >
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-sm text-white/80">Thanks — you&apos;re subscribed!</p>
          )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
