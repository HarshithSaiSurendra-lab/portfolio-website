// my_stuff/ projects as cartridges/floppies (§4.5). SERIOUS copy (§0).
// Public repos link out; CodeSlayer + Smart Glasses are private (PRIVATE_NOTE below).

export type Project = {
  name: string;
  blurb: string;
  highlights: string[];
  tech?: string;
  period?: string;
  repo?: string;
  private?: boolean; // true => private repo (lock badge, no link)
  status?: string; // e.g. "IN PROGRESS"
};

export const PROJECTS: Project[] = [
  {
    name: "Stockify Analytics",
    blurb:
      "A quantitative long/short equity strategy using LLMs to extract sentiment signals from 10-K filings and SEC disclosures.",
    highlights: [
      "15-month QuantConnect backtest",
      "~8% excess return vs S&P 500",
      "Sharpe 1.25",
    ],
    period: "Jun 2024 – Present",
    repo: "https://github.com/HarshithSaiSurendra-lab/Finance-Trading",
  },
  {
    name: "NexusAI",
    blurb:
      "An SMB FinTech operations platform integrating Stripe + QuickBooks for unified payroll, tax-filing, and bookkeeping, with an AI copilot for natural-language ops.",
    highlights: ["Stripe + QuickBooks APIs", "AI copilot", "Payroll + tax automation"],
    period: "Sep 2025 – Present",
    status: "IN PROGRESS",
    repo: "https://github.com/HarshithSaiSurendra-lab/NexusAI-SMB",
  },
  {
    name: "Alpha Signal",
    blurb: "Built solo at Hacklytics in 24 hours, with no CS background going in.",
    highlights: ["24h hackathon build", "SEC filings pipeline"],
    tech: "TypeScript",
    repo: "https://github.com/HarshithSaiSurendra-lab/hacklytics26",
  },
  {
    name: "EffiPay",
    blurb:
      "A multi-account rewards optimizer using the Plaid API to aggregate transactions and recommend the highest-earning card per spend category.",
    highlights: ["Plaid API", "Rules engine", "Rewards optimization"],
    period: "Oct 2024 – Dec 2024",
    repo: "https://github.com/HarshithSaiSurendra-lab/effipay",
  },
  {
    name: "CodeSlayer",
    blurb: "A terminal-based Python learning game, one of my game-building side quests.",
    highlights: ["Milestones 1 to 4", "149 passing tests"],
    private: true,
  },
  {
    name: "Smart Glasses AI Assistant",
    blurb: "A real-time conversation assistant for Meta smart glasses.",
    highlights: ["Concept / in progress", "Phase 1 prototype"],
    private: true,
    status: "IN PROGRESS",
  },
];

// Full-width "etc" note at the foot of the section.
export const PRIVATE_NOTE =
  "A fair bit lives in the private repos. If you want a closer look, DM me and I'll walk you through it.";
