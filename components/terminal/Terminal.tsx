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
import { WindowCard } from "@/components/WindowCard";
import { useInteractive } from "@/components/interactive/InteractiveProvider";
import { ACHIEVEMENTS } from "@/data/achievements";
import {
  JOKES,
  SECTION_SUMMARIES,
  SUDO_HIRE_ME,
  WHOAMI,
} from "@/data/terminal";
import type { NumberGame } from "./numberGame";

type LineKind = "out" | "cmd" | "sys";
type Line = { id: number; text: string; kind: LineKind };

const PROMPT = "psy@portfolio:~$";
const GAME_PROMPT = "guess>";

const BANNER: string[] = [
  "psy.terminal v1.0 — booted.",
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
  "  sudo hire me  worth a shot",
  "  clear         wipe the screen",
];

// Sections a command can summarize + scroll to.
const SECTION_CMDS = ["about", "experience", "invexs", "projects", "contact"];

export function Terminal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { unlock, isUnlocked } = useInteractive();

  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map((text, i) => ({ id: i, text, kind: "sys" as const })),
  );
  const [input, setInput] = useState("");

  const idRef = useRef(BANNER.length);
  const histRef = useRef<string[]>([]); // entered command strings
  const histIdxRef = useRef<number>(-1); // -1 = current (not browsing)
  const jokeIdxRef = useRef(0);
  const gameRef = useRef<NumberGame | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((text: string, kind: LineKind = "out") => {
    setLines((prev) => [...prev, { id: idRef.current++, text, kind }]);
  }, []);

  const pushMany = useCallback(
    (texts: string[], kind: LineKind = "out") => {
      setLines((prev) => {
        let id = idRef.current;
        const next = texts.map((text) => ({ id: id++, text, kind }));
        idRef.current = id;
        return [...prev, ...next];
      });
    },
    [],
  );

  // Keep the view pinned to the newest output.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Autofocus on open; Escape closes.
  useEffect(() => {
    inputRef.current?.focus();
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Print a section blurb, then scroll there and close the terminal so the
  // visitor actually lands on the section (the window is an overlay).
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
    const { NumberGame } = await import("./numberGame");
    const game = new NumberGame();
    gameRef.current = game;
    pushMany(game.intro());
  }, [pushMany]);

  const printTrophies = useCallback(() => {
    push("Trophy cabinet:");
    for (const a of ACHIEVEMENTS) {
      const got = isUnlocked(a.id);
      if (!got && a.hidden) {
        push("  [ ] ??? — keep poking around.");
      } else {
        push(`  [${got ? "x" : " "}] ${a.title} — ${a.description}`);
      }
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
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
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
    [
      pushMany,
      push,
      printTrophies,
      router,
      toggleTheme,
      startGame,
      goToSection,
      onClose,
    ],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const raw = input;
      setInput("");
      histIdxRef.current = -1;

      const inGame = gameRef.current !== null;
      // Echo the entered line under the right prompt.
      push(`${inGame ? GAME_PROMPT : PROMPT} ${raw}`, "cmd");

      if (inGame) {
        const result = gameRef.current!.guess(raw);
        pushMany(result.lines);
        if (result.done) {
          gameRef.current = null;
          if (result.won) unlock("high-score");
        }
        return;
      }

      if (raw.trim() === "") return;
      histRef.current.push(raw);
      runCommand(raw);
    },
    [input, push, pushMany, unlock, runCommand],
  );

  // Up/Down arrows recall command history (shell mode only).
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (gameRef.current) return;
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
    [],
  );

  const inGame = gameRef.current !== null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      onMouseDown={onClose}
    >
      {/* Backdrop */}
      <div aria-hidden className="absolute inset-0 bg-ink/40" />

      {/* Stop backdrop-close when interacting with the window itself. */}
      <div
        className="relative w-full max-w-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <WindowCard title="terminal — psy.sh" accent="violet">
          {/* The terminal "screen": classic dark console in either theme. */}
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
                {line.text || " "}
              </p>
            ))}

            <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-[#7ee787]">
                {inGame ? GAME_PROMPT : PROMPT}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                aria-label="Terminal input"
                className="min-w-0 flex-1 bg-transparent text-[#d7d7e0] caret-[#7ee787] outline-none"
              />
            </form>
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink/60">
            <span>type &apos;help&apos; — Esc to close</span>
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
