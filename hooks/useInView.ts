"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the target scrolls into the viewport — the same "reveal
 * once, on scroll" behaviour the reference site gets from WOW.js
 * (`class="wow fadeInUp" data-wow-delay="0.3s"`).
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}
