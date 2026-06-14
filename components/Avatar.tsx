import Image from "next/image";
import type { Accent } from "./WindowCard";

const ACCENT_VAR: Record<Accent, string> = {
  pink: "var(--accent-pink)",
  violet: "var(--accent-violet)",
  lime: "var(--accent-lime)",
};

// Flat-vector portrait of Sai (Lane A), background knocked out so the figure
// sits on the accent color and matches the site's window/sticker aesthetic.
// Source asset lives at /public/avatar.png.
export function Avatar({
  accent = "pink",
  className = "",
}: {
  accent?: Accent;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border-[3px] border-ink shadow-block ${className}`}
      style={{ backgroundColor: ACCENT_VAR[accent] }}
    >
      <Image
        src="/avatar.png"
        alt="Illustrated portrait of Sai Surendra"
        width={512}
        height={496}
        priority
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
