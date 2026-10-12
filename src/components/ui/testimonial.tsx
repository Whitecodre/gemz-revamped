import { Quote } from "lucide-react";

import { cn } from "@/lib/cn";

type TestimonialProps = {
  quote: string;
  name: string;
  role: string;
  className?: string;
};

// <figure>, <blockquote> and <figcaption> are the semantic HTML for a
// quotation and its source, which helps screen readers and search engines.
export function Testimonial({ quote, name, role, className }: TestimonialProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-line bg-surface-raised p-6 sm:p-8",
        className,
      )}
    >
      <Quote className="size-7 text-accent" aria-hidden="true" />
      <blockquote className="mt-5 flex-1 text-lg leading-8 text-pretty text-ink">
        {quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent-ink"
        >
          {initials}
        </span>
        <span>
          <span className="block font-medium text-ink">{name}</span>
          <span className="block text-sm text-ink-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
