"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { BookOpen, GraduationCap, CandlestickChart, Tv, Folder } from "lucide-react";
import { SHELF } from "@/data/shelf";
import { WindowCard } from "@/components/WindowCard";

// Per-folder icons so the shelf is glanceable (§4.2). Falls back to a plain
// folder for any id without a mapping.
const FOLDER_ICONS: Record<string, LucideIcon> = {
  books: BookOpen,
  learning: GraduationCap,
  trading: CandlestickChart,
  anime: Tv,
};

// Desktop folders that open a content pane (§4.2). One open at a time.
// Two-pane file-explorer on lg+ (folders left, content fills the right);
// stacks on mobile.
export function Shelf() {
  const [openId, setOpenId] = useState<string | null>(SHELF[0]?.id ?? null);
  const open = SHELF.find((f) => f.id === openId) ?? null;

  return (
    <div className="lg:grid lg:grid-cols-[max-content_minmax(0,1fr)] lg:items-start lg:gap-8">
      <ul className="flex flex-wrap gap-6 lg:grid lg:grid-cols-2 lg:gap-5">
        {SHELF.map((folder) => {
          const isOpen = folder.id === openId;
          const Icon = FOLDER_ICONS[folder.id] ?? Folder;
          return (
            <li key={folder.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : folder.id)}
                aria-expanded={isOpen}
                className="group flex w-24 flex-col items-center gap-2 text-center"
              >
                <span
                  className={`grid h-14 w-16 place-items-center border-2 border-ink shadow-block transition-transform group-hover:-translate-y-1 motion-reduce:transform-none ${
                    isOpen ? "bg-[var(--accent-cyan)]" : "bg-surface"
                  }`}
                >
                  <Icon
                    size={26}
                    className={isOpen ? "text-on-accent" : "text-ink"}
                    aria-hidden
                  />
                </span>
                <span className="font-mono text-[11px] text-ink/80">{folder.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <div className="mt-6 lg:mt-0">
          <WindowCard title={open.label} accent="cyan">
            <p className="mb-2 font-body text-sm text-ink/70">{open.blurb}</p>
            <ul className="space-y-1 font-mono text-sm text-ink">
              {open.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-ink/50">
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </WindowCard>
        </div>
      )}
    </div>
  );
}
