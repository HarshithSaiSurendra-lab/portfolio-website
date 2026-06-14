"use client";

import { useEffect, useState } from "react";

// Boot sequence (spec §6.4). Plays ONCE per session: stark, theme-aware, just
// the word LOADING and a progress bar — like a retro game boot, no BIOS walls.
// ≤1.5s, click/tap anywhere to skip. Skipped entirely under reduced-motion and
// on internal navigation (the sessionStorage flag means it never repeats within
// a session, so client-side route changes won't replay it). Fixed overlay, so
// it never causes layout shift.
const SESSION_KEY = "psy:booted";
const DURATION_MS = 1300;

export function BootScreen() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Respect reduced motion: no boot animation at all.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadyBooted = false;
    try {
      alreadyBooted = Boolean(sessionStorage.getItem(SESSION_KEY));
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — fall through; we still gate on `reduced` */
    }
    if (reduced || alreadyBooted) return;

    setShow(true);
    // Lock scroll while the boot overlay is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fade = window.setTimeout(() => setLeaving(true), DURATION_MS);
    const done = window.setTimeout(() => setShow(false), DURATION_MS + 260);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    if (show) return;
    document.body.style.overflow = "";
  }, [show]);

  if (!show) return null;

  return (
    <div
      role="presentation"
      onClick={() => setShow(false)}
      className={`scanlines fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-200 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-mono text-sm uppercase tracking-[0.5em] text-ink">
        Loading
      </p>
      <div className="mt-5 h-3 w-56 border-2 border-ink">
        <div className="boot-bar h-full w-full bg-ink" />
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink/50">
        click to skip
      </p>
    </div>
  );
}
