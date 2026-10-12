import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type IconBoxProps = {
  // You pass the icon component itself (icon={ShieldCheck}), not <ShieldCheck />.
  // The IconBox decides its size and colour, so every icon looks consistent.
  // This only works because IconBox is a Server Component: a component
  // (a function) can't be passed from a Server to a Client Component.
  icon: LucideIcon;
  // "gem" is the brand shape: an octagon cut like a gem, with a gradient fill.
  shape?: "gem" | "square";
  size?: "md" | "lg";
  className?: string;
};

export function IconBox({
  icon: Icon,
  shape = "gem",
  size = "md",
  className,
}: IconBoxProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center text-accent-ink",
        size === "md" ? "size-12" : "size-16",
        shape === "gem"
          ? "bg-linear-to-br from-accent/30 via-accent-soft to-accent/10 [clip-path:polygon(30%_0,70%_0,100%_30%,100%_70%,70%_100%,30%_100%,0_70%,0_30%)]"
          : "rounded-xl border border-accent/20 bg-accent-soft",
        className,
      )}
    >
      {/* aria-hidden: the icon is decoration; the text next to it carries the meaning */}
      <Icon className={size === "md" ? "size-5" : "size-7"} aria-hidden="true" />
    </div>
  );
}
