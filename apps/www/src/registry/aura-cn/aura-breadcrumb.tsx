"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Breadcrumb ─── */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AuraBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function AuraBreadcrumb({
  items,
  separator,
  className,
}: AuraBreadcrumbProps) {
  const sep = separator || (
    <svg className="h-3.5 w-3.5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true" className="shrink-0">{sep}</span>}
          {item.href && i < items.length - 1 ? (
            <a
              href={item.href}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span
              className={cn(
                i === items.length - 1
                  ? "font-medium text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              )}
              aria-current={i === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
