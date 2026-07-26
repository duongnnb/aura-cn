"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Autocomplete ─── */

interface AuraAutocompleteProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AuraAutocomplete({
  options,
  value = "",
  onChange,
  placeholder = "Search...",
  className,
}: AuraAutocompleteProps) {
  const [query, setQuery] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const filtered = React.useMemo(() => {
    if (!query) return options;
    return options.filter((opt) => opt.toLowerCase().includes(query.toLowerCase()));
  }, [options, query]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  React.useEffect(() => {
    setHighlightIndex(0);
  }, [query]);

  const select = (val: string) => {
    setQuery(val);
    onChange?.(val);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlightIndex]) select(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex h-10 w-full rounded-lg border-0 bg-[var(--bg-surface)] px-3 py-2 text-sm text-[var(--text-primary)] shadow-[var(--inset-shadow)] outline-none placeholder:text-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--aura)]"
      />
      {/* Inverted Rim Light (bottom) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-0 h-10 rounded-lg"
        style={{
          padding: "0.5px",
          background:
            "linear-gradient(to top, var(--rim-light), transparent 75%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] p-1 shadow-xl animate-in fade-in zoom-in-95 duration-100">
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
          {filtered.slice(0, 8).map((opt, i) => (
            <button
              key={opt}
              type="button"
              onMouseEnter={() => setHighlightIndex(i)}
              onClick={() => select(opt)}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] transition-colors",
                i === highlightIndex && "bg-[var(--bg-surface)]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
