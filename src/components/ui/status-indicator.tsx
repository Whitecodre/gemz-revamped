import { cn } from "@/lib/cn";

type StatusIndicatorProps = {
  label: string;
  className?: string;
};

// A live-looking status pill ("All systems operational"). The pulse is a CSS
// animation (animate-ping), so this stays a Server Component.
export function StatusIndicator({ label, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-raised/70 px-3.5 py-1.5 font-mono text-xs text-ink-body backdrop-blur",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}
