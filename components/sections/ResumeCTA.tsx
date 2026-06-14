import { FileText, ArrowRight } from "lucide-react";
import { WindowCard } from "@/components/WindowCard";
import { Reveal } from "@/components/Reveal";
import { ResumePdfButton } from "@/components/interactive/ResumePdfButton";

// CTA card styled as a desktop file icon (§4.7). The HTML résumé lives at
// /resume; a direct PDF download sits alongside. Plain <a> to /resume so the
// View Transition (globals.css) animates the cross-document navigation.
export function ResumeCTA() {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">RESUME</h2>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="resume.pdf" accent="cyan">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid h-16 w-14 shrink-0 place-items-center border-2 border-ink"
                  style={{ backgroundColor: "var(--accent-cyan)" }}
                >
                  <FileText size={28} className="text-on-accent" />
                </span>
                <div>
                  <p className="font-body text-lg font-bold text-ink">
                    The one-pager, properly typeset.
                  </p>
                  <p className="mt-0.5 font-body text-sm text-ink/70">
                    Read it as a clean web page, or grab the PDF for your records.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href="/resume"
                  className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-sm font-bold text-on-accent shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
                  style={{ backgroundColor: "var(--accent-cyan)" }}
                >
                  View résumé <ArrowRight size={15} aria-hidden />
                </a>
                <ResumePdfButton />
              </div>
            </div>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
