import { Globe, PencilRuler, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GemVisual } from "@/components/ui/gem-visual";
import { Magnetic } from "@/components/ui/magnetic";
import { RiseWords } from "@/components/ui/rise-words";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tilt } from "@/components/ui/tilt";

// Three things a visitor should take away, each paired with a Lucide icon.
const highlights = [
  { label: "Built to your requirements", icon: PencilRuler },
  { label: "Agile delivery, shaped by your feedback", icon: RefreshCw },
  { label: "Serving organisations worldwide", icon: Globe },
];

// A Server Component. Everything above the fold enters with CSS animations
// (animate-rise, RiseWords), not JavaScript ones: the text is already in the HTML
// and starts animating on the first paint, instead of staying hidden until the
// animation library has downloaded and run. That is what a fast "largest
// content" time needs. Only Magnetic and Tilt (pointer effects) are Client Components.
export function Hero() {
  return (
    <Section
      tone="dark"
      backdrop="facets-glow"
      edgeTo="light"
      // The navbar is fixed and overlays the top of the hero, so the top padding
      // has to leave room for it (about 68px) plus some breathing space.
      containerClassName="pt-28 pb-20 sm:pt-32 sm:pb-28"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {/* The page's only h1. */}
          <SectionHeading
            as="h1"
            size="display"
            title={
              <>
                {/* No {" "} between the two: RiseWords already puts a space after every word. */}
                <RiseWords text="Software built around" />
                <RiseWords text="how your organisation works" delay={0.2} gradient />
              </>
            }
          />

          {/* This paragraph is the largest text on the first screen, and the browser
              counts the page as "content loaded" once it is painted. So it is NOT
              animated: it is visible from the very first frame. (Lighthouse showed
              it waiting 1.5 s when it started hidden.) The buttons and highlights
              below still rise in, in reading order. It is not passed as
              SectionHeading's `description` only to keep the markup plain. */}
          <p className="mt-5 text-lg leading-8 text-pretty text-ink-body sm:text-xl">
            Gemz Software provides custom software solutions that help organisations run more
            systematically and efficiently, whatever the industry and wherever you are.
          </p>

          <div className="mt-9 flex animate-rise flex-wrap gap-3" style={{ animationDelay: "0.45s" }}>
            <Magnetic>
              <Button href="#contact" size="lg" arrow>
                Get Started
              </Button>
            </Magnetic>
            <Button href="#work" size="lg" variant="secondary">
              View Our Work
            </Button>
          </div>

          {/* A real <ul>, so assistive tech announces "list, 3 items". */}
          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {highlights.map(({ label, icon: Icon }, index) => (
              <li
                key={label}
                className="flex animate-rise items-center gap-2.5 text-sm font-medium text-ink"
                style={{ animationDelay: `${0.55 + index * 0.08}s` }}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0 text-accent" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* The outer div rises in; the inner one floats. They are separate elements
            because two animations on one element would fight over `transform`. */}
        <div
          className="mx-auto w-full max-w-xs animate-rise sm:max-w-sm lg:max-w-none"
          style={{ animationDelay: "0.15s" }}
        >
          {/* The endless float starts after 6 s, once the page has settled, so
              it adds no work while the page is loading. */}
          <div className="motion-safe:animate-float" style={{ animationDelay: "6s" }}>
            <Tilt max={12}>
              <GemVisual className="drop-shadow-[0_30px_60px_var(--glow)]" />
            </Tilt>
          </div>
        </div>
      </div>
    </Section>
  );
}
