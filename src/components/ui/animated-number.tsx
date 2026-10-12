"use client";

// Client Component: it watches the scroll position (useInView) and updates
// the number on screen over time, both of which only happen in the browser.

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { ease } from "@/lib/motion";

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

// Counts up from 0 to `value` the first time it scrolls into view.
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  // useRef gives us the real DOM element, which useInView needs to observe.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // animate() runs outside React and calls onUpdate each frame.
    // Visitors who prefer reduced motion get a near-instant count.
    const controls = animate(0, value, {
      duration: reduceMotion ? 0.01 : 1.6,
      ease,
      onUpdate: setDisplay,
    });
    // Cleanup: stop the animation if the component disappears mid-count.
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {/* tabular-nums keeps every digit the same width, so the number doesn't jitter */}
      <span className="tabular-nums">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
