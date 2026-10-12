"use client";

// Client Component: it reacts to the pointer, a browser-only event.

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { spring } from "@/lib/motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  // How strongly it follows the pointer (0.2 = 20% of the distance).
  strength?: number;
};

// Wrap a button to make it lean toward the cursor, then spring back.
// Use it only on the one or two most important actions on a page.
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring.soft);
  const y = useSpring(useMotionValue(0), spring.soft);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className ?? "inline-block"}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}
