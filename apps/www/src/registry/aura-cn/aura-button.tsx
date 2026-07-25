"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        aura:
          "bg-primary text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "aura",
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
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty("--aura-x", `${x}%`);
        btn.style.setProperty("--aura-y", `${y}%`);
        btn.style.setProperty("--aura-opacity", "1");
      },
      [enableGlow]
    );

    const handleMouseLeave = React.useCallback(() => {
      const btn = buttonRef.current;
      if (!btn) return;
      btn.style.setProperty("--aura-opacity", "0");
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const isAura = variant === "aura" || variant === undefined;

    return (
      <button
        className={cn(auraButtonVariants({ variant, size, className }))}
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Rim Light Layer */}
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

        {/* Static Wash Layer */}
        {isAura && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, var(--aura-wash) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Dynamic Cursor Glow Layer */}
        {isAura && enableGlow && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle 60px at var(--aura-x, 50%) var(--aura-y, 50%), var(--aura-dynamic) 0%, transparent 70%)",
              opacity: "var(--aura-opacity, 0)",
            }}
          />
        )}

        {/* Content Layer */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

AuraButton.displayName = "AuraButton";

export { AuraButton, auraButtonVariants };
