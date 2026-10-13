"use client";

// Client Component: it reads the scroll position and reacts to a click, both of
// which only exist in the browser.

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { spring } from "@/lib/motion";

// How far down (in px) before the button appears: roughly one screen, so it is
// never on screen at the top where it would only be clutter.
const SHOW_AFTER = 600;

// A floating "back to top" button. A thin ring around it fills as you scroll
// down the page, so it doubles as a progress indicator.
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  // scrollY: pixels scrolled. scrollYProgress: 0 at the top to 1 at the bottom.
  const { scrollY, scrollYProgress } = useScroll();

  // Only update React state when crossing the threshold, not on every pixel.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > SHOW_AFTER;
    if (next !== visible) setVisible(next);
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          aria-label="Back to top"
          // No `behavior` option: the browser follows the page's CSS, which is
          // smooth scrolling unless the visitor asked their OS for reduced motion.
          onClick={() => window.scrollTo({ top: 0 })}
          // data-tone="light": the button floats over every section, so it keeps
          // one consistent light look instead of changing with what is behind it.
          data-tone="light"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={spring.snappy}
          className="group fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border border-line bg-surface-raised text-accent-ink shadow-[0_10px_30px_-10px_rgb(15_23_43/0.35)] transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none sm:right-6 sm:bottom-6"
        >
          {/* The ring is drawn in a 48x48 box. -rotate-90 starts it at 12 o'clock. */}
          <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-line" />
            {/* pathLength is a motion value: the stroke is drawn from 0 to 100% as
                scrollYProgress goes from 0 to 1. */}
            <m.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-accent"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp
            aria-hidden="true"
            className="size-5 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5"
          />
        </m.button>
      )}
    </AnimatePresence>
  );
}
