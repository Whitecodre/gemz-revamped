import { Blocks, CodeXml, Gauge, Lock, type LucideIcon } from "lucide-react";

import { GemFrame } from "@/components/ui/gem-frame";
import { IconBox } from "@/components/ui/icon-box";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  // Wide tiles get a larger title and a faint watermark icon.
  wide: boolean;
};

// Reworded for clarity. Service names are unchanged from the live site; the
// descriptions describe what each service covers without extra claims.
const services: Service[] = [
  {
    title: "Custom Software Development",
    description:
      "Systems designed around your organisation's own processes. We build to your requirements, replace manual and fragmented ways of working, and design for flexibility so the software can change as your needs do.",
    icon: CodeXml,
    wide: true,
  },
  {
    title: "Performance Optimization",
    description:
      "We review and tune systems for speed, responsiveness and reliability, so they keep performing as demands on them grow.",
    icon: Gauge,
    wide: false,
  },
  {
    title: "Security & Compliance",
    description:
      "Governance, access control and security are designed into every system, so information stays protected and every action is accountable.",
    icon: Lock,
    wide: false,
  },
  {
    title: "Full Stack Solutions",
    description:
      "Complete front-end and back-end development from a single team, from planning through to delivery, with support where it is needed.",
    icon: Blocks,
    wide: true,
  },
];

export function Services() {
  return (
    <Section id="services" tone="tint" edgeTo="dark" flip>
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Software solutions <span className="text-gradient">tailored</span> to your organisation
          </>
        }
        description="Every engagement starts with your requirements. We build the system your organisation needs, whatever the industry."
      />

      {/* Phone: 1 column. Tablet: 2 columns (wide tiles span both). Desktop: a
          6-column grid where wide tiles take 4 columns and narrow ones take 2,
          so each row is a big tile beside a small one. */}
      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {services.map(({ title, description, icon: Icon, wide }) => (
          <RevealItem
            as="li"
            key={title}
            className={wide ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-2"}
          >
            <GemFrame className="flex h-full flex-col gap-5 sm:p-8">
              {wide && (
                <Icon
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -bottom-4 size-40 text-accent/8 sm:size-52"
                  strokeWidth={1}
                />
              )}
              <IconBox icon={Icon} size={wide ? "lg" : "md"} />
              <div>
                <h3
                  className={
                    wide
                      ? "text-xl font-semibold text-ink sm:text-2xl"
                      : "text-lg font-semibold text-ink"
                  }
                >
                  {title}
                </h3>
                <p className="mt-3 max-w-prose leading-7 text-ink-body">{description}</p>
              </div>
            </GemFrame>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
