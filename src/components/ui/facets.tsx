import { cn } from "@/lib/cn";

// A Server Component, no JavaScript: the facets drift at different speeds as you
// scroll, so the "light" across the gem planes appears to shift. The drift is a CSS
// scroll-driven animation (.drift-back and .drift-front in globals.css). It used to
// be JavaScript reading the scroll position in every section that has a backdrop.

type FacetsProps = {
  // "b" is a mirror image of "a", so neighbouring sections don't look identical.
  variant?: "a" | "b";
  className?: string;
};

type Shape = { points: string; opacity: number };

// Two layers of large triangles and quads in a 1200x700 space. The back layer
// moves slowly and the front layer moves faster: that difference is parallax.
const back: Shape[] = [
  { points: "0,0 420,0 260,330 0,240", opacity: 0.1 },
  { points: "420,0 900,0 640,300 260,330", opacity: 0.05 },
  { points: "900,0 1200,0 1200,260 640,300", opacity: 0.13 },
];
const front: Shape[] = [
  { points: "0,240 260,330 140,700 0,700", opacity: 0.07 },
  { points: "260,330 640,300 520,700 140,700", opacity: 0.04 },
  { points: "640,300 1200,260 1200,700 520,700", opacity: 0.09 },
];

function Layer({ shapes, speed }: { shapes: Shape[]; speed: "drift-back" | "drift-front" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMin slice"
      className={cn("absolute inset-x-0 -top-[10%] h-[120%] w-full", speed)}
    >
      {shapes.map((shape) => (
        <polygon
          key={shape.points}
          points={shape.points}
          className="fill-accent stroke-accent-ink"
          fillOpacity={shape.opacity}
          strokeOpacity={0.18}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function Facets({ variant = "a", className }: FacetsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent)]",
        variant === "b" && "-scale-x-100",
        className,
      )}
    >
      <Layer shapes={back} speed="drift-back" />
      <Layer shapes={front} speed="drift-front" />
    </div>
  );
}
