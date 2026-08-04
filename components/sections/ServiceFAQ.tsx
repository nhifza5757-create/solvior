"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { serviceFaqs } from "@/data/site";

export default function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {serviceFaqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
              isOpen ? "border-accent/30 bg-background-soft" : "border-border bg-background"
            }`}
          >
            <button
              type="button"
              data-cursor-hover
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-semibold text-primary sm:text-base">
                {faq.question}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center  transition-colors duration-300 ${
                  isOpen ? "bg-accent text-white" : "bg-muted text-primary"
                }`}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
