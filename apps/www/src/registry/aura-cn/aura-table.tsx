"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Table ─── */

export interface AuraTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface AuraTableProps<T> {
  columns: AuraTableColumn<T>[];
  data: T[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export function AuraTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  striped = false,
  hoverable = true,
}: AuraTableProps<T>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--card-border)]",
        className
      )}
    >
      {/* Rim Light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl z-[3]"
        style={{
          padding: "0.5px",
          background: "linear-gradient(to bottom, var(--rim-light), transparent 75%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      <div className="relative z-[2] overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--card-border)] bg-[var(--wash-color)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "border-b border-[var(--card-border)] last:border-0 transition-colors",
                  hoverable && "hover:bg-[var(--bg-surface)]",
                  striped && i % 2 === 1 && "bg-[var(--wash-color)]"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-[var(--text-primary)]",
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-[var(--text-secondary)]"
                >
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
