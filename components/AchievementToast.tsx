"use client";

import { useEffect } from "react";
import { Trophy, X } from "lucide-react";

// Presentational shell only — no achievement logic/triggers yet (Phase 5).
// Small, dismissible, non-blocking; the parent shows at most one at a time.
export function AchievementToast({
  title,
  description,
  onClose,
  autoDismissMs = 4500,
}: {
  title: string;
  description?: string;
  onClose: () => void;
  autoDismissMs?: number;
}) {
  useEffect(() => {
    if (!autoDismissMs) return;
    const t = window.setTimeout(onClose, autoDismissMs);
    return () => window.clearTimeout(t);
  }, [autoDismissMs, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-in pointer-events-auto flex w-[300px] max-w-[calc(100vw-2rem)] items-start gap-3 border-[3px] border-ink bg-surface p-3 shadow-block"
    >
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink"
        style={{ backgroundColor: "var(--accent-lime)" }}
      >
        <Trophy size={18} className="text-ink" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
          Achievement Unlocked
        </p>
        <p className="truncate font-body font-bold text-ink">{title}</p>
        {description && (
          <p className="font-body text-sm text-ink/70">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="shrink-0 text-ink/50 hover:text-ink"
      >
        <X size={16} />
      </button>
    </div>
  );
}
