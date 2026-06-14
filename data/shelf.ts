// "Things I'm into" shelf: desktop folders that open small windows (§4.2).
// Humanizes; gives professors/PhD contacts a hook. [confirm] items at Gate 3.

export type ShelfFolder = {
  id: string;
  label: string; // folder name, mono
  blurb: string;
  items: string[];
};

export const SHELF: ShelfFolder[] = [
  {
    id: "books",
    label: "books/",
    blurb: "What's on the desk right now.",
    items: [
      "Understanding Analysis · Stephen Abbott",
      "Atomic Habits · James Clear",
      "The Art of War · Sun Tzu",
    ],
  },
  {
    id: "learning",
    label: "learning/",
    blurb: "Active self-study tracks.",
    items: [
      "Karpathy · Neural Networks: Zero to Hero",
      "Stanford CS224n · NLP with Deep Learning",
    ],
  },
  {
    id: "trading",
    label: "trading/",
    blurb: "The quant hobby bench.",
    items: [
      "6-indicator volume-flow system",
      "QuantConnect backtesting",
      "Market microstructure curiosity",
    ],
  },
  {
    id: "anime",
    label: "anime/",
    blurb: "Currently in the rotation.",
    items: [
      "Hunter x Hunter",
      "One Piece",
      "Naruto",
      "Fate series",
      "Attack on Titan",
      "Jujutsu Kaisen",
      "Now watching: Frieren · Witch Hat Atelier",
      "List's too long to fit. DM me for the rest!",
    ],
  },
];
