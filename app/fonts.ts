import { Bungee, Space_Grotesk, Space_Mono } from "next/font/google";

// Display — headlines + hero name only (loud, used sparingly).
export const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bungee",
});

// Body — all prose, nav, buttons.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

// System — window titles, ticker, terminal, stats, timestamps.
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
