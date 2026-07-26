"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/* ─── Floating Action Button ─── */

const fabVariants = cva(
  [
    "relative inline-flex items-center justify-center rounded-full",
    "font-medium shadow-lg transition-all duration-200",
    "hover:scale-105 active:scale-95",
    // Rim light
    "before:absolute before:inset-0 before:rounded-full before:z-[3]",
    "before:bg-[linear-gradient(to_bottom,var(--rim-light),transparent_75%)]",
    "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
    "before:[mask-composite:exclude]",
    "before:[padding:0.5px]",
    "before:pointer-events-none",
    // Wash glow
    "after:absolute after:inset-0 after:rounded-full",
    "after:bg-[radial-gradient(circle_at_50%_0%,var(--wash-color),transparent_70%)]",
    "after:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-10 w-10",
        default: "h-14 w-14",
        lg: "h-16 w-16",
        extended: "h-14 gap-2 rounded-full px-6",
      },
      variant: {
        default: "bg-[var(--aura)] text-white hover:shadow-[0_4px_24px_var(--aura-glow)]",
        secondary: "bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--card-border)] hover:bg-[var(--bg-surface-hover)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

interface AuraFABProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon?: React.ReactNode;
  label?: string;
  /** Enable the dynamic cursor-following glow effect */
  enableGlow?: boolean;
}

export const AuraFAB = React.forwardRef<HTMLButtonElement, AuraFABProps>(
  ({ className, size, variant, icon, label, enableGlow = true, children, ...props }, ref) => {
    const fabRef = React.useRef<HTMLButtonElement | null>(null);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!enableGlow) return;
        const el = fabRef.current;
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
      const el = fabRef.current;
      if (!el) return;
      el.style.setProperty("--wash-opacity", "0");
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        fabRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <button
        ref={setRefs}
        className={cn(fabVariants({ size, variant }), className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
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
        <span className="relative z-10 flex items-center gap-2">
          {icon || children}
          {label && size === "extended" && (
            <span className="text-sm font-medium">{label}</span>
          )}
        </span>
      </button>
    );
  }
);
AuraFAB.displayName = "AuraFAB";
