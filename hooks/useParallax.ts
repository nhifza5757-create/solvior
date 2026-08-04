"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far a section has scrolled through the viewport and returns a
 * translateY offset for its background layer, giving a smooth parallax feel
 * on both desktop and mobile (no `background-attachment: fixed`, which is
 * unreliable on iOS Safari).
 */
export function useParallax(strength = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Progress: -1 (section fully below viewport) -> 1 (fully above)
      const progress = (rect.top - viewportH) / (viewportH + rect.height);
      setOffset(progress * strength * rect.height);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return { ref, offset };
}