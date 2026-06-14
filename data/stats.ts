// RPG character sheet. Joke stats are about Sai-the-person, never the work (§0).
// Level = years of experience (Q5/Q9): first build = Aug 2024 → Level 1, ~80% XP.

export const CHARACTER = {
  className: "Founder / Econ-Mage multiclass",
  level: 1,
  xpPercent: 80, // progress toward Level 2
};

export type StatBar = {
  label: string;
  value?: number; // omit => indeterminate ("LEVELING UP")
  caption?: string;
  joke?: boolean;
};

export const STAT_BARS: StatBar[] = [
  { label: "Excel Wizardry", value: 100 },
  { label: "Spreadsheet Modeling", value: 90 },
  { label: "Python", caption: "LEVELING UP" }, // indeterminate
  { label: "Coffee Dependency", value: 95, joke: true },
  { label: "Sleep Schedule", value: 15, joke: true },
  { label: "Patience for Real Analysis Proofs", value: 40, joke: true },
];
