"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Playground — interactive props editor for component docs.
 *
 * Renders a live preview alongside configurable controls.
 */

export interface PlaygroundControl {
  /** Prop name */
  name: string;
  /** Control type */
  type: "select" | "boolean" | "text" | "range";
  /** Available options (for select) */
  options?: string[];
  /** Default value */
  defaultValue?: string | boolean | number;
  /** Min/Max (for range) */
  min?: number;
  max?: number;
  step?: number;
}

interface PlaygroundProps {
  /** Controls to render */
  controls: PlaygroundControl[];
  /** Render function receiving current prop values */
  children: (props: Record<string, unknown>) => React.ReactNode;
  /** Additional class for preview area */
  className?: string;
}

export function Playground({ controls, children, className }: PlaygroundProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    for (const ctrl of controls) {
      initial[ctrl.name] = ctrl.defaultValue ?? (ctrl.type === "boolean" ? false : "");
    }
    return initial;
  });

  const update = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[var(--card-border)]">
      {/* Preview */}
      <div
        className={cn(
          "flex min-h-[120px] items-center justify-center bg-[var(--card-bg)] p-8",
          className
        )}
      >
        {children(values)}
      </div>

      {/* Controls */}
      <div className="border-t border-[var(--card-border)] bg-[var(--bg-page)] p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {controls.map((ctrl) => (
            <ControlField
              key={ctrl.name}
              control={ctrl}
              value={values[ctrl.name]}
              onChange={(v) => update(ctrl.name, v)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ControlField({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="min-w-[80px] text-xs font-medium text-[var(--text-secondary)]">
        {control.name}
      </label>
      {control.type === "select" && (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 flex-1 rounded-md border border-[var(--card-border)] bg-[var(--bg-surface)] px-2 text-xs text-[var(--text-primary)] outline-none"
        >
          {control.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {control.type === "boolean" && (
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn(
            "h-6 w-10 rounded-full transition-colors",
            value ? "bg-[var(--aura)]" : "bg-[var(--bg-surface)]"
          )}
        >
          <span
            className={cn(
              "block h-4 w-4 rounded-full bg-white transition-transform",
              value ? "translate-x-5" : "translate-x-1"
            )}
          />
        </button>
      )}
      {control.type === "text" && (
        <input
          type="text"
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 flex-1 rounded-md border border-[var(--card-border)] bg-[var(--bg-surface)] px-2 text-xs text-[var(--text-primary)] outline-none"
        />
      )}
      {control.type === "range" && (
        <div className="flex flex-1 items-center gap-2">
          <input
            type="range"
            min={control.min ?? 0}
            max={control.max ?? 100}
            step={control.step ?? 1}
            value={Number(value)}
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="w-8 text-right text-xs text-[var(--text-secondary)]">
            {String(value)}
          </span>
        </div>
      )}
    </div>
  );
}
