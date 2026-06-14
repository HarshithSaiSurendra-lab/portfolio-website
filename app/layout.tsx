import type { Metadata } from "next";
import { bungee, spaceGrotesk, spaceMono } from "./fonts";
import "./globals.css";

// Inline, render-blocking script: sets the theme class before first paint so
// there is no flash-of-wrong-theme. Default = system preference; an explicit
// user choice in localStorage wins. Kept tiny and dependency-free on purpose.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Sai Surendra",
  description:
    "Portfolio of Harshith Sai Vardhan Reddy Surendra: co-founder & CFO of Invexs AI, incoming MS Econ @ Georgia Tech.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bungee.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
