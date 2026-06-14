import { Github, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, PRIVATE_NOTE } from "@/data/projects";
import { LINKS } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">PROJECTS</h2>
        <p className="mb-8 mt-1 font-mono text-sm text-ink/60">~/my_stuff/</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <article className="group flex h-full flex-col border-[3px] border-ink bg-surface shadow-block transition-transform duration-200 hover:-translate-y-1.5 hover:-rotate-1 motion-reduce:transform-none">
              {/* Cartridge label strip */}
              <div
                className="flex items-center justify-between gap-2 border-b-[3px] border-ink px-4 py-2"
                style={{ backgroundColor: "var(--accent-pink)" }}
              >
                <h3 className="font-mono text-base font-bold text-ink">{p.name}</h3>
                {p.status && (
                  <span className="border-2 border-ink bg-surface px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
                    {p.status}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-4">
                {p.period && (
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-ink/50">
                    {p.period}
                  </p>
                )}
                <p className="font-body text-base text-ink">{p.blurb}</p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.tech && (
                    <li className="border-2 border-ink bg-bg px-2 py-0.5 font-mono text-xs text-ink">
                      {p.tech}
                    </li>
                  )}
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="border-2 border-ink bg-bg px-2 py-0.5 font-mono text-xs text-ink"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-sm font-bold text-ink underline-offset-4 hover:underline"
                  >
                    <Github size={16} aria-hidden /> View repo
                  </a>
                ) : (
                  <span className="mt-4 inline-flex w-fit items-center gap-2 font-mono text-xs text-ink/50">
                    <Lock size={14} aria-hidden /> private repo
                  </span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-8 flex flex-wrap items-center gap-2 border-2 border-dashed border-ink/40 bg-surface px-4 py-3 font-mono text-sm text-ink/70">
          <Lock size={15} aria-hidden className="shrink-0" />
          {PRIVATE_NOTE}
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink underline underline-offset-4"
          >
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a
            href={`mailto:${LINKS.email}`}
            className="font-bold text-ink underline underline-offset-4"
          >
            email
          </a>
        </p>
      </Reveal>
    </section>
  );
}
