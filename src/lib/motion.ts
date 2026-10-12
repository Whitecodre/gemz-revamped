import type { Transition, Variants } from "motion/react";

// One shared feel for the whole site: smooth, calm, never bouncy.
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
} as const;

export const baseTransition: Transition = {
  duration: duration.base,
  ease,
};

// Springs feel more physical than fixed durations: they settle naturally.
// `soft` for things that move into place, `snappy` for UI that follows input.
export const spring = {
  soft: { type: "spring", stiffness: 140, damping: 22, mass: 0.9 },
  snappy: { type: "spring", stiffness: 420, damping: 34 },
} satisfies Record<string, Transition>;

// Fade in while rising a few pixels. Used by Reveal.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

// A parent that reveals its children one after another.
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
