// RPG character sheet. Joke stats are about Sai-the-person, never the work (§0).
// Level = years of experience (Q5/Q9): first build = Aug 2024 → Level 1, ~80% XP.

export const CHARACTER = {
  className: "Finance",
  classSub: "Learning ML & CS",
  level: 1,
  xpPercent: 80, // progress toward Level 2
};

export type StatBar = {
  label: string;
  value: number; // 100 => "MASTER", otherwise a proficiency %
  caption?: string;
  joke?: boolean;
};

// Character sheet = personality stats only (real skill proficiency lives in the
// Skills section, per persona rule §0). DRAFT humor — Sai approves at Gate 4.
export const STAT_BARS: StatBar[] = [
  { label: "Tabs Open Right Now", value: 99, joke: true },
  { label: "Caffeine Reserves", value: 95, joke: true },
  { label: "Anime Knowledge", value: 92, joke: true },
  { label: "Shipping Velocity", value: 83, joke: true },
  { label: "Side-Quest Completion", value: 60, joke: true },
  { label: "Patience for Slow Backtests", value: 40, joke: true },
  { label: "Sleep Schedule", value: 15, joke: true },
];
