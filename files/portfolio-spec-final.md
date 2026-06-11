# Portfolio Website Build Spec — FINAL — Sai (Psy) Surendra

> Supersedes v1 and v2. This is the authoritative build document. Adds: phased build
> plan with review gates, the working agreement (ask-before-deviating constraint),
> theme-aware minimal boot screen, and the open questions register.

---

## ⚠️ WORKING AGREEMENT — HARD CONSTRAINTS FOR THE BUILDER

1. **Ask before deviating.** If anything in this spec is ambiguous, contradictory, or
   requires a judgment call not covered here (design, copy, scope, library choice,
   data displayed about Sai), STOP and ask Psy before implementing. Do not silently
   "improve," substitute, or invent. Small mechanical decisions (variable names, file
   organization) are fine; anything user-visible that isn't specified is a question.
2. **Build in phases, pause at gates.** Follow the phase plan in §11. At the end of
   each phase, stop and present the work for Psy's review. Do not start the next phase
   until he approves. He is monitoring progress and wants to catch anything off-brand
   early.
3. **All joke/personality copy is DRAFT until approved.** Ticker lines, achievement
   names, terminal responses, 404 text, stat card jokes — present them for sign-off at
   the relevant phase gate. Never ship unapproved humor.
4. **Resolve Open Questions (§13) before the phase that needs them.** Each question is
   tagged with its blocking phase.
5. **The Persona Rule (§0) governs every copy decision.** When in doubt about tone:
   chrome can be funny, content about the work cannot.

---

## 0. The Persona Rule (governs all copy & design decisions)

**The playfulness lives in the chrome; the seriousness lives in the content.**

- Window titles, the terminal, the ticker, achievements, the 404, loading bars → can be funny.
- Descriptions of Invexs AI, research direction, experience bullets, project results → sharp,
  concrete, real numbers (Sharpe 1.25, ~$37K savings, 149 passing tests, ~8% excess return).
- Joke stats are about Sai as a person (sleep schedule, coffee), never about the work.
- Goal: visitors leave thinking "fun person, real work" — never "is this site a joke?"

---

## 1. Project Overview

**Who:** Sai "Psy" Surendra — co-founder & CFO of Invexs AI (enterprise AI agent control
plane: observability, cost intelligence, governance — built through Georgia Tech CREATE-X),
incoming MS Econ student at Georgia Tech (Aug 2026), UGA Terry College BBA grad
(started as neuroscience), quant/trading hobbyist, ML self-learner, builds to learn.

**Purpose:** General personal brand serving three audiences at once — investors/founders
(Invexs), academic contacts (PhD/RA pipeline), recruiters/general visitors. Memorable,
shareable, demonstrates frontend craft, gives fast access to resume + contact.

**Vibe:** Playful maximalist × Y2K retro computing × light gaming layer.
"A Windows 98 desktop with personality, good taste, and a GameCube in the corner."

**Format:** Single scrolling page (`/`) + HTML resume page (`/resume`) + BSOD 404.

---

## 2. Tech Stack

- **Next.js 14** (App Router, TypeScript, no src dir, alias `@/*`)
- **Tailwind CSS** (theme tokens via CSS variables for light/dark)
- **Framer Motion** — scroll reveals + window dragging ONLY (ticker is pure CSS)
- **lucide-react** — icons
- **Fonts via `next/font/google`** with `display: swap`, subsetted:
  - `Bungee` (display — headlines only, ~15 uses max, it's loud)
  - `Space Grotesk` (body)
  - `Space Mono` (ticker, labels, terminal, stats, window titles)
- **Resend** (contact form email; free tier 3,000/mo) via Next.js API route
- **Vercel KV** (or Upstash Redis free tier) — visitor counter only
- **Vercel Analytics + Speed Insights** (free, cookieless — no consent banner needed)
- **Deploy:** Vercel Hobby tier. Everything statically prerendered except API routes.

---

## 3. Design System

### 3.1 Color tokens — defined as CSS variables, two themes

| Token | Light ("daytime.sav") | Dark ("nighttime.sav") |
|---|---|---|
| `--bg` | Lavender `#EDE9F7` | Deep ink `#16161F` |
| `--surface` (windows) | White `#FFFFFF` | Dark surface `#211F2E` |
| `--ink` (text/borders) | `#16161F` | Off-white `#F0EDF8` |
| `--accent-pink` | `#FF3EC9` | `#FF5ED4` (slightly lifted) |
| `--accent-violet` | `#7C5CFF` | `#9D85FF` |
| `--accent-lime` | `#C6FF3E` | `#D4FF66` |

**Hierarchy rule:** ~70% bg/surface, ~20% ink, ~10% accents. **One accent per section** —
adjacent windows never share or clash accents. Accents rotate pink → violet → lime down
the page.

**Theme behavior:** Default follows `prefers-color-scheme`; user choice persisted in
`localStorage`; no flash-of-wrong-theme (inline script in `<head>` sets the class before
paint). Dark mode keeps the same hard-edged Y2K feel — solid block shadows, chunky
borders — just inverted, never "soft glowy dark mode."

### 3.2 Typography
Bungee = section headlines + hero name only. Space Grotesk = all body/nav/buttons.
Space Mono = anything "system": window title bars, ticker, terminal, stats, timestamps.

### 3.3 Signature elements
1. **WindowCard** — every section wrapped in retro OS window chrome: colored title bar,
   three traffic-light buttons (hover states; close button can minimize the window for fun),
   `filename.ext`-style mono title, 2–4px solid ink border, hard-edged offset block shadow
   (no blur). **On desktop ≥1024px, windows are draggable by their title bar**
   (Framer Motion `drag`, constrained to a sensible area, double-click title bar to reset).
   On mobile, static stacked cards.
2. **Ticker tape** — pure CSS marquee (`transform: translateX`, duplicated track), mono
   font, pause on hover, static under reduced-motion. NOT Framer Motion (no persistent JS
   animation on main thread).
3. **Texture** — subtle CSS-only CRT scanline/dither overlay on the hero (and optionally
   the 404). Sells the era at near-zero perf cost. Keep opacity very low (<6%).

### 3.4 Motion principles
- Boot sequence is the one orchestrated entrance (see §6.4). Everything else: restrained.
- Scroll-triggered reveals: fade + slight rise, staggered in grids.
- Hover micro-interactions: slight rotate/bounce on dock icons & project cartridges.
- **Everything respects `prefers-reduced-motion`** — ticker static, boot skipped,
  reveals become instant, drag still works (it's user-initiated).

---

## 4. Site Structure & Content (`/`)

### 4.1 Hero — "the desktop"
- Bungee headline: **SAI SURENDRA** (clickable → easter egg, §6.5)
- Tagline: "Co-founder & CFO @ Invexs AI · Incoming MS Econ @ Georgia Tech ·
  Professional rabbit-hole diver"
- Ticker content (mix real + funny):
  `SAI/USD ▲ +∞%` · `BUILDING INVEXS AI` · `GT MS ECON — FALL '26` ·
  `CURRENTLY DEBUGGING SOMETHING` · `2ND PLACE — AI ATL HACKATHON` ·
  `STILL CONFUSED ABOUT REAL ANALYSIS PROOFS` · `6-INDICATOR TRADING SYSTEM: ONLINE`
- Desktop icons in the hero are **decorative/secondary** (still clickable, smooth-scroll)
  — the dock (§6.1) is the real navigation.
- A small "terminal" desktop icon opens the Terminal window (§5).

### 4.2 About — `about_me.txt` + character sheet
- Bio in Sai's voice (draft for him to rewrite): neuroscience → business at UGA Terry →
  pulled into building things: startups, trading systems, AI pipelines. Interests: quant
  finance, ML/AI, philosophy of knowledge. Learns by building, not just reading.
- **RPG character stat card** (replaces plain skill bars):
  - Class: "Founder / Econ-Mage multiclass" · Level: 22 (or current age)
  - Stats as Y2K loading bars (mono labels):
    Excel Wizardry 100 · Spreadsheet Modeling 90 · Python — LEVELING UP ·
    Coffee Dependency 95 · Sleep Schedule 15 (joke) ·
    Patience for Real Analysis Proofs 40 (joke)
- **"Things I'm into" shelf** — desktop-folder icons that open small windows: books
  (Abbott's Understanding Analysis, current philosophy reads), learning (Karpathy,
  CS224n), trading setup. Humanizes without a wall of text; gives professors/PhD
  contacts a hook.

### 4.3 Experience — `career.log` timeline (chronological, dated)
- **Invexs AI** — Co-founder & CFO (current). Enterprise AI agent control plane.
  GT CREATE-X. (Serious copy.)
- **Quarstech** — Consultant. ~$500K departmental budget oversight; ~$37K annual
  cost savings identified.
- **Dallas Venture Capital** — Intern. Series A due diligence; DCF for Docyt.
- **Farely** — Co-founder (concluded). CREATE-X rideshare; pivoted to Invexs AI.

### 4.4 Invexs AI Spotlight — `invexs.exe`
- What it is, Sai's role, CREATE-X Spring 2026 Showcase mention, link to live landing
  page (repo: `HarshithSaiSurendra-lab/Invexsai`). Cofounders Shash, Lasya, Yash
  (optional mention). Copy stays fully serious here per §0.

### 4.5 Projects — cartridge/floppy grid, `my_stuff/`
- **Alpha Signal** — built solo at Hacklytics in 24h, no CS background going in.
  TypeScript, SEC filings pipeline. (repo: `hacklytics26`)
- **Stockify Analytics** — 15-month QuantConnect backtest, ~8% excess return,
  Sharpe 1.25. Six-indicator volume-flow system (KVO, OBV, W A/D, MFI, RSI, MAs).
  (repo: `Finance-Trading`)
- **CodeSlayer** — terminal Python learning game; Milestones 1–4, 149 passing tests.
- **Smart Glasses AI Assistant** (concept, in progress) — real-time conversation
  assistant for Meta smart glasses; Phase 1 prototype stage.
- Staggered scroll-reveal; cartridge hover = slight lift/rotate.

### 4.6 "Currently Up To" — `quest_log.sav` (RPG quest log framing)
- **MAIN QUEST:** GT MS Econ — begins Aug 2026
- **ACTIVE:** GRE 165+ Quant — test Sept · Real Analysis (Abbott) ·
  Karpathy Zero-to-Hero — target end of June · CS224n — starts July 1
- Progress bars reuse the LoadingBar component. Easy-to-edit data file so Sai can
  update quests without touching components.

### 4.7 Resume — `resume.pdf` icon → `/resume`
- Main page: CTA card styled as a file icon.
- **`/resume` is real HTML** — the resume rendered as styled, selectable, crawlable
  markup (mirrors the LaTeX one-pager content), with a prominent **Download PDF**
  button (serves the actual exported PDF). No PDF iframe (bad on mobile).
- Use the **View Transitions API** for the `/` ↔ `/resume` navigation (progressive
  enhancement; hard cut in unsupported browsers).

### 4.8 Contact — `guestbook.txt`
- Form: name, email, message → API route → Resend. **Honeypot field** (visually
  hidden input; reject submissions that fill it). Light rate limit on the route.
- `mailto:` link as quiet fallback. LinkedIn, GitHub, email links.

---

## 5. The Terminal (interactive set piece)

A WindowCard containing a functional retro terminal (mono font, blinking cursor,
command history via arrow keys). Opens from a hero desktop icon and/or dock.
Lazy-loaded — zero cost until opened.

Commands:
- `help` — list commands
- `about` / `projects` / `experience` / `invexs` / `contact` — print summary + scroll to section
- `resume` — link/navigate to /resume
- `theme` — toggle light/dark
- `joke` — rotating one-liners
- `sudo hire me` — fun response + scrolls to contact
- `play` — launches the hidden mini-game (§6.6)
- `clear`, `whoami`, `date` — classics
- Unknown command → `'x' is not recognized. Try 'help'. (this is not real bash, please don't pipe things)`

---

## 6. Extras, Gaming Layer & Easter Eggs

### 6.1 Dock (primary navigation)
Sticky bottom taskbar-style dock: section icons + quick links (resume download, email,
LinkedIn, GitHub). Hover bounce on desktop; compact scrollable row on mobile.
This is the canonical nav — hero desktop icons are flavor.

### 6.2 Achievement toasts 🏆
Small toast notifications ("Achievement Unlocked") with localStorage persistence and a
viewable list (e.g., `trophies` command in terminal). Triggers:
- "Hello World" — first visit
- "Tourist" — visited every section
- "Speedrun: Any%" — downloaded resume <30s after load
- "Hacker Voice: I'm In" — opened the terminal
- "Konami Coder" / "???" — found the easter egg
- "Night Owl" — switched to dark mode
- "High Score" — beat the mini-game
Toasts must be small, dismissible, non-blocking, max one at a time.

### 6.3 Theme toggle as a set piece
- Picker framed as **"SELECT SAVE FILE: 🌞 daytime.sav / 🌙 nighttime.sav"**.
- Transition: brief CRT power-off effect (screen collapses to a horizontal line, reopens
  in the new theme), ≤1s, skipped under reduced-motion (instant swap instead).

### 6.4 Boot sequence — ONCE per session only, theme-aware minimal design
- **Design:** stark and minimal, matching the active theme. Light mode: white screen,
  black "LOADING" text (Space Mono or Bungee, Psy to approve at gate) with a black
  progress bar underneath. Dark mode: inverted — black screen, white text and bar.
  No fake BIOS text walls, no logos — just the word and the bar, like a retro game
  boot. Optional: subtle scanline overlay consistent with the hero.
- Plays on first load of a session (sessionStorage flag), ≤1.5s, click/tap anywhere to
  skip, **skipped entirely** under reduced-motion and on all internal navigation.
  Never repeats within a session. The overlay must not cause layout shift.

### 6.5 Easter egg
- Clicking the hero name 5 times → confetti burst + hidden message + achievement.
- Optional stretch: Konami code triggers a colorway shift.

### 6.6 Hidden mini-game — DECIDED: number guessing game port
- `play` in the terminal launches a web port of **Sai's number guessing game** — the
  first thing he ever built in Python — running inside the terminal window. Include a
  one-line in-game note about that origin (the game itself is a portfolio artifact).
- Lazy-loaded module; high score / best-streak in localStorage; "High Score"
  achievement on win.

### 6.7 BSOD 404
- Blue Screen of Death style: "psy.exe has stopped responding. The page you're looking
  for has been sent to /dev/null." + button home. Scanline overlay welcome here.

### 6.8 Visitor counter
- Y2K digital-counter widget ("You are visitor #000XXX").
- **Real, incrementing counter** in Vercel KV/Upstash — a single key, incremented by a
  lightweight API route — **seeded at ~250** (believable low-hundreds floor, per Sai).
  It increases with real traffic from there. Basic debounce (don't increment on every
  client navigation; once per session).

---

## 7. Analytics & Event Tracking

- **Vercel Analytics** (cookieless — no consent banner): pageviews, referrers, countries.
  Answers "did the LinkedIn post drive traffic?"
- **Vercel Speed Insights**: real-user performance — verifies the site is fast for actual
  visitors, supporting the frontend-craft goal.
- **Custom events** (Vercel Analytics custom events): `resume_download`,
  `contact_submit`, `invexs_click`, `terminal_opened`, `easter_egg_found`,
  `minigame_played`, `theme_toggled`.
- Explicitly NOT: Google Analytics / PostHog / Plausible — overkill for a portfolio,
  GA adds cookie-consent friction.

---

## 8. Performance Budget & Rules

- Ticker: pure CSS animation. Framer Motion only for scroll reveals + drag.
- Terminal + mini-game: lazy-loaded (dynamic import), zero cost until opened.
- Fonts: `display: swap`, subsetted; Bungee used sparingly.
- All pages statically prerendered except `/api/contact` and `/api/visits`.
- Images: next/image, OG image pre-generated (1200×630).
- **Test on a mid-tier Android device, not just a Mac** — explicit checklist item.
- Target: Lighthouse 95+ performance on mobile; CLS ≈ 0 (block shadows & borders are
  layout-stable; boot overlay must not shift content).

---

## 9. Baseline Requirements (non-negotiable)

- Fully responsive (windows stack on mobile; drag disabled; dock compacts)
- Keyboard navigable, visible focus states (style focus rings to fit the theme — dotted
  Y2K selection rectangles work great)
- `prefers-reduced-motion` respected EVERYWHERE (boot, ticker, reveals, CRT toggle,
  confetti)
- Light/dark theme with no flash-of-wrong-theme
- Working contact (form + honeypot + mailto fallback)
- OG image + meta tags for LinkedIn/Twitter link previews
- Semantic HTML under the chrome (real `<nav>`, `<section>`, `<h1>–<h3>`) — the resume
  page especially must be clean crawlable markup

---

## 10. Inspiration References (browse before building)

- **mitchivin.com** — Windows XP clone portfolio; sections open as draggable windows;
  the benchmark for OS-style detail. Borrow the craft mindset, not the grey-blue look.
- **Joey de Ruiter's portfolio** — simulated desktop with file system and a DOS window
  running Doom; proof the hidden-game pattern delights.
- **rleonardi.com/interactive-resume** — the famous resume-as-video-game; upper bound
  of the genre (we deliberately stop short of this).
- **Larissa "Mewmew" (mewmewdevart)** — pixel-art top-down room you walk through to
  learn about her; exemplary on accessibility (reduced-motion/audio prefs respected).
- **"(Win95) Best of Sofia Game Jam"** (Webflow retro showcase) — window chrome in a
  colorful, playful register closer to our palette.

**Our differentiation:** most OS portfolios are grey nostalgia clones. Ours is colorful
Y2K maximalism + light gaming layer + genuinely serious content inside the windows.

**Deliberately rejected:** full side-scroller navigation (huge effort, bad mobile),
background music/SFX, pixel-art-everything (fights the Y2K chrome aesthetic — we are
"retro OS," not "retro NES"), WebGL/Three.js backgrounds, repeated loading screens,
site-wide cursor effects (hero-only at most), CAPTCHA (honeypot instead).

---

## 11. Build Phases (with review gates — builder MUST pause at each gate)

### Phase 1 — Foundation
Scaffold Next.js 14 + Tailwind; CSS-variable theme tokens (both palettes); fonts with
swap/subsetting; no-flash theme script; basic light/dark toggle (plain version, CRT
effect comes in Phase 6).
**🚦 GATE 1:** Psy reviews a token/typography demo page — both themes, all colors,
all three fonts in use — before any sections are built.
*Blocked by Open Questions: Q7 (theme default).*

### Phase 2 — Core Components
`WindowCard` (drag on desktop ≥1024px, static mobile), `Ticker` (pure CSS),
`Dock`, `LoadingBar`, `AchievementToast` (system only, no triggers yet).
**🚦 GATE 2:** Component playground page — Psy interacts with draggable windows,
ticker, dock, and a sample toast in both themes.

### Phase 3 — Main Page Sections
Hero (name, tagline, ticker, decorative icons, scanlines) → About (bio, stat card,
"things I'm into" shelf) → Experience timeline → Invexs spotlight → Projects grid →
Quest log (from editable data file).
**🚦 GATE 3:** Full content review. ALL copy (serious and joke) presented for
approval. This is the big checkpoint.
*Blocked by Open Questions: Q3 (name display), Q4 (headshot/avatar), Q5 (level
number), Q6 (joke copy), plus bio text and confirmed links from §12.*

### Phase 4 — Resume Page & Contact Backend
`/resume` as real HTML + PDF download + View Transition; contact form UI; API route
with Resend + honeypot + rate limit; mailto fallback.
**🚦 GATE 4:** Psy sends a real test message through the form and confirms receipt;
reviews the HTML resume against his LaTeX version.
*Blocked by Open Questions: Q1 (delivery email/Resend account), resume content
from §12.*

### Phase 5 — Interactive Layer
Dock wiring + quick links; achievement triggers; Terminal (lazy) with full command
set; number-guessing mini-game inside terminal (lazy).
**🚦 GATE 5:** Psy plays with the terminal, triggers achievements, beats the
mini-game. All terminal copy approved here.

### Phase 6 — Polish & Easter Eggs
BSOD 404; visitor counter (KV, seeded ~250, once-per-session increment); boot
sequence (theme-aware minimal, per §6.4); hero-name easter egg; CRT theme-toggle
effect; save-slot theme picker framing.
**🚦 GATE 6:** Psy reviews every easter egg and the boot screen in both themes.

### Phase 7 — QA, Analytics & Launch
Responsive + accessibility + reduced-motion pass; test on mid-tier Android; OG
image + metadata; Vercel Analytics + Speed Insights + custom events; Lighthouse
check (target 95+ mobile); deploy to Vercel; domain decision executed.
**🚦 GATE 7 (final):** Psy does a full walkthrough on his phone and laptop before
the link goes anywhere public.
*Blocked by Open Questions: Q2 (domain).*

---

## 12. Content Needed From Psy (gather during Phases 1–2)

- Headshot OR Y2K-style avatar/illustration (see Q4)
- Final resume PDF + the same content as text (for the HTML resume page)
- Bio rewritten in his own voice (drafts above are placeholders)
- Confirmed links: GitHub repos, Invexs landing page URL, LinkedIn, email

---

## 13. OPEN QUESTIONS REGISTER — resolutions logged below

| # | Question | RESOLUTION | Blocks |
|---|---|---|---|
| Q1 | Contact-form delivery email / Resend setup | ✅ RESOLVED: deliver to **harshithsai.surendra@gmail.com**. Use Resend free tier Option A: send from `onboarding@resend.dev` to that address (no domain verification needed; "from" address is cosmetic since only Psy sees it). Psy to create a free Resend account with that Gmail before Phase 4. Upgrade to verified custom domain later if/when one is purchased. | Phase 4 |
| Q2 | Hosting/domain at launch | ✅ RESOLVED: launch on free hosting (**Vercel `*.vercel.app`** — already the deploy target). Custom domain deferred; revisit post-launch. | Phase 7 |
| Q3 | Name display | ✅ RESOLVED: hero headline = **SAI SURENDRA** (Bungee — single weight, inherently bold; no weight decision needed). Full legal name **Harshith Sai Vardhan Reddy Surendra** appears on `/resume` and in page metadata (searchable both ways), plus optional About flavor line: "full name: Harshith Sai Vardhan Reddy Surendra (yes, all of it)". | Phase 3 |
| Q4 | Headshot vs avatar | ✅ RESOLVED: **illustrated Y2K-style avatar**. Avatar art/source to be settled at Gate 3 (NEW open item Q8). | Phase 3 |
| Q5 | Stat card "Level" | ✅ RESOLVED: **Level = years of experience** (not age), counted from first real building experience. Pair with an XP bar ("XP: ▓▓▓▓░░ leveling up"). Exact number confirmed at Gate 3. | Phase 3 |
| Q6 | Joke copy approval | ✅ Process confirmed: all drafts reviewed/approved at Gates 3, 5, 6. | Gates 3, 5, 6 |
| Q7 | Theme default | ✅ RESOLVED: **follow visitor's system preference**; user toggle persisted in localStorage. | Phase 1 |
| Q8 | (NEW) Avatar source: AI-generated, commissioned, or built from an avatar-maker? Style direction needed. | OPEN — resolve at/before Gate 3 | Phase 3 |
| Q9 | (NEW) Exact years-of-experience number for the stat card level. | OPEN — confirm at Gate 3 | Phase 3 |

Anything ambiguous that arises during the build and is not covered by this spec gets
added to this register and asked — per the Working Agreement.
