"use client";

// Client Component: it reacts to scrolling, hovering and the mobile menu
// toggle, which all need state and browser events.

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Gem, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { baseTransition, spring } from "@/lib/motion";
import { Button } from "./button";
import { Container } from "./container";

export type NavItem = { label: string; href: string };

type NavbarProps = {
  items: NavItem[];
  cta?: NavItem;
};

export function Navbar({ items, cta }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Which in-page section is currently on screen (for the "you are here" underline).
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const panelId = useId();

  // useScroll gives a motion value; useMotionValueEvent listens to it and we
  // only update React state when crossing the threshold, not on every pixel.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 12;
    if (next !== scrolled) setScrolled(next);
  });

  // Scroll-spy: IntersectionObserver tells us when a section crosses a thin band
  // around the middle of the screen. We watch every section the nav links to.
  useEffect(() => {
    const targets = items
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((element): element is Element => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            setActiveHref(href);
          } else {
            // Leaving a section clears it, unless a newer section already took over.
            setActiveHref((current) => (current === href ? null : current));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    // Cleanup: stop observing when the Navbar unmounts.
    return () => observer.disconnect();
  }, [items]);

  // Close the mobile menu with Escape. The cleanup removes the listener.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    // data-tone="light" keeps the bar readable over any section below it.
    <header data-tone="light" className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-line bg-surface/80 shadow-[0_8px_30px_-12px_rgb(15_23_43/0.12)] backdrop-blur-xl"
            : "border-transparent bg-surface/0",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-2.5 rounded-full pr-2 text-lg font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-brand-500 to-brand-800 text-white transition-transform duration-300 motion-safe:group-hover:rotate-12">
              <Gem className="size-4.5" aria-hidden="true" />
            </span>
            Gemz
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // Plain text links: no hover background. The colour change is the
                // hover feedback. `min-h-11` keeps a 44px-tall hit area without
                // adding any visible padding.
                className="relative inline-flex min-h-11 items-center text-sm font-medium text-ink-body transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                {item.label}
                {/* A single underline (shared layoutId) slides to the active section's link. */}
                {activeHref === item.href && (
                  <motion.span
                    layoutId={`${panelId}-active`}
                    transition={spring.snappy}
                    className="absolute inset-x-0 bottom-1.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Hide a wrapper, not the Button: Button already sets `inline-flex`,
                and `hidden` + `inline-flex` on one element conflict. */}
            {cta && (
              <div className="hidden md:block">
                <Button href={cta.href} size="sm" arrow>
                  {cta.label}
                </Button>
              </div>
            )}
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((current) => !current)}
            >
              {/* The icon swaps with a quick rotate so the change is felt, not just seen. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {open && (
            <motion.nav
              id={panelId}
              aria-label="Mobile"
              className="overflow-hidden border-t border-line md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={baseTransition}
            >
              <Container className="flex flex-col gap-1 py-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...baseTransition, delay: 0.04 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-4 font-medium text-ink transition-colors hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {cta && (
                  <Button href={cta.href} arrow className="mt-3" onClick={() => setOpen(false)}>
                    {cta.label}
                  </Button>
                )}
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
