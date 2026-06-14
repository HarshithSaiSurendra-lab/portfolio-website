import {
  Home,
  User,
  Briefcase,
  Rocket,
  Gamepad2,
  Swords,
  ScrollText,
  FileDown,
  Mail,
  Linkedin,
  Github,
  type LucideIcon,
} from "lucide-react";
import { LINKS as PROFILE_LINKS } from "@/data/profile";

type DockItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
};

// Canonical navigation. Section icons jump to in-page anchors; quick links go to
// confirmed destinations. (Resume button waits on the /resume page — Phase 4.)
const SECTIONS: DockItem[] = [
  { label: "Home", icon: Home, href: "#home" },
  { label: "About", icon: User, href: "#about" },
  { label: "Experience", icon: Briefcase, href: "#experience" },
  { label: "Invexs AI", icon: Rocket, href: "#invexs" },
  { label: "Projects", icon: Gamepad2, href: "#projects" },
  { label: "Skills", icon: Swords, href: "#skills" },
  { label: "Quest Log", icon: ScrollText, href: "#quests" },
];

const LINKS: DockItem[] = [
  { label: "Download resume", icon: FileDown, href: "#" },
  { label: "Email", icon: Mail, href: `mailto:${PROFILE_LINKS.email}` },
  { label: "LinkedIn", icon: Linkedin, href: PROFILE_LINKS.linkedin, external: true },
  { label: "GitHub", icon: Github, href: PROFILE_LINKS.github, external: true },
];

function DockButton({ item }: { item: DockItem }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      aria-label={item.label}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group relative grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-surface text-ink transition-transform duration-150 hover:-translate-y-1.5 hover:bg-[var(--accent-violet)] focus-visible:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <Icon size={20} aria-hidden />
      {/* Retro tooltip on hover/focus */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-surface px-2 py-0.5 font-mono text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.label}
      </span>
    </a>
  );
}

export function Dock() {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-3 z-40 mx-auto w-fit max-w-[calc(100vw-1.5rem)]"
    >
      <div className="flex items-center gap-2 overflow-x-auto border-[3px] border-ink bg-surface p-2 shadow-block">
        {SECTIONS.map((item) => (
          <DockButton key={item.label} item={item} />
        ))}
        <span aria-hidden className="mx-1 h-8 w-0.5 shrink-0 bg-ink/30" />
        {LINKS.map((item) => (
          <DockButton key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}
