"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraChipVariants = cva(
  "relative inline-flex items-center gap-1.5 overflow-hidden rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        aura: "bg-primary text-primary-foreground",
        outline: "border border-border text-foreground",
      },
      size: {
        sm: "h-6 px-2.5",
        default: "h-7 px-3",
        lg: "h-8 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "aura",
      size: "default",
    },
  }
);

export interface AuraChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auraChipVariants> {
  onRemove?: () => void;
}

const AuraChip = React.forwardRef<HTMLSpanElement, AuraChipProps>(
  ({ className, variant, size, onRemove, children, ...props }, ref) => {
    const isAura = variant === "aura" || variant === undefined;

    return (
      <span
        className={cn(auraChipVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Rim Light */}
        {isAura && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
            style={{
              background:
                "linear-gradient(180deg, var(--aura-rim) 0%, transparent 60%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        )}

        <span className="relative z-10 flex items-center gap-1.5">
          {children}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-foreground/20"
              aria-label="Remove"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 1L7 7M7 1L1 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </span>
      </span>
    );
  }
);

AuraChip.displayName = "AuraChip";

export { AuraChip, auraChipVariants };
