import { ThemeToggle } from "@/components/ThemeToggle";
import { Ticker } from "@/components/Ticker";
import { Dock } from "@/components/Dock";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Invexs } from "@/components/sections/Invexs";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { QuestLog } from "@/components/sections/QuestLog";
import { Arcade } from "@/components/arcade/Arcade";
import { ResumeCTA } from "@/components/sections/ResumeCTA";
import { Contact } from "@/components/sections/Contact";
import { VisitorCounter } from "@/components/VisitorCounter";
import { BackgroundFX } from "@/components/BackgroundFX";
import { TICKER_ITEMS } from "@/data/ticker";

export default function Home() {
  return (
    <>
      <BackgroundFX />

      <div className="fixed right-3 top-3 z-50">
        <ThemeToggle />
      </div>

      <Hero />
      <Ticker items={TICKER_ITEMS} />

      <main id="main-content">
        <About />
        <Experience />
        <Invexs />
        <Projects />
        <Skills />
        <QuestLog />
        <Arcade />
        <ResumeCTA />
        <Contact />
      </main>

      <footer className="flex flex-col items-center gap-4 border-t-[3px] border-ink px-6 py-8 pb-28 text-center font-mono text-xs text-ink/60">
        <VisitorCounter />
        <span>
          © {new Date().getFullYear()} Sai Surendra · built in Next.js, no templates
        </span>
      </footer>

      <Dock />
    </>
  );
}
