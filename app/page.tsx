import { ThemeToggle } from "@/components/ThemeToggle";

type Token = {
  name: string;
  cssVar: string;
  light: string;
  dark: string;
  usage: string;
};

const TOKENS: Token[] = [
  { name: "--bg", cssVar: "var(--bg)", light: "#EDE9F7", dark: "#16161F", usage: "Page background (~70%)" },
  { name: "--surface", cssVar: "var(--surface)", light: "#FFFFFF", dark: "#211F2E", usage: "Windows / cards" },
  { name: "--ink", cssVar: "var(--ink)", light: "#16161F", dark: "#F0EDF8", usage: "Text & borders (~20%)" },
  { name: "--accent-pink", cssVar: "var(--accent-pink)", light: "#FF3EC9", dark: "#FF5ED4", usage: "Accent 1 of 3 (~10%)" },
  { name: "--accent-violet", cssVar: "var(--accent-violet)", light: "#7C5CFF", dark: "#9D85FF", usage: "Accent 2 of 3" },
  { name: "--accent-lime", cssVar: "var(--accent-lime)", light: "#C6FF3E", dark: "#D4FF66", usage: "Accent 3 of 3" },
];

function Swatch({ token }: { token: Token }) {
  return (
    <div className="border-2 border-ink bg-surface shadow-block">
      <div
        className="h-24 w-full border-b-2 border-ink"
        style={{ backgroundColor: token.cssVar }}
      />
      <div className="space-y-1 p-3">
        <p className="font-mono text-sm font-bold text-ink">{token.name}</p>
        <p className="font-body text-xs text-ink/70">{token.usage}</p>
        <p className="font-mono text-xs text-ink/60">
          light {token.light} · dark {token.dark}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
            phase 1 · gate 1 — design tokens
          </p>
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-5xl">
            STYLE GUIDE
          </h1>
        </div>
        <ThemeToggle />
      </header>

      {/* ── Color tokens ─────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="mb-1 font-display text-xl text-ink sm:text-2xl">COLOR TOKENS</h2>
        <p className="mb-6 font-body text-sm text-ink/70">
          Six CSS-variable tokens, two palettes. The swatch shows the live value for the
          active theme — toggle above to see both. Hierarchy: ~70% bg/surface, ~20% ink,
          ~10% accents, one accent per section (pink → violet → lime down the page).
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOKENS.map((t) => (
            <Swatch key={t.name} token={t} />
          ))}
        </div>
      </section>

      {/* ── Accent-on-ink chips (contrast sanity check) ──────────────── */}
      <section className="mb-14">
        <h2 className="mb-1 font-display text-xl text-ink sm:text-2xl">ACCENTS IN USE</h2>
        <p className="mb-6 font-body text-sm text-ink/70">
          Hard-edged, no blur — same Y2K feel in both themes.
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="border-2 border-ink px-4 py-2 font-mono text-sm text-ink" style={{ backgroundColor: "var(--accent-pink)" }}>
            accent-pink
          </span>
          <span className="border-2 border-ink px-4 py-2 font-mono text-sm text-ink" style={{ backgroundColor: "var(--accent-violet)" }}>
            accent-violet
          </span>
          <span className="border-2 border-ink px-4 py-2 font-mono text-sm text-ink" style={{ backgroundColor: "var(--accent-lime)" }}>
            accent-lime
          </span>
        </div>
      </section>

      {/* ── Typography ───────────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="mb-6 font-display text-xl text-ink sm:text-2xl">TYPOGRAPHY</h2>
        <div className="space-y-8">
          <article className="border-2 border-ink bg-surface p-5 shadow-block">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
              Bungee — display (headlines + hero name only, used sparingly)
            </p>
            <p className="font-display text-4xl leading-tight text-ink sm:text-6xl">
              SAI SURENDRA
            </p>
          </article>

          <article className="border-2 border-ink bg-surface p-5 shadow-block">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
              Space Grotesk — body (all prose, nav, buttons)
            </p>
            <p className="font-body text-lg text-ink">
              The playfulness lives in the chrome; the seriousness lives in the content.
              Co-founder &amp; CFO building an enterprise AI agent control plane through
              Georgia Tech CREATE-X.
            </p>
            <p className="mt-3 font-body text-base text-ink/70">
              Pack my box with five dozen liquor jugs. 0123456789 — abcdefghijklmnopqrstuvwxyz
            </p>
          </article>

          <article className="border-2 border-ink bg-surface p-5 shadow-block">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
              Space Mono — system (window titles, ticker, terminal, stats, timestamps)
            </p>
            <p className="font-mono text-base text-ink">about_me.txt · career.log · invexs.exe</p>
            <p className="mt-2 font-mono text-sm text-ink/70">
              SAI/USD ▲ +∞% · BUILDING INVEXS AI · GT MS ECON — FALL &apos;26
            </p>
            <p className="mt-2 font-mono text-sm text-ink/60">
              $ whoami → sai · 0123456789 · {"{ }"} [ ] &lt;/&gt;
            </p>
          </article>
        </div>
      </section>

      <footer className="border-t-2 border-ink pt-6 font-mono text-xs text-ink/60">
        Gate 1 demo · not a shipped page. Toggle the theme to review both palettes.
      </footer>
    </main>
  );
}
