import { Gem, Handshake, LifeBuoy, ShieldCheck, type LucideIcon } from "lucide-react";

import { GemFrame } from "@/components/ui/gem-frame";
import { IconBox } from "@/components/ui/icon-box";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Principle = { title: string; description: string; icon: LucideIcon };

// Each principle comes from how the company describes itself.
const principles: Principle[] = [
  {
    title: "Quality over quantity",
    description:
      "We field small teams of well-established developers and project planners, so every project starts on a stable footing and stays on course.",
    icon: Gem,
  },
  {
    title: "Reliable and on time",
    description:
      "We hold ourselves to dependable, timely and efficient delivery, and we keep refining until the quality of the work speaks for itself.",
    icon: ShieldCheck,
  },
  {
    title: "Hand in hand with you",
    description:
      "We work from your feedback throughout the project and adapt readily when your requirements change.",
    icon: Handshake,
  },
  {
    title: "Support when you need it",
    description:
      "Where required, we support the software we deliver once delivery is accepted. Support costs are borne by the client.",
    icon: LifeBuoy,
  },
];

type AboutProps = {
  // The tone of the section that follows, so the diagonal cut matches it.
  edgeTo?: Tone;
};

export function About({ edgeTo = "light" }: AboutProps) {
  return (
    <Section id="about" tone="tint" edgeTo={edgeTo} flip>
      <SectionHeading
        eyebrow="About Gemz"
        title={
          <>
            Small teams. Careful work. <span className="text-gradient">Dependable delivery.</span>
          </>
        }
        description="Gemz Software is a fully established software provision company. We work with organisations to understand what they need, then build the systems that make their operations more systematic and efficient."
      />

      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ title, description, icon }) => (
          <RevealItem as="li" key={title}>
            <GemFrame className="flex h-full flex-col gap-5">
              <IconBox icon={icon} />
              <div>
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 leading-7 text-ink-body">{description}</p>
              </div>
            </GemFrame>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
