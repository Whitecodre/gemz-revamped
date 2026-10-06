type ClassValue = string | false | null | undefined;

// Joins class names, skipping anything falsy, so conditions stay readable:
// cn("px-4", isActive && "bg-brand", className)
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
