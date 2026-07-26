"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Sidebar ─── */

export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
  children?: SidebarItem[];
}

interface AuraSidebarProps {
  items: SidebarItem[];
  collapsed?: boolean;
  className?: string;
}

export function AuraSidebar({ items, collapsed = false, className }: AuraSidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex h-full flex-col gap-1 border-r border-[var(--card-border)] bg-[var(--card-bg)] p-3 transition-all",
        collapsed ? "w-16" : "w-60",
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
      {items.map((item, i) => (
        <SidebarEntry key={i} item={item} collapsed={collapsed} />
      ))}
    </aside>
  );
}

function SidebarEntry({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) {
  const [open, setOpen] = React.useState(false);

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
        item.active
          ? "bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-medium"
          : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
      )}
      onClick={() => item.children && setOpen(!open)}
    >
      {item.icon && <span className="shrink-0 h-5 w-5">{item.icon}</span>}
      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
      {!collapsed && item.children && (
        <svg
          className={cn("h-4 w-4 transition-transform", open && "rotate-90")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div>
      {item.href ? <a href={item.href}>{content}</a> : content}
      {!collapsed && open && item.children && (
        <div className="ml-4 mt-0.5 space-y-0.5">
          {item.children.map((child, i) => (
            <SidebarEntry key={i} item={child} collapsed={false} />
          ))}
        </div>
      )}
    </div>
  );
}
