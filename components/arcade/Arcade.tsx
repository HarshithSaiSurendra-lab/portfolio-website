"use client";

import { useEffect, useState } from "react";
import { Gamepad2, Trophy, Flame } from "lucide-react";
import { WindowCard } from "@/components/WindowCard";
import { Reveal } from "@/components/Reveal";
import { useInteractive } from "@/components/interactive/InteractiveProvider";
import {
  formatDate,
  formatTime,
  type Boards,
} from "@/lib/leaderboard";
import { loadBoards, LEADERBOARD_EVENT } from "@/components/arcade/leaderboardClient";

// "ARCADE HIGH SCORES" window for the number-guessing game (approved leaderboard
// scope). Reads the board client-side; falls back to local scores until the KV
// backend is connected. Intentionally NOT in the dock / Tourist set so it's easy
// to pull if Psy prefers terminal-only after the preview.
export function Arcade() {
  const { openTerminal } = useInteractive();
  const [boards, setBoards] = useState<Boards>({ main: [], streak: [] });
  const [global, setGlobal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const refresh = () => {
      loadBoards().then((res) => {
        if (!active) return;
        setBoards({ main: res.main, streak: res.streak });
        setGlobal(res.global);
        setLoaded(true);
      });
    };
    refresh();
    // Re-pull when a score is posted (e.g. from the terminal game).
    window.addEventListener(LEADERBOARD_EVENT, refresh);
    return () => {
      active = false;
      window.removeEventListener(LEADERBOARD_EVENT, refresh);
    };
  }, []);

  return (
    <section id="arcade" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">ARCADE</h2>
        <p className="mt-3 max-w-2xl font-body text-ink/70">
          The number-guessing game (the first thing I built in Python) keeps a
          high-score table. Crack it in the fewest guesses (and fastest), or chain
          wins for the streak board.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="high_scores.exe" accent="lime">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Fewest-guesses board */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink">
                  <Trophy size={16} aria-hidden /> Fewest Guesses
                </h3>
                {boards.main.length === 0 ? (
                  <p className="font-mono text-sm text-ink/60">
                    {loaded ? "No scores yet. Be the first." : "Loading …"}
                  </p>
                ) : (
                  <table className="w-full border-collapse font-mono text-sm">
                    <thead>
                      <tr className="border-b-2 border-ink text-left text-ink/60">
                        <th className="py-1 pr-2 font-medium">#</th>
                        <th className="py-1 pr-2 font-medium">NAME</th>
                        <th className="py-1 pr-2 font-medium">TRIES</th>
                        <th className="py-1 pr-2 font-medium">TIME</th>
                        <th className="py-1 font-medium">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boards.main.map((e, i) => (
                        <tr key={`${e.initials}-${i}`} className="border-b border-ink/15">
                          <td className="py-1 pr-2 text-ink/50">{i + 1}</td>
                          <td className="py-1 pr-2 font-bold text-ink">{e.initials}</td>
                          <td className="py-1 pr-2 text-ink">{e.tries}</td>
                          <td className="py-1 pr-2 text-ink">{formatTime(e.timeMs)}</td>
                          <td className="py-1 text-ink/70">{formatDate(e.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Streak board */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink">
                  <Flame size={16} aria-hidden /> Longest Streaks
                </h3>
                {boards.streak.length === 0 ? (
                  <p className="font-mono text-sm text-ink/60">
                    {loaded ? "No streaks yet." : "Loading …"}
                  </p>
                ) : (
                  <table className="w-full border-collapse font-mono text-sm">
                    <thead>
                      <tr className="border-b-2 border-ink text-left text-ink/60">
                        <th className="py-1 pr-2 font-medium">#</th>
                        <th className="py-1 pr-2 font-medium">NAME</th>
                        <th className="py-1 font-medium">STREAK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boards.streak.map((e, i) => (
                        <tr key={`${e.initials}-${i}`} className="border-b border-ink/15">
                          <td className="py-1 pr-2 text-ink/50">{i + 1}</td>
                          <td className="py-1 pr-2 font-bold text-ink">{e.initials}</td>
                          <td className="py-1 text-ink">{e.streak}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 border-t-2 border-ink/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] text-ink/50">
                {global
                  ? "Live global board."
                  : "Local scores for now. Goes global once the backend is connected."}
              </p>
              <button
                type="button"
                onClick={openTerminal}
                className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-sm font-bold text-on-accent shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
                style={{ backgroundColor: "var(--accent-lime)" }}
              >
                <Gamepad2 size={16} aria-hidden /> Play in terminal
              </button>
            </div>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
