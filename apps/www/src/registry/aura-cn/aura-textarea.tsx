"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AuraTextarea = React.forwardRef<HTMLTextAreaElement, AuraTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "peer flex min-h-[80px] w-full rounded-lg border-0 bg-[rgba(0,0,0,0.2)] px-3 py-2 text-sm text-foreground shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] outline-none transition-all duration-200 resize-y",
            "placeholder:text-muted-foreground",
            "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_2px_var(--aura)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Inverted Rim Light (bottom) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg p-px"
          style={{
            background:
              "linear-gradient(0deg, var(--aura-rim) 0%, transparent 50%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        {/* Bottom accent border on focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-full bg-aura transition-transform duration-200 peer-focus:scale-x-100"
        />
      </div>
    );
  }
);

AuraTextarea.displayName = "AuraTextarea";

export { AuraTextarea };
