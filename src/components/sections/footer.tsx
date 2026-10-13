import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

// Only links to places that exist on this page. Careers and legal pages have no
// content yet, so they are left out rather than left as dead links.
const columns = [
  {
    title: "Services",
    links: [
      { label: "Custom Software Development", href: "#services" },
      { label: "Performance Optimization", href: "#services" },
      { label: "Security & Compliance", href: "#services" },
      { label: "Full Stack Solutions", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Our Work", href: "#work" },
      { label: "How We Work", href: "#process" },
    ],
  },
];

const linkClasses =
  "inline-flex min-h-11 items-center text-ink-body transition-colors hover:text-accent-ink focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none";

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-surface text-ink-body">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo tagline="always" className="inline-flex" />
            <p className="mt-4 max-w-xs leading-7">
              Custom software for organisations worldwide: reliable, efficient and built around
              the way you work.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">
                {column.title}
              </p>
              <ul className="mt-3 flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {/* A plain <a>: in-page anchors scroll reliably without the router. */}
                    <a href={link.href} className={linkClasses}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">
              Contact
            </p>
            <ul className="mt-3 flex flex-col">
              <li>
                <a href="mailto:support@gemzsoftware.com" className={`${linkClasses} break-all`}>
                  support@gemzsoftware.com
                </a>
              </li>
              <li className="flex min-h-11 items-center">Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-sm text-ink-muted">
          &copy; 2026 Gemz Software Inc. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
