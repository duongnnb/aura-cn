"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const AuraSelect = React.forwardRef<HTMLSelectElement, AuraSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "peer flex h-10 w-full appearance-none rounded-lg border-0 bg-[var(--bg-surface)] px-3 py-2 pr-8 text-sm text-[var(--text-primary)] shadow-[var(--inset-shadow)] outline-none transition-all duration-200",
            "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_0_0_2px_var(--aura)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {/* Inverted Rim Light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg p-px"
          style={{
            padding: "0.5px",
            background:
              "linear-gradient(to top, var(--rim-light), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        {/* Bottom accent border on focus */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-full bg-aura transition-transform duration-200 peer-focus:scale-x-100"
        />
      </div>
    );
  }
);

AuraSelect.displayName = "AuraSelect";

export { AuraSelect };
