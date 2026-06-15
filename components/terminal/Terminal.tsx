"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { WindowCard } from "@/components/WindowCard";
import { useInteractive } from "@/components/interactive/InteractiveProvider";
import { ACHIEVEMENTS } from "@/data/achievements";
import {
  JOKES,
  SECTION_SUMMARIES,
  SUDO_HIRE_ME,
  WHOAMI,
} from "@/data/terminal";
import {
  formatDate,
  formatTime,
  validateInitials,
  type Boards,
  type MainEntry,
  type StreakEntry,
} from "@/lib/leaderboard";
import { loadBoards, submitScore } from "@/components/arcade/leaderboardClient";
import type { NumberGame } from "./numberGame";

type LineKind = "out" | "cmd" | "sys";
type Line = { id: number; text: string; kind: LineKind };
type Mode = "shell" | "game" | "initials";

const PROMPT = "psy@portfolio:~$";
const GAME_PROMPT = "guess>";
const INITIALS_PROMPT = "initials>";
const STREAK_KEY = "psy:guess-streak";

const BANNER: string[] = [
  "psy.terminal v1.0 booted.",
  "Type 'help' for the command list. (this is not real bash, be gentle.)",
];

const HELP: string[] = [
  "Available commands:",
  "  help          this list",
  "  about         who I am",
  "  experience    where I've worked",
  "  invexs        the startup I co-founded",
  "  projects      things I've built",
  "  contact       how to reach me",
  "  resume        open the resume page",
  "  theme         flip daytime / nighttime",
  "  whoami        a one-liner",
  "  date          today, per your clock",
  "  joke          a programming one-liner",
  "  trophies      achievements unlocked",
  "  play          a hidden game",
  "  leaderboard   arcade high scores",
  "  sudo hire me  worth a shot",
  "  clear         wipe the screen",
];

const SECTION_CMDS = ["about", "experience", "invexs", "projects", "contact"];

function readStreak(): number {
  try {
    return Number(localStorage.getItem(STREAK_KEY)) || 0;
  } catch {
    return 0;
  }
}
function writeStreak(n: number): void {
  try {
    localStorage.setItem(STREAK_KEY, String(n));
  } catch {
    /* private mode etc. */
  }
}

// Fixed-width board rendering so the columns line up in the mono console.
function boardLines(boards: Boards, global: boolean): string[] {
  const out: string[] = [];
  out.push(global ? "ARCADE HIGH SCORES (global)" : "ARCADE HIGH SCORES (local · global once backend's live)");
  out.push("fewest guesses, then fastest:");
  if (boards.main.length === 0) {
    out.push("  (no scores yet, be the first.)");
  } else {
    out.push(
      ["#".padEnd(3), "NAME".padEnd(5), "TRIES".padEnd(6), "TIME".padEnd(7), "DATE"].join(""),
    );
    boards.main.forEach((e: MainEntry, i) => {
      out.push(
        [
          `${i + 1}.`.padEnd(3),
          e.initials.padEnd(5),
          String(e.tries).padEnd(6),
          formatTime(e.timeMs).padEnd(7),
          formatDate(e.date),
        ].join(""),
      );
    });
  }
  out.push("");
  out.push("longest win streaks:");
  if (boards.streak.length === 0) {
    out.push("  (no streaks yet.)");
  } else {
    out.push(["#".padEnd(3), "NAME".padEnd(5), "STREAK"].join(""));
    boards.streak.forEach((e: StreakEntry, i) => {
      out.push([`${i + 1}.`.padEnd(3), e.initials.padEnd(5), `${e.streak}x`].join(""));
    });
  }
  return out;
}

export function Terminal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { unlock, isUnlocked } = useInteractive();

  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map((text, i) => ({ id: i, text, kind: "sys" as const })),
  );
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("shell");

  const idRef = useRef(BANNER.length);
  const histRef = useRef<string[]>([]);
  const histIdxRef = useRef<number>(-1);
  const jokeIdxRef = useRef(0);
  const gameRef = useRef<NumberGame | null>(null);
  // Win data awaiting initials submission.
  const pendingRef = useRef<{ tries: number; timeMs: number; streak: number } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((text: string, kind: LineKind = "out") => {
    setLines((prev) => [...prev, { id: idRef.current++, text, kind }]);
  }, []);

  const pushMany = useCallback((texts: string[], kind: LineKind = "out") => {
    setLines((prev) => {
      let id = idRef.current;
      const next = texts.map((text) => ({ id: id++, text, kind }));
      idRef.current = id;
      return [...prev, ...next];
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const goToSection = useCallback(
    (id: string) => {
      const summary = SECTION_SUMMARIES[id];
      if (summary) push(summary);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }, 450);
    },
    [push, onClose],
  );

  const toggleTheme = useCallback(() => {
    const goingDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", goingDark);
    try {
      localStorage.setItem("theme", goingDark ? "dark" : "light");
    } catch {
      /* private mode etc. */
    }
    if (goingDark) unlock("night-owl");
    push(`Loaded ${goingDark ? "nighttime.sav" : "daytime.sav"}.`);
  }, [unlock, push]);

  const startGame = useCallback(async () => {
    track("minigame_played");
    unlock("arcade-play");
    const { NumberGame } = await import("./numberGame");
    const game = new NumberGame();
    gameRef.current = game;
    setMode("game");
    pushMany(game.intro());
  }, [pushMany, unlock]);

  const showLeaderboard = useCallback(async () => {
    push("Fetching scores …");
    const res = await loadBoards();
    pushMany(boardLines(res, res.global));
  }, [push, pushMany]);

  const printTrophies = useCallback(() => {
    push("Trophy cabinet:");
    for (const a of ACHIEVEMENTS) {
      const got = isUnlocked(a.id);
      if (!got && a.hidden) push("  [ ] ???: keep poking around.");
      else push(`  [${got ? "x" : " "}] ${a.title}: ${a.description}`);
    }
  }, [push, isUnlocked]);

  const runCommand = useCallback(
    (rawCmd: string) => {
      const cmd = rawCmd.trim();
      const lower = cmd.toLowerCase();

      switch (lower) {
        case "help":
          pushMany(HELP);
          return;
        case "clear":
          idRef.current = 0;
          setLines([]);
          return;
        case "whoami":
          push(WHOAMI);
          return;
        case "date":
          push(new Date().toString());
          return;
        case "joke":
          push(JOKES[jokeIdxRef.current % JOKES.length]);
          jokeIdxRef.current += 1;
          return;
        case "trophies":
          printTrophies();
          return;
        case "leaderboard":
        case "scores":
          void showLeaderboard();
          return;
        case "resume":
          push("Opening resume.pdf …");
          router.push("/resume");
          return;
        case "theme":
          toggleTheme();
          return;
        case "play":
          void startGame();
          return;
        case "sudo hire me":
          pushMany(SUDO_HIRE_ME);
          window.setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          }, 700);
          return;
        case "exit":
        case "quit":
          onClose();
          return;
      }

      if (SECTION_CMDS.includes(lower)) {
        goToSection(lower);
        return;
      }

      push(
        `'${cmd}' is not recognized. Try 'help'. (this is not real bash, please don't pipe things)`,
      );
    },
    [pushMany, push, printTrophies, showLeaderboard, router, toggleTheme, startGame, goToSection, onClose],
  );

  // Post a winning run under the entered initials, then show the board.
  const postScore = useCallback(
    async (initials: string) => {
      const pending = pendingRef.current;
      if (!pending) return;
      pendingRef.current = null;
      push("Posting score …");
      const res = await submitScore({ initials, ...pending });
      if (res.error) {
        push(res.error);
        return;
      }
      pushMany(boardLines(res, res.global));
    },
    [push, pushMany],
  );

  const handleGameGuess = useCallback(
    async (raw: string) => {
      const game = gameRef.current;
      if (!game) return;
      const result = game.guess(raw);
      pushMany(result.lines);

      if (result.status === "continue") return;

      // Game is over one way or another.
      gameRef.current = null;

      if (result.status === "won") {
        unlock("high-score");
        // Tiered win achievements by guesses used.
        if (result.tries === 1) unlock("win-in-1");
        else if (result.tries === 2) unlock("win-in-2");
        else if (result.tries === 3) unlock("win-in-3");
        const streak = readStreak() + 1;
        writeStreak(streak);
        pendingRef.current = { tries: result.tries, timeMs: result.timeMs, streak };
        push(`Win streak: ${streak}x.`);
        push("Enter 3 initials for the leaderboard, or press Enter to skip:");
        setMode("initials");
        return;
      }

      if (result.status === "lost") {
        writeStreak(0);
      }
      // lost or quit → back to the shell.
      setMode("shell");
    },
    [pushMany, push, unlock],
  );

  const handleInitials = useCallback(
    async (raw: string) => {
      if (raw.trim() === "") {
        push("Skipped. Score not posted.");
        pendingRef.current = null;
        setMode("shell");
        return;
      }
      const check = validateInitials(raw);
      if (!check.ok) {
        push(check.reason);
        return; // stay in initials mode, ask again
      }
      setMode("shell");
      await postScore(check.value);
    },
    [push, postScore],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const raw = input;
      setInput("");
      histIdxRef.current = -1;

      const label =
        mode === "game" ? GAME_PROMPT : mode === "initials" ? INITIALS_PROMPT : PROMPT;
      push(`${label} ${raw}`, "cmd");

      if (mode === "game") {
        void handleGameGuess(raw);
        return;
      }
      if (mode === "initials") {
        void handleInitials(raw);
        return;
      }

      if (raw.trim() === "") return;
      histRef.current.push(raw);
      runCommand(raw);
    },
    [input, mode, push, handleGameGuess, handleInitials, runCommand],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (mode !== "shell") return;
      const hist = histRef.current;
      if (hist.length === 0) return;

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const idx =
          histIdxRef.current === -1
            ? hist.length - 1
            : Math.max(0, histIdxRef.current - 1);
        histIdxRef.current = idx;
        setInput(hist[idx]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdxRef.current === -1) return;
        const idx = histIdxRef.current + 1;
        if (idx >= hist.length) {
          histIdxRef.current = -1;
          setInput("");
        } else {
          histIdxRef.current = idx;
          setInput(hist[idx]);
        }
      }
    },
    [mode],
  );

  const promptLabel =
    mode === "game" ? GAME_PROMPT : mode === "initials" ? INITIALS_PROMPT : PROMPT;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      onMouseDown={onClose}
    >
      <div aria-hidden className="absolute inset-0 bg-ink/40" />

      <div className="relative w-full max-w-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <WindowCard title="terminal · psy.sh" accent="violet">
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[58vh] max-h-[440px] overflow-y-auto bg-[#0c0c14] p-3 font-mono text-[13px] leading-relaxed text-[#d7d7e0]"
          >
            {lines.map((line) => (
              <p
                key={line.id}
                className={`whitespace-pre-wrap break-words ${
                  line.kind === "cmd"
                    ? "text-[#7ee787]"
                    : line.kind === "sys"
                      ? "text-[#9aa0b4]"
                      : ""
                }`}
              >
                {line.text || " "}
              </p>
            ))}

            <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-[#7ee787]">{promptLabel}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                maxLength={mode === "initials" ? 3 : undefined}
                aria-label="Terminal input"
                className="min-w-0 flex-1 bg-transparent text-[#d7d7e0] caret-[#7ee787] outline-none"
              />
            </form>
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink/60">
            <span>type &apos;help&apos; · Esc to close</span>
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-ink bg-surface px-2 py-0.5 text-ink hover:bg-[var(--accent-violet)] hover:text-on-accent"
            >
              close
            </button>
          </div>
        </WindowCard>
      </div>
    </div>
  );
}
