// Achievement definitions (spec §6.2). Copy is DRAFT — Psy approves at Gate 5.
// Triggers live in InteractiveProvider; "konami" is registered here but its
// trigger is wired in Phase 6 (the hero-name / Konami easter egg, §6.5).

export type AchievementId =
  | "hello-world"
  | "tourist"
  | "speedrun"
  | "hacker-voice"
  | "night-owl"
  | "high-score"
  | "arcade-play"
  | "win-in-3"
  | "win-in-2"
  | "win-in-1"
  | "konami";

export type Achievement = {
  id: AchievementId;
  title: string;
  description: string;
  // Hidden achievements show as "???" in the trophy list until unlocked.
  hidden?: boolean;
};

// Display order in the `trophies` list.
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "hello-world",
    title: "Hello World",
    description: "Loaded the page for the first time. Welcome aboard.",
  },
  {
    id: "tourist",
    title: "Tourist",
    description: "Scrolled through every section. Thorough.",
  },
  {
    id: "speedrun",
    title: "Speedrun: Any%",
    description: "Grabbed the resume within 30 seconds of landing. Efficient.",
  },
  {
    id: "hacker-voice",
    title: "Hacker Voice: I'm In",
    description: "Opened the terminal.",
  },
  {
    id: "night-owl",
    title: "Night Owl",
    description: "Loaded nighttime.sav. Easy on the eyes.",
  },
  {
    id: "high-score",
    title: "High Score",
    description: "Beat the number-guessing game.",
  },
  {
    id: "arcade-play",
    title: "Insert Coin",
    description: "Fired up the number-guessing game. The clock is running.",
  },
  {
    id: "win-in-3",
    title: "Good Guess",
    description: "Nailed it in three. You've got a feel for this.",
    hidden: true,
  },
  {
    id: "win-in-2",
    title: "Read My Mind",
    description: "Two guesses. Practically telepathy.",
    hidden: true,
  },
  {
    id: "win-in-1",
    title: "Beginner's Luck",
    description: "First try. One in a hundred. We're not asking questions.",
    hidden: true,
  },
  {
    id: "konami",
    title: "Konami Coder",
    description: "Found the hidden thing. Nicely done.",
    hidden: true,
  },
];

export const ACHIEVEMENT_MAP: Record<AchievementId, Achievement> =
  Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a])) as Record<
    AchievementId,
    Achievement
  >;
