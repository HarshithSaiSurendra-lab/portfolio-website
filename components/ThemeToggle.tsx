"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HardDrive } from "lucide-react";
import { useInteractive } from "@/components/interactive/InteractiveProvider";

type Theme = "light" | "dark";

const SLOTS: { theme: Theme; label: string; emoji: string }[] = [
  { theme: "light", label: "daytime.sav", emoji: "🌞" },
  { theme: "dark", label: "nighttime.sav", emoji: "🌙" },
];

// Theme picker as a set piece (spec §6.3): a "SELECT SAVE FILE" save-slot menu,
// and a brief CRT power-off transition between themes (screen collapses to a
// line and reopens). Under reduced motion the transition is skipped — instant
// swap. Replaces the plain Phase-1 toggle while keeping the same mount points.
const SWAP_AT_MS = 300; // theme flips while the screen is collapsed (mid-anim)
const CLEAR_AT_MS = 640; // overlay removed once the reopen finishes

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { unlock } = useInteractive();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
    setMounted(true);
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const applyTheme = useCallback(
    (next: Theme) => {
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode etc. */
      }
      if (next === "dark") unlock("night-owl");
      setTheme(next);
    },
    [unlock],
  );

  const selectSlot = useCallback(
    (next: Theme) => {
      setOpen(false);
      if (next === theme) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        applyTheme(next);
        return;
      }

      setTransitioning(true);
      timers.current.push(window.setTimeout(() => applyTheme(next), SWAP_AT_MS));
      timers.current.push(
        window.setTimeout(() => setTransitioning(false), CLEAR_AT_MS),
      );
    },
    [theme, applyTheme],
  );

  const current = SLOTS.find((s) => s.theme === theme) ?? SLOTS[0];

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Select save file (theme)"
          className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-sm text-ink shadow-block transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
        >
          {mounted ? (
            <>
              <span aria-hidden>{current.emoji}</span>
              <span>{current.label}</span>
            </>
          ) : (
            <>
              <span className="inline-block h-4 w-4" aria-hidden />
              <span>daytime.sav</span>
            </>
          )}
        </button>

        {open && mounted && (
          <>
            {/* click-away backdrop */}
            <div
              className="fixed inset-0 z-[40]"
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 z-[41] mt-2 w-56 border-2 border-ink bg-surface p-2 shadow-block"
            >
              <p className="flex items-center gap-2 border-b-2 border-ink/15 px-1 pb-2 font-mono text-[11px] uppercase tracking-widest text-ink/60">
                <HardDrive size={13} aria-hidden /> Select save file
              </p>
              <ul className="mt-1 flex flex-col gap-1">
                {SLOTS.map((slot) => {
                  const active = slot.theme === theme;
                  return (
                    <li key={slot.theme}>
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={active}
                        onClick={() => selectSlot(slot.theme)}
                        className={`flex w-full items-center justify-between gap-2 border-2 px-2 py-2 font-mono text-sm transition-transform hover:-translate-y-0.5 motion-reduce:transform-none ${
                          active
                            ? "border-ink bg-[var(--accent-cyan)] text-on-accent"
                            : "border-ink/20 text-ink hover:border-ink"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span aria-hidden>{slot.emoji}</span>
                          {slot.label}
                        </span>
                        <span className="text-[11px] text-ink/60">
                          {active ? "LOADED" : "load"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* CRT power-off transition overlay. */}
      {transitioning && (
        <div className="crt-overlay fixed inset-0 z-[95]" aria-hidden>
          <div className="crt-screen" />
        </div>
      )}
    </>
  );
}
