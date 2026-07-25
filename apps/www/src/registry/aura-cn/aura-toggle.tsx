"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const AuraToggle = React.forwardRef<HTMLButtonElement, AuraToggleProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const controlledChecked = checked !== undefined ? checked : isChecked;

    const toggle = () => {
      const next = !controlledChecked;
      if (checked === undefined) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <button
        type="button"
        role="switch"
        aria-checked={controlledChecked}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          controlledChecked
            ? "bg-aura"
            : "bg-[var(--rim-light)]",
          className
        )}
        onClick={toggle}
        ref={ref}
        {...props}
      >
        {/* Rim light on track */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full z-[3]"
          style={{
            padding: "0.5px",
            background: controlledChecked
              ? "linear-gradient(to bottom, var(--rim-light), transparent 75%)"
              : "linear-gradient(to bottom, var(--bg-surface), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        {/* Thumb */}
        <span
          className={cn(
            "pointer-events-none relative z-[2] block h-5 w-5 rounded-full bg-[var(--text-primary,#f1f1f1)] shadow-lg transition-transform duration-200",
            controlledChecked ? "translate-x-[22px]" : "translate-x-[2px]"
          )}
        >
          {/* Thumb glow when active */}
          {controlledChecked && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 8px 2px var(--aura-glow)",
              }}
            />
          )}
        </span>
      </button>
    );
  }
);

AuraToggle.displayName = "AuraToggle";

export { AuraToggle };
