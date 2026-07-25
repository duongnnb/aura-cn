"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Dropdown Menu ─── */

interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

interface AuraDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function AuraDropdown({
  trigger,
  items,
  align = "left",
  className,
}: AuraDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[180px] rounded-xl",
            "bg-[var(--bg-page)] border border-[var(--card-border)] shadow-xl",
            "animate-in fade-in slide-in-from-top-2 duration-150",
            // Rim light
            "before:absolute before:inset-0 before:rounded-xl before:z-[3]",
            "before:bg-[linear-gradient(to_bottom,var(--rim-light),transparent_75%)]",
            "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
            "before:[mask-composite:exclude]",
            "before:[padding:0.5px]",
            "before:pointer-events-none",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="relative z-10 p-1">
            {items.map((item, i) =>
              item.separator ? (
                <div
                  key={i}
                  className="my-1 h-px bg-[var(--card-border)]"
                />
              ) : (
                <button
                  key={i}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] transition-colors",
                    "hover:bg-[var(--bg-surface)]",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    item.destructive && "text-red-400 hover:bg-red-500/10"
                  )}
                >
                  {item.icon && (
                    <span className="h-4 w-4 shrink-0">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
