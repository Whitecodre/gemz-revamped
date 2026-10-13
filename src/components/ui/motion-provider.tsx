"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Context providers need hooks, so they are Client Components. Because
// `children` is passed through, the pages inside can still be Server Components.
//
// MotionConfig reducedMotion="user": if the visitor's OS asks for less motion,
// movement animations are switched off automatically for every component below.
//
// LazyMotion + the small `m` components (instead of `motion`) keep the animation
// engine small. domAnimation covers what the page still animates with JavaScript
// (menu open and close, exit animations, hover and tap, springs). The heavier
// layout and drag features are not included, and are not needed. It is loaded
// together with the page rather than afterwards: loading it late made every animated
// element re-render at once and slowed the page down.
// `strict` makes any leftover `motion.*` component throw an error in development.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
