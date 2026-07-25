"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Timeline ─── */

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface AuraTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function AuraTimeline({ items, className }: AuraTimelineProps) {
  return (
    <div className={cn("relative space-y-0", className)}>
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
          {/* Vertical line */}
          {i < items.length - 1 && (
            <div className="absolute left-[11px] top-6 h-full w-px bg-[var(--card-border)]" />
          )}
          {/* Dot */}
          <div
            className={cn(
              "relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
              item.active
                ? "border-[var(--aura)] bg-[var(--aura)]/20"
                : "border-[var(--card-border)] bg-[var(--bg-surface)]"
            )}
          >
            {item.icon ? (
              <span className="h-3 w-3">{item.icon}</span>
            ) : (
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  item.active ? "bg-[var(--aura)]" : "bg-[var(--text-secondary)]"
                )}
              />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">{item.title}</p>
              {item.date && (
                <span className="text-xs text-[var(--text-secondary)]">{item.date}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
