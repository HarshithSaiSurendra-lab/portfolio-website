// resume.pdf — structured mirror of the canonical one-pager
// (~/Downloads/resume/Harshith Sai Surendra Resume.pdf). This is the single
// source of truth for the /resume HTML page. SERIOUS copy (§0): faithful to the
// PDF, real numbers only — do not embellish. The downloadable PDF at
// /resume.pdf is the exact same document.

export const RESUME_NAME = "Harshith Sai Surendra";

// Contact line as it appears on the PDF header. Phone kept per Psy (no street
// address exists on the résumé, so nothing sensitive to redact).
export const RESUME_CONTACT = {
  phone: "(678) 793-4160",
  email: "harshithsai.surendra@gmail.com",
  linkedin: "linkedin.com/in/harshith-surendra",
  linkedinUrl: "https://www.linkedin.com/in/harshith-surendra/",
  citizenship: "U.S. Citizen",
  github: "github.com/HarshithSaiSurendra-lab",
  githubUrl: "https://github.com/HarshithSaiSurendra-lab",
};

export type EduEntry = {
  school: string;
  detail: string;
  location: string;
  period: string;
  notes: string[];
};

export const RESUME_EDUCATION: EduEntry[] = [
  {
    school: "University of Georgia, Terry College of Business",
    detail: "Bachelor of Business Administration; Concentration in Management",
    location: "Athens, GA",
    period: "Expected May 2026",
    notes: [
      "HOPE Scholarship · National President's List · Presidential Volunteer Award",
      "Prior coursework completed at Georgia State University, J. Mack Robinson College of Business",
    ],
  },
  {
    school: "Georgia Institute of Technology, Create-X Startup Launch",
    detail: "Entrepreneurship Accelerator and Venture-Backed Founder (2 startups)",
    location: "Atlanta, GA",
    period: "January 2026 – Present",
    notes: [
      "Selected into GT's flagship startup program (top 10% acceptance rate) with weekly mentorship from venture coaches",
    ],
  },
];

export type ResumeJob = {
  company: string;
  tagline?: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
};

export const RESUME_EXPERIENCE: ResumeJob[] = [
  {
    company: "Invexs AI",
    tagline: "AI Agent Fleet Control Platform",
    role: "Co-Founder & CFO | Built within Georgia Tech CREATE-X Startup Launch",
    location: "Atlanta, GA",
    period: "Jan 2026 – Present",
    bullets: [
      "Building enterprise platform providing real-time monitoring, cost attribution, and governance for autonomous AI agent fleets; targeting VP-level platform engineering buyers at banks, fintechs, and enterprise tech firms.",
      "Refined product-market fit through continuous customer discovery and competitive analysis across TAM, unit economics, and positioning; currently onboarding pilot customers for free-tier testing and structured feedback.",
      "Modeled unit economics and pricing scenarios for usage-based SaaS revenue across enterprise tiers; built 3-statement financial projections and investor-ready KPI dashboard to support active fundraising conversations with institutional investors.",
      "Led technical product specification (Go/GCP, PostgreSQL, Python SDK, React) and shipped production landing page in Next.js 14 with complete Tailwind design system.",
    ],
  },
  {
    company: "Farely",
    tagline: "Membership-Based Rideshare Platform",
    role: "Co-Founder & CFO | Built before Georgia Tech CREATE-X Startup Launch",
    location: "Atlanta, GA",
    period: "May 2025 – Dec 2025",
    bullets: [
      "Developed a membership-based marketplace model challenging per-ride commission structures of Uber/Lyft; earned acceptance into CREATE-X to receive seed capital and professional venture resources.",
      "Built an 8-month financial model (3-statement + unit economics) with rider/driver segmentation and take-rate scenarios; sensitivity analysis modeled projected CAC reduction and improved driver retention relative to incumbent pricing structures.",
      "Designed a fare strategy ~5% below incumbents while protecting driver earnings; built CAC/LTV payback framework in an investor-ready dashboard modeling projected YoY revenue growth across funding scenarios.",
    ],
  },
  {
    company: "Dallas Venture Capital",
    role: "Investment Summer Analyst",
    location: "Irving, TX",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Supported Series A due diligence for Docyt, an AI-powered accounting automation platform; built DCF valuation model, analyzed financial viability, and assessed strategic synergies to inform investment sizing and terms.",
      "Sourced early-stage SaaS and FinTech deals through market sizing and competitive analysis; automated data-driven pipeline reports visualizing deal-level KPIs across 20+ active opportunities.",
    ],
  },
  {
    company: "Quarstech",
    role: "Consulting Intern",
    location: "Atlanta, GA",
    period: "Sep 2023 – May 2024",
    bullets: [
      "Performed P&L analysis across operations and vendor-related cost centers, supporting oversight of $500K in departmental budgets; identified inefficiencies in vendor spend and workflow processes, contributing to $37K in annual cost savings.",
      "Identified process inefficiencies across project workflows through structured cost-driver analysis; developed recommendations that reduced operational lag and improved resource utilization across key departments.",
    ],
  },
];

export type ResumeProject = {
  name: string;
  tagline: string;
  period: string;
  bullets: string[];
};

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    name: "Stockify Analytics",
    tagline: "Quantitative Trading Strategy Using LLMs",
    period: "June 2024 – Present",
    bullets: [
      "Engineered a long/short equity strategy leveraging large language models to extract sentiment signals from 10-K filings and SEC disclosures; constructed thematic factors including supply chain risk and executive tone to model impacts on equity returns and volatility. Conducted a 15-month backtest on QuantConnect, benchmarking against the S&P 500, achieving ~8% excess return with a Sharpe Ratio of 1.25 and controlled drawdowns.",
    ],
  },
  {
    name: "NexusAI",
    tagline: "SMB FinTech Operations Platform",
    period: "Sep 2025 – Present",
    bullets: [
      "Architected platform integrating Stripe and QuickBooks APIs for unified payroll, tax-filing, and financial record-keeping; built AI Copilot enabling natural language execution of complex financial and HR operations.",
    ],
  },
  {
    name: "EffiPay",
    tagline: "Multi-Account Rewards Optimizer",
    period: "Oct 2024 – Dec 2024",
    bullets: [
      "Built FinTech application using Plaid API to aggregate multi-account transaction data; developed rules engine for transaction categorization and recommendation algorithm to optimize credit card rewards across spending categories.",
    ],
  },
];

export type ResumeSkillLine = { label: string; value: string };

export const RESUME_ADDITIONAL: ResumeSkillLine[] = [
  {
    label: "Technical Skills",
    value:
      "Python (pandas, NumPy, scikit-learn), R, SQL, JavaScript, TypeScript, Java, C++, Excel (Regression, PivotTables), Tableau, Power BI, AWS, Microsoft Azure, Git, Next.js, React",
  },
  {
    label: "Financial Skills",
    value:
      "3-Statement Modeling, DCF, Comparable Company Analysis, LBO Fundamentals, Sensitivity Analysis, Unit Economics, Due Diligence, Investment Thesis Development, Portfolio Theory (CAPM, Sharpe Ratio, Alpha/Beta)",
  },
  {
    label: "Activities",
    value:
      "UGA Finance Society, Athens Student Investor's Club, GT Startup Exchange, Hindu YUVA, Entrepreneurship Society",
  },
  {
    label: "Interests",
    value: "Basketball, League of Legends, Soccer, Gym, Hip-Hop, History, Math",
  },
];
