import { Avatar } from "./Avatar";
import { LoadingBar } from "./LoadingBar";
import type { Accent } from "./WindowCard";
import { CHARACTER, STAT_BARS } from "@/data/stats";

// RPG character sheet that replaces plain skill bars (§4.2).
export function StatCard({ accent = "cyan" }: { accent?: Accent }) {
  return (
    <div className="border-2 border-ink bg-bg p-4 font-mono">
      <div className="flex items-start gap-4">
        <Avatar accent={accent} className="h-24 w-24 shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-ink/60">Class</p>
          <p className="font-bold leading-tight text-ink">{CHARACTER.className}</p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-ink/60">Level</p>
          <p className="text-2xl font-bold leading-none text-ink">{CHARACTER.level}</p>
        </div>
      </div>

      {/* XP toward next level */}
      <div className="mt-4">
        <LoadingBar
          label="XP"
          value={CHARACTER.xpPercent}
          accent={accent}
          caption={`${CHARACTER.xpPercent}% TO LVL ${CHARACTER.level + 1}`}
        />
      </div>

      {/* Stat bars */}
      <div className="mt-4 space-y-3">
        {STAT_BARS.map((s) => (
          <LoadingBar
            key={s.label}
            label={s.label}
            value={s.value}
            caption={s.caption}
            accent={accent}
          />
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-snug text-ink/50">
        * some stats are self-reported and may be affected by caffeine.
      </p>
    </div>
  );
}
