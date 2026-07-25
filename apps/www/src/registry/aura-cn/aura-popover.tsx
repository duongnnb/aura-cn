"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Popover ─── */

interface AuraPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  side?: "top" | "bottom";
  className?: string;
}

export function AuraPopover({
  trigger,
  children,
  align = "center",
  side = "bottom",
  className,
}: AuraPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const alignClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  const sideClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            "absolute z-50 min-w-[200px] rounded-xl",
            "bg-[var(--bg-page)] border border-[var(--card-border)] shadow-xl",
            "animate-in fade-in zoom-in-95 duration-150",
            // Rim light
            "before:absolute before:inset-0 before:rounded-xl before:z-[3]",
            "before:bg-[linear-gradient(to_bottom,var(--rim-light),transparent_75%)]",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            "before:[mask-composite:exclude]",
            "before:[padding:0.5px]",
            "before:pointer-events-none",
            alignClasses[align],
            sideClasses[side]
          )}
        >
          <div className="relative z-10 p-4">{children}</div>
        </div>
      )}
    </div>
  );
}
