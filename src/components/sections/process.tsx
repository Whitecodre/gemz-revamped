import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Steps, type Step } from "@/components/ui/steps";

// The company works in Agile, using the Scrum method. Planning, maintenance and
// support are part of the process rather than separate phases, scaled to the
// size of each project.
const steps: Step[] = [
  {
    title: "Plan",
    description:
      "We agree your requirements and priorities with you, then organise the work into short, manageable cycles.",
  },
  {
    title: "Build",
    description:
      "A small, focused team delivers working software in regular increments, so progress is always visible.",
  },
  {
    title: "Review and adapt",
    description:
      "You review each increment and your feedback shapes the next. Changing requirements are expected, and we adapt readily.",
  },
  {
    title: "Deliver and support",
    description:
      "We deliver the system and, where needed, continue with maintenance and support once delivery is accepted.",
  },
];

export function Process() {
  return (
    <Section id="process" edgeTo="tint" flip>
      <SectionHeading
        eyebrow="How We Work"
        title={
          <>
            Agile delivery, shaped by <span className="text-gradient">your feedback</span>
          </>
        }
        description="We build using Agile, with the Scrum method. Planning, maintenance and support are part of the way we work, scaled to the size of each project."
      />
      <Steps items={steps} className="mt-10" />
    </Section>
  );
}
