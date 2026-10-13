import { cn } from "@/lib/cn";

// A thin line that draws itself left to right as it scrolls into view. A Server
// Component: the drawing is a CSS scroll-driven animation (.draw-x in globals.css),
// and origin-left anchors the scaling on the left edge. Where that CSS isn't
// supported, the line is simply shown fully drawn.
export function DrawLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "draw-x h-px origin-left bg-linear-to-r from-accent via-line-strong to-transparent",
        className,
      )}
    />
  );
}
