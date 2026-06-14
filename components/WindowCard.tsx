"use client";

import { type ReactNode, useState } from "react";
import { motion, useMotionValue, useDragControls, animate } from "framer-motion";
import { useIsDesktop } from "./hooks/useIsDesktop";

export type Accent = "cyan" | "violet" | "lime";

const ACCENT_VAR: Record<Accent, string> = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  lime: "var(--accent-lime)",
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function WindowCard({
  title,
  accent = "violet",
  children,
  className = "",
}: {
  title: string;
  accent?: Accent;
  children: ReactNode;
  className?: string;
}) {
  const isDesktop = useIsDesktop();
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [minimized, setMinimized] = useState(false);

  function resetPosition() {
    const opts = prefersReducedMotion()
      ? { duration: 0 }
      : ({ type: "spring", stiffness: 500, damping: 40 } as const);
    animate(x, 0, opts);
    animate(y, 0, opts);
  }

  return (
    <motion.section
      // Drag is desktop-only, user-initiated (allowed under reduced motion),
      // and starts only from the title-bar handle below (dragListener=false).
      drag={isDesktop}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.12}
      dragConstraints={{ top: -240, left: -360, right: 360, bottom: 240 }}
      style={{ x, y, backgroundColor: "var(--surface)" }}
      className={`border-[3px] border-ink shadow-block ${className}`}
    >
      {/* Title bar = drag handle */}
      <div
        onPointerDown={(e) => {
          if (isDesktop) dragControls.start(e);
        }}
        onDoubleClick={resetPosition}
        className={`flex items-center justify-between gap-3 border-b-[3px] border-ink px-3 py-2 ${
          isDesktop ? "lg:cursor-grab lg:active:cursor-grabbing" : ""
        }`}
        style={{ backgroundColor: ACCENT_VAR[accent], touchAction: "none" }}
      >
        <div className="flex items-center gap-2">
          {/* Red is a real button (minimize / restore toggle). Yellow + green
              are decorative flavor. */}
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setMinimized((m) => !m)}
            aria-label={minimized ? `Restore ${title}` : `Minimize ${title}`}
            className="grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-ink bg-[#FF5F57] text-[9px] font-bold leading-none text-transparent hover:text-on-accent"
          >
            {minimized ? "+" : "–"}
          </button>
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[#FEBC2E]" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[#28C840]" />
        </div>

        <p className="pointer-events-none truncate font-mono text-sm font-bold text-on-accent">
          {title}
        </p>

        {/* Keeps the filename visually centered against the lights cluster. */}
        <span aria-hidden className="w-[58px] shrink-0" />
      </div>

      {/* Body collapses when minimized. */}
      {!minimized && (
        <div className="p-4 font-body text-ink sm:p-5">{children}</div>
      )}
    </motion.section>
  );
}
