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
  /** Enable the dynamic cursor-following glow effect */
  enableGlow?: boolean;
  className?: string;
}

export function AuraStatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  enableGlow = true,
  className,
}: AuraStatCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableGlow) return;
      const el = cardRef.current;
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
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--wash-opacity", "0");
  }, []);

  const trendColor =
    trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-[var(--text-secondary)]";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-shadow hover:shadow-lg",
        className
      )}
    >
      {/* Rim Light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-[3]"
        style={{
          padding: "0.5px",
          background:
            "linear-gradient(to bottom, var(--rim-light), transparent 75%)",
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
            background: "var(--wash-color)",
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
                "radial-gradient(circle, var(--dynamic-light-color) 0%, transparent 100%)",
              opacity: "var(--wash-opacity, 0)",
              filter: "blur(12px)",
            }}
          />
        </span>
      )}
      <div className="relative z-[2] flex items-center justify-between">
        <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        {icon && <span className="h-5 w-5 text-[var(--text-secondary)]">{icon}</span>}
      </div>
      <div className="relative z-[2] mt-2 flex items-end gap-2">
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
