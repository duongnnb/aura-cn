"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Notification Badge ─── */

interface AuraNotificationBadgeProps {
  count?: number;
  max?: number;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AuraNotificationBadge({
  count = 0,
  max = 99,
  dot = false,
  children,
  className,
}: AuraNotificationBadgeProps) {
  const show = dot || count > 0;
  const display = count > max ? `${max}+` : String(count);

  return (
    <div className={cn("relative inline-flex", className)}>
      {children}
      {show && (
        <span
          className={cn(
            "absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-500 text-white font-medium animate-in zoom-in-50 duration-200",
            dot
              ? "h-2.5 w-2.5"
              : "min-w-[18px] h-[18px] px-1 text-[10px] leading-none"
          )}
        >
          {!dot && display}
        </span>
      )}
    </div>
  );
}
