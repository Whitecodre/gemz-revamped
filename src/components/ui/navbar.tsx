"use client";

// Client Component: it reacts to scrolling, hovering and the mobile menu
// toggle, which all need state and browser events.

import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { cn } from "@/lib/cn";
import { baseTransition } from "@/lib/motion";
import { Button } from "./button";
import { Logo } from "./logo";
import type { Tone } from "./section";

export type NavItem = { label: string; href: string };

type NavbarProps = {
  items: NavItem[];
  cta?: NavItem;
  // The tone of whatever sits behind the bar at the top of the page. The bar has
  // no background there, so its text must contrast with that section.
  topTone?: Tone;
};

// Two states:
//  1. At the top: no background, full width, sitting on the hero.
//  2. Scrolled (or menu open): it condenses into a centred, frosted pill that
//     floats below the top edge. It is always light-toned, so it stays readable
//     over both dark and light sections.
export function Navbar({ items, cta, topTone = "dark" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Which in-page section is currently on screen (for the "you are here" underline).
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const panelId = useId();
  const floating = scrolled || open;

  // useScroll gives a motion value; useMotionValueEvent listens to it and we
  // only update React state when crossing the threshold, not on every pixel.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
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
    // `fixed` takes the bar out of the page flow so it can sit on top of the hero.
    // The header itself ignores the pointer (pointer-events-none) so the empty
    // strip beside the pill doesn't block clicks; the bar re-enables them.
    // data-tone switches every colour token inside: light text on the dark hero
    // at the top, dark text on the light pill once it floats.
    <header
      data-tone={floating ? "light" : topTone}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto overflow-hidden border",
          "transition-[width,max-width,margin,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          // One fixed radius, never animated. The floating bar is 56px (h-14) tall,
          // so 1.75rem (28px) makes it a perfect pill; when the menu opens the same
          // radius simply stays, giving a rounded card. (`rounded-full` is 9999px:
          // animating it down to a card radius looks like a circle until the very
          // end of the transition.)
          "rounded-[1.75rem]",
          floating
            ? "mt-3 w-[calc(100%-1.5rem)] max-w-4xl border-line shadow-[0_12px_40px_-12px_rgb(15_23_43/0.25)]"
            : "mt-0 w-full max-w-6xl border-transparent bg-surface/0",
          // Frosted while it is just a bar; solid once the menu is open, so the
          // page behind (dark hero text, glows) can't bleed through the links.
          floating && (open ? "bg-surface" : "bg-surface/85 backdrop-blur-xl"),
        )}
      >
        {/* Three columns from md up (logo | links | button) so the links are truly
            centred in the bar, not just pushed between two unequal neighbours. */}
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:grid md:grid-cols-[1fr_auto_1fr]",
            floating ? "h-14 px-3 sm:px-4" : "h-16 px-4 sm:px-6 lg:px-8",
          )}
        >
          <Logo className="justify-self-start" />

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {items.map((item) => (
              // A plain <a>, not <Link>: these are in-page anchors, and the browser
              // handles those reliably on every click (see Button for the reason).
              <a
                key={item.href}
                href={item.href}
                // Plain text links: no hover background. The colour change is the
                // hover feedback. `min-h-11` keeps a 44px-tall hit area without
                // adding any visible padding.
                className="relative inline-flex min-h-11 items-center text-sm font-medium text-ink-body transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                {item.label}
                {/* The underline of the section you are in. Every link has one, drawn
                    from the left when it becomes active: a CSS transition, so it needs
                    no animation library. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 bottom-1.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    activeHref === item.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            {/* Always visible, phone included: the main action should never be
                hidden behind the menu. */}
            {/* On phones: no arrow and tighter padding (the 44px height stays), and
                it steps aside while the menu is open so the bar isn't crowded. */}
            {cta && (
              <Button
                href={cta.href}
                size="sm"
                arrow
                className={cn("max-sm:px-3 max-sm:[&_svg]:hidden", open && "max-md:hidden")}
              >
                {cta.label}
              </Button>
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
                <m.span
                  key={open ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </m.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <m.nav
              id={panelId}
              aria-label="Mobile"
              className="overflow-hidden border-t border-line md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={baseTransition}
            >
              <div className="flex flex-col gap-1 p-3">
                {items.map((item, index) => (
                  <m.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...baseTransition, delay: 0.04 * index }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-4 font-medium text-ink transition-colors hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.label}
                    </a>
                  </m.div>
                ))}
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
