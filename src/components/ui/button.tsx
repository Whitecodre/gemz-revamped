import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // Adds an arrow that nudges right on hover: a small cue that it leads somewhere.
  arrow?: boolean;
  children?: ReactNode;
};

// A discriminated union: with `href` the Button renders a Next.js <Link>,
// without it a real <button>. TypeScript uses `href` to tell them apart.
type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    // Shows a spinner and blocks clicks while something is in progress.
    loading?: boolean;
  };
type ButtonAsLink = SharedProps & ComponentProps<typeof Link>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// Colours come from the semantic tokens (accent, ink, line...), so the same
// button looks right on light, tint and dark sections with no extra props.
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-glow-400 to-accent-500 text-forest-950 shadow-[0_6px_18px_-6px_var(--glow)] hover:shadow-[0_10px_24px_-6px_var(--glow)] hover:brightness-105",
  secondary:
    "border border-line-strong bg-surface-raised text-ink hover:border-accent hover:text-accent-ink",
  ghost: "text-accent-ink hover:bg-accent-soft",
};

// Compact on desktop (36 / 40 / 48px tall). `pointer-coarse:` only applies on
// touch screens, where every size grows to at least 44px so it is easy to tap.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem] pointer-coarse:min-h-11",
  md: "h-10 px-4.5 text-sm pointer-coarse:min-h-11",
  lg: "h-12 px-6 text-[0.95rem] pointer-coarse:min-h-12",
};

// Hover and press feedback is plain CSS, so Button stays a Server Component
// with no JavaScript sent to the browser. `motion-safe:` skips the movement
// for visitors whose OS asks for reduced motion.
export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group/button relative inline-flex items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap",
    "transition-[transform,box-shadow,background-color,border-color,color,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const arrowIcon = arrow && (
    <ArrowRight
      aria-hidden="true"
      className="size-3.5 transition-transform duration-300 motion-safe:group-hover/button:translate-x-0.5"
    />
  );

  // Checking `href` narrows `rest`: inside this block TypeScript knows it holds Link props.
  if (rest.href !== undefined) {
    // In-page anchors ("#contact") use a plain <a>, not Next's <Link>. Link sends
    // them through the router, which can skip the scroll when the URL already
    // ends in that hash (click, scroll away, click again: nothing happens). The
    // browser's own anchor handling scrolls every time and follows our CSS
    // scroll-behavior and scroll-padding.
    if (typeof rest.href === "string" && rest.href.startsWith("#")) {
      return (
        <a
          className={classes}
          href={rest.href}
          onClick={rest.onClick}
          aria-label={rest["aria-label"]}
        >
          {children}
          {arrowIcon}
        </a>
      );
    }
    return (
      <Link className={classes} {...rest}>
        {children}
        {arrowIcon}
      </Link>
    );
  }

  // Here `rest` can only be button props, so `loading` is allowed.
  const { loading = false, disabled, type = "button", ...buttonProps } = rest;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(classes, "disabled:pointer-events-none disabled:opacity-50")}
      {...buttonProps}
    >
      {loading && (
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
      )}
      {children}
      {!loading && arrowIcon}
    </button>
  );
}
