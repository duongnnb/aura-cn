"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Data List ─── */

export interface DataListItem {
  label: string;
  value: React.ReactNode;
}

interface AuraDataListProps {
  items: DataListItem[];
  layout?: "vertical" | "horizontal";
  className?: string;
}

export function AuraDataList({ items, layout = "vertical", className }: AuraDataListProps) {
  if (layout === "horizontal") {
    return (
      <dl className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3", className)}>
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <dt className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              {item.label}
            </dt>
            <dd className="text-sm font-medium text-[var(--text-primary)]">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className={cn("divide-y divide-[var(--card-border)]", className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
          <dt className="text-sm text-[var(--text-secondary)]">{item.label}</dt>
          <dd className="text-sm font-medium text-[var(--text-primary)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
