import { WindowCard } from "@/components/WindowCard";
import { Reveal } from "@/components/Reveal";
import { EXPERIENCE } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">EXPERIENCE</h2>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="career.log" accent="violet">
            <ol className="ml-2 space-y-8 border-l-2 border-ink/30 pl-6">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-ink"
                    style={{
                      backgroundColor: job.current
                        ? "var(--accent-violet)"
                        : "var(--surface)",
                    }}
                  />
                  <p className="font-mono text-xs uppercase tracking-wide text-ink/60">
                    {job.period}
                    {job.location && (
                      <span className="ml-2 normal-case tracking-normal text-ink/45">
                        · {job.location}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-body text-lg font-bold text-ink">
                    {job.role}{" "}
                    <span className="text-ink/70">· {job.company}</span>
                    {job.current && (
                      <span
                        className="ml-2 inline-block border-2 border-ink px-1.5 py-0.5 align-middle font-mono text-[10px] font-bold text-on-accent"
                        style={{ backgroundColor: "var(--accent-violet)" }}
                      >
                        CURRENT
                      </span>
                    )}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2 font-body text-sm text-ink/80">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/50" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
