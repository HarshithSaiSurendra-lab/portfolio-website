import { WindowCard } from "@/components/WindowCard";
import { StatCard } from "@/components/StatCard";
import { Reveal } from "@/components/Reveal";
import { Shelf } from "./Shelf";
import { BIO, FULL_NAME_FLAVOR } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">ABOUT</h2>
      </Reveal>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
        <Reveal>
          <WindowCard title="about_me.txt" accent="pink">
            <p className="font-body text-base leading-relaxed text-ink">{BIO}</p>
            <p className="mt-4 font-mono text-xs text-ink/60">{FULL_NAME_FLAVOR}</p>
          </WindowCard>
        </Reveal>

        <Reveal delay={0.1}>
          <StatCard accent="pink" />
        </Reveal>
      </div>

      <div className="mt-14">
        <Reveal>
          <h3 className="font-display text-xl text-ink sm:text-2xl">THINGS I&apos;M INTO</h3>
          <p className="mb-6 mt-1 font-body text-sm text-ink/70">
            Click a folder to open it.
          </p>
        </Reveal>
        <Reveal>
          <Shelf />
        </Reveal>
      </div>
    </section>
  );
}
