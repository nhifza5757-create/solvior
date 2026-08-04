"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Sets up buttery smooth scrolling site-wide, mirroring the reference
 * site's use of Lenis (visible in its markup as `class="lenis"` on <html>
 * and `data-lenis-prevent` on overlay/menu elements).
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.documentElement.classList.add("lenis");

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
}
