"use client";

import { useCustomCursor } from "@/hooks/useCustomCursor";

export default function CustomCursor() {
  const { position, isHovering, isEnabled } = useCustomCursor();

  if (!isEnabled) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-8 w-8 rounded-full border border-[#0075ff] transition-transform duration-150 ease-out lg:block"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${
            isHovering ? 1.6 : 1
          })`,
        }}
      />
      <div
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-1.5 w-1.5 rounded-full bg-[#0075ff] transition-transform duration-75 ease-out lg:block"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        }}
      />
    </>
  );
}