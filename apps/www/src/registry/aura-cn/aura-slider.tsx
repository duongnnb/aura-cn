"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraSliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

const AuraSlider = React.forwardRef<HTMLInputElement, AuraSliderProps>(
  (
    {
      className,
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultValue);
    const controlled = value !== undefined ? value : internal;
    const percent = ((controlled - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    };

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {/* Track background */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--bg-surface)] shadow-[var(--inset-shadow)]">
          {/* Filled portion */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-aura"
            style={{ width: `${percent}%` }}
          >
            {/* Glow on filled */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 8px 1px var(--aura-glow)",
              }}
            />
          </div>
          {/* Rim light on track */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full z-[3]"
            style={{
              padding: "0.5px",
              background:
                "linear-gradient(to top, var(--rim-light), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        </div>
        {/* Native range input (invisible, on top for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={controlled}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          ref={ref}
          {...props}
        />
        {/* Custom thumb */}
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-aura bg-[var(--text-primary)] shadow-lg"
          style={{ left: `${percent}%` }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 6px 1px var(--aura-glow)" }}
          />
        </div>
      </div>
    );
  }
);

AuraSlider.displayName = "AuraSlider";

export { AuraSlider };
