// skill_tree.exe — equipped skills + active "leveling up" tracks.
// Equipped = real inventory from Sai's résumé. Leveling-up = current grind.
// SERIOUS copy (§0): no invented proficiency numbers — leveling bars are
// honest indeterminate ("LEVELING UP") rather than fake percentages.

export type SkillGroup = {
  id: string;
  label: string; // mono group label
  skills: string[];
};

export const EQUIPPED: SkillGroup[] = [
  {
    id: "languages",
    label: "languages/",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "R"],
  },
  {
    id: "build",
    label: "build/",
    skills: ["Next.js", "React", "Tailwind", "Git", "AWS", "Azure", "Tableau", "Power BI"],
  },
  {
    id: "finance",
    label: "finance/",
    skills: [
      "3-Statement Modeling",
      "DCF",
      "Comparable Company Analysis",
      "LBO Fundamentals",
      "Unit Economics",
      "Due Diligence",
      "Portfolio Theory (CAPM · Sharpe · Alpha/Beta)",
    ],
  },
];

// Currently leveling up — rendered as barber-pole "LEVELING UP" bars.
export const LEVELING_UP: string[] = [
  "Python",
  "TypeScript",
  "Java",
  "C",
  "C++",
  "CSS",
];
