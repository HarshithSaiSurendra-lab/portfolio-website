"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WindowCard } from "@/components/WindowCard";
import { Ticker } from "@/components/Ticker";
import { Dock } from "@/components/Dock";
import { LoadingBar } from "@/components/LoadingBar";
import { AchievementToast } from "@/components/AchievementToast";

// NOTE: all copy below is DRAFT sample content for component review only.
// Ticker lines, stat labels, and joke values are approved at Gate 3 (spec §11).
const TICKER_ITEMS = [
  { text: "SAI/USD ▲ +∞%", accent: "lime" as const },
  { text: "BUILDING INVEXS AI", accent: "violet" as const },
  { text: "GT MS ECON · FALL '26" },
  { text: "CURRENTLY DEBUGGING SOMETHING" },
  { text: "2ND PLACE · AI ATL HACKATHON", accent: "cyan" as const },
  { text: "STILL CONFUSED ABOUT REAL ANALYSIS PROOFS" },
  { text: "6-INDICATOR TRADING SYSTEM: ONLINE" },
];

const SAMPLE_ACHIEVEMENTS = [
  { title: "Hacker Voice: I'm In", description: "Opened the terminal." },
  { title: "Night Owl", description: "Switched to dark mode." },
  { title: "Tourist", description: "Visited every section." },
  { title: "High Score", description: "Beat the mini-game." },
];

export default function PlaygroundPage() {
  const [toastIndex, setToastIndex] = useState<number | null>(null);
  const [tick, setTick] = useState(0); // forces a fresh toast each click
  const [nextAchievement, setNextAchievement] = useState(0);

  function triggerToast() {
    setToastIndex(nextAchievement % SAMPLE_ACHIEVEMENTS.length);
    setNextAchievement((n) => n + 1);
    setTick((t) => t + 1);
  }

  const toast = toastIndex === null ? null : SAMPLE_ACHIEVEMENTS[toastIndex];

  return (
    <main className="min-h-screen pb-28">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-4 px-6 pt-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
            phase 2 · gate 2 · component playground
          </p>
          <h1 className="font-display text-2xl leading-tight text-ink sm:text-4xl">
            COMPONENTS.EXE
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {/* Ticker */}
      <div className="mt-6">
        <Ticker items={TICKER_ITEMS} />
        <p className="mx-auto max-w-6xl px-6 pt-2 font-body text-xs text-ink/60">
          Pure CSS marquee · hover to pause · freezes static under reduced motion.
        </p>
      </div>

      {/* Windows grid */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="mb-6 font-body text-sm text-ink/70">
          On desktop (≥1024px) drag a window by its title bar; double-click the
          title bar to snap it back. Click the red light to minimize/restore. On
          mobile, windows are static stacked cards.
        </p>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <WindowCard title="about_me.txt" accent="cyan">
            <p className="text-base">
              Every section of the site is wrapped in this retro window chrome:
              colored title bar, traffic lights, mono filename, chunky ink border,
              hard offset block shadow, no blur, same feel in both themes.
            </p>
            <p className="mt-3 text-sm text-ink/70">
              (Sample text; real copy is approved at Gate 3.)
            </p>
          </WindowCard>

          <WindowCard title="stats.sys" accent="violet">
            <div className="space-y-4">
              <LoadingBar label="Tabs Open Right Now" value={99} accent="violet" />
              <LoadingBar label="Shipping Velocity" value={88} accent="violet" />
              <LoadingBar label="Side-Quest Completion" value={60} accent="violet" />
              <LoadingBar label="Caffeine Reserves" value={95} accent="violet" />
              <LoadingBar label="Sleep Schedule" value={15} accent="violet" />
            </div>
            <p className="mt-3 font-mono text-xs text-ink/60">
              LoadingBar: determinate + indeterminate (draft values).
            </p>
          </WindowCard>

          <WindowCard title="readme.md" accent="lime">
            <ul className="list-inside list-disc space-y-1 text-base">
              <li>Drag me by the title bar (desktop).</li>
              <li>Double-click the title bar to reset.</li>
              <li>Red light minimizes / restores.</li>
              <li>Tab through everything; focus rings are visible.</li>
            </ul>
          </WindowCard>
        </div>
      </section>

      {/* Toast trigger */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="border-[3px] border-ink bg-surface p-5 shadow-block">
          <h2 className="font-display text-lg text-ink">ACHIEVEMENT TOAST</h2>
          <p className="mt-1 font-body text-sm text-ink/70">
            Shell only, no real triggers yet (those arrive in Phase 5). Click to
            preview the notification; it auto-dismisses, or close it manually.
          </p>
          <button
            type="button"
            onClick={triggerToast}
            className="mt-4 border-2 border-ink bg-[var(--accent-lime)] px-4 py-2 font-mono text-sm font-bold text-ink shadow-block transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            ▶ Trigger achievement
          </button>
        </div>
      </section>

      {/* Toast viewport — fixed, non-blocking, above the dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-end px-4 sm:px-6">
        {toast && (
          <AchievementToast
            key={tick}
            title={toast.title}
            description={toast.description}
            onClose={() => setToastIndex(null)}
          />
        )}
      </div>

      {/* Dock */}
      <Dock />
    </main>
  );
}
