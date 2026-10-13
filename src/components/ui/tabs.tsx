"use client";

// Client Component: which tab is selected is state (useState), and the
// keyboard handling and animated indicator run in the browser.

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { baseTransition, spring } from "@/lib/motion";

export type TabItem = {
  id: string;
  label: string;
  // An element (<Cloud />), not a component (Cloud): elements can be passed
  // from a Server Component to a Client Component, functions cannot.
  icon?: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  className?: string;
};

export function Tabs({ items, className }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  // Arrow keys move between tabs, as screen-reader users expect (WAI-ARIA tabs pattern).
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = items.findIndex((item) => item.id === activeId);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  }

  if (!active) return null;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface-sunken p-1 [scrollbar-width:none]"
      >
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {/* layoutId: Motion slides this pill from the old tab to the new one. */}
              {selected && (
                <m.span
                  layoutId={`${baseId}-pill`}
                  transition={spring.snappy}
                  className="absolute inset-0 rounded-full border border-line bg-surface-raised shadow-sm"
                />
              )}
              <span className="relative flex items-center gap-2 [&_svg]:size-4">
                {item.icon}
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={active.id}
          role="tabpanel"
          id={`${baseId}-panel-${active.id}`}
          aria-labelledby={`${baseId}-tab-${active.id}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={baseTransition}
          className="mt-8 focus-visible:outline-none"
        >
          {active.content}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
