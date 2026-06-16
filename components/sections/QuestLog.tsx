import { WindowCard } from "@/components/WindowCard";
import { LoadingBar } from "@/components/LoadingBar";
import { Reveal } from "@/components/Reveal";
import { MAIN_QUESTS, ACTIVE_QUESTS } from "@/data/quests";

export function QuestLog() {
  return (
    <section id="quests" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">CURRENTLY UP TO</h2>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="quest_log.sav" accent="violet">
            {/* Main quest — two headline objectives side by side */}
            <div className="border-2 border-ink bg-bg p-4">
              <span
                className="inline-block border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-bold text-on-accent"
                style={{ backgroundColor: "var(--accent-violet)" }}
              >
                ★ MAIN QUEST
              </span>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {MAIN_QUESTS.map((q) => (
                  <div key={q.title} className="border-2 border-ink/20 p-3">
                    <p className="font-body text-xl font-bold text-ink">{q.title}</p>
                    {q.detail && (
                      <p className="font-mono text-sm text-ink/70">{q.detail}</p>
                    )}
                    {q.caption && (
                      <span className="mt-2 inline-block border-2 border-ink/30 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60">
                        {q.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Active quests */}
            <p className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-ink/60">
              Active
            </p>
            <ul className="space-y-5">
              {ACTIVE_QUESTS.map((q) => (
                <li key={q.title}>
                  <LoadingBar
                    label={q.title}
                    value={q.progress}
                    caption={q.caption}
                    accent="violet"
                  />
                  {q.detail && (
                    <p className="mt-1 font-mono text-xs text-ink/60">{q.detail}</p>
                  )}
                </li>
              ))}
            </ul>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
