import { Fragment } from "react";
import type { TickerItem } from "@/data/ticker";

const ACCENT_VAR = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  lime: "var(--accent-lime)",
} as const;

// Pure-CSS marquee. The track holds TWO copies of the items; the CSS animation
// translates it -50% (exactly one copy width) for a seamless loop. No JS
// animation loop runs on the main thread. Pauses on hover/focus; the global
// reduced-motion guard in globals.css freezes it static. Accented items get a
// small accent block before the text (text stays ink for contrast); the
// container fades at both edges (mask in globals.css) instead of hard-cutting.
export function Ticker({
  items,
  durationSec = 40,
  separator = "◆",
}: {
  items: TickerItem[];
  durationSec?: number;
  separator?: string;
}) {
  const Track = ({ hidden }: { hidden?: boolean }) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <Fragment key={`${item.text}-${i}`}>
          <li className="flex items-center gap-2 whitespace-nowrap px-5 font-mono text-sm font-bold uppercase tracking-wide text-ink">
            {item.accent && (
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 border border-ink"
                style={{ backgroundColor: ACCENT_VAR[item.accent] }}
              />
            )}
            {item.text}
          </li>
          <li aria-hidden className="select-none text-ink/50">
            {separator}
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      className="ticker group relative overflow-hidden border-y-[3px] border-ink bg-surface py-2"
      style={{ ["--ticker-duration" as string]: `${durationSec}s` }}
    >
      <div className="ticker-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
