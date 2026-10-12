import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { GemFrame } from "./gem-frame";

// A bento layout: tiles of different sizes in one grid, so a section can mix a
// big story, a number, a status and a quote instead of repeating identical cards.
// You choose each tile's size with its className, e.g.
//   lg:col-span-4 lg:row-span-2   (wide and tall)
//   lg:col-span-2                 (small)
// The grid has 6 columns on large screens, 2 on tablets and 1 on phones.
export function BentoGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(10rem,auto)]",
        className,
      )}
      {...props}
    />
  );
}

type BentoTileProps = HTMLAttributes<HTMLDivElement> & {
  // Uses the gem-cut shape: chamfered corners and a facet plane.
  facet?: boolean;
};

export function BentoTile({ facet = false, className, ...props }: BentoTileProps) {
  if (facet) {
    return <GemFrame interactive={false} className={className} {...props} />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface-raised p-6 sm:p-7",
        "transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_20px_40px_-24px_var(--glow)]",
        className,
      )}
      {...props}
    />
  );
}
