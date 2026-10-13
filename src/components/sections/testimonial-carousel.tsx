import { Quote } from "lucide-react";

import { GemFrame } from "@/components/ui/gem-frame";
import { Marquee } from "@/components/ui/marquee";
import type { TestimonialEntry } from "@/lib/testimonials";

// How many cards the strip should contain at minimum. The Marquee scrolls a strip
// and needs it to be wider than the screen, or an empty gap shows before the
// loop restarts. With few real testimonials, the same ones are repeated.
const MIN_CARDS = 6;

// A row of gem-cut testimonial cards that drifts sideways by itself. There are no
// arrows, dots or counter, so nothing on screen says how many testimonials exist.
// It pauses while the pointer is over it. Pure CSS, so this is a Server Component.
export function TestimonialCarousel({ items }: { items: TestimonialEntry[] }) {
  const repeats = Math.max(1, Math.ceil(MIN_CARDS / items.length));
  const cards = Array.from({ length: repeats }).flatMap((_, copy) =>
    items.map((item) => ({ item, copy })),
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      {/* motion-reduce:overflow-x-auto: for visitors who ask their OS for less
          motion the strip stops moving (see globals.css), so it becomes a normal
          scrollable row instead of hiding the cards beyond the edge. */}
      <Marquee duration={50} className="py-4 motion-reduce:overflow-x-auto">
        {cards.map(({ item, copy }) => {
          const { quote, name, role, organisation } = item;
          const initials = name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2);

          return (
            // The repeats are decoration: aria-hidden keeps screen readers from
            // reading the same testimonial several times.
            <div
              key={`${copy}-${name}-${role}`}
              aria-hidden={copy > 0 ? true : undefined}
              className="w-76 shrink-0 sm:w-96"
            >
              <GemFrame interactive={false} className="sm:p-8">
                {/* <figure>, <blockquote> and <figcaption> are the semantic HTML for a
                    quotation and its source. */}
                <figure className="flex h-full flex-col text-left">
                  <Quote aria-hidden="true" className="size-7 text-accent" />
                  <blockquote className="mt-5 flex-1 leading-7 text-pretty text-ink">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent-ink"
                    >
                      {initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-ink">{name}</span>
                      <span className="block text-sm text-ink-muted">
                        {organisation ? `${role}, ${organisation}` : role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </GemFrame>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
