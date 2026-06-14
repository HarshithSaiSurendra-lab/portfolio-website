// skill_tree.exe: equipped inventory + proficiency bars.
// Equipped = real skill inventory from Sai's résumé.
// PROFICIENCY values are DRAFT (100 reads as "MASTER"); Sai confirms at Gate 4.

export type SkillGroup = {
  id: string;
  label: string; // mono group label
  skills: string[];
};

export const EQUIPPED: SkillGroup[] = [
  {
    id: "programming",
    label: "programming & tools/",
    skills: [
      "Python (pandas · NumPy · scikit-learn)",
      "TypeScript",
      "React",
      "Next.js",
      "SQL",
      "AWS",
      "OpenAI API",
      "Stripe · Plaid API",
    ],
  },
  {
    id: "finance",
    label: "finance & analytics/",
    skills: [
      "DCF",
      "LBO",
      "M&A",
      "Financial Modeling",
      "Econometrics",
      "Portfolio Theory (CAPM · Sharpe · Alpha/Beta)",
      "Forecasting",
    ],
  },
];

export type Proficiency = { label: string; value: number };

// Proficiency bars: 100 => "MASTER" badge (no bar); anything below shows a
// loading bar with the percent printed inside it.
// VALUES ARE MY ESTIMATE based on Sai's background — he verifies at Gate 4.
export const PROFICIENCY: Proficiency[] = [
  { label: "Excel", value: 100 },
  { label: "HTML & CSS", value: 82 },
  { label: "Python", value: 80 },
  { label: "React", value: 80 },
  { label: "Next.js", value: 80 },
  { label: "JavaScript", value: 78 },
  { label: "Tailwind CSS", value: 75 },
  { label: "SQL", value: 70 },
  { label: "TypeScript", value: 65 },
  { label: "R", value: 55 },
  { label: "C++", value: 30 },
];
