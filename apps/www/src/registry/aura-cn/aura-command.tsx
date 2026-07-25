"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Command Palette (⌘K) ─── */

export interface CommandItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect?: () => void;
  group?: string;
}

interface AuraCommandProps {
  items: CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
}

export function AuraCommand({
  items,
  open,
  onOpenChange,
  placeholder = "Type a command...",
}: AuraCommandProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    if (!query) return items;
    const lower = query.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(lower));
  }, [items, query]);

  // Group items
  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filtered) {
      const group = item.group || "";
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(item);
    }
    return map;
  }, [filtered]);

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selectedIndex]?.onSelect?.();
      onOpenChange?.(false);
    } else if (e.key === "Escape") {
      onOpenChange?.(false);
    }
  };

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Panel */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg mx-4 overflow-hidden rounded-2xl",
          "bg-[var(--bg-page)] border border-[var(--card-border)] shadow-2xl",
          "animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Rim Light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl z-[3]"
          style={{
            padding: "0.5px",
            background: "linear-gradient(to bottom, var(--rim-light), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Search Input */}
        <div className="relative flex items-center border-b border-[var(--card-border)] px-4">
          <svg className="h-4 w-4 shrink-0 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
          />
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="py-6 text-center text-sm text-[var(--text-secondary)]">
              No results found.
            </p>
          )}
          {[...grouped.entries()].map(([group, groupItems]) => (
            <div key={group}>
              {group && (
                <p className="px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  {group}
                </p>
              )}
              {groupItems.map((item) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] transition-colors",
                      idx === selectedIndex && "bg-[var(--bg-surface)]"
                    )}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      item.onSelect?.();
                      onOpenChange?.(false);
                    }}
                  >
                    {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="ml-auto text-xs text-[var(--text-secondary)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
