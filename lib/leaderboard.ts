// Shared, pure leaderboard logic for the number-guessing game (spec §6.6 +
// approved leaderboard scope). No I/O here — imported by both the API route
// (KV-backed, authoritative) and the client fallback (localStorage, for dev /
// preview before the backend is connected), so ranking rules can't drift.

export const MAX_TRIES = 7; // binary search always wins 1-100 in <=7; running out = a loss
export const BOARD_SIZE = 10; // top N kept on each board

/** A finished winning run. One row per set of initials (their personal best). */
export type MainEntry = {
  initials: string; // exactly 3 uppercase letters
  tries: number; // 1..MAX_TRIES
  timeMs: number; // wall-clock from game start to the winning guess
  date: string; // ISO yyyy-mm-dd of the run
};

/** Best win-streak achieved under a set of initials. */
export type StreakEntry = {
  initials: string;
  streak: number;
  date: string;
};

export type Boards = {
  main: MainEntry[];
  streak: StreakEntry[];
};

export const EMPTY_BOARDS: Boards = { main: [], streak: [] };

// Minimal blocklist for the 3-letter field. Not exhaustive — just enough to
// keep the obvious slurs/crude combos off a public board. Compared uppercase.
const BANNED = new Set([
  "ASS",
  "FAG",
  "FUK",
  "FUC",
  "CUM",
  "COC",
  "COK",
  "CNT",
  "TIT",
  "SEX",
  "JIZ",
  "NIG",
  "FAP",
  "DIK",
  "GAY",
  "POO",
  "PEE",
  "WTF",
  "KKK",
  "DIE",
]);

export type InitialsCheck =
  | { ok: true; value: string }
  | { ok: false; reason: string };

/** Normalize + validate a 3-letter tag. Accepts letters only, upper-cases it. */
export function validateInitials(raw: string): InitialsCheck {
  const value = raw.trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(value)) {
    return { ok: false, reason: "Initials must be exactly 3 letters (A-Z)." };
  }
  if (BANNED.has(value)) {
    return { ok: false, reason: "Let's keep it classy. Pick different initials." };
  }
  return { ok: true, value };
}

const todayISO = () => new Date().toISOString().slice(0, 10);

/** True if `a` ranks ahead of `b`: fewer tries, then faster time. */
function mainBeats(a: MainEntry, b: MainEntry): boolean {
  if (a.tries !== b.tries) return a.tries < b.tries;
  return a.timeMs < b.timeMs;
}

/**
 * Insert a winning run, keeping only each tag's best result, then sort by
 * fewest tries (time breaks ties) and trim to the top BOARD_SIZE.
 */
export function addRun(
  board: MainEntry[],
  run: { initials: string; tries: number; timeMs: number; date?: string },
): MainEntry[] {
  const entry: MainEntry = {
    initials: run.initials,
    tries: run.tries,
    timeMs: run.timeMs,
    date: run.date ?? todayISO(),
  };
  const others = board.filter((e) => e.initials !== entry.initials);
  const existing = board.find((e) => e.initials === entry.initials);
  const best = existing && !mainBeats(entry, existing) ? existing : entry;
  return [...others, best]
    .sort((a, b) => (mainBeats(a, b) ? -1 : 1))
    .slice(0, BOARD_SIZE);
}

/** Record a streak, keeping each tag's best, sorted high-to-low, trimmed. */
export function addStreak(
  board: StreakEntry[],
  run: { initials: string; streak: number; date?: string },
): StreakEntry[] {
  const entry: StreakEntry = {
    initials: run.initials,
    streak: run.streak,
    date: run.date ?? todayISO(),
  };
  const others = board.filter((e) => e.initials !== entry.initials);
  const existing = board.find((e) => e.initials === entry.initials);
  const best = existing && existing.streak >= entry.streak ? existing : entry;
  return [...others, best]
    .sort((a, b) => b.streak - a.streak)
    .slice(0, BOARD_SIZE);
}

/** mm:ss for display (e.g. 5:40). */
export function formatTime(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Compact MM/DD/YY for the table. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${mm}/${dd}/${yy}`;
}
