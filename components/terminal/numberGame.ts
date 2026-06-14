// The number-guessing game (spec §6.6) — a web port of the first program Sai
// ever wrote in Python. Lazy-loaded: this module is only fetched when a visitor
// runs `play` in the terminal, so it costs nothing until then (spec §8).
// Copy here is DRAFT humor — approved at Gate 5.

const BEST_KEY = "psy:guess-best"; // fewest guesses in a winning run

function readBest(): number | null {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

function writeBest(n: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    /* private mode etc. */
  }
}

const plural = (n: number) => (n === 1 ? "guess" : "guesses");

export type GuessResult = {
  lines: string[];
  /** Game is over — the terminal returns to the normal shell. */
  done: boolean;
  /** True only on a winning final guess (terminal unlocks "High Score"). */
  won: boolean;
};

export class NumberGame {
  private target = Math.floor(Math.random() * 100) + 1;
  private attempts = 0;

  /** Lines printed when the game starts. */
  intro(): string[] {
    const best = readBest();
    return [
      "+------------------------------------------+",
      "  NUMBER GUESSING GAME",
      "  The first thing Sai ever wrote in Python.",
      "  Now it runs in your browser. Full circle.",
      "+------------------------------------------+",
      "I'm thinking of a number between 1 and 100.",
      best
        ? `Best run so far: ${best} ${plural(best)}.`
        : "No best run yet — set the bar.",
      "Type a guess, or 'q' to quit.",
    ];
  }

  guess(raw: string): GuessResult {
    const input = raw.trim().toLowerCase();

    if (input === "q" || input === "quit" || input === "exit") {
      return {
        lines: [`Bailing out — the number was ${this.target}. No judgment.`],
        done: true,
        won: false,
      };
    }

    const n = Number(input);
    if (!Number.isInteger(n) || n < 1 || n > 100) {
      return {
        lines: ["That's not a whole number from 1 to 100. Try again."],
        done: false,
        won: false,
      };
    }

    this.attempts += 1;

    if (n < this.target) {
      return { lines: [`${n} is too low. Aim higher.`], done: false, won: false };
    }
    if (n > this.target) {
      return { lines: [`${n} is too high. Bring it down.`], done: false, won: false };
    }

    // Correct.
    const best = readBest();
    const isRecord = best === null || this.attempts < best;
    if (isRecord) writeBest(this.attempts);

    return {
      lines: [
        `Got it — ${this.target} in ${this.attempts} ${plural(this.attempts)}!`,
        isRecord
          ? "New best run. High score!"
          : `Best run still stands at ${best} ${plural(best as number)}.`,
      ],
      done: true,
      won: true,
    };
  }
}
