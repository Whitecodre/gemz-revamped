import { cn } from "@/lib/cn";
import { AnimatedNumber } from "./animated-number";

type StatCardProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
};

// A Server Component that renders a Client Component (AnimatedNumber) inside.
// Only the number ships JavaScript; the rest of the card is plain HTML.
export function StatCard({
  value,
  decimals,
  prefix,
  suffix,
  label,
  description,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface-raised p-6 sm:p-7",
        className,
      )}
    >
      <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
        <AnimatedNumber
          className="text-gradient"
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      </p>
      <p className="mt-3 font-medium text-ink">{label}</p>
      {description && (
        <p className="mt-1.5 text-sm leading-6 text-ink-muted">{description}</p>
      )}
    </div>
  );
}
