import { ExternalLink, Github } from "lucide-react";
import { WindowCard } from "@/components/WindowCard";
import { Reveal } from "@/components/Reveal";
import { LINKS } from "@/data/profile";

export function Invexs() {
  return (
    <section id="invexs" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">INVEXS AI</h2>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="invexs.exe" accent="lime">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <p className="font-body text-lg leading-relaxed text-ink">
                  The control plane for your AI agent fleet — real-time
                  monitoring, cost attribution, and governance across every
                  agent a company runs in production.
                </p>
                <p className="mt-4 font-body text-base text-ink/80">
                  One SDK, one dashboard, zero migration: add a single line of
                  code and every agent becomes visible — what it costs, whether
                  it&apos;s healthy, and what it&apos;s doing, in real time.
                  We&apos;re building for VP-level platform engineering teams,
                  starting with US financial services where audit trails
                  aren&apos;t optional.
                </p>
                <p className="mt-4 font-body text-base text-ink/80">
                  I&apos;m co-founder &amp; CFO. We&apos;re building it through
                  Georgia Tech CREATE-X, headed to the Spring 2026 Showcase.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={LINKS.invexs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-ink bg-[var(--accent-lime)] px-4 py-2 font-mono text-sm font-bold text-ink shadow-block transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
                  >
                    <ExternalLink size={16} aria-hidden /> Visit invexsai.com
                  </a>
                  <a
                    href={`${LINKS.github}/Invexsai`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-4 py-2 font-mono text-sm font-bold text-ink shadow-block transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
                  >
                    <Github size={16} aria-hidden /> Repository
                  </a>
                </div>
              </div>

              <dl className="space-y-3 border-t-2 border-ink pt-4 font-mono text-sm lg:border-l-2 lg:border-t-0 lg:pl-6 lg:pt-0">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/60">Role</dt>
                  <dd className="text-ink">Co-founder &amp; CFO</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/60">Program</dt>
                  <dd className="text-ink">Georgia Tech CREATE-X</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ink/60">Status</dt>
                  <dd className="text-ink">Spring 2026 Showcase</dd>
                </div>
              </dl>
            </div>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
