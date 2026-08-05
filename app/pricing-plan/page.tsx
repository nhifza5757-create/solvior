"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

// Pricing Data
const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: 19,
    description: "Save 20% offer of consulting 93K clients.",
    features: [
      "In-Depth consultation",
      "Standard business",
      "Quick email support",
      "Monthly check-in",
      "Progress reviews",
      "Flexible support",
      "24/7 support",
    ],
    isRecommended: false,
  },
  {
    id: 2,
    name: "Business",
    price: 49,
    description: "Save 20% offer of consulting 93K clients.",
    features: [
      "In-Depth consultation",
      "Standard business",
      "Quick email support",
      "Monthly check-in",
      "Progress reviews",
      "Flexible support",
      "24/7 support",
    ],
    isRecommended: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 99,
    description: "Save 20% offer of consulting 93K clients.",
    features: [
      "In-Depth consultation",
      "Standard business",
      "Quick email support",
      "Monthly check-in",
      "Progress reviews",
      "Flexible support",
      "24/7 support",
    ],
    isRecommended: false,
  },
];

export default function PricingPlanPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  // Calculate price based on toggle
  const getPrice = (basePrice: number) => {
    return billingCycle === "yearly" ? basePrice * 2 : basePrice;
  };

  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative -mt-[104px] flex h-[360px] items-center justify-center overflow-hidden pt-[104px] sm:h-[550px]">
        <Image
          src={HERO_BG}
          alt="Pricing background"
          fill
          className="animate-hero-zoom object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1426]/70" aria-hidden />
        <div className="relative text-center text-white">
          <Reveal animation="fadeInUp">
            <h1 className="font-display text-4xl font-medium sm:text-5xl">Pricing plan</h1>
          </Reveal>
          <Reveal animation="fadeInUp" delay={0.15}>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm transition-colors duration-300 hover:border-[#0075ff]/60 active:border-[#0075ff]/60">
              <Link href="/" className="transition-colors duration-300 hover:text-[#0075ff] active:text-[#0075ff]">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/70">Pricing plan</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
            <Reveal animation="fadeInUp" className="lg:max-w-lg">
              <span className="text-[#0075ff] text-sm font-semibold tracking-widest uppercase mb-2 block">
                • Pricing plan •
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] leading-tight mb-4">
                Our Pricing Tiers
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace.
              </p>
              
              {/* Toggle Switch */}
              <div className="mt-6 inline-flex rounded-full border border-gray-200 p-1 bg-white">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-[#0a1426] text-white"
                      : "text-[#0a1426] hover:text-[#0075ff] active:text-[#0075ff]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingCycle === "yearly"
                      ? "bg-[#0a1426] text-white"
                      : "text-[#0a1426] hover:text-[#0075ff] active:text-[#0075ff]"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </Reveal>

            <Reveal animation="fadeInUp" delay={0.1} className="lg:max-w-lg">
              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                Our mission is to empowers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value through our strategic inset, innovative.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#0a1426]">
                  <Check className="h-4 w-4 text-[#0075ff]" /> Discover our expertise
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0a1426]">
                  <Check className="h-4 w-4 text-[#0075ff]" /> Journey and commitment to explained
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0a1426]">
                  <Check className="h-4 w-4 text-[#0075ff]" /> Meet our team and learn
                </div>
              </div>
            </Reveal>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => {
              const isRecommended = plan.isRecommended;
              const currentPrice = getPrice(plan.price);

              return (
                <Reveal key={plan.id} animation="fadeInUp" delay={index * 0.1}>
                  <div
                    className={`relative flex flex-col rounded-xl p-8 transition-all duration-300 hover:shadow-2xl active:shadow-2xl ${
                      isRecommended
                        ? "bg-[#0075ff] text-white shadow-xl scale-100 md:scale-105 md:z-10"
                        : "bg-[#F0F5FF] text-[#0a1426] hover:-translate-y-1 active:-translate-y-1"
                    }`}
                  >
                    {/* Recommended Badge */}
                    {isRecommended && (
                      <div className="absolute -top-3 right-6 bg-[#0a1426] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-t-lg rounded-b-lg shadow-md">
                        Recommended
                      </div>
                    )}

                    {/* Plan Name */}
                    <h3 className={`text-lg font-bold ${isRecommended ? "text-white" : "text-[#0a1426]"}`}>
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mt-2 flex items-baseline">
                      <span className={`text-4xl font-bold ${isRecommended ? "text-white" : "text-[#0a1426]"}`}>
                        ${currentPrice}
                      </span>
                      <span className={`ml-1 text-sm ${isRecommended ? "text-blue-100" : "text-gray-500"}`}>
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`mt-4 text-sm ${isRecommended ? "text-blue-100" : "text-gray-600"}`}>
                      {plan.description}
                    </p>

                    {/* Divider */}
                    <div className={`my-6 h-px ${isRecommended ? "bg-blue-400/40" : "bg-gray-300"}`} />

                    {/* Features List */}
                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className={`h-4 w-4 shrink-0 mt-1 ${isRecommended ? "text-white" : "text-[#0075ff]"}`} />
                          <span className={`text-sm ${isRecommended ? "text-blue-50" : "text-gray-600"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* 
                       BUTTON FIX:
                       White Cards: Navy -> Light Blue & Dark Text on Hover
                       Blue Center Card: White -> Navy on Hover
                    */}
                    <div className="mt-8">
                      {isRecommended ? (
                        // CENTER BLUE CARD BUTTON
                        <Link
                          href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                          data-cursor-hover
                          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white py-3 pl-4 pr-6 text-sm font-semibold text-[#0a1426] transition-all duration-300 hover:bg-[#0a1426] active:bg-[#0a1426] hover:text-white active:text-white"
                        >
                          <span className="mr-2">Choose package</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                        </Link>
                      ) : (
                        // WHITE CARDS BUTTON (FIXED LIGHT BLUE HOVER)
                        <Link
                          href={`/contact?plan=${encodeURIComponent(plan.name)}`}
                          data-cursor-hover
                          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#0a1426] py-3 pl-4 pr-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#E6F2FF] active:bg-[#E6F2FF] hover:text-[#0a1426] active:text-[#0a1426]"
                        >
                          <span className="mr-2">Choose package</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-active:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
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