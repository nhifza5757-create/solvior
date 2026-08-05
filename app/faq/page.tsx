"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Plus, Minus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const HERO_BG = "/images/project/pheader-bg.webp";

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "How do consultants add value to a business?",
    answer:
      "Consultants bring an objective, outside perspective backed by cross-industry experience, helping you spot inefficiencies, validate strategy and move faster than you could alone. You might need a consultant if you're facing specific challenges, such as stagnating growth, operational inefficiencies, strategic issues, or if you lack expertise in certain areas. Consultants can also help if you need an objective perspective on your business businesses ever changing marketplace.",
  },
  {
    id: 2,
    question: "How do I know if my business needs a consultant?",
    answer:
      "If you're facing stagnating growth, operational inefficiencies, or strategic decisions you lack in-house expertise for, a consultant can provide the structured guidance to move forward with confidence. Consultants can also help if you need an objective perspective on your business businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic.",
  },
  {
    id: 3,
    question: "How do business consultants charge for their services?",
    answer:
      "Pricing typically depends on project scope — common models include hourly rates, fixed project fees, or ongoing monthly retainers based on the depth of engagement required. Consultants can also help if you need an objective perspective on your business businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic.",
  },
  {
    id: 4,
    question: "Can a business consultant guarantee results?",
    answer:
      "No reputable consultant guarantees specific outcomes, but a strong track record, clear KPIs and a data-driven approach significantly improve the odds of achieving your goals. Consultants can also help if you need an objective perspective on your business businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic.",
  },
  {
    id: 5,
    question: "How can I measure the success of a consulting engagement?",
    answer:
      "Success is measured against the KPIs agreed at the start of the engagement — typically a mix of financial impact, operational efficiency gains, and progress toward the strategic objectives you defined together. Consultants can also help if you need an objective perspective on your business businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic.",
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1); // First question open by default
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Search Execution
  const handleSearch = () => {
    if (inputRef.current) {
      setSearchQuery(inputRef.current.value);
    }
  };

  // Handle Enter Key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Filter FAQs based on search
  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
    {/* HERO BANNER */}
<section className="relative -mt-[104px] flex min-h-[500px] sm:h-[550px] items-center justify-center overflow-hidden pt-[104px]">
  <Image
    src={HERO_BG}
    alt="FAQ background"
    fill
    priority
    className="animate-hero-zoom object-cover object-center md:object-center"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-[#0a1426]/65" />

  {/* Content */}
  <div className="relative z-10 flex w-full items-center justify-center px-5 sm:px-6">
    <div className="max-w-4xl text-center text-white">

      <Reveal animation="fadeInUp">
        <h1 className="font-display text-[34px] font-bold leading-tight sm:text-5xl lg:text-6xl">
          FAQ
        </h1>
      </Reveal>

      <Reveal animation="fadeInUp" delay={0.15}>
        <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs text-white backdrop-blur-md sm:text-sm">

          <Link
            href="/"
            className="transition duration-300 hover:text-[#0075ff]"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-white/80">
            FAQ
          </span>

        </div>
      </Reveal>

    </div>
  </div>
</section>
      {/* FAQ SECTION */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          
          {/* Search Header */}
          <Reveal animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1426] mb-6">
              Hi, how we <span className="text-[#0075ff]">support you?</span>
            </h2>
            
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-0">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a question"
                  onKeyDown={handleKeyDown}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#0075ff] transition-colors"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-[#0075ff] text-white px-8 py-3 text-sm font-semibold hover:bg-blue-700 active:bg-blue-700 transition-colors sm:w-auto w-full mt-2 sm:mt-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </Reveal>

          <div className="h-px bg-gray-200 w-full max-w-6xl mx-auto mb-12" />

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Left Column - Tagline */}
            <Reveal animation="fadeInUp" className="flex flex-col justify-center lg:pl-4">
              <h3 className="text-4xl sm:text-5xl font-bold text-[#0a1426] leading-tight mb-4">
                No matter the strategy, we've got it handled.
              </h3>
            </Reveal>

            {/* Right Column - Accordion */}
            <div className="flex flex-col gap-3">
              {filteredFaqs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No questions found matching your search.</p>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openId === faq.id;
                  
                  return (
                    <Reveal key={faq.id} animation="fadeInUp" delay={index * 0.1}>
                      <div
                        className={`border border-gray-200 transition-all duration-300 ${
                          isOpen ? "bg-[#E8F2FF]" : "bg-white hover:border-[#0075ff]/30 active:border-[#0075ff]/30"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                        >
                          <span
                            className={`text-sm font-semibold ${
                              isOpen ? "text-[#0075ff]" : "text-[#0a1426] group-hover:text-[#0075ff] group-active:text-[#0075ff]"
                            }`}
                          >
                            {faq.question}
                          </span>
                          <span className="text-[#0a1426]">
                            {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          </span>
                        </button>
                        
                        {/* Answer Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })
              )}
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