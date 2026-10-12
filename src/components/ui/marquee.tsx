import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type MarqueeProps = {
  children: ReactNode;
  // Seconds for one full loop. Larger = slower and calmer.
  duration?: number;
  className?: string;
};

// An endless horizontal strip (client logos, technologies). Pure CSS, so it
// stays a Server Component. The content is rendered twice and the track moves
// left by exactly half its width, so the loop has no visible jump.
export function Marquee({ children, duration = 40, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        {/* The copy is decorative, so screen readers only read the list once. */}
        <div aria-hidden="true" className="flex shrink-0 items-center gap-12 pr-12">
          {children}
        </div>
      </div>
    </div>
  );
}
