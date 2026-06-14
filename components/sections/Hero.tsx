import { User, Briefcase, Rocket, Gamepad2, ScrollText, Joystick, type LucideIcon } from "lucide-react";
import { TAGLINE } from "@/data/profile";
import { HeroTerminalIcon } from "@/components/interactive/HeroTerminalIcon";
import { HeroName } from "@/components/interactive/HeroName";

// Hero desktop icons are decorative/secondary nav (§4.1) — the Dock is canonical.
const DESKTOP_ICONS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "about_me", icon: User, href: "#about" },
  { label: "career.log", icon: Briefcase, href: "#experience" },
  { label: "invexs.exe", icon: Rocket, href: "#invexs" },
  { label: "my_stuff", icon: Gamepad2, href: "#projects" },
  { label: "quest_log", icon: ScrollText, href: "#quests" },
  { label: "arcade", icon: Joystick, href: "#arcade" },
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

        <div className="mt-4">
          <HeroName />
        </div>

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
          {/* Terminal desktop icon — opens the interactive terminal (§5). */}
          <HeroTerminalIcon />
        </ul>
      </div>
    </section>
  );
}
