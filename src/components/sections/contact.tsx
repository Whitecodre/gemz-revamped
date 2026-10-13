import { GemFrame } from "@/components/ui/gem-frame";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "./contact-form";

// One job: let a visitor start the conversation. A centred heading, a single
// card with the form, and the direct email as a quiet alternative underneath.
export function Contact() {
  return (
    <Section id="contact" backdrop="glow" edgeTo="dark">
      <SectionHeading
        align="center"
        eyebrow="Get in touch"
        title={
          <>
            Tell us what your organisation <span className="text-gradient">needs</span>
          </>
        }
        description="Describe your requirements and our team will come back to you with how we can help."
      />

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
        <GemFrame interactive={false} className="sm:p-10">
          <ContactForm />
        </GemFrame>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Prefer email?{" "}
          <a
            href="mailto:support@gemzsoftware.com"
            className="font-medium text-accent-ink underline underline-offset-4 hover:text-ink focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            support@gemzsoftware.com
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
