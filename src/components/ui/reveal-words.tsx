"use client";

import { type Variants } from "motion/react";
import * as m from "motion/react-m";

import { ease } from "@/lib/motion";

type RevealWordsProps = {
  text: string;
  className?: string;
  // Seconds before the first word starts.
  delay?: number;
};

const container = (delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
});

// Each word slides up from behind a mask, one after another. The outer span of
// each word has overflow-hidden (the mask); the inner span is what moves.
const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease } },
};

// For headlines. Screen readers get the plain text (sr-only); the animated
// copy is hidden from them, so they don't hear the words one by one.
export function RevealWords({ text, className, delay = 0 }: RevealWordsProps) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        className={className}
        variants={container(delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {text.split(" ").map((item, index) => (
          // The negative margin cancels the padding so line spacing is unchanged;
          // the padding stops the mask from clipping descenders (g, y, p).
          <span key={index} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
            <m.span className="inline-block" variants={word}>
              {item}
              {" "}
            </m.span>
          </span>
        ))}
      </m.span>
    </>
  );
}
