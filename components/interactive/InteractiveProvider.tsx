"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { track } from "@vercel/analytics";
import { AchievementToast } from "@/components/AchievementToast";
import {
  ACHIEVEMENT_MAP,
  type AchievementId,
} from "@/data/achievements";

// Terminal is lazy-loaded: the chunk is only fetched the first time it opens,
// so it costs nothing until the visitor asks for it (spec §8).
const Terminal = dynamic(
  () => import("@/components/terminal/Terminal").then((m) => m.Terminal),
  { ssr: false },
);

const STORAGE_KEY = "psy:achievements"; // { [id]: unlockedAtMs }
const SPEEDRUN_WINDOW_MS = 30_000;
const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "invexs",
  "projects",
  "skills",
  "quests",
  "contact",
];

type InteractiveValue = {
  unlock: (id: AchievementId) => void;
  isUnlocked: (id: AchievementId) => boolean;
  unlockedIds: AchievementId[];
  openTerminal: () => void;
  closeTerminal: () => void;
  terminalOpen: boolean;
  /** Called by the resume-download control; unlocks Speedrun if within window. */
  notifyResumeDownload: () => void;
};

const InteractiveContext = createContext<InteractiveValue | null>(null);

export function useInteractive(): InteractiveValue {
  const ctx = useContext(InteractiveContext);
  if (!ctx) {
    throw new Error("useInteractive must be used within <InteractiveProvider>");
  }
  return ctx;
}

function readStore(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function InteractiveProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<Record<string, number>>({});
  const [queue, setQueue] = useState<AchievementId[]>([]);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const loadTime = useRef<number>(Date.now());
  // Mirror of `unlocked` for synchronous reads inside callbacks.
  const unlockedRef = useRef<Record<string, number>>({});

  const unlock = useCallback((id: AchievementId) => {
    if (!ACHIEVEMENT_MAP[id]) return;
    if (unlockedRef.current[id]) return; // already earned — no repeat toast
    const next = { ...unlockedRef.current, [id]: Date.now() };
    unlockedRef.current = next;
    setUnlocked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private mode etc. */
    }
    setQueue((q) => [...q, id]);
  }, []);

  const isUnlocked = useCallback(
    (id: AchievementId) => Boolean(unlockedRef.current[id]),
    [],
  );

  const notifyResumeDownload = useCallback(() => {
    track("resume_download");
    if (Date.now() - loadTime.current <= SPEEDRUN_WINDOW_MS) {
      unlock("speedrun");
    }
  }, [unlock]);

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    track("terminal_opened");
    unlock("hacker-voice");
  }, [unlock]);

  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  // Hydrate persisted achievements, then fire "Hello World" for the first visit.
  useEffect(() => {
    const stored = readStore();
    unlockedRef.current = stored;
    setUnlocked(stored);
    // Defer so the toast animates in after first paint.
    const t = window.setTimeout(() => unlock("hello-world"), 600);
    return () => window.clearTimeout(t);
  }, [unlock]);

  // "Tourist" — unlocked once every section has entered the viewport.
  useEffect(() => {
    if (unlockedRef.current["tourist"]) return;
    const seen = new Set<string>();
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.target.id) seen.add(e.target.id);
        }
        if (SECTION_IDS.every((id) => seen.has(id))) {
          unlock("tourist");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [unlock]);

  const dismissHead = useCallback(() => setQueue((q) => q.slice(1)), []);

  const value = useMemo<InteractiveValue>(
    () => ({
      unlock,
      isUnlocked,
      unlockedIds: Object.keys(unlocked) as AchievementId[],
      openTerminal,
      closeTerminal,
      terminalOpen,
      notifyResumeDownload,
    }),
    [
      unlock,
      isUnlocked,
      unlocked,
      openTerminal,
      closeTerminal,
      terminalOpen,
      notifyResumeDownload,
    ],
  );

  const head = queue[0];
  const headAch = head ? ACHIEVEMENT_MAP[head] : null;

  return (
    <InteractiveContext.Provider value={value}>
      {children}

      {/* One toast at a time, above the dock. */}
      <div className="pointer-events-none fixed bottom-24 right-4 z-[60] flex flex-col items-end">
        {headAch && (
          <AchievementToast
            key={headAch.id}
            title={headAch.title}
            description={headAch.description}
            onClose={dismissHead}
          />
        )}
      </div>

      {terminalOpen && <Terminal onClose={closeTerminal} />}
    </InteractiveContext.Provider>
  );
}
