// The number-guessing game (spec §6.6) — a web port of the first program Sai
// ever wrote in Python. Lazy-loaded: only fetched when a visitor runs `play`,
// so it costs nothing otherwise (spec §8). Copy here is DRAFT — approved at the
// gate. Now timed + capped at 7 guesses so it can be lost, which makes the
// leaderboard and win-streaks meaningful.

import { MAX_TRIES } from "@/lib/leaderboard";

const plural = (n: number) => (n === 1 ? "guess" : "guesses");

export type GuessStatus = "continue" | "won" | "lost" | "quit";

export type GuessResult = {
  lines: string[];
  status: GuessStatus;
  /** Guesses used (meaningful on "won"/"lost"). */
  tries: number;
  /** Wall-clock ms from game start to this result (meaningful on "won"). */
  timeMs: number;
};

export class NumberGame {
  private target = Math.floor(Math.random() * 100) + 1;
  private attempts = 0;
  private start = Date.now();

  /** Lines printed when the game starts. */
  intro(): string[] {
    return [
      "+------------------------------------------+",
      "  NUMBER GUESSING GAME",
      "  The first thing Sai ever wrote in Python.",
      "  Now it runs in your browser. Full circle.",
      "+------------------------------------------+",
      "I'm thinking of a number between 1 and 100.",
      `You get ${MAX_TRIES} guesses. The clock is running.`,
      "Type a guess, or 'q' to quit.",
    ];
  }

  guess(raw: string): GuessResult {
    const input = raw.trim().toLowerCase();
    const timeMs = Date.now() - this.start;

    if (input === "q" || input === "quit" || input === "exit") {
      return {
        lines: [`Bailing out — the number was ${this.target}. No judgment.`],
        status: "quit",
        tries: this.attempts,
        timeMs,
      };
    }

    const n = Number(input);
    if (!Number.isInteger(n) || n < 1 || n > 100) {
      return {
        lines: ["That's not a whole number from 1 to 100. (doesn't cost a guess.)"],
        status: "continue",
        tries: this.attempts,
        timeMs,
      };
    }

    this.attempts += 1;
    const left = MAX_TRIES - this.attempts;

    if (n === this.target) {
      return {
        lines: [
          `Got it — ${this.target} in ${this.attempts} ${plural(this.attempts)}!`,
        ],
        status: "won",
        tries: this.attempts,
        timeMs: Date.now() - this.start,
      };
    }

    // Wrong guess — did they just burn their last one?
    if (left <= 0) {
      return {
        lines: [`Out of guesses. It was ${this.target}. Streak reset — run it back?`],
        status: "lost",
        tries: this.attempts,
        timeMs,
      };
    }

    const dir = n < this.target ? "too low. Aim higher." : "too high. Bring it down.";
    return {
      lines: [`${n} is ${dir} (${left} ${plural(left)} left)`],
      status: "continue",
      tries: this.attempts,
      timeMs,
    };
  }
}
