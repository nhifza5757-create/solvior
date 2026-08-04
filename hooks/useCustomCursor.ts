"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the pointer position and whether it's currently over an
 * interactive element (link, button, [data-cursor-hover]) so a custom
 * cursor follower can react — mirroring the reference site's
 * `.mouseCursor.cursor-hover` behaviour. No-ops on touch devices.
 */
export function useCustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setIsEnabled(true);

    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return { position, isHovering, isEnabled };
}
