"use client";

import { ExternalLink } from "lucide-react";
import { track } from "@vercel/analytics";
import { LINKS } from "@/data/profile";

// Client island for the "Visit invexsai.com" CTA so it can fire the
// `invexs_click` custom analytics event (spec §7). Styling mirrors the
// server-rendered button it replaces in components/sections/Invexs.tsx.
export function InvexsLink() {
  return (
    <a
      href={LINKS.invexs}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("invexs_click")}
      className="inline-flex items-center gap-2 border-2 border-ink bg-[var(--accent-lime)] px-4 py-2 font-mono text-sm font-bold text-on-accent shadow-block transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
    >
      <ExternalLink size={16} aria-hidden /> Visit invexsai.com
    </a>
  );
}
