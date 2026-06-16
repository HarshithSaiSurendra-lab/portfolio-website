"use client";

import { useEffect, useRef } from "react";

// Light interactive backdrop for the home page: a static dot-grid + accent glow
// (rendered via globals.css), with the glow tracking the cursor on fine-pointer
// devices. Movement is a GPU-cheap transform updated on a rAF tick — no canvas,
// no per-frame repaint. Under reduced motion or on touch/coarse pointers we skip
// the listener entirely, leaving the static base (so it stays calm and cheap).
export function BackgroundFX() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.28;

    const apply = () => {
      raf = 0;
      const el = glowRef.current;
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-fx-dots" />
      <div ref={glowRef} className="bg-fx-glow" />
    </div>
  );
}
