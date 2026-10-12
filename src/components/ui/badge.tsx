import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "accent" | "neutral" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  accent: "border-accent/30 bg-accent-soft text-accent-ink",
  neutral: "border-line bg-surface-sunken text-ink-body",
  danger: "border-danger-ink/20 bg-danger-soft text-danger-ink",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ tone = "accent", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
