"use client";

import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Animation = "fadeInUp" | "fadeInRight" | "fadeInLeft" | "fadeIn" | "zoomIn";

interface RevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number; // seconds, mirrors data-wow-delay
  className?: string;
  as?: "div" | "span";
}

/**
 * Scroll-triggered reveal, equivalent to the reference site's
 * `wow <animation>` classes with `data-wow-delay`. Animates once, the
 * first time the element enters the viewport.
 */
export default function Reveal({
  children,
  animation = "fadeInUp",
  delay = 0,
  className = "",
  as = "div",
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLSpanElement>}
      className={`${className} ${isInView ? `animate-${animation}` : "opacity-0"}`}
      style={{ animationDelay: isInView ? `${delay}s` : undefined }}
    >
      {children}
    </Tag>
  );
}
