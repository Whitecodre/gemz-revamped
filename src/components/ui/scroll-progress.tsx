"use client";

// Client Component: reads the page's scroll position, a browser-only value.

import { motion, useScroll, useSpring } from "motion/react";

// A thin bar at the very top that fills as you read down the page.
// useSpring smooths the raw scroll value so the bar glides instead of jumping.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-brand-600 via-accent-400 to-glow-400"
    />
  );
}
