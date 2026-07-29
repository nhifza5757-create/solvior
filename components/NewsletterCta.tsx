"use client";

import { ArrowIcon } from "./Icons";

export function NewsletterCta() {
  return (
    <section id="contact" className="max-w-[1240px] mx-auto px-6 lg:px-8 pt-4">
      <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-blue via-[#123a99] to-navy px-8 sm:px-14 py-16 text-center">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Subscribe to our newsletter
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <label htmlFor="email" className="sr-only">Work email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter email"
              className="flex-1 rounded-full bg-white/95 px-6 py-4 text-ink placeholder:text-slate focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-7 py-4 font-semibold hover:bg-ink transition-colors"
            >
              Subscribe
              <ArrowIcon className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
