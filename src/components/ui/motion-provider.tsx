"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Context providers need hooks, so they are Client Components. Because
// `children` is passed through, the pages inside can still be Server Components.
// reducedMotion="user": if the visitor's OS asks for less motion, movement
// animations are switched off automatically for every component below.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
