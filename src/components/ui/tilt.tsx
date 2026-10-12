"use client";

// Client Component: it reads the pointer position, a browser-only event.

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";

import { spring } from "@/lib/motion";

type TiltProps = {
  children: ReactNode;
  className?: string;
  // Maximum rotation in degrees. Small numbers feel premium; big ones feel toy-like.
  max?: number;
};

// Tilts its children in 3D toward the pointer, like a physical object.
// Flow: pointer position -> motion values (x, y between -0.5 and 0.5)
//       -> mapped to degrees (useTransform) -> smoothed (useSpring) -> style.
// None of this re-renders React, so it stays smooth.
export function Tilt({ children, className, max = 10 }: TiltProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pointer on the right tilts the right edge away (rotateY positive), and so on.
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), spring.soft);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), spring.soft);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    // Touch has no hover, and tilting while scrolling would feel broken.
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}
