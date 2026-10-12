type ClassValue = string | false | null | undefined;

// Joins class names, skipping anything falsy, so conditions stay readable:
// cn("px-4", isActive && "bg-brand", className)
// It does NOT resolve conflicts: cn("inline-flex", "hidden") keeps both, and
// Tailwind's CSS order decides the winner. To hide a component responsively,
// wrap it in an element and hide the wrapper instead.
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
