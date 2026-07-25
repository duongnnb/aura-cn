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
}

export const AuraFAB = React.forwardRef<HTMLButtonElement, AuraFABProps>(
  ({ className, size, variant, icon, label, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(fabVariants({ size, variant }), className)}
        {...props}
      >
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
