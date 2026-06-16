// Ticker tape content (chrome, playful per §0). DRAFT until Gate 3.
// Optional `accent` tags a line for color-coding in the marquee (a small accent
// block renders before it — the text itself stays ink for contrast).
export type TickerItem = { text: string; accent?: "cyan" | "violet" | "lime" };

export const TICKER_ITEMS: TickerItem[] = [
  { text: "SAI/USD ▲ +∞%", accent: "lime" },
  { text: "BUILDING INVEXS AI", accent: "violet" },
  { text: "GT MS ECON · FALL '26" },
  { text: "CURRENTLY DEBUGGING SOMETHING" },
  { text: "CURRENTLY BUILDING SOMETHING" },
  { text: "HOLDING: SPCX ▲ · NVDA ▲ · PLTR ▲ · GOOGL ▲", accent: "cyan" },
  { text: "2ND PLACE · AI ATL HACKATHON", accent: "lime" },
  { text: "STILL CONFUSED ABOUT REAL ANALYSIS PROOFS" },
  { text: "6 SIGNALS · 1 CONVICTION", accent: "violet" },
];
