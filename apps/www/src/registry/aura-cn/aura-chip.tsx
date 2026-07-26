"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraChipVariants = cva(
  "relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]",
        active: "bg-[var(--text-primary)] text-[var(--bg-page)]",
        outline: "bg-transparent border border-[var(--rim-light)] text-[var(--text-primary)] hover:bg-[var(--wash-color)]",
      },
      size: {
        sm: "h-7 px-2.5",
        default: "h-8 px-3",
        lg: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AuraChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auraChipVariants> {
  onRemove?: () => void;
  /** Enable the dynamic cursor-following glow effect */
  enableGlow?: boolean;
}

const AuraChip = React.forwardRef<HTMLSpanElement, AuraChipProps>(
  ({ className, variant, size, onRemove, enableGlow = true, children, ...props }, ref) => {
    const showRim = variant !== "active";
    const chipRef = React.useRef<HTMLSpanElement | null>(null);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        if (!enableGlow) return;
        const el = chipRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const glowSize = Math.max(rect.width, rect.height) * 1.5;
        el.style.setProperty("--wash-x", `${x}px`);
        el.style.setProperty("--wash-y", `${y}px`);
        el.style.setProperty("--wash-size", `${glowSize}px`);
        el.style.setProperty("--wash-opacity", "1");
      },
      [enableGlow]
    );

    const handleMouseLeave = React.useCallback(() => {
      const el = chipRef.current;
      if (!el) return;
      el.style.setProperty("--wash-opacity", "0");
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLSpanElement | null) => {
        chipRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <span
        className={cn(auraChipVariants({ variant, size, className }))}
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Rim Light */}
        {showRim && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-[3]"
            style={{
              padding: "0.5px",
              background:
                "linear-gradient(to bottom, var(--rim-light), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        )}

        {/* Dynamic Cursor Glow */}
        {enableGlow && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-[1]"
          >
            <span
              className="absolute rounded-full transition-opacity duration-250 ease-out"
              style={{
                top: "50%",
                left: "50%",
                width: "var(--wash-size, 0px)",
                height: "var(--wash-size, 0px)",
                transform:
                  "translate(-50%, -50%) translate(var(--wash-x, 0px), var(--wash-y, 0px))",
                background:
                  "radial-gradient(circle, var(--dynamic-light-color) 0%, transparent 100%)",
                opacity: "var(--wash-opacity, 0)",
                filter: "blur(12px)",
              }}
            />
          </span>
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
