import { NextResponse } from "next/server";
import {
  addRun,
  addStreak,
  EMPTY_BOARDS,
  MAX_TRIES,
  validateInitials,
  type MainEntry,
  type StreakEntry,
} from "@/lib/leaderboard";
import { getKv, kvConfigured } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAIN_KEY = "leaderboard:main";
const STREAK_KEY = "leaderboard:streak";
const MAX_TIME_MS = 60 * 60 * 1000; // an hour is plenty; rejects bogus values

// The board is global only once a Vercel KV / Upstash store is connected (the
// env-var plumbing for either lives in @/lib/kv). Until then the route reports
// configured:false and the client keeps scores in localStorage so the feature
// is still previewable (see components/arcade).

// Light, best-effort rate limit (mirrors the contact route): in-memory per warm
// instance — enough to blunt casual score spam alongside server-side validation.
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function GET() {
  if (!kvConfigured()) {
    return NextResponse.json({ configured: false, ...EMPTY_BOARDS });
  }
  const kv = getKv();
  const [main, streak] = await Promise.all([
    kv.get<MainEntry[]>(MAIN_KEY),
    kv.get<StreakEntry[]>(STREAK_KEY),
  ]);
  return NextResponse.json({
    configured: true,
    main: main ?? [],
    streak: streak ?? [],
  });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const check = validateInitials(String(body.initials ?? ""));
  if (!check.ok) {
    return NextResponse.json({ error: check.reason }, { status: 400 });
  }
  const initials = check.value;

  const tries = Number(body.tries);
  const timeMs = Number(body.timeMs);
  const streak = Number(body.streak);
  if (
    !Number.isInteger(tries) ||
    tries < 1 ||
    tries > MAX_TRIES ||
    !Number.isFinite(timeMs) ||
    timeMs <= 0 ||
    timeMs > MAX_TIME_MS ||
    !Number.isInteger(streak) ||
    streak < 1
  ) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  // Not configured: tell the client so it can persist locally instead.
  if (!kvConfigured()) {
    return NextResponse.json({ configured: false, ...EMPTY_BOARDS });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Slow down, too many scores too fast." },
      { status: 429 },
    );
  }

  const kv = getKv();
  const [curMain, curStreak] = await Promise.all([
    kv.get<MainEntry[]>(MAIN_KEY),
    kv.get<StreakEntry[]>(STREAK_KEY),
  ]);

  const nextMain = addRun(curMain ?? [], { initials, tries, timeMs });
  const nextStreak = addStreak(curStreak ?? [], { initials, streak });

  await Promise.all([
    kv.set(MAIN_KEY, nextMain),
    kv.set(STREAK_KEY, nextStreak),
  ]);

  return NextResponse.json({
    configured: true,
    main: nextMain,
    streak: nextStreak,
  });
}
