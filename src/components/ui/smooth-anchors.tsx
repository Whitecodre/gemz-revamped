"use client";

// Client Component: it listens for clicks in the browser. It renders nothing; it
// only adds behaviour to the whole page.
//
// Why this exists: the browser's own smooth scrolling (CSS `scroll-behavior` and
// `scrollIntoView({ behavior: "smooth" })`) gets cancelled halfway when it starts
// from a real click, so the nav links did nothing. Here we animate the scroll
// ourselves: every frame we move the page a little with an instant jump, so there
// is no browser animation left to cancel.

import { useEffect } from "react";

// Starts gently, speeds up, slows down at the end.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothAnchors() {
  useEffect(() => {
    let frame = 0; // id of the pending animation frame, 0 when idle

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function scrollToTarget(target: Element) {
      stop();
      const html = document.documentElement;
      // Keep the same gap the CSS `scroll-padding-top` gives anchor links.
      const padding = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;

      // Where the section's top sits on the page, clamped to what can be scrolled.
      const endFor = () => {
        const top = target.getBoundingClientRect().top + window.scrollY - padding;
        return Math.max(0, Math.min(top, html.scrollHeight - window.innerHeight));
      };

      const start = window.scrollY;
      const distance = Math.abs(endFor() - start);

      // Visitors who ask their OS for less motion get an instant jump.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({ top: endFor(), behavior: "instant" });
        return;
      }

      // Longer trips take longer, within sensible limits.
      const duration = Math.min(1000, Math.max(450, distance * 0.25));
      const startTime = performance.now();

      function step(now: number) {
        const progress = Math.min(1, (now - startTime) / duration);
        // endFor() is re-read every frame, so if the layout shifts mid-scroll we
        // still land on the section.
        const end = endFor();
        window.scrollTo({
          top: start + (end - start) * easeInOutCubic(progress),
          behavior: "instant",
        });
        frame = progress < 1 ? requestAnimationFrame(step) : 0;
      }
      frame = requestAnimationFrame(step);
    }

    // One listener on the document instead of an onClick on every link. Clicks
    // "bubble" upward from the element you pressed, so this catches them all
    // (navbar, mobile menu, buttons). This is called event delegation.
    function onClick(event: MouseEvent) {
      // Someone else already handled this click, or it isn't a plain left click.
      // Modified clicks (Ctrl/Cmd = new tab, Shift = new window) must keep working.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // `event.target` may be an icon inside the link, so walk up to the nearest <a>.
      // `instanceof Element` is the type check that makes `.closest` available.
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!link) return;

      // getAttribute gives the href exactly as written ("#process"), unlike
      // link.href, which is the full URL. Leave everything that isn't an in-page
      // anchor alone ("#" by itself has no target either).
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#") || hash.length < 2) return;

      const target = document.querySelector(hash);
      if (!target) return;

      // Stop the browser's instant jump, then scroll ourselves.
      event.preventDefault();
      scrollToTarget(target);

      // preventDefault also stopped the address bar from updating, so do it by hand.
      // pushState changes the URL without scrolling or reloading.
      if (window.location.hash !== hash) {
        history.pushState(null, "", hash);
      }
    }

    // If the visitor grabs the page themselves, stop fighting them.
    const interruptions = ["wheel", "touchstart", "keydown"] as const;
    interruptions.forEach((name) =>
      window.addEventListener(name, stop, { passive: true }),
    );
    document.addEventListener("click", onClick);

    // Cleanup: remove every listener (and any running animation) on unmount.
    return () => {
      stop();
      document.removeEventListener("click", onClick);
      interruptions.forEach((name) => window.removeEventListener(name, stop));
    };
  }, []);

  return null;
}
