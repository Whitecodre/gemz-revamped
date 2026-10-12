"use client";

// Client Component: the facets drift at different speeds as you scroll, so the
// "light" across the gem planes appears to shift. Scroll position is a
// browser-only value, which is why this needs "use client".

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/cn";

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

function Layer({ shapes, y }: { shapes: Shape[]; y: ReturnType<typeof useTransform<number, number>> | 0 }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
      style={{ y }}
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
    </motion.svg>
  );
}

export function Facets({ variant = "a", className }: FacetsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // progress goes 0 -> 1 as the section travels from entering to leaving the screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,black_30%,transparent)]",
        variant === "b" && "-scale-x-100",
        className,
      )}
    >
      <Layer shapes={back} y={reduceMotion ? 0 : backY} />
      <Layer shapes={front} y={reduceMotion ? 0 : frontY} />
    </div>
  );
}
