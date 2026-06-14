// quest_log.sav RPG quest framing (§4.6). Editable so Sai updates without
// touching components. Active quests use honest "in progress" bars rather than
// invented percentages; set real progress at Gate 3 if desired.

export type Quest = {
  title: string;
  detail?: string;
  progress?: number; // omit => indeterminate bar
  caption?: string;
};

export const MAIN_QUEST: Quest = {
  title: "GT MS Economics",
  detail: "Begins August 2026",
  caption: "QUEUED",
};

export const ACTIVE_QUESTS: Quest[] = [
  { title: "GRE: 165+ Quant", detail: "Test in September", caption: "IN PROGRESS" },
  { title: "Real Analysis (Abbott)", detail: "Understanding Analysis", caption: "IN PROGRESS" },
  { title: "Karpathy: Zero to Hero", detail: "Target: end of June", caption: "IN PROGRESS" },
  { title: "Stanford CS224n", detail: "Starts July 1", caption: "QUEUED" },
];
