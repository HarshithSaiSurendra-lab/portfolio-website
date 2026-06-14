"use client";

import { useEffect, useState } from "react";

// Y2K digital odometer (spec §6.8). Increments once per session: the first load
// of a session POSTs (registering the visit), every later load just GETs. Until
// the KV backend is connected the API reports configured:false and we show the
// seeded floor so the widget still reads naturally in dev / preview.
const SESSION_KEY = "psy:visited";
const PAD = 6;

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    let firstThisSession = false;
    try {
      firstThisSession = !sessionStorage.getItem(SESSION_KEY);
      if (firstThisSession) sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — treat as a returning visit (GET only) */
    }

    fetch("/api/visits", { method: firstThisSession ? "POST" : "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (active && typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {
        /* offline / not configured — leave the placeholder */
      });

    return () => {
      active = false;
    };
  }, []);

  const display = count === null ? "-".repeat(PAD) : String(count).padStart(PAD, "0");

  return (
    <span className="inline-flex items-center gap-2 align-middle font-mono text-xs text-ink/70">
      <span className="uppercase tracking-widest">You are visitor</span>
      <span
        className="inline-flex gap-px rounded-[2px] border-2 border-ink bg-[#0c0c14] px-1.5 py-1"
        aria-label={count === null ? "loading visitor count" : `visitor number ${count}`}
      >
        {display.split("").map((ch, i) => (
          <span
            key={i}
            className="grid w-[0.7em] place-items-center text-[#7ee787]"
            aria-hidden
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
