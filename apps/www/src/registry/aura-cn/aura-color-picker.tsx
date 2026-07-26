"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Color Picker ─── */

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#f1f1f1", "#0f0f0f",
];

interface AuraColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  className?: string;
}

export function AuraColorPicker({
  value = "#3b82f6",
  onChange,
  presets = PRESET_COLORS,
  className,
}: AuraColorPickerProps) {
  const [color, setColor] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const update = (c: string) => {
    setColor(c);
    onChange?.(c);
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex items-center gap-2 rounded-lg bg-[var(--bg-surface)] px-3 py-2 shadow-[var(--inset-shadow)] transition hover:bg-[var(--bg-surface-hover)]"
      >
        {/* Inverted Rim Light (bottom) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: "0.5px",
            background:
              "linear-gradient(to top, var(--rim-light), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
        <span
          className="h-5 w-5 rounded-full border border-[var(--card-border)]"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-[var(--text-primary)] font-mono">{color}</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--bg-page)] p-3 shadow-xl animate-in fade-in zoom-in-95 duration-100">
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
          {/* Presets */}
          <div className="mb-3 grid grid-cols-5 gap-2">
            {presets.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update(c)}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                  color === c ? "border-[var(--text-primary)] scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          {/* Custom input */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => update(e.target.value)}
              className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => update(e.target.value)}
              className="flex-1 rounded-md bg-[var(--bg-surface)] px-2 py-1 text-xs font-mono text-[var(--text-primary)] outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
