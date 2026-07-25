"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * AuraButton — YouTube Shorts–inspired 3D light effect button
 *
 * Visual layers:
 * 1. Rim Light: gradient border via mask-composite (light from top)
 * 2. Wash Light: static radial gradient from top center
 * 3. Dynamic Light: cursor-following glow (mousemove)
 * 4. Content: text/icon above all layers
 *
 * Background is semi-transparent (not solid) to let the 3D effect shine through.
 */

const auraButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "text-sm font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.95]",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-full",
          "bg-[rgba(255,255,255,0.1)] text-[var(--text-primary,#f1f1f1)]",
          "hover:bg-[rgba(255,255,255,0.18)]",
          "dark:bg-[rgba(255,255,255,0.1)] dark:hover:bg-[rgba(255,255,255,0.18)]",
          "border-0",
        ],
        primary: [
          "rounded-full",
          "bg-[var(--text-primary,#f1f1f1)] text-[var(--bg-page,#0f0f0f)]",
          "hover:opacity-90",
        ],
        accent: [
          "rounded-full",
          "bg-[var(--aura)] text-white",
          "hover:brightness-110",
          "shadow-[0_4px_12px_var(--aura-glow)]",
          "hover:shadow-[0_6px_20px_var(--aura-glow)]",
        ],
        outline: [
          "rounded-full",
          "bg-transparent border border-[rgba(255,255,255,0.15)]",
          "text-[var(--text-primary,#f1f1f1)]",
          "hover:bg-[rgba(255,255,255,0.08)]",
          "hover:border-[rgba(255,255,255,0.25)]",
        ],
        ghost: [
          "rounded-full",
          "bg-transparent text-[var(--text-primary,#f1f1f1)]",
          "hover:bg-[rgba(255,255,255,0.08)]",
        ],
        secondary: [
          "rounded-full",
          "bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary,rgba(255,255,255,0.7))]",
          "hover:bg-[rgba(255,255,255,0.12)]",
          "hover:text-[var(--text-primary,#f1f1f1)]",
        ],
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AuraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof auraButtonVariants> {
  /** Enable the dynamic cursor-following glow effect */
  enableGlow?: boolean;
}

const AuraButton = React.forwardRef<HTMLButtonElement, AuraButtonProps>(
  ({ className, variant, size, enableGlow = true, children, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!enableGlow) return;
        const btn = buttonRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const size = Math.max(rect.width, rect.height) * 1.5;
        btn.style.setProperty("--wash-x", `${x}px`);
        btn.style.setProperty("--wash-y", `${y}px`);
        btn.style.setProperty("--wash-size", `${size}px`);
        btn.style.setProperty("--wash-opacity", "1");
      },
      [enableGlow]
    );

    const handleMouseLeave = React.useCallback(() => {
      const btn = buttonRef.current;
      if (!btn) return;
      btn.style.setProperty("--wash-opacity", "0");
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    // Determine if we should show the light layers
    const showLightLayers = variant !== "ghost";

    return (
      <button
        className={cn(auraButtonVariants({ variant, size, className }))}
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Layer 1: Rim Light (gradient border from top) */}
        {showLightLayers && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-[3]"
            style={{
              padding: "0.5px",
              background:
                variant === "primary"
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent 75%)"
                  : variant === "accent"
                  ? "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent 75%)"
                  : "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        )}

        {/* Layer 2: Static Wash (glow from top center) */}
        {showLightLayers && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-[1]"
          >
            <span
              className="absolute w-full h-full left-0"
              style={{
                bottom: "50%",
                background: "var(--wash-color, rgba(255,255,255,0.04))",
                filter: "blur(10px)",
                borderRadius: "inherit",
              }}
            />
          </span>
        )}

        {/* Layer 3: Dynamic Light (follows cursor) */}
        {showLightLayers && enableGlow && (
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
                  "radial-gradient(circle, var(--dynamic-light-color, rgba(255,255,255,0.22)) 0%, transparent 100%)",
                opacity: "var(--wash-opacity, 0)",
                filter: "blur(12px)",
              }}
            />
          </span>
        )}

        {/* Layer 4: Content (elevated above light effects) */}
        <span className="relative z-[2] flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

AuraButton.displayName = "AuraButton";

export { AuraButton, auraButtonVariants };
