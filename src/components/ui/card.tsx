import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { GemFrame } from "./gem-frame";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  // Adds a lift and accent border on hover. Use only for cards that do something.
  interactive?: boolean;
  // Uses the gem-cut shape: chamfered corners and a facet plane.
  facet?: boolean;
};

export function Card({
  interactive = false,
  facet = false,
  className,
  ...props
}: CardProps) {
  if (facet) {
    return <GemFrame interactive={interactive} className={className} {...props} />;
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface-raised p-6 sm:p-7",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-line-strong hover:shadow-[0_20px_40px_-20px_var(--glow)] motion-safe:hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
