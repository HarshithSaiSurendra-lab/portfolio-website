"use client";

import { useCallback, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { NAME_DISPLAY } from "@/data/profile";
import { useInteractive } from "@/components/interactive/InteractiveProvider";

// Hero-name easter egg (spec §6.5): five clicks on the name fire a confetti
// burst, reveal a hidden message, and unlock the "Konami Coder" achievement.
// Confetti is pure CSS (Framer Motion is reserved for reveals + drag, §8) and
// is suppressed under reduced motion — the message + achievement still fire.
// Copy is DRAFT until Gate 6.
const CLICKS_NEEDED = 5;
const CONFETTI_COUNT = 36;
const COLORS = ["var(--accent-cyan)", "var(--accent-violet)", "var(--accent-lime)"];
const SECRET_MESSAGE = "you found the konami room. ↑↑↓↓ etc. · Sai approves.";

type Piece = { id: number; dx: number; dy: number; rot: number; dur: number; color: string };

function makeConfetti(): Piece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, id) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    return {
      id,
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist - 60, // bias upward so it arcs and falls
      rot: (Math.random() - 0.5) * 720,
      dur: 0.9 + Math.random() * 0.7,
      color: COLORS[id % COLORS.length],
    };
  });
}

export function HeroName() {
  const { unlock } = useInteractive();
  const clicksRef = useRef(0);
  const firedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState<Piece[]>([]);

  const handleClick = useCallback(() => {
    if (firedRef.current) return;
    clicksRef.current += 1;
    if (clicksRef.current < CLICKS_NEEDED) return;

    firedRef.current = true;
    track("easter_egg_found");
    unlock("konami");
    setRevealed(true);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      setConfetti(makeConfetti());
      window.setTimeout(() => setConfetti([]), 1800);
    }
  }, [unlock]);

  return (
    <span className="relative inline-block">
      <h1
        onClick={handleClick}
        className="cursor-pointer select-none font-display text-5xl leading-[0.95] text-ink sm:text-7xl lg:text-8xl"
        title="go on, click it"
      >
        {NAME_DISPLAY}
      </h1>

      {/* Confetti burst — emits from the name, ignores pointer events. */}
      {confetti.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-[5]">
          {confetti.map((p) => (
            <span
              key={p.id}
              className="confetti-piece absolute block h-2 w-2"
              style={
                {
                  backgroundColor: p.color,
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                  "--rot": `${p.rot}deg`,
                  "--dur": `${p.dur}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {revealed && (
        <span
          role="status"
          className="mt-3 block font-mono text-xs uppercase tracking-widest text-ink/70"
        >
          {SECRET_MESSAGE}
        </span>
      )}
    </span>
  );
}
