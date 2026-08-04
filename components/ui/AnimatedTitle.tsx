"use client";

import { useInView } from "@/hooks/useInView";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

/**
 * Splits the heading into words and reveals them with a staggered
 * fade + slide-up, matching the reference site's `hero-title text-anim`
 * character/word reveal treatment. Words listed in `highlightWords`
 * (case-insensitive match) are rendered in an accent color.
 */
export default function AnimatedTitle({
  text,
  className = "",
  highlightWords = [],
  highlightClassName = "text-[#0075ff]",
}: AnimatedTitleProps) {
  const { ref, isInView } = useInView<HTMLHeadingElement>(0.4);
  const words = text.split(" ");
  const lowerHighlights = highlightWords.map((w) => w.toLowerCase());

  return (
    <h1 ref={ref} aria-label={text} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => {
        const isHighlighted = lowerHighlights.includes(
          word.replace(/[.,!?]/g, "").toLowerCase()
        );
        return (
          <span key={i} className="inline-block overflow-hidden pb-1 align-top">
            <span
              className={`inline-block transition-transform duration-700 ease-out ${
                isHighlighted ? highlightClassName : ""
              }`}
              style={{
                transitionDelay: `${i * 60}ms`,
                transform: isInView ? "translateY(0%)" : "translateY(110%)",
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        );
      })}
    </h1>
  );
}