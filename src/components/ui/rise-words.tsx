import { Fragment } from "react";

import { cn } from "@/lib/cn";

type RiseWordsProps = {
  text: string;
  // Seconds before the first word starts.
  delay?: number;
  // Paint the words with the brand gradient.
  gradient?: boolean;
};

// A headline whose words slide up from behind a mask, one after another: the same
// look as RevealWords, but done with a CSS animation instead of JavaScript.
// That makes it a Server Component: the headline is plain visible text in the HTML
// and the animation starts on the first paint, without waiting for any script.
// (The words are real text, so screen readers and search engines read them as is.)
export function RiseWords({ text, delay = 0, gradient = false }: RiseWordsProps) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          {/* The outer span is the mask (overflow-hidden); the inner one moves. The
              padding stops the mask clipping descenders (g, y, p) and the negative
              margin cancels it so line spacing is unchanged. */}
          <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
            <span
              // The gradient goes on the animated word itself. Put on a parent, it
              // would not show: `background-clip: text` ignores children that are
              // being animated.
              className={cn("inline-block animate-word-rise", gradient && "text-gradient")}
              style={{ animationDelay: `${delay + index * 0.06}s` }}
            >
              {word}
            </span>
          </span>
          {/* The space between words lives OUTSIDE the inline-blocks. A space at the
              end of an inline-block is collapsed away, which glued the words together. */}
          {" "}
        </Fragment>
      ))}
    </>
  );
}
