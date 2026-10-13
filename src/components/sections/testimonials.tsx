import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTestimonials } from "@/lib/testimonials";
import { TestimonialCarousel } from "./testimonial-carousel";

// A Server Component: it picks the data and the heading, and hands the list to
// TestimonialCarousel (a Client Component) for the sliding.
export function Testimonials() {
  const items = getTestimonials();
  // Nothing real to show: render nothing at all rather than an empty section.
  if (items.length === 0) return null;

  return (
    <Section tone="dark" backdrop="facets-glow" edgeTo="light">
      <SectionHeading
        align="center"
        eyebrow="Testimonials"
        title={
          <>
            What our clients <span className="text-gradient">say</span>
          </>
        }
      />

      <Reveal delay={0.1} className="mt-10">
        <TestimonialCarousel items={items} />
      </Reveal>
    </Section>
  );
}
