import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LINKS } from "@/data/profile";

export const runtime = "nodejs";

// Resend free tier, Option A (spec §13 Q1): send from the shared sandbox
// address to Psy's inbox. No domain verification needed — the "from" is
// cosmetic since only Psy reads these.
const FROM = "Portfolio Guestbook <onboarding@resend.dev>";
const TO = LINKS.email;

// Light, best-effort rate limit. In-memory per warm instance — not bulletproof
// on serverless (instances are ephemeral), but enough to blunt casual spam
// alongside the honeypot. No external store until the visitor counter (Phase 6).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see/fill `company`. If present, accept silently
  // (return success so bots don't learn they were caught) but send nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "That's a bit too long." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Whoa, too many messages. Try again in a bit." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail isn't configured. Email me directly instead." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Guestbook · ${name}`,
    text: `New message from the portfolio guestbook.\n\nName: ${name}\nEmail: ${email}\n\n${message}\n`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Couldn't send right now. Email me directly instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
