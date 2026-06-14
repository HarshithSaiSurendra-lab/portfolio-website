"use client";

import { TerminalSquare } from "lucide-react";
import { useInteractive } from "@/components/interactive/InteractiveProvider";

// The hero's terminal desktop icon (§5). Lives in a client island so the rest
// of the Hero can stay a server component. Matches the styling of the other
// decorative desktop icons.
export function HeroTerminalIcon() {
  const { openTerminal } = useInteractive();
  return (
    <li>
      <button
        type="button"
        onClick={openTerminal}
        className="group flex w-20 flex-col items-center gap-2 text-center"
      >
        <span className="grid h-14 w-14 place-items-center border-2 border-ink bg-surface text-ink shadow-block transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none">
          <TerminalSquare size={24} aria-hidden />
        </span>
        <span className="font-mono text-[11px] text-ink/80">terminal</span>
      </button>
    </li>
  );
}
