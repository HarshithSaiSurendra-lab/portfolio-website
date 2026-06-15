import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { bungee, spaceGrotesk, spaceMono } from "./fonts";
import { InteractiveProvider } from "@/components/interactive/InteractiveProvider";
import { BootScreen } from "@/components/BootScreen";
import "./globals.css";

// Canonical site origin for absolute metadata URLs (OG/Twitter card images).
// Currently the Vercel project URL; swap when a custom domain is decided (Q2).
const SITE_URL = "https://sai-surendra.vercel.app";

// Inline, render-blocking script: sets the theme class before first paint so
// there is no flash-of-wrong-theme. Default = system preference; an explicit
// user choice in localStorage wins. Kept tiny and dependency-free on purpose.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sai Surendra",
    template: "%s · Sai Surendra",
  },
  description:
    "Portfolio of Harshith Sai Vardhan Reddy Surendra: co-founder & CFO of Invexs AI, incoming MS Econ @ Georgia Tech.",
  keywords: [
    "Sai Surendra",
    "Harshith Sai Vardhan Reddy Surendra",
    "Invexs AI",
    "Georgia Tech",
    "economics",
    "quantitative finance",
    "machine learning",
    "portfolio",
  ],
  authors: [{ name: "Harshith Sai Vardhan Reddy Surendra" }],
  creator: "Sai Surendra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sai Surendra",
    title: "Sai Surendra",
    description:
      "Co-founder & CFO of Invexs AI, incoming MS Econ @ Georgia Tech. Fun person, serious work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Surendra",
    description:
      "Co-founder & CFO of Invexs AI, incoming MS Econ @ Georgia Tech. Fun person, serious work.",
  },
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
      <body>
        <BootScreen />
        <InteractiveProvider>{children}</InteractiveProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
