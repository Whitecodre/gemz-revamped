"use client";

// Client Component: which project is selected is state (useState), and the
// keyboard handling and animated panel run in the browser.

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { GemFrame } from "@/components/ui/gem-frame";
import { cn } from "@/lib/cn";
import { baseTransition } from "@/lib/motion";

export type Project = {
  category: string;
  name: string;
  // The problem this kind of system solves for an organisation.
  need: string;
  // What was built.
  solution: string;
  // Optional short qualities shown as chips.
  highlights?: string[];
};

type WorkShowcaseProps = {
  projects: Project[];
  className?: string;
};

// A vertical tab list on the left, the selected project on the right. On a
// phone the list sits above the panel. It follows the WAI-ARIA tabs pattern:
// arrow keys move between tabs, and only the selected tab is in the tab order.
export function WorkShowcase({ projects, className }: WorkShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = projects[activeIndex];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (activeIndex + 1) % projects.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (activeIndex - 1 + projects.length) % projects.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = projects.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8", className)}>
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Projects"
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-2"
      >
        {projects.map((project, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={project.name}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative flex min-h-16 items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3 text-left transition-colors duration-200 sm:px-5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected
                  ? "border-accent/60 bg-surface-raised"
                  : "border-line bg-transparent hover:border-line-strong hover:bg-surface-raised/50",
              )}
            >
              {/* The accent bar on the selected project: a CSS fade, no animation library. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-1 bg-accent transition-opacity duration-200",
                  selected ? "opacity-100" : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "font-mono text-sm font-semibold transition-colors",
                  selected ? "text-accent-ink" : "text-ink-muted",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-semibold text-pretty transition-colors",
                    selected ? "text-ink" : "text-ink-body",
                  )}
                >
                  {project.name}
                </span>
                <span className="mt-0.5 block font-mono text-xs tracking-wider text-ink-muted uppercase">
                  {project.category}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={activeIndex}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={baseTransition}
          className="focus-visible:outline-none"
        >
          <GemFrame interactive={false} className="flex flex-col gap-6 sm:p-10 lg:min-h-104">
            <Badge className="self-start uppercase tracking-wider">{active.category}</Badge>

            <h3 className="text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
              {active.name}
            </h3>

            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">The need</p>
              <p className="mt-2 text-lg leading-8 text-pretty text-ink-body">{active.need}</p>
            </div>

            <div className="mt-auto border-t border-line pt-6">
              <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">What we built</p>
              <p className="mt-2 text-xl leading-8 font-medium text-pretty text-ink">
                {active.solution}
              </p>
              {active.highlights && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {active.highlights.map((highlight) => (
                    <li key={highlight}>
                      <Badge tone="neutral">{highlight}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </GemFrame>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
