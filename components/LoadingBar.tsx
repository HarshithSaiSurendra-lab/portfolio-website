import type { Accent } from "./WindowCard";

const ACCENT_VAR: Record<Accent, string> = {
  cyan: "var(--accent-cyan)",
  violet: "var(--accent-violet)",
  lime: "var(--accent-lime)",
};

// Y2K loading bar. Determinate: a solid fill to `value`%; a full bar (100)
// reads as "MASTER" unless a caption overrides. Indeterminate (omit `value`):
// a GPU-smooth sliding stripe fill. With `inlineValue`, the percent is printed
// inside the track instead of as a caption. Fixed-height so it never causes CLS.
// Reused by the stat card, skill tree, and quest log.
export function LoadingBar({
  label,
  value,
  accent = "violet",
  caption,
  inlineValue = false,
}: {
  label: string;
  value?: number;
  accent?: Accent;
  caption?: string;
  inlineValue?: boolean;
}) {
  const indeterminate = value === undefined;
  const pct = indeterminate ? 100 : Math.max(0, Math.min(100, value));
  const color = ACCENT_VAR[accent];
  const defaultCaption = indeterminate ? "IN PROGRESS" : pct >= 100 ? "MASTER" : `${pct}`;

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 font-mono text-xs">
        <span className="font-bold uppercase tracking-wide text-ink">{label}</span>
        {!inlineValue && <span className="text-ink/60">{caption ?? defaultCaption}</span>}
      </div>
      <div
        className={`relative w-full overflow-hidden border-2 border-ink bg-surface ${
          inlineValue ? "h-5" : "h-4"
        }`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        {indeterminate ? (
          <div
            className="bar-stripe h-full"
            style={{
              width: "calc(100% + 20px)",
              backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 8px, transparent 8px 14px)`,
            }}
          />
        ) : (
          <div className="h-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        )}
        {inlineValue && !indeterminate && (
          <span className="absolute inset-0 flex items-center justify-end pr-2 font-mono text-[10px] font-bold text-ink">
            {pct}%
          </span>
        )}
      </div>
    </div>
  );
}
