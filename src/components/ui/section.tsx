import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { Container } from "./container";
import { Facets } from "./facets";

export type Tone = "light" | "tint" | "dark";
type Backdrop = "none" | "grid" | "glow" | "grid-glow" | "facets" | "facets-glow";

type SectionProps = HTMLAttributes<HTMLElement> & {
  // Sets data-tone, which switches every semantic colour inside the section.
  tone?: Tone;
  // Decorative layer behind the content.
  backdrop?: Backdrop;
  // Give the section a diagonal, gem-cut bottom edge that reveals the NEXT
  // section's tone, so sections interlock instead of stopping in a flat line.
  edgeTo?: Tone;
  // Mirror the diagonal and the facets so neighbouring sections differ.
  flip?: boolean;
  containerClassName?: string;
};

export function Section({
  tone = "light",
  backdrop = "none",
  edgeTo,
  flip = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const showGrid = backdrop === "grid" || backdrop === "grid-glow";
  const showGlow = backdrop === "glow" || backdrop === "grid-glow" || backdrop === "facets-glow";
  const showFacets = backdrop === "facets" || backdrop === "facets-glow";

  return (
    <section
      data-tone={tone}
      className={cn("relative isolate overflow-hidden bg-surface text-ink-body", className)}
      {...props}
    >
      {showGrid && (
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
      )}
      {showGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[56rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl"
        />
      )}
      {showFacets && <Facets variant={flip ? "b" : "a"} />}

      <Container className={cn("py-20 sm:py-28", edgeTo && "pb-28 sm:pb-40", containerClassName)}>
        {children}
      </Container>

      {/* The cut: a triangle painted in the next section's surface colour. It has its
          own data-tone, so `bg-surface` here means the NEXT section's surface. */}
      {edgeTo && (
        <div
          aria-hidden="true"
          data-tone={edgeTo}
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-surface sm:h-20",
            flip
              ? "[clip-path:polygon(0_0,100%_100%,0_100%)]"
              : "[clip-path:polygon(0_100%,100%_0,100%_100%)]",
          )}
        />
      )}
    </section>
  );
}
