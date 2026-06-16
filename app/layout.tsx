import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { bungee, spaceGrotesk, spaceMono } from "./fonts";
import { InteractiveProvider } from "@/components/interactive/InteractiveProvider";
import { BootScreen } from "@/components/BootScreen";
import { LINKS, FULL_NAME } from "@/data/profile";
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
    "Portfolio of Harshith Sai Vardhan Reddy Surendra: co-founder of Invexs AI, incoming MS Econ @ Georgia Tech.",
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
      "Co-founder of Invexs AI, incoming MS Econ @ Georgia Tech. Fun person, serious work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Surendra",
    description:
      "Co-founder of Invexs AI, incoming MS Econ @ Georgia Tech. Fun person, serious work.",
  },
};

// schema.org Person/ProfilePage so search engines understand the entity behind
// the site. Facts only — sourced from the same data the page renders.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  alternateName: "Sai Surendra",
  url: SITE_URL,
  jobTitle: "Co-founder",
  worksFor: { "@type": "Organization", name: "Invexs AI", url: LINKS.invexs },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Georgia, Terry College of Business",
    },
    { "@type": "CollegeOrUniversity", name: "Georgia Institute of Technology" },
  ],
  knowsAbout: [
    "Quantitative Finance",
    "Machine Learning",
    "Economics",
    "Startups",
    "AI Agents",
  ],
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.invexs],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:border-2 focus:border-ink focus:bg-surface focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-ink focus:shadow-block"
        >
          Skip to content
        </a>
        <BootScreen />
        <InteractiveProvider>{children}</InteractiveProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
