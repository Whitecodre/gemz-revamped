"use client";

// Client Component: it follows the mouse, which needs event handlers
// (onMouseMove) and motion values that update in the browser.

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { GemFrame } from "./gem-frame";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

// A gem-cut card with a soft glow that follows the cursor.
// Motion values (useMotionValue) change WITHOUT re-rendering React, so the
// glow can update 60 times a second and stay smooth.
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, var(--glow), transparent 70%)`;

  // GemFrame passes extra props to the card element itself, so `currentTarget`
  // here is the card, and its rectangle is the one we measure the cursor against.
  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <GemFrame onMouseMove={handleMouseMove} className={className}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/gem:opacity-100"
        style={{ background }}
      />
      {children}
    </GemFrame>
  );
}
