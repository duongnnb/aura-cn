"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraToastVariants = cva(
  "relative overflow-hidden rounded-lg border border-border p-4 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "bg-background text-foreground border-green-500/30",
        error: "bg-background text-foreground border-red-500/30",
        info: "bg-background text-foreground border-aura/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AuraToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof auraToastVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
}

const AuraToast = React.forwardRef<HTMLDivElement, AuraToastProps>(
  ({ className, variant, title, description, onClose, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(auraToastVariants({ variant, className }))}
        role="alert"
        {...props}
      >
        {/* Rim Light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
          style={{
            background:
              "linear-gradient(180deg, var(--aura-rim) 0%, transparent 50%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        <div className="relative z-10 flex items-start gap-3">
          <div className="flex-1">
            {title && (
              <p className="text-sm font-semibold">{title}</p>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
            {children}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1 1L9 9M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

AuraToast.displayName = "AuraToast";

export { AuraToast, auraToastVariants };
