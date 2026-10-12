import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CodeWindowProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

// An editor/terminal frame for showing code or system output: an instant
// "this is a software company" signal. It is always dark, whatever the
// section's tone, by setting its own data-tone.
export function CodeWindow({ title = "terminal", children, className }: CodeWindowProps) {
  return (
    <div
      data-tone="dark"
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-[0_30px_80px_-30px_var(--glow)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-raised px-4 py-3">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-xs text-ink-muted">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-ink-body">
        <code>{children}</code>
      </pre>
    </div>
  );
}
