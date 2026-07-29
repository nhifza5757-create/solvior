"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;
    setEnabled(true);

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] w-1.5 h-1.5 rounded-full bg-blue -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[100] rounded-full border -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200 ease-out ${
          hovering
            ? "w-12 h-12 border-blue bg-blue/10"
            : "w-8 h-8 border-navy/30 bg-transparent"
        }`}
      />
    </>
  );
}
