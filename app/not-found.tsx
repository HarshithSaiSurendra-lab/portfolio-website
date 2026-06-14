import Link from "next/link";

// BSOD-style 404 (spec §6.7). Playful chrome — a classic blue screen, theme-
// independent on purpose (a crash screen doesn't obey daytime/nighttime). The
// scanline overlay matches the hero. Copy is DRAFT until Gate 6.
export const metadata = {
  title: "404 · psy.exe has stopped responding",
};

export default function NotFound() {
  return (
    <main
      className="scanlines relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center font-mono"
      style={{ backgroundColor: "#1747c0", color: "#ffffff" }}
    >
      <div className="relative z-[2] mx-auto max-w-2xl">
        {/* Big sad face, the universal BSOD greeting. */}
        <p className="text-6xl font-bold sm:text-7xl">:(</p>

        <p className="mt-8 text-lg sm:text-xl">
          psy.exe has stopped responding.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
          The page you&apos;re looking for has been sent to{" "}
          <span className="whitespace-nowrap">/dev/null</span>. We&apos;re just
          collecting some error info, and then someone should really go fix
          this.
        </p>

        {/* Fake-but-harmless stop code, for flavor. */}
        <div className="mt-8 inline-block border-2 border-white/40 px-4 py-2 text-left text-xs text-white/70">
          <p>Stop code: PAGE_NOT_FOUND_404</p>
          <p>If you call a support person, give them this info.</p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-[#1747c0] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            Restart → take me home
          </Link>
        </div>
      </div>
    </main>
  );
}
