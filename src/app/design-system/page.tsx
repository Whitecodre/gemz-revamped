import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Activity,
  Cloud,
  Code2,
  Cpu,
  Gauge,
  Layers,
  Lock,
  Quote,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { Accordion } from "@/components/ui/accordion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoTile } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeWindow } from "@/components/ui/code-window";
import { FeatureList } from "@/components/ui/feature-list";
import { GemVisual } from "@/components/ui/gem-visual";
import { IconBox } from "@/components/ui/icon-box";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Navbar } from "@/components/ui/navbar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { RevealWords } from "@/components/ui/reveal-words";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { StatCard } from "@/components/ui/stat-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { Steps } from "@/components/ui/steps";
import { Tabs } from "@/components/ui/tabs";
import { Testimonial } from "@/components/ui/testimonial";
import { Tilt } from "@/components/ui/tilt";

// An internal reference page. It is only for development: in a production build
// the page answers with a 404 (see DesignSystemPage below). The noindex stays as
// a second layer in case it is ever exposed by mistake.
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const scales = [
  { name: "brand", steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "forest", steps: ["50", "200", "400", "600", "700", "800", "850", "900", "950"] },
  { name: "accent", steps: ["300", "400", "500"] },
];

// Tailwind only generates classes it can find written out in full, so the
// swatch classes are listed literally instead of built with `bg-${name}-${step}`.
const swatchClass: Record<string, string> = {
  "brand-50": "bg-brand-50", "brand-100": "bg-brand-100", "brand-200": "bg-brand-200",
  "brand-300": "bg-brand-300", "brand-400": "bg-brand-400", "brand-500": "bg-brand-500",
  "brand-600": "bg-brand-600", "brand-700": "bg-brand-700", "brand-800": "bg-brand-800",
  "brand-900": "bg-brand-900", "brand-950": "bg-brand-950",
  "forest-50": "bg-forest-50", "forest-200": "bg-forest-200", "forest-400": "bg-forest-400",
  "forest-600": "bg-forest-600", "forest-700": "bg-forest-700", "forest-800": "bg-forest-800",
  "forest-850": "bg-forest-850", "forest-900": "bg-forest-900", "forest-950": "bg-forest-950",
  "accent-300": "bg-accent-300", "accent-400": "bg-accent-400", "accent-500": "bg-accent-500",
};

const tones: Tone[] = ["light", "tint", "dark"];

// Each section sets `edgeTo` to the tone of the section below it: that draws the
// diagonal gem-cut between them. `flip` alternates the slope so it zig-zags.
export default function DesignSystemPage() {
  // NODE_ENV is "production" in `npm run build` / `npm start` (and on a host like
  // Vercel) and "development" in `npm run dev`. notFound() throws, so nothing
  // below runs and the visitor gets the normal 404 page.
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <ScrollProgress />
      <Navbar
        items={[
          { label: "Tokens", href: "#tokens" },
          { label: "Components", href: "#components" },
          { label: "Layouts", href: "#layouts" },
          { label: "Content", href: "#content" },
        ]}
        cta={{ label: "Get in touch", href: "#cta" }}
      />

      <main>
        {/* ---------- 1. Hero: dark, facets, the gem ---------- */}
        <Section
          tone="dark"
          backdrop="facets-glow"
          edgeTo="light"
          containerClassName="pt-20 pb-24 sm:pt-28 sm:pb-32"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <StatusIndicator label="Design system · Facets" />
              </Reveal>
              <Reveal delay={0.08}>
                <SectionHeading
                  as="h1"
                  size="display"
                  className="mt-6"
                  title={
                    <>
                      <RevealWords text="Cut with precision." delay={0.1} />{" "}
                      <span className="text-gradient">
                        <RevealWords text="Built to last." delay={0.45} />
                      </span>
                    </>
                  }
                  description="Every building block of the Gemz site, drawn from one idea: a gem is flat planes that catch the light. Components read semantic tokens, so each adapts to light, tint and dark sections."
                />
              </Reveal>
              <Reveal delay={0.16} className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Button href="#components" size="lg" arrow>
                    Explore components
                  </Button>
                </Magnetic>
                <Button href="#tokens" size="lg" variant="secondary">
                  View tokens
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="mx-auto w-full max-w-sm motion-safe:animate-float lg:max-w-none">
              <Tilt max={12}>
                <GemVisual className="drop-shadow-[0_30px_60px_var(--glow)]" />
              </Tilt>
            </Reveal>
          </div>
        </Section>

        {/* ---------- 2. Palette ---------- */}
        <Section id="tokens" backdrop="grid" edgeTo="tint" flip>
          <SectionHeading
            eyebrow="Foundations"
            title="Palette"
            description="Raw scales, all derived from the original Gemz colours. Components rarely use these directly: they use semantic tokens instead."
          />
          <div className="mt-12 space-y-8">
            {scales.map((scale) => (
              <div key={scale.name}>
                <p className="mb-3 font-mono text-sm text-ink-muted">{scale.name}</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
                  {scale.steps.map((step) => (
                    <div key={step}>
                      <div
                        className={`h-14 border border-line [clip-path:polygon(0_0,100%_0,100%_72%,72%_100%,0_100%)] ${swatchClass[`${scale.name}-${step}`]}`}
                      />
                      <p className="mt-1.5 font-mono text-[11px] text-ink-muted">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- 3. Adaptive tones ---------- */}
        <Section tone="tint" edgeTo="light">
          <SectionHeading
            eyebrow="Adaptive"
            title="One component, three tones"
            description="The exact same markup in each column. Only the data-tone attribute changes."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tones.map((tone) => (
              <div
                key={tone}
                data-tone={tone}
                className="rounded-3xl border border-line bg-surface p-6 shadow-sm"
              >
                <Badge>{`tone="${tone}"`}</Badge>
                <h3 className="mt-5 text-xl font-semibold text-ink">Section title</h3>
                <p className="mt-2 leading-7 text-ink-body">
                  Body copy uses <code className="font-mono text-sm text-accent-ink">ink-body</code>, muted copy uses{" "}
                  <span className="text-ink-muted">ink-muted</span>.
                </p>
                <Card facet className="mt-5 flex items-start gap-4 p-5 sm:p-5">
                  <IconBox icon={ShieldCheck} />
                  <div>
                    <p className="font-medium text-ink">Raised card</p>
                    <p className="text-sm text-ink-muted">Sits on surface-raised.</p>
                  </div>
                </Card>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="ghost">Ghost</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- 4. Buttons ---------- */}
        <Section id="components" edgeTo="tint" flip>
          <SectionHeading eyebrow="Components" title="Buttons and badges" />
          <div className="mt-12 space-y-6">
            {(["primary", "secondary", "ghost"] as const).map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <p className="w-24 font-mono text-sm text-ink-muted">{variant}</p>
                <Button variant={variant} size="sm">Small</Button>
                <Button variant={variant}>Medium</Button>
                <Button variant={variant} size="lg" arrow>With arrow</Button>
                <Button variant={variant} disabled>Disabled</Button>
                <Button variant={variant} loading>Saving</Button>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Badge>Accent</Badge>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="danger">Danger</Badge>
            <StatusIndicator label="All systems operational" />
          </div>
        </Section>

        {/* ---------- 5. Spotlight cards with facet corners ---------- */}
        <Section tone="tint" backdrop="glow" edgeTo="light">
          <SectionHeading
            align="center"
            eyebrow="Cards"
            title="Gem-cut cards"
            description="Chamfered corners and a flat facet plane, like a cut stone. Move your cursor across them: the glow follows it and the plane catches more light."
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Code2, title: "Custom development", text: "Sample supporting copy, one or two sentences long." },
              { icon: Gauge, title: "Performance", text: "Sample supporting copy, one or two sentences long." },
              { icon: Lock, title: "Security", text: "Sample supporting copy, one or two sentences long." },
              { icon: Layers, title: "Full-stack", text: "Sample supporting copy, one or two sentences long." },
              { icon: Cloud, title: "Infrastructure", text: "Sample supporting copy, one or two sentences long." },
              { icon: Workflow, title: "Integration", text: "Sample supporting copy, one or two sentences long." },
            ].map(({ icon, title, text }) => (
              <RevealItem key={title}>
                <SpotlightCard>
                  <IconBox icon={icon} />
                  <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 leading-7 text-ink-body">{text}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        {/* ---------- 6. Bento layout ---------- */}
        <Section id="layouts" backdrop="facets" flip edgeTo="tint">
          <SectionHeading
            eyebrow="Layouts"
            title="One story, many shapes"
            description="A bento grid mixes a big idea, a number, a status and a quote in one composition, instead of repeating identical cards."
          />
          <RevealGroup className="mt-14">
            <BentoGrid>
              <RevealItem className="lg:col-span-4 lg:row-span-2">
                <BentoTile facet className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <IconBox icon={Code2} size="lg" />
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                      Software engineered end to end
                    </h3>
                    <p className="mt-3 max-w-xl leading-7 text-ink-body">
                      Sample long-form copy for the main tile. This is where the single most important
                      message in the section lives.
                    </p>
                    <FeatureList className="mt-6" items={["Sample capability one", "Sample capability two", "Sample capability three"]} />
                  </div>
                  <div>
                    <Button variant="ghost" href="#content" arrow>Learn more</Button>
                  </div>
                </BentoTile>
              </RevealItem>

              <RevealItem className="lg:col-span-2">
                <BentoTile className="flex h-full flex-col justify-between">
                  <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">Uptime</p>
                  <p className="mt-6 text-5xl font-semibold tracking-tight">
                    <AnimatedNumber className="text-gradient" value={99.9} decimals={1} suffix="%" />
                  </p>
                </BentoTile>
              </RevealItem>

              <RevealItem className="lg:col-span-2">
                <BentoTile className="flex h-full flex-col justify-between gap-6">
                  <StatusIndicator label="Live monitoring" className="self-start" />
                  <p className="text-sm leading-6 text-ink-body">Sample copy about a supporting capability.</p>
                </BentoTile>
              </RevealItem>

              <RevealItem className="lg:col-span-3">
                <CodeWindow title="deploy.sh" className="h-full">
                  <span className="text-accent-ink">$</span> gemz deploy --prod{"\n"}
                  <span className="text-ink-muted">✓ Build passed · 214 tests</span>{"\n"}
                  <span className="text-ink-muted">✓ Live in 38s</span>
                </CodeWindow>
              </RevealItem>

              <RevealItem className="lg:col-span-3">
                <BentoTile facet className="flex h-full flex-col justify-between gap-6">
                  <Quote className="size-6 text-accent" aria-hidden="true" />
                  <p className="text-lg leading-8 text-ink">Sample client quote. Replace with a real one before launch.</p>
                  <p className="text-sm text-ink-muted">Client Name · Role, Company</p>
                </BentoTile>
              </RevealItem>
            </BentoGrid>
          </RevealGroup>
        </Section>

        {/* ---------- 7. Tabs ---------- */}
        <Section tone="tint" edgeTo="light">
          <SectionHeading
            eyebrow="Interactive"
            title="Tabs"
            description="Use the arrow keys too. The pill slides between tabs, and the panel fades between contents."
          />
          <Tabs
            className="mt-10"
            items={[
              {
                id: "build",
                label: "Build",
                icon: <Code2 />,
                content: (
                  <div className="grid gap-8 lg:grid-cols-2">
                    <FeatureList items={["Sample capability one", "Sample capability two", "Sample capability three"]} />
                    <CodeWindow title="deploy.sh">
                      <span className="text-accent-ink">$</span> npm run build{"\n"}
                      <span className="text-ink-muted">✓ Compiled successfully</span>
                    </CodeWindow>
                  </div>
                ),
              },
              { id: "secure", label: "Secure", icon: <ShieldCheck />, content: <FeatureList items={["Sample security point one", "Sample security point two"]} /> },
              { id: "monitor", label: "Monitor", icon: <Activity />, content: <FeatureList items={["Sample monitoring point one", "Sample monitoring point two"]} /> },
              { id: "scale", label: "Scale", icon: <Cpu />, content: <FeatureList items={["Sample scaling point one", "Sample scaling point two"]} /> },
            ]}
          />
        </Section>

        {/* ---------- 8. Accordion ---------- */}
        <Section edgeTo="tint" flip>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow="Accordion"
              title="Questions, answered"
              description="One item open at a time. The height animates smoothly."
            />
            <Accordion
              items={[
                { question: "Sample question one?", answer: "Sample answer. Replace with real FAQ copy from Gemz." },
                { question: "Sample question two?", answer: "Sample answer. Replace with real FAQ copy from Gemz." },
                { question: "Sample question three?", answer: "Sample answer. Replace with real FAQ copy from Gemz." },
              ]}
            />
          </div>
        </Section>

        {/* ---------- 9. Process ---------- */}
        <Section id="content" tone="tint" edgeTo="dark">
          <SectionHeading eyebrow="Informational" title="Process steps" />
          <Steps
            className="mt-12"
            items={[
              { title: "Discover", description: "Sample step description. One or two sentences." },
              { title: "Design", description: "Sample step description. One or two sentences." },
              { title: "Build", description: "Sample step description. One or two sentences." },
              { title: "Launch", description: "Sample step description. One or two sentences." },
            ]}
          />
        </Section>

        {/* ---------- 10. Stats ---------- */}
        <Section tone="dark" backdrop="facets-glow" flip edgeTo="light">
          <SectionHeading
            align="center"
            eyebrow="Proof"
            title="Numbers that count up"
            description="Sample figures only. Replace with real Gemz results before launch."
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-3">
            <RevealItem><StatCard value={99.9} decimals={1} suffix="%" label="Sample metric" description="What this number measures." /></RevealItem>
            <RevealItem><StatCard value={120} suffix="+" label="Sample metric" description="What this number measures." /></RevealItem>
            <RevealItem><StatCard value={24} suffix="/7" label="Sample metric" description="What this number measures." /></RevealItem>
          </RevealGroup>
        </Section>

        {/* ---------- 11. Marquee ---------- */}
        <Section edgeTo="tint" containerClassName="py-14 pb-24 sm:py-16 sm:pb-32">
          <p className="text-center font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">Marquee · hover to pause</p>
          <Marquee className="mt-8">
            {["Client logo", "Client logo", "Client logo", "Client logo", "Client logo", "Client logo"].map((label, index) => (
              <span key={index} className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap text-ink-muted">
                <Layers aria-hidden="true" className="size-5" />
                {label}
              </span>
            ))}
          </Marquee>
        </Section>

        {/* ---------- 12. Testimonials ---------- */}
        <Section tone="tint" edgeTo="dark" flip>
          <SectionHeading eyebrow="Social proof" title="Testimonials" />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            <RevealItem>
              <Testimonial quote="Sample testimonial. Replace with a real client quote before launch." name="Client Name" role="Role, Company" />
            </RevealItem>
            <RevealItem>
              <Testimonial quote="Sample testimonial. Replace with a real client quote before launch." name="Another Client" role="Role, Company" />
            </RevealItem>
          </RevealGroup>
        </Section>

        {/* ---------- 13. Closing call to action ---------- */}
        <Section id="cta" tone="dark" backdrop="facets-glow">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 w-28 motion-safe:animate-float">
              <GemVisual />
            </div>
            <SectionHeading
              align="center"
              title={
                <>
                  Ready to build <span className="text-gradient">something reliable?</span>
                </>
              }
              description="The closing call to action. Dark sections are used sparingly, so this one stands out."
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <Button href="#tokens" size="lg" arrow>Start a project</Button>
              </Magnetic>
              <Button href="#components" size="lg" variant="secondary">See our work</Button>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
