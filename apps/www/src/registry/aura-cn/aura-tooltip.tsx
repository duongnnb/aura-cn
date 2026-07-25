"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Tooltip ─── */

interface AuraTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function AuraTooltip({
  content,
  children,
  side = "top",
  className,
}: AuraTooltipProps) {
  const [show, setShow] = React.useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded-lg px-3 py-1.5",
            "bg-[var(--bg-page,#0f0f0f)] border border-[rgba(255,255,255,0.06)] text-sm text-[var(--text-primary,#f1f1f1)] shadow-lg",
            "animate-in fade-in zoom-in-95 duration-150",
            // Rim light
            "before:absolute before:inset-0 before:rounded-lg before:z-[3]",
            "before:bg-[linear-gradient(to_bottom,var(--rim-light,rgba(255,255,255,0.15)),transparent_75%)]",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            "before:[mask-composite:exclude]",
            "before:[padding:0.5px]",
            "before:pointer-events-none",
            positionClasses[side],
            className
          )}
        >
          <span className="relative z-10">{content}</span>
        </div>
      )}
    </div>
  );
}
