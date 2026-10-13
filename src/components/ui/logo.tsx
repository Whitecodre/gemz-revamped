import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

type LogoProps = {
  // "wide": the tagline appears from about 416px wide and up, because on the
  // narrowest phones it would squeeze the navbar. "always": it never hides.
  tagline?: "wide" | "always";
  className?: string;
};

// The real Gemz mark (public/brand/gemz-icon-transparent.png) with the name and
// the "Software Innovative" line beneath it. It links home. A Server Component:
// no state, so it ships no JavaScript of its own.
export function Logo({ tagline = "wide", className }: LogoProps) {
  return (
    <Link
      href="/"
      // The visible text already names the link; this adds the full tagline for
      // screen readers even when the tagline is hidden on small screens.
      aria-label="Gemz Software Innovative, home"
      className={cn(
        "group flex min-h-11 items-center gap-2.5 rounded-lg pr-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
        className,
      )}
    >
      {/* width/height tell Next the image's real shape (1024x1024) so the page
          doesn't jump while it loads; the size-* class sets how big it is drawn.
          `priority` loads it immediately: it is visible at the top of the page. */}
      <Image
        src="/brand/gemz-icon-transparent.png"
        alt=""
        width={1024}
        height={1024}
        sizes="44px"
        priority
        className="size-11 shrink-0 object-contain transition-transform duration-300 motion-safe:group-hover:scale-105"
      />
      <span className="flex flex-col">
        <span className="text-lg leading-none font-semibold tracking-tight text-ink">Gemz</span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] leading-none font-medium tracking-[0.28em] whitespace-nowrap text-ink-muted uppercase",
            tagline === "wide" && "hidden min-[26rem]:block",
          )}
        >
          Software Innovative
        </span>
      </span>
    </Link>
  );
}
