# CLAUDE.md — Portfolio Website (Sai "Psy" Surendra)

This file is read at the start of every Claude Code session. It is the standing
contract for this project. The full build specification lives in
**`files/portfolio-spec-final.md`** — read it in full before doing anything in a
fresh session. If this file and the spec ever conflict, ask Psy.

---

## 1. Prime Directives (non-negotiable)

1. **ASK BEFORE DEVIATING.** If anything is ambiguous, contradictory, or requires a
   judgment call not covered by the spec — design, copy, scope, library choices, any
   data displayed about Psy — STOP and ask. Do not silently improve, substitute,
   assume, or invent. Mechanical decisions (variable names, file organization,
   internal helpers) are fine to make alone. Anything user-visible that isn't
   specified is a question.
2. **BUILD IN PHASES. STOP AT EVERY GATE.** The phase plan is spec §11. At the end
   of each phase, stop, summarize what was built, tell Psy how to review it (what to
   run, what to look at, in BOTH themes), and wait for explicit approval before
   starting the next phase. Never start the next phase "while waiting." Never batch
   multiple phases.
3. **ALL HUMOR IS DRAFT.** Every joke — ticker lines, achievement names, terminal
   responses, 404 text, stat-card gags — must be presented for approval at its gate
   (Gates 3, 5, 6). Never ship unapproved copy.
4. **THE PERSONA RULE (spec §0).** Playfulness lives in the chrome (window titles,
   terminal, ticker, achievements, 404). Seriousness lives in the content (Invexs AI,
   experience, project results, research direction — real numbers, sharp copy).
   When unsure which side something falls on: ask.
5. **OPEN QUESTIONS go in the register** (spec §13). Q8 (avatar source/style) and
   Q9 (years-of-experience number for the stat card) are still open and block
   Gate 3. New ambiguities get added to the register and asked, not guessed.

## 2. Project Summary

A personal portfolio for Sai "Psy" Surendra (Harshith Sai Vardhan Reddy Surendra):
co-founder & CFO of Invexs AI, incoming GT MS Econ student (Aug 2026). Single
scrolling page (`/`) + HTML resume page (`/resume`) + BSOD-style 404.

**Aesthetic:** playful maximalist × Y2K retro computing × light gaming layer.
Sections are retro OS windows (draggable on desktop). Signature elements: ticker-tape
marquee, sticky dock nav, retro terminal with hidden mini-game, achievement toasts,
RPG framing (character stat card, quest log).

**Audiences:** investors (Invexs), academic contacts (PhD/RA pipeline), recruiters.
The site must read as "fun person, serious work" — never as a joke site.

## 3. Tech Stack & Hard Constraints

- **Next.js 14**, App Router, TypeScript, no `src/` dir, import alias `@/*`
- **Tailwind CSS** — all theme values via CSS variables (light + dark, spec §3.1)
- **Framer Motion** — ONLY for scroll reveals and window dragging
- **Ticker is pure CSS** (`transform: translateX`, duplicated track). Never a JS
  animation loop.
- **Fonts** via `next/font/google`, `display: swap`, subsetted:
  Bungee (headlines only, used sparingly), Space Grotesk (body),
  Space Mono (anything "system": window titles, ticker, terminal, stats)
- **lucide-react** for icons
- **Resend** for the contact form (API route). Free tier, send from
  `onboarding@resend.dev`, deliver to harshithsai.surendra@gmail.com.
  API key in `.env.local` as `RESEND_API_KEY` — never committed, never hardcoded.
- **Vercel KV / Upstash Redis** for the visitor counter only (seeded at ~250,
  real increments, once per session)
- **Vercel Analytics + Speed Insights**, cookieless; custom events per spec §7.
  NO Google Analytics, NO cookie banners.
- **Deploy target:** Vercel Hobby, `*.vercel.app`. Everything statically
  prerendered except `/api/contact` and `/api/visits`.
- **Terminal and mini-game are lazy-loaded** (dynamic import). Zero cost until opened.
- Performance target: Lighthouse 95+ mobile, CLS ≈ 0.

## 4. Accessibility & Behavior Rules (apply to every component)

- `prefers-reduced-motion` respected EVERYWHERE: boot screen skipped, ticker static,
  reveals instant, CRT toggle becomes instant swap, no confetti.
- Theme: defaults to system preference; user toggle persisted in `localStorage`;
  inline `<head>` script prevents flash-of-wrong-theme.
- Boot screen: ONCE per session (sessionStorage), ≤1.5s, click/tap skips, theme-aware
  minimal design (white bg/black LOADING+bar in light; inverted in dark). No layout
  shift. Never on internal navigation.
- Keyboard navigable, visible focus states (Y2K dotted selection rectangles).
- Semantic HTML under the chrome: real `<nav>`, `<section>`, heading hierarchy.
  `/resume` must be clean, selectable, crawlable markup (no PDF iframe).
- Mobile: windows stack statically (no drag), dock compacts, everything usable.
- Contact form: honeypot field + light rate limit on the API route. No CAPTCHA.

## 5. Phase & Gate Tracker

Update the checkboxes as gates are passed. Phase details in spec §11.

- [x] **Phase 1 — Foundation** (scaffold, tokens both themes, fonts, no-flash script,
      basic toggle) → 🚦 Gate 1: token/typography demo page — ✅ APPROVED
- [x] **Phase 2 — Core Components** (WindowCard+drag, Ticker, Dock, LoadingBar,
      AchievementToast shell) → 🚦 Gate 2: component playground — ✅ APPROVED
- [x] **Phase 3 — Main Page Sections** (hero, about+stat card+shelf, experience,
      Invexs, projects, SKILLS, quest log) → 🚦 Gate 3 — ✅ APPROVED.
      Q8 resolved: avatar = Sai's AI-generated flat-vector portrait (public/avatar.png,
      blue bg knocked out). Q9 resolved: Level 1, ~2 yrs building. Real résumé dates +
      Invexs positioning + private-repo note wired from source docs.
- [ ] **Phase 4 — Resume & Contact** (HTML /resume + PDF download + View Transition;
      form + Resend + honeypot) → 🚦 Gate 4: Psy sends real test email
- [ ] **Phase 5 — Interactive Layer** (dock wiring, achievement triggers, terminal,
      number-guessing mini-game) → 🚦 Gate 5: terminal/copy approval
- [ ] **Phase 6 — Polish** (BSOD 404, visitor counter, boot screen, easter egg,
      CRT toggle, save-slot picker) → 🚦 Gate 6: easter egg + boot review
- [ ] **Phase 7 — QA & Launch** (responsive/a11y/reduced-motion pass, Android test,
      OG image, analytics, Lighthouse, deploy) → 🚦 Gate 7: final walkthrough

## 6. Git Discipline

- `git init` at project start if not already done.
- Commit at minimum at every passed gate: `gate-1: foundation approved`, etc.
- Commit before any risky refactor. Psy may roll back to any approved gate.
- Never commit `.env.local` or any secret.

## 7. Content Sources of Truth

- All section copy, project facts, experience bullets, ticker lines, achievement
  names, terminal commands: spec §4–§6. Do not embellish facts or invent numbers —
  the metrics in the spec (Sharpe 1.25, ~$37K, 149 tests, ~8% excess return, etc.)
  are the only verified ones.
- Bio drafts in the spec are placeholders; Psy rewrites in his own voice (Gate 3).
- Quest log content lives in an editable data file (e.g. `data/quests.ts`) so Psy
  can update it without touching components. Same pattern for ticker lines and
  achievements — content as data, not hardcoded in JSX.
- Name display: hero = "SAI SURENDRA"; full legal name on /resume + metadata.

## 8. Known To-Dos on Psy's Side (remind him at the right time)

- Before Phase 4: create free Resend account (harshithsai.surendra@gmail.com),
  add `RESEND_API_KEY` to `.env.local`.
- Before Gate 3: decide avatar source/style (Q8) and years-of-experience number (Q9);
  deliver bio text, resume content, confirmed links (GitHub, Invexs URL, LinkedIn).
- Phase 7: have a mid-tier Android phone available for testing, or use emulation
  and say so explicitly in the gate summary.

## 9. Session Start Checklist (every new Claude Code session)

1. Read this file fully.
2. Read `portfolio-spec-final.md` fully.
3. Check the Phase & Gate Tracker (§5) and git log to confirm current state.
4. State to Psy: current phase, what's done, what's next, any open questions.
5. Proceed only within the current phase.
