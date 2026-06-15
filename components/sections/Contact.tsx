"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Mail, Linkedin, Github, Send, Check } from "lucide-react";
import { WindowCard } from "@/components/WindowCard";
import { Reveal } from "@/components/Reveal";
import { LINKS } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      track("contact_submit");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full border-2 border-ink bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-ink/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-dotted focus-visible:outline-ink";

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl text-ink sm:text-4xl">CONTACT</h2>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <WindowCard title="guestbook.txt" accent="lime">
            <p className="font-mono text-xs text-ink/60">
              {"// drop me a line. I read everything."}
            </p>

            {status === "sent" ? (
              <div className="mt-4 flex items-start gap-3 border-2 border-ink bg-[var(--accent-lime)] px-4 py-3">
                <Check size={18} className="mt-0.5 shrink-0 text-on-accent" aria-hidden />
                <div>
                  <p className="font-body text-sm font-bold text-on-accent">Message sent.</p>
                  <p className="font-body text-sm text-on-accent">
                    Thanks, it landed in my inbox. I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 font-mono text-xs text-on-accent underline underline-offset-2"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid gap-3" noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink/70">
                      Name
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      className={inputClass}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink/70">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      autoComplete="email"
                      placeholder="you@domain.com"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="grid gap-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wide text-ink/70">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder="Say hi, pitch a project, or ask about Invexs…"
                    className={`${inputClass} resize-y`}
                  />
                </label>

                {/* Honeypot: hidden from humans, catnip for bots. Never filled by
                    real users — submissions with it set are silently dropped. */}
                <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company
                    <input name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-sm font-bold text-on-accent shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
                    style={{ backgroundColor: "var(--accent-lime)" }}
                  >
                    <Send size={15} aria-hidden />
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <a
                    href={`mailto:${LINKS.email}`}
                    className="font-mono text-xs text-ink/60 underline underline-offset-2 hover:text-ink"
                  >
                    or just email me
                  </a>
                </div>

                {status === "error" && (
                  <p role="alert" className="font-body text-sm font-bold text-red-600 dark:text-red-400">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}

            {/* Quiet links row */}
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t-2 border-ink/15 pt-4">
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink/70 hover:text-ink"
              >
                <Mail size={14} aria-hidden /> {LINKS.email}
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink/70 hover:text-ink"
              >
                <Linkedin size={14} aria-hidden /> LinkedIn
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-ink/70 hover:text-ink"
              >
                <Github size={14} aria-hidden /> GitHub
              </a>
            </div>
          </WindowCard>
        </div>
      </Reveal>
    </section>
  );
}
