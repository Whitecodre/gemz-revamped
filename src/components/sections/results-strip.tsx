import { AnimatedNumber } from "@/components/ui/animated-number";
import { GemFrame } from "@/components/ui/gem-frame";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

// A "number" result counts up; a "text" result (the live site says "by half",
// not "by 50%") is shown as written. Every project and sentence is copied from
// the live site's project cards.
type Result = {
  project: string;
  claim: string;
  headline:
    | { kind: "number"; value: number; decimals?: number; suffix: string }
    | { kind: "text"; text: string };
};

const results: Result[] = [
  {
    project: "Strategic Supply Chain Orchestration",
    claim: "Engineered to reduce operational overhead by 40%.",
    headline: { kind: "number", value: 40, suffix: "%" },
  },
  {
    project: "Resilience & Disaster Recovery Engine",
    claim: "Guarantees 99.999% data availability.",
    headline: { kind: "number", value: 99.999, decimals: 3, suffix: "%" },
  },
  {
    project: "Maritime Operations Digital Hub",
    claim: "Cuts coordination errors by half.",
    headline: { kind: "text", text: "Half" },
  },
  {
    project: "Modern Real Estate Ecosystem",
    claim: "Accelerated lease cycles by 30%.",
    headline: { kind: "number", value: 30, suffix: "%" },
  },
];

export function ResultsStrip() {
  return (
    <Section edgeTo="tint" containerClassName="py-14 pb-24 sm:py-16 sm:pb-32">
      <p className="text-center font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">
        Results from our projects
      </p>

      {/* 1 column on a phone, 2 on a tablet, 4 across on desktop. */}
      <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {results.map(({ project, claim, headline }) => (
          <RevealItem as="li" key={project}>
            <GemFrame className="flex h-full flex-col">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {headline.kind === "number" ? (
                  <AnimatedNumber
                    className="text-gradient"
                    value={headline.value}
                    decimals={headline.decimals}
                    suffix={headline.suffix}
                  />
                ) : (
                  <span className="text-gradient">{headline.text}</span>
                )}
              </p>
              <p className="mt-3 text-pretty font-medium text-ink">{project}</p>
              <p className="mt-1.5 text-sm leading-6 text-ink-muted">{claim}</p>
            </GemFrame>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
