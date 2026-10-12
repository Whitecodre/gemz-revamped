import { cn } from "@/lib/cn";
import { DrawLine } from "./draw-line";
import { RevealGroup, RevealItem } from "./reveal";

export type Step = {
  title: string;
  description: string;
};

type StepsProps = {
  items: Step[];
  className?: string;
};

// A numbered process (discover, build, launch...). An ordered list (<ol>) tells
// screen readers the order matters. Stacks on phones, a row on large screens,
// where a line draws itself across the top as the steps come into view.
export function Steps({ items, className }: StepsProps) {
  return (
    <div className={className}>
      <DrawLine className="mb-6 hidden lg:block" />
      <RevealGroup
        as="ol"
        className={cn(
          "grid gap-4 lg:gap-6",
          items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {items.map((step, index) => (
          <RevealItem
            as="li"
            key={step.title}
            className="rounded-2xl border border-line bg-surface-raised p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-mono text-sm font-semibold text-accent-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-linear-to-r from-line-strong to-transparent"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 leading-7 text-ink-body">{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
