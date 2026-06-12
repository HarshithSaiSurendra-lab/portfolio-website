import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        "accent-pink": "var(--accent-pink)",
        "accent-violet": "var(--accent-violet)",
        "accent-lime": "var(--accent-lime)",
      },
      fontFamily: {
        display: ["var(--font-bungee)", "cursive"],
        body: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Hard-edged Y2K block shadow (no blur), used by window chrome later.
        block: "6px 6px 0 0 var(--ink)",
      },
    },
  },
  plugins: [],
};

export default config;
