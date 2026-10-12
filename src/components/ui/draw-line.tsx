"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

// A thin line that draws itself left to right when it scrolls into view.
// It animates scaleX (a cheap transform), anchored on the left with origin-left.
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px origin-left bg-linear-to-r from-accent via-line-strong to-transparent", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.4, ease }}
    />
  );
}
