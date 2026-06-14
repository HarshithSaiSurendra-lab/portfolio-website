// Client access to the leaderboard. Talks to /api/leaderboard, which is the
// authoritative global store once Vercel KV is connected. Until then the API
// reports configured:false and we transparently fall back to localStorage so
// the board is fully playable in dev / preview. The `global` flag lets the UI
// say which mode it's in.

import {
  addRun,
  addStreak,
  EMPTY_BOARDS,
  type Boards,
} from "@/lib/leaderboard";

const LS_MAIN = "psy:lb:main";
const LS_STREAK = "psy:lb:streak";

/** Fired after any successful submit so on-page boards (Arcade) can refresh. */
export const LEADERBOARD_EVENT = "psy:leaderboard-updated";

function announceUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LEADERBOARD_EVENT));
  }
}

export type LoadResult = Boards & { global: boolean };
export type SubmitInput = {
  initials: string;
  tries: number;
  timeMs: number;
  streak: number;
};
export type SubmitResult = LoadResult & { error?: string };

function readLocal(): Boards {
  if (typeof window === "undefined") return EMPTY_BOARDS;
  try {
    return {
      main: JSON.parse(localStorage.getItem(LS_MAIN) || "[]"),
      streak: JSON.parse(localStorage.getItem(LS_STREAK) || "[]"),
    };
  } catch {
    return EMPTY_BOARDS;
  }
}

function writeLocal(b: Boards): void {
  try {
    localStorage.setItem(LS_MAIN, JSON.stringify(b.main));
    localStorage.setItem(LS_STREAK, JSON.stringify(b.streak));
  } catch {
    /* private mode etc. */
  }
}

export async function loadBoards(): Promise<LoadResult> {
  try {
    const res = await fetch("/api/leaderboard", { cache: "no-store" });
    const data = await res.json();
    if (data?.configured) {
      return { main: data.main ?? [], streak: data.streak ?? [], global: true };
    }
  } catch {
    /* offline / not configured — fall through to local */
  }
  return { ...readLocal(), global: false };
}

export async function submitScore(input: SubmitInput): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (res.ok && data?.configured) {
      announceUpdate();
      return { main: data.main ?? [], streak: data.streak ?? [], global: true };
    }
    if (!res.ok && data?.error) {
      return { ...readLocal(), global: false, error: data.error };
    }
  } catch {
    /* fall through to local merge */
  }

  // Local fallback: merge with the same rules the server uses.
  const cur = readLocal();
  const next: Boards = {
    main: addRun(cur.main, input),
    streak: addStreak(cur.streak, {
      initials: input.initials,
      streak: input.streak,
    }),
  };
  writeLocal(next);
  announceUpdate();
  return { ...next, global: false };
}
