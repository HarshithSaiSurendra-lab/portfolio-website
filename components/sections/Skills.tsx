import { WindowCard } from "@/components/WindowCard";
import { LoadingBar } from "@/components/LoadingBar";
import { Reveal } from "@/components/Reveal";
import { EQUIPPED, PROFICIENCY } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">SKILLS</h2>
        <p className="mb-8 mt-1 font-mono text-sm text-ink/60">~/skill_tree/</p>
      </Reveal>

      <Reveal>
        <WindowCard title="skill_tree.exe" accent="lime">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Equipped: the inventory */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/60">
                Equipped
              </p>
              <div className="space-y-5">
                {EQUIPPED.map((group) => (
                  <div key={group.id}>
                    <p className="mb-2 font-mono text-xs text-ink/50">{group.label}</p>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((s) => (
                        <li
                          key={s}
                          className="border-2 border-ink bg-bg px-2 py-0.5 font-mono text-xs text-ink"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Proficiency: 100 = MASTER badge, below 100 = bar with inline % */}
            <div className="border-t-2 border-ink pt-6 lg:border-l-2 lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink/60">
                Proficiency
              </p>
              <ul className="space-y-4">
                {PROFICIENCY.map((skill) =>
                  skill.value >= 100 ? (
                    <li
                      key={skill.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink">
                        {skill.label}
                      </span>
                      <span
                        className="border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-accent"
                        style={{ backgroundColor: "var(--accent-lime)" }}
                      >
                        ★ Master
                      </span>
                    </li>
                  ) : (
                    <li key={skill.label}>
                      <LoadingBar
                        label={skill.label}
                        value={skill.value}
                        accent="lime"
                        inlineValue
                      />
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </WindowCard>
      </Reveal>
    </section>
  );
}
