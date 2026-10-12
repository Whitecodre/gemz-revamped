import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  // ReactNode, not string, so a word can be highlighted:
  // title={<>Software that <span className="text-gradient">scales</span></>}
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  align?: "left" | "center";
  // "display" is the large hero size; "default" for every other section.
  size?: "default" | "display";
  // A page has one h1 (the hero); every other heading is an h2.
  as?: "h1" | "h2";
  className?: string;
};

// No colour props: text uses the semantic tokens, so it adapts to the section's tone.
export function SectionHeading({
  title,
  eyebrow,
  description,
  align = "left",
  size = "default",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] text-accent-ink uppercase",
          )}
        >
          {/* A small diamond: a gem facet, the brand shape repeated at every heading. */}
          <span aria-hidden="true" className="size-2 rotate-45 bg-accent" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-semibold tracking-tight text-balance text-ink",
          size === "display"
            ? "text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
            : "text-3xl leading-tight sm:text-4xl lg:text-5xl",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-ink-body",
            size === "display" ? "text-lg leading-8 sm:text-xl" : "text-lg leading-8",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
