import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

// These used to be JavaScript animations (one animated component per element, each
// watching for "scrolled into view"). They are now plain elements with a CSS class
// (see "Scroll-driven effects" in globals.css), so they are Server Components and
// ship no JavaScript at all. The rise-and-fade follows the scroll position, and
// browsers without support for it just show the content as normal.

// Which HTML element to render. Lets a RevealGroup be a real <ol> and each
// RevealItem a real <li>, so lists stay valid HTML.
type RevealElement = "div" | "ul" | "ol" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  // Kept so existing callers still compile. The effect is now tied to scrolling,
  // not to time, so a delay no longer applies.
  delay?: number;
  as?: RevealElement;
};

// Fades in and rises a few pixels as it scrolls into view.
export function Reveal({ children, className, as: Tag = "div" }: RevealProps) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: RevealElement;
  // Kept for compatibility; see above.
  delay?: number;
};

// A wrapper for a set of RevealItems. Each item reveals on its own as it enters
// the screen, so items further down simply appear a little later: a natural
// stagger without any timing code.
export function RevealGroup({ children, className, as: Tag = "div" }: RevealGroupProps) {
  return <Tag className={className}>{children}</Tag>;
}

export function RevealItem({ children, className, as: Tag = "div" }: RevealGroupProps) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
