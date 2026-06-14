"use client";

import { Download } from "lucide-react";
import { useInteractive } from "@/components/interactive/InteractiveProvider";

// The PDF download control on the résumé CTA card. A client island so it can
// fire the "Speedrun: Any%" achievement (resume grabbed <30s after load, §6.2).
export function ResumePdfButton() {
  const { notifyResumeDownload } = useInteractive();
  return (
    <a
      href="/resume.pdf"
      download
      onClick={notifyResumeDownload}
      className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-4 py-2 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
    >
      <Download size={15} aria-hidden /> PDF
    </a>
  );
}
