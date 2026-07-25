"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const AuraInput = React.forwardRef<HTMLInputElement, AuraInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer flex h-10 w-full rounded-lg border-0 bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] shadow-[var(--inset-shadow)] outline-none transition-all duration-200",
            "placeholder:text-[var(--text-secondary)]",
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
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
          style={{
            padding: "0.5px",
            background:
              "linear-gradient(to top, var(--rim-light), transparent 75%)",
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

AuraInput.displayName = "AuraInput";

export { AuraInput };
