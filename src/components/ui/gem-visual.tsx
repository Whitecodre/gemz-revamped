import { cn } from "@/lib/cn";

type GemVisualProps = {
  className?: string;
};

// The brand mark, large: a gem drawn from flat facets. Each facet is a polygon
// filled from the same gradient at a different opacity, which is what makes the
// planes look like they catch the light differently. A few "glint" polygons
// fade in and out on a stagger (pure CSS, so this stays a Server Component).
// The gradient colours come from the section's tokens, so it adapts to any tone.
const facets: { points: string; opacity: number }[] = [
  { points: "60,30 140,30 130,70 70,70", opacity: 0.95 }, // table
  { points: "60,30 70,70 20,70", opacity: 0.55 }, // crown left
  { points: "140,30 180,70 130,70", opacity: 0.4 }, // crown right
  { points: "20,70 70,70 100,170", opacity: 0.7 }, // pavilion left
  { points: "70,70 100,70 100,170", opacity: 0.9 }, // pavilion centre left
  { points: "100,70 130,70 100,170", opacity: 0.5 }, // pavilion centre right
  { points: "130,70 180,70 100,170", opacity: 0.3 }, // pavilion right
];

const glints = [
  { points: "60,30 140,30 130,70 70,70", delay: "0s" },
  { points: "70,70 100,70 100,170", delay: "1.6s" },
  { points: "140,30 180,70 130,70", delay: "3.1s" },
];

export function GemVisual({ className }: GemVisualProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 180"
      className={cn("size-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id="gem-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gradient-from)" }} />
          <stop offset="100%" style={{ stopColor: "var(--gradient-to)" }} />
        </linearGradient>
        <filter id="gem-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Soft light behind the gem. */}
      <polygon
        points="20,70 60,30 140,30 180,70 100,170"
        fill="url(#gem-fill)"
        opacity="0.45"
        filter="url(#gem-glow)"
      />

      {/* Each facet settles into place a little after the one before it.
          transform-box: fill-box makes the scale pivot around the facet itself. */}
      {facets.map((facet, index) => (
        <polygon
          key={facet.points}
          points={facet.points}
          fill="url(#gem-fill)"
          fillOpacity={facet.opacity}
          className="animate-facet-in stroke-accent-ink [transform-box:fill-box] origin-center"
          style={{ animationDelay: `${0.15 + index * 0.09}s` }}
          strokeOpacity={0.5}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      ))}

      {glints.map((glint) => (
        <polygon
          key={glint.delay}
          points={glint.points}
          className="animate-glint fill-white"
          style={{ animationDelay: glint.delay }}
        />
      ))}
    </svg>
  );
}
