import {
  Home,
  User,
  Briefcase,
  Rocket,
  Gamepad2,
  ScrollText,
  TerminalSquare,
  FileDown,
  Mail,
  Linkedin,
  Github,
  type LucideIcon,
} from "lucide-react";

type DockItem = {
  label: string;
  icon: LucideIcon;
  href?: string; // real wiring (smooth-scroll / quick links) lands in Phase 5
};

// Canonical navigation. Section icons + quick links. Hrefs are placeholders for
// now — confirmed links + smooth-scroll wiring come in Phase 5 (§6.1).
const SECTIONS: DockItem[] = [
  { label: "Home", icon: Home, href: "#" },
  { label: "About", icon: User, href: "#" },
  { label: "Experience", icon: Briefcase, href: "#" },
  { label: "Invexs AI", icon: Rocket, href: "#" },
  { label: "Projects", icon: Gamepad2, href: "#" },
  { label: "Quest Log", icon: ScrollText, href: "#" },
  { label: "Terminal", icon: TerminalSquare, href: "#" },
];

const LINKS: DockItem[] = [
  { label: "Download resume", icon: FileDown, href: "#" },
  { label: "Email", icon: Mail, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
];

function DockButton({ item }: { item: DockItem }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href ?? "#"}
      aria-label={item.label}
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
