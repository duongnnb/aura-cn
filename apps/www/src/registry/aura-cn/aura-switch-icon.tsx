"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Switch Icon (Animated Toggle) ─── */

interface AuraSwitchIconProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  className?: string;
}

export function AuraSwitchIcon({
  checked = false,
  onCheckedChange,
  iconOn,
  iconOff,
  className,
}: AuraSwitchIconProps) {
  const defaultOn = (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
  const defaultOff = (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
        "bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] text-[var(--text-primary)]",
        "shadow-[var(--inset-shadow)]",
        className
      )}
    >
      <span
        className={cn(
          "absolute transition-all duration-300",
          checked ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        )}
      >
        {iconOn || defaultOn}
      </span>
      <span
        className={cn(
          "absolute transition-all duration-300",
          !checked ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        )}
      >
        {iconOff || defaultOff}
      </span>
    </button>
  );
}
