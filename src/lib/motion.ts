import type { Transition, Variants } from "motion/react";

// One shared feel for the whole site: gentle, short, never bouncy.
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

// Fade in while rising a few pixels. Used by Reveal.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

// A parent that reveals its children one after another.
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Small hover/tap feedback for buttons and cards.
export const hoverLift = { y: -2 } as const;
export const tapPress = { scale: 0.98 } as const;
