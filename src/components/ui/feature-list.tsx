import { Check } from "lucide-react";

import { cn } from "@/lib/cn";

type FeatureListProps = {
  items: string[];
  className?: string;
};

export function FeatureList({ items, className }: FeatureListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7 text-ink-body">
          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink">
            <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
