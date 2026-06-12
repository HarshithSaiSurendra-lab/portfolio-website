"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// Plain Phase-1 toggle. The CRT "power-off" set-piece transition and the full
// "SELECT SAVE FILE" picker framing arrive in Phase 6 (per spec §6.3 / §11).
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore — private mode etc. */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={
        isDark ? "Switch to daytime.sav (light)" : "Switch to nighttime.sav (dark)"
      }
      className="inline-flex items-center gap-2 border-2 border-ink bg-surface px-3 py-2 font-mono text-sm text-ink shadow-block transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
    >
      {/* Avoid hydration mismatch: render the icon only once mounted. */}
      {mounted ? (
        isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />
      ) : (
        <span className="inline-block h-4 w-4" aria-hidden />
      )}
      <span>{isDark ? "nighttime.sav" : "daytime.sav"}</span>
    </button>
  );
}
