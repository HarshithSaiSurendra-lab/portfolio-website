import type { Accent } from "./WindowCard";

const ACCENT_VAR: Record<Accent, string> = {
  pink: "var(--accent-pink)",
  violet: "var(--accent-violet)",
  lime: "var(--accent-lime)",
};

// Y2K loading bar. Determinate: a solid fill to `value`%. Indeterminate (omit
// `value`, e.g. "Python — LEVELING UP"): a barber-pole stripe fill. Layout is
// fixed-height so it never causes CLS. Reused by the stat card + quest log.
export function LoadingBar({
  label,
  value,
  accent = "violet",
  caption,
}: {
  label: string;
  value?: number;
  accent?: Accent;
  caption?: string;
}) {
  const indeterminate = value === undefined;
  const pct = indeterminate ? 100 : Math.max(0, Math.min(100, value));
  const color = ACCENT_VAR[accent];

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 font-mono text-xs">
        <span className="font-bold uppercase tracking-wide text-ink">{label}</span>
        <span className="text-ink/60">
          {caption ?? (indeterminate ? "LEVELING UP" : `${pct}`)}
        </span>
      </div>
      <div
        className="h-4 w-full overflow-hidden border-2 border-ink bg-surface"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={`h-full ${indeterminate ? "bar-barberpole" : ""}`}
          style={
            indeterminate
              ? {
                  width: "100%",
                  backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 8px, transparent 8px 14px)`,
                  backgroundColor: "transparent",
                }
              : { width: `${pct}%`, backgroundColor: color }
          }
        />
      </div>
    </div>
  );
}
