// Terminal copy (spec §5). ALL of this is DRAFT humor — Psy approves at Gate 5.
// Section summaries stay factual (persona rule §0: chrome is playful, content is not).

// `whoami`
export const WHOAMI =
  "sai: co-founder @ Invexs AI. Builds to learn. Currently caffeinated.";

// `joke` — rotates through these one at a time.
export const JOKES: string[] = [
  "I don't always test my code, but when I do, it's in production. (kidding. mostly.)",
  "There are 10 kinds of people: those who read binary, and those who don't.",
  "Finance major who learned to code so the spreadsheets would stop judging him.",
  "Real Analysis proof status: still loading. please hold.",
  "It's not procrastinating if the backtest is still running.",
  "I named a variable `temp` in 2023. it's load-bearing now.",
];

// `sudo hire me` — prints these lines, then scrolls to the contact section.
export const SUDO_HIRE_ME: string[] = [
  "[sudo] password for recruiter: ********",
  "Access granted. Excellent taste.",
  "Opening guestbook.txt …",
];

// Factual one-liners printed by the section commands before scrolling.
export const SECTION_SUMMARIES: Record<string, string> = {
  about:
    "Neuroscience → business at UGA Terry → building startups, trading systems, and ML pipelines.",
  experience:
    "Invexs AI (co-founder), Quarstech, Dallas Venture Capital, Farely. See career.log.",
  invexs:
    "Invexs AI: an enterprise AI agent control plane, built through Georgia Tech CREATE-X.",
  projects:
    "Stockify Analytics, NexusAI, Alpha Signal, EffiPay, and a couple of private builds.",
  contact: "Drop a line in the guestbook. It lands straight in my inbox.",
};
