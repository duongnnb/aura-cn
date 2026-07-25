"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showLabel?: boolean;
}

const AuraProgress = React.forwardRef<HTMLDivElement, AuraProgressProps>(
  ({ className, value = 0, max = 100, showLabel = false, ...props }, ref) => {
    const percent = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        {showLabel && (
          <div className="mb-1 flex justify-between text-xs text-[var(--text-secondary,rgba(255,255,255,0.7))]">
            <span>Progress</span>
            <span>{Math.round(percent)}%</span>
          </div>
        )}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
          {/* Fill */}
          <div
            className="h-full rounded-full bg-aura transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          >
            {/* Glow effect on fill */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${percent}%`,
                boxShadow: "0 0 8px 1px var(--aura-glow)",
              }}
            />
          </div>
          {/* Rim Light */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full z-[3]"
            style={{
              padding: "0.5px",
              background:
                "linear-gradient(to top, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        </div>
      </div>
    );
  }
);

AuraProgress.displayName = "AuraProgress";

export { AuraProgress };
