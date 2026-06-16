import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FULL_NAME } from "@/data/profile";
import {
  RESUME_NAME,
  RESUME_CONTACT,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_PROJECTS,
  RESUME_ADDITIONAL,
} from "@/data/resume";

export const metadata: Metadata = {
  title: `${FULL_NAME} · Résumé`,
  description: `Résumé of ${FULL_NAME} (Sai Surendra): Co-founder of Invexs AI, incoming MS Econ @ Georgia Tech.`,
};

// Plain <a> (not next/link) so the browser performs a real cross-document
// navigation — that's what the View Transitions API (globals.css
// `@view-transition { navigation: auto }`) animates. Unsupported browsers just
// hard-cut. This is the only set-up the / <-> /resume transition needs.

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mt-7 border-b-2 border-ink pb-1 font-mono text-sm font-bold uppercase tracking-widest text-ink">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      {/* Top action bar */}
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
        >
          <ArrowLeft size={14} aria-hidden /> back to desktop
        </a>
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold text-on-accent shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
            style={{ backgroundColor: "var(--accent-lime)" }}
          >
            <Download size={14} aria-hidden /> Download PDF
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* The résumé document */}
      <main id="main-content" className="mx-auto mt-5 max-w-3xl border-[3px] border-ink bg-surface shadow-block">
        {/* Window title bar (decorative, non-interactive on this page) */}
        <div
          className="flex items-center gap-2 border-b-[3px] border-ink px-3 py-2"
          style={{ backgroundColor: "var(--accent-violet)" }}
        >
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[#FF5F57]" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[#FEBC2E]" />
          <span aria-hidden className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[#28C840]" />
          <span className="ml-2 font-mono text-sm font-bold text-on-accent">resume.pdf</span>
        </div>

        <article className="px-5 py-6 text-ink sm:px-9 sm:py-8">
          {/* Header */}
          <header className="text-center">
            <h1 className="font-display text-2xl leading-tight sm:text-3xl">
              {RESUME_NAME}
            </h1>
            <p className="mt-1 font-mono text-[11px] text-ink/55">
              {FULL_NAME}
            </p>
            <p className="mt-2 break-words font-mono text-[11px] leading-relaxed text-ink/75 sm:text-xs">
              {RESUME_CONTACT.phone}
              <span aria-hidden className="px-1.5 text-ink/40">|</span>
              <a href={`mailto:${RESUME_CONTACT.email}`} className="underline-offset-2 hover:underline">
                {RESUME_CONTACT.email}
              </a>
              <span aria-hidden className="px-1.5 text-ink/40">|</span>
              <a
                href={RESUME_CONTACT.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {RESUME_CONTACT.linkedin}
              </a>
              <span aria-hidden className="px-1.5 text-ink/40">|</span>
              {RESUME_CONTACT.citizenship}
            </p>
          </header>

          {/* Education */}
          <SectionHeading>Education</SectionHeading>
          {RESUME_EDUCATION.map((edu) => (
            <div key={edu.school} className="mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-body text-base font-bold">{edu.school}</h3>
                <span className="font-mono text-[11px] text-ink/60">{edu.location}</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-body text-sm italic text-ink/80">{edu.detail}</p>
                <span className="font-mono text-[11px] italic text-ink/60">{edu.period}</span>
              </div>
              <ul className="mt-1 space-y-0.5">
                {edu.notes.map((n) => (
                  <li key={n} className="font-body text-sm text-ink/75">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Experience */}
          <SectionHeading>Experience</SectionHeading>
          {RESUME_EXPERIENCE.map((job) => (
            <div key={job.company} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-body text-base font-bold">
                  {job.company}
                  {job.tagline && (
                    <span className="font-normal italic text-ink/70"> | {job.tagline}</span>
                  )}
                </h3>
                <span className="font-mono text-[11px] text-ink/60">{job.location}</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <p className="font-body text-sm italic text-ink/80">{job.role}</p>
                <span className="font-mono text-[11px] italic text-ink/60">{job.period}</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 font-body text-sm text-ink/85">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Projects & Research */}
          <div className="mt-7 flex flex-wrap items-end justify-between gap-x-3 border-b-2 border-ink pb-1">
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-ink">
              Projects &amp; Research
            </h2>
            <a
              href={RESUME_CONTACT.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-wide text-ink/60 underline-offset-2 hover:underline"
            >
              {RESUME_CONTACT.github}
            </a>
          </div>
          {RESUME_PROJECTS.map((proj) => (
            <div key={proj.name} className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-body text-base font-bold">
                  {proj.name}
                  <span className="font-normal italic text-ink/70"> | {proj.tagline}</span>
                </h3>
                <span className="font-mono text-[11px] italic text-ink/60">{proj.period}</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {proj.bullets.map((b) => (
                  <li key={b} className="flex gap-2 font-body text-sm text-ink/85">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Additional Information */}
          <SectionHeading>Additional Information</SectionHeading>
          <dl className="mt-3 space-y-2">
            {RESUME_ADDITIONAL.map((row) => (
              <div key={row.label} className="font-body text-sm text-ink/85">
                <dt className="inline font-bold">{row.label}: </dt>
                <dd className="inline text-ink/80">{row.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </main>

      <p className="mx-auto mt-5 max-w-3xl text-center font-mono text-[11px] text-ink/45">
        Prefer the file? <a href="/resume.pdf" download className="underline underline-offset-2">Download the PDF</a>.
      </p>
    </div>
  );
}
