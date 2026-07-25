"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Stat Card ─── */

interface AuraStatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  className?: string;
}

export function AuraStatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  className,
}: AuraStatCardProps) {
  const trendColor =
    trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-[var(--text-secondary)]";

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        {icon && <span className="h-5 w-5 text-[var(--text-secondary)]">{icon}</span>}
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-2xl font-bold text-[var(--text-primary)]">{value}</span>
        {change && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendColor)}>
            {trend === "up" && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
            {trend === "down" && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
