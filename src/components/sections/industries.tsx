import { Anchor, Building2, Globe, Landmark, Truck, type LucideIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

// The industries named by the company. "Many more" is deliberate: the range is
// not limited to these.
const industries: { label: string; icon: LucideIcon }[] = [
  { label: "Logistics", icon: Truck },
  { label: "Real Estate", icon: Building2 },
  { label: "Maritime Operations", icon: Anchor },
  { label: "Finance", icon: Landmark },
  { label: "And many more", icon: Globe },
];

export function Industries() {
  return (
    <Section edgeTo="tint" containerClassName="py-12 pb-20 sm:py-14 sm:pb-28">
      <p className="text-center font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">
        Industries we serve
      </p>

      <RevealGroup as="ul" className="mt-8 flex flex-wrap justify-center gap-3">
        {industries.map(({ label, icon: Icon }) => (
          <RevealItem
            as="li"
            key={label}
            className="flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-surface-raised px-5 font-medium text-ink transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_10px_24px_-12px_var(--glow)]"
          >
            <Icon aria-hidden="true" className="size-4.5 text-accent" />
            {label}
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mx-auto mt-8 max-w-xl text-center text-pretty text-ink-body">
        We work with organisations across every sector, anywhere in the world.
      </p>
    </Section>
  );
}
