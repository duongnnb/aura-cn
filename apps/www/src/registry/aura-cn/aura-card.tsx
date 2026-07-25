"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable the dynamic cursor-following glow effect */
  enableGlow?: boolean;
}

const AuraCard = React.forwardRef<HTMLDivElement, AuraCardProps>(
  ({ className, enableGlow = true, children, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!enableGlow) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--aura-x", `${x}%`);
        el.style.setProperty("--aura-y", `${y}%`);
        el.style.setProperty("--aura-opacity", "1");
      },
      [enableGlow]
    );

    const handleMouseLeave = React.useCallback(() => {
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--aura-opacity", "0");
    }, []);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        cardRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200",
          className
        )}
        ref={setRefs}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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

        {/* Static Wash */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, var(--aura-wash) 0%, transparent 70%)",
          }}
        />

        {/* Dynamic Cursor Glow */}
        {enableGlow && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle 120px at var(--aura-x, 50%) var(--aura-y, 50%), var(--aura-dynamic) 0%, transparent 70%)",
              opacity: "var(--aura-opacity, 0)",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

AuraCard.displayName = "AuraCard";

const AuraCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 space-y-1.5", className)} {...props} />
));
AuraCardHeader.displayName = "AuraCardHeader";

const AuraCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-tight", className)}
    {...props}
  />
));
AuraCardTitle.displayName = "AuraCardTitle";

const AuraCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AuraCardDescription.displayName = "AuraCardDescription";

const AuraCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
AuraCardContent.displayName = "AuraCardContent";

export {
  AuraCard,
  AuraCardHeader,
  AuraCardTitle,
  AuraCardDescription,
  AuraCardContent,
};
