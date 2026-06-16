// career.log chronological timeline (§4.3). SERIOUS copy (§0): real numbers only.
// Dates + bullets sourced from Sai's résumé (confirmed Gate 3).

export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  bullets: string[];
};

export const EXPERIENCE: Job[] = [
  {
    company: "Invexs AI",
    role: "Co-founder",
    period: "Jan 2026 – Present",
    location: "Atlanta, GA · Georgia Tech CREATE-X",
    current: true,
    bullets: [
      "Building an enterprise control plane for autonomous AI agent fleets: real-time monitoring, cost attribution, and governance.",
      "Modeled unit economics and built 3-statement projections + an investor-ready KPI dashboard for active fundraising.",
      "Led technical product spec (Go/GCP, PostgreSQL, Python SDK, React) and shipped the production landing page in Next.js 14.",
    ],
  },
  {
    company: "Farely",
    role: "Co-founder & CFO",
    period: "May 2025 – Dec 2025",
    location: "Atlanta, GA · Venture-backed by CREATE-X",
    bullets: [
      "Membership-based rideshare model challenging the per-ride commission structures of Uber/Lyft; accepted into CREATE-X.",
      "Built an 8-month, 3-statement + unit-economics model with rider/driver segmentation and take-rate scenarios.",
      "Designed a fare strategy ~5% below incumbents while protecting driver earnings, with a CAC/LTV payback framework.",
    ],
  },
  {
    company: "Dallas Venture Capital",
    role: "Investment Summer Analyst",
    period: "May 2025 – Aug 2025",
    location: "Irving, TX",
    bullets: [
      "Supported Series A due diligence for Docyt; built a DCF valuation model and assessed strategic synergies.",
      "Sourced early-stage SaaS/FinTech deals and automated deal-pipeline KPI reports across 20+ active opportunities.",
    ],
  },
  {
    company: "Quarstech",
    role: "Consulting Intern",
    period: "Sep 2023 – May 2024",
    location: "Atlanta, GA",
    bullets: [
      "Performed P&L analysis across operations and vendor cost centers, supporting oversight of ~$500K in departmental budgets.",
      "Identified vendor-spend and workflow inefficiencies contributing to ~$37K in annual cost savings.",
    ],
  },
];
