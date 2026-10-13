export type TestimonialEntry = {
  quote: string;
  // The person's name, or a description if they prefer to stay anonymous.
  name: string;
  // Their job title.
  role: string;
  // Their organisation, or a generic description (for example "a logistics company").
  organisation?: string;
};

// ADD REAL TESTIMONIALS HERE, and only real ones, with the client's permission.
// While this list is empty:
//   - in development, clearly-labelled placeholder cards are shown so the design
//     can be reviewed;
//   - in a production build, the whole Testimonials section is hidden.
const testimonials: TestimonialEntry[] = [];

const placeholders: TestimonialEntry[] = [
  {
    quote:
      "PLACEHOLDER. A real client testimonial goes here. This card is only shown in development.",
    name: "Client Name",
    role: "Role",
    organisation: "Organisation",
  },
  {
    quote:
      "PLACEHOLDER. A real client testimonial goes here. This card is only shown in development.",
    name: "Another Client",
    role: "Role",
    organisation: "Organisation",
  },
  {
    quote:
      "PLACEHOLDER. A real client testimonial goes here. This card is only shown in development.",
    name: "Third Client",
    role: "Role",
    organisation: "Organisation",
  },
];

// What the page should show right now. An empty array means "hide the section".
export function getTestimonials(): TestimonialEntry[] {
  if (testimonials.length > 0) return testimonials;
  return process.env.NODE_ENV === "production" ? [] : placeholders;
}
