import { NextResponse } from "next/server";
import { getKv, kvConfigured } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Single global counter key. Seeded at ~250 (a believable low-hundreds floor,
// per Sai) the first time it's touched, then incremented by real traffic. The
// client only POSTs once per session (sessionStorage debounce), so this rises
// with genuine visits rather than every page navigation. (spec §6.8)
const VISITS_KEY = "visits:count";
const SEED = 250;

// GET — read the current count without incrementing.
export async function GET() {
  if (!kvConfigured()) {
    return NextResponse.json({ configured: false, count: SEED });
  }
  const kv = getKv();
  const count = (await kv.get<number>(VISITS_KEY)) ?? SEED;
  return NextResponse.json({ configured: true, count });
}

// POST — register a new session visit (called once per session by the client).
export async function POST() {
  if (!kvConfigured()) {
    return NextResponse.json({ configured: false, count: SEED });
  }
  const kv = getKv();
  // Seed on first ever touch so the counter starts at the floor, not at 1.
  const exists = await kv.exists(VISITS_KEY);
  if (!exists) {
    await kv.set(VISITS_KEY, SEED);
  }
  const count = await kv.incr(VISITS_KEY);
  return NextResponse.json({ configured: true, count });
}
