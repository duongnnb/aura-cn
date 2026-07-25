"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "not-prose relative my-6 flex min-h-[200px] w-full items-center justify-center rounded-xl border border-border bg-background/50 p-8",
        "before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(circle_at_50%_0%,var(--aura-wash),transparent_70%)] before:pointer-events-none",
        className
      )}
    >
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
