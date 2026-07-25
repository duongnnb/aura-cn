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
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const size = Math.max(rect.width, rect.height) * 1.5;
        el.style.setProperty("--wash-x", `${x}px`);
        el.style.setProperty("--wash-y", `${y}px`);
        el.style.setProperty("--wash-size", `${size}px`);
        el.style.setProperty("--wash-opacity", "1");
      },
      [enableGlow]
    );

    const handleMouseLeave = React.useCallback(() => {
      const el = cardRef.current;
      if (!el) return;
      el.style.setProperty("--wash-opacity", "0");
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
          "relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-200",
          "bg-[var(--card-bg,rgba(255,255,255,0.04))] border border-[var(--card-border,rgba(255,255,255,0.06))]",
          "hover:bg-[var(--bg-surface,rgba(255,255,255,0.1))]",
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
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-[3]"
          style={{
            padding: "0.5px",
            background:
              "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Static Wash */}
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
                  "radial-gradient(circle, var(--dynamic-light-color, rgba(255,255,255,0.22)) 0%, transparent 100%)",
                opacity: "var(--wash-opacity, 0)",
                filter: "blur(12px)",
              }}
            />
          </span>
        )}

        {/* Content */}
        <div className="relative z-[2]">{children}</div>
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
