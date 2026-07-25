import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Divider ─── */

interface AuraDividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
}

export function AuraDivider({
  orientation = "horizontal",
  label,
  className,
}: AuraDividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block h-full w-px bg-[var(--card-border)]", className)}
      />
    );
  }

  if (label) {
    return (
      <div role="separator" className={cn("flex items-center gap-3", className)}>
        <span className="h-px flex-1 bg-[var(--card-border)]" />
        <span className="text-xs text-[var(--text-secondary)]">{label}</span>
        <span className="h-px flex-1 bg-[var(--card-border)]" />
      </div>
    );
  }

  return (
    <hr
      className={cn("h-px w-full border-0 bg-[var(--card-border)]", className)}
    />
  );
}
