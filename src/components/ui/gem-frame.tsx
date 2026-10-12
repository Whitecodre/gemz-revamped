import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type GemFrameProps = HTMLAttributes<HTMLDivElement> & {
  // Lift and glow on hover.
  interactive?: boolean;
};

// The gem-cut card shape, shared by Card, BentoTile and SpotlightCard.
//
// Three layers, outside in:
//  1. outer: lifts on hover and carries a drop-shadow. A normal box-shadow can't
//     be used on the cut shapes, because clip-path would slice it off; a
//     drop-shadow filter on the OUTER element follows the cut outline instead.
//  2. border layer: the same cut shape filled with the border colour, with 1px of
//     padding. The card sits inside it, so the 1px of colour left showing around
//     the edge IS the border, including on the diagonals (CSS borders can't
//     follow a clip-path).
//  3. card: the same cut shape again, with the real background and content.
//
// Inside the card, a flat low-opacity triangle is the "facet plane": a gem's
// surface catching the light. `-z-10` puts it behind the content, which works
// because the card is `isolate` (it has its own stacking context).
export function GemFrame({
  interactive = true,
  className,
  children,
  ...props
}: GemFrameProps) {
  return (
    <div
      className={cn(
        "group/gem h-full transition-[transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        interactive &&
          "hover:drop-shadow-[0_18px_28px_var(--glow)] motion-safe:hover:-translate-y-1",
      )}
    >
      <div className="clip-gem h-full bg-line p-px transition-colors duration-300 group-hover/gem:bg-accent/60">
        <div
          className={cn(
            "clip-gem relative isolate h-full overflow-hidden bg-surface-raised p-6 sm:p-7",
            className,
          )}
          {...props}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-accent/[0.07] transition-colors duration-300 group-hover/gem:bg-accent/[0.13] [clip-path:polygon(0_0,100%_0,0_100%)]"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
