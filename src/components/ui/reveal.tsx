"use client";

// "use client" is needed because motion elements use browser features
// (IntersectionObserver for "when scrolled into view"). Server Components can
// still be passed in as `children`: they render on the server, and this wrapper
// only adds the animation around them.

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { baseTransition, fadeUp, stagger } from "@/lib/motion";

// Which HTML element to render. Lets a RevealGroup be a real <ol> and each
// RevealItem a real <li>, so lists stay valid HTML.
type RevealElement = "div" | "ul" | "ol" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  // Seconds to wait before starting, to sequence a few separate elements.
  delay?: number;
  as?: RevealElement;
};

// Fades in and rises a few pixels the first time it scrolls into view.
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: RevealElement;
};

// A parent and its items share variant names ("hidden" / "visible"). When the
// parent switches to "visible", every RevealItem inside follows, one after
// another (the stagger timing lives in src/lib/motion.ts).
export function RevealGroup({ children, className, as = "div" }: RevealGroupProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: RevealGroupProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
