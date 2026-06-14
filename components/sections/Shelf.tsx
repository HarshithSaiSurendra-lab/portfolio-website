"use client";

import { useState } from "react";
import { Folder, FolderOpen } from "lucide-react";
import { SHELF } from "@/data/shelf";
import { WindowCard } from "@/components/WindowCard";

// Desktop folders that open small windows (§4.2). One open at a time.
export function Shelf() {
  const [openId, setOpenId] = useState<string | null>(SHELF[0]?.id ?? null);
  const open = SHELF.find((f) => f.id === openId) ?? null;

  return (
    <div>
      <ul className="flex flex-wrap gap-6">
        {SHELF.map((folder) => {
          const isOpen = folder.id === openId;
          const Icon = isOpen ? FolderOpen : Folder;
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
                    isOpen ? "bg-[var(--accent-pink)]" : "bg-surface"
                  }`}
                >
                  <Icon size={26} className="text-ink" aria-hidden />
                </span>
                <span className="font-mono text-[11px] text-ink/80">{folder.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <div className="mt-6 max-w-md">
          <WindowCard title={open.label} accent="pink">
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
