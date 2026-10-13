import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";
import { Navbar } from "@/components/ui/navbar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { SmoothAnchors } from "@/components/ui/smooth-anchors";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";
import { getTestimonials } from "@/lib/testimonials";

// Each href is the id of a section below. Links say what the company offers; the
// single action ("Get Started") is the button, so there is no separate Contact
// link pointing at the same place. Order follows the page, top to bottom.
const navItems = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "How We Work", href: "#process" },
  { label: "About", href: "#about" },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/gemz-icon-transparent.png`,
  description: SITE_DESCRIPTION,
  email: SUPPORT_EMAIL,
};

export default function Home() {
  // Testimonials hide themselves when there is nothing real to show, so About's
  // diagonal cut must point at whichever section actually follows it.
  const hasTestimonials = getTestimonials().length > 0;

  return (
    <>
      {/* Structured data: tells search engines, in their own vocabulary, who the
          site belongs to. Only facts the company has confirmed go in here (no
          street address yet). Replacing "<" keeps the JSON from ever closing the
          script tag early. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar items={navItems} cta={{ label: "Get Started", href: "#contact" }} />
      <main>
        <Hero />
        <Industries />
        <Services />
        <Work />
        <Process />
        <About edgeTo={hasTestimonials ? "dark" : "light"} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <SmoothAnchors />
    </>
  );
}
