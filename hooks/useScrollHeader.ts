"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has been scrolled past `threshold` px.
 * Used to toggle a compact/sticky style on the header.
 */
export function useScrollHeader(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}
