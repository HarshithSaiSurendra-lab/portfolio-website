"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Rocket,
  Gamepad2,
  Swords,
  ScrollText,
  MessageSquare,
  FileDown,
  Mail,
  Linkedin,
  Github,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";
import { LINKS as PROFILE_LINKS } from "@/data/profile";
import { useInteractive } from "@/components/interactive/InteractiveProvider";

type DockItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
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
  { label: "Contact", icon: MessageSquare, href: "#contact" },
];

// Section ids the scroll-spy watches (stable reference for the effect dep).
const SECTION_IDS = SECTIONS.map((s) => (s.href ?? "").slice(1)).filter(Boolean);


const BUTTON_CLASS =
  "group relative grid h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-surface text-ink transition-transform duration-150 hover:-translate-y-1.5 hover:bg-[var(--accent-violet)] hover:text-on-accent focus-visible:-translate-y-1.5 focus-visible:bg-[var(--accent-violet)] focus-visible:text-on-accent motion-reduce:transform-none motion-reduce:transition-none";

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-surface px-2 py-0.5 font-mono text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
      {label}
    </span>
  );
}

// Persistent active state mirrors the hover look so the current section reads
// at a glance.
const ACTIVE_CLASS =
  "bg-[var(--accent-violet)] text-on-accent -translate-y-1";

function DockButton({ item, active }: { item: DockItem; active?: boolean }) {
  const Icon = item.icon;
  const className = `${BUTTON_CLASS} ${active ? ACTIVE_CLASS : ""}`;

  // Action items (terminal) render as a real <button>.
  if (item.onClick && !item.href) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        aria-label={item.label}
        className={className}
      >
        <Icon size={20} aria-hidden />
        <Tooltip label={item.label} />
      </button>
    );
  }

  return (
    <a
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "true" : undefined}
      onClick={item.onClick}
      {...(item.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...(item.download ? { download: true } : {})}
      className={className}
    >
      <Icon size={20} aria-hidden />
      <Tooltip label={item.label} />
    </a>
  );
}

// Scroll-spy: tracks which in-page section sits in the viewport's middle band
// and returns its id, so the matching dock icon can light up.
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (best) setActiveId(best);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}

export function Dock() {
  const { openTerminal, notifyResumeDownload } = useInteractive();
  const activeId = useActiveSection(SECTION_IDS);

  const links: DockItem[] = [
    {
      label: "Download resume",
      icon: FileDown,
      href: "/resume.pdf",
      download: true,
      onClick: notifyResumeDownload,
    },
    { label: "Email", icon: Mail, href: `mailto:${PROFILE_LINKS.email}` },
    { label: "LinkedIn", icon: Linkedin, href: PROFILE_LINKS.linkedin, external: true },
    { label: "GitHub", icon: Github, href: PROFILE_LINKS.github, external: true },
    { label: "Terminal", icon: TerminalSquare, onClick: openTerminal },
  ];

  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-3 z-40 mx-auto w-fit max-w-[calc(100vw-1.5rem)]"
    >
      <div className="flex items-center gap-2 overflow-x-auto border-[3px] border-ink bg-surface p-2 shadow-block">
        {SECTIONS.map((item) => (
          <DockButton
            key={item.label}
            item={item}
            active={item.href === `#${activeId}`}
          />
        ))}
        <span aria-hidden className="mx-1 h-8 w-0.5 shrink-0 bg-ink/30" />
        {links.map((item) => (
          <DockButton key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}
