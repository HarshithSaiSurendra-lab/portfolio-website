import { User, Briefcase, Rocket, Gamepad2, ScrollText, TerminalSquare, type LucideIcon } from "lucide-react";
import { NAME_DISPLAY, TAGLINE } from "@/data/profile";

// Hero desktop icons are decorative/secondary nav (§4.1) — the Dock is canonical.
const DESKTOP_ICONS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "about_me", icon: User, href: "#about" },
  { label: "career.log", icon: Briefcase, href: "#experience" },
  { label: "invexs.exe", icon: Rocket, href: "#invexs" },
  { label: "my_stuff", icon: Gamepad2, href: "#projects" },
  { label: "quest_log", icon: ScrollText, href: "#quests" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="scanlines relative overflow-hidden border-b-[3px] border-ink"
    >
      <div className="relative z-[2] mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
          C:\Users\Sai\Desktop&gt; welcome.exe
        </p>

        <h1 className="mt-4 font-display text-5xl leading-[0.95] text-ink sm:text-7xl lg:text-8xl">
          {NAME_DISPLAY}
        </h1>

        <p className="mt-6 max-w-2xl font-body text-lg text-ink/80 sm:text-xl">
          {TAGLINE}
        </p>

        {/* Decorative desktop icons (smooth-scroll). */}
        <ul className="mt-12 flex flex-wrap gap-6">
          {DESKTOP_ICONS.map(({ label, icon: Icon, href }) => (
            <li key={href}>
              <a
                href={href}
                className="group flex w-20 flex-col items-center gap-2 text-center"
              >
                <span className="grid h-14 w-14 place-items-center border-2 border-ink bg-surface text-ink shadow-block transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none">
                  <Icon size={24} aria-hidden />
                </span>
                <span className="font-mono text-[11px] text-ink/80">{label}</span>
              </a>
            </li>
          ))}
          {/* Terminal desktop icon — wired up in Phase 5 (§5). */}
          <li>
            <span
              className="flex w-20 cursor-default flex-col items-center gap-2 text-center opacity-60"
              title="Terminal boots in Phase 5"
            >
              <span className="grid h-14 w-14 place-items-center border-2 border-dashed border-ink bg-surface text-ink">
                <TerminalSquare size={24} aria-hidden />
              </span>
              <span className="font-mono text-[11px] text-ink/80">terminal</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
