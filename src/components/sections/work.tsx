import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkShowcase, type Project } from "./work-showcase";

// The systems the company described. Clients are not named. "need" is the
// problem such a system solves for an organisation (inferred, to be reviewed
// by the company); "solution" and "highlights" come from the company's own words.
const projects: Project[] = [
  {
    category: "Finance & Procurement",
    name: "Procurement Management System",
    need: "Organisations that handle significant spend need procurement to be controlled, traceable and efficient.",
    solution:
      "A procurement management system that brings an organisation's purchasing and the finances around it into one structured, accountable process.",
  },
  {
    category: "Document Management",
    name: "Electronic Document Management System",
    need: "Organisations relying on manual, scattered filing lack one trusted home for their documents and clear control over who can see what.",
    solution:
      "An EDMS with a single custodian of documents and different levels of access. Governance, security and transparency are built in, and the design stays flexible for the organisation's future needs.",
    highlights: ["Governance", "Security", "Transparency", "Tiered access"],
  },
  {
    category: "Real Estate",
    name: "Real Estate Transaction Platform",
    need: "Property transactions involve many steps and parties, and they need to be reliable and easy to follow.",
    solution:
      "A platform that smooths out the real estate transaction process, making it reliable and easy to work with, with transparency built in.",
    highlights: ["Reliability", "Transparency", "Ease of use"],
  },
  {
    category: "Human Resources",
    name: "HR Management System",
    need: "Organisations need their people records and HR processes managed in one consistent, orderly system.",
    solution:
      "An HR management system tailored to the way the organisation manages its people.",
  },
  {
    category: "IT Operations",
    name: "IT Service Management Platform",
    need: "IT departments need support requests logged, tracked and resolved in an orderly way.",
    solution:
      "A ticketing platform for the IT department, shaped around the organisation's own way of working.",
  },
  {
    category: "Communications",
    name: "Radio Booking System",
    need: "Booking radio for advertising and other purposes needs a clear, organised process.",
    solution:
      "A radio contracting system where clients can easily book radio for advertising and other purposes.",
  },
];

// A Server Component that owns the data and the heading, and hands the data to
// WorkShowcase (a Client Component) for the interactive part.
export function Work() {
  return (
    <Section id="work" tone="dark" backdrop="facets" edgeTo="light">
      <SectionHeading
        eyebrow="Our Work"
        title={
          <>
            Systems we have <span className="text-gradient">delivered</span>
          </>
        }
        description="A selection of the systems we have built for organisations across different industries. Each is tailored to the organisation it serves."
      />
      <WorkShowcase projects={projects} className="mt-10" />
    </Section>
  );
}
