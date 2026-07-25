"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── CHECKBOX ─── */
export interface AuraCheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
}

const AuraCheckbox = React.forwardRef<HTMLButtonElement, AuraCheckboxProps>(
  ({ className, checked, defaultChecked = false, onCheckedChange, label, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked);
    const controlledChecked = checked !== undefined ? checked : isChecked;

    const toggle = () => {
      const next = !controlledChecked;
      if (checked === undefined) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <label className="inline-flex cursor-pointer items-center gap-2">
        <button
          type="button"
          role="checkbox"
          aria-checked={controlledChecked}
          className={cn(
            "relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-md border-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            controlledChecked
              ? "bg-aura text-white"
              : "bg-[rgba(255,255,255,0.06)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]",
            className
          )}
          onClick={toggle}
          ref={ref}
          {...props}
        >
          {/* Rim Light */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-[3]"
            style={{
              padding: "0.5px",
              background: controlledChecked
                ? "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)"
                : "linear-gradient(to top, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          {/* Checkmark */}
          {controlledChecked && (
            <svg
              className="relative z-10 h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        {label && <span className="text-sm text-[var(--text-primary,#f1f1f1)]">{label}</span>}
      </label>
    );
  }
);

AuraCheckbox.displayName = "AuraCheckbox";

/* ─── RADIO ─── */
export interface AuraRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const AuraRadioContext = React.createContext<{
  value: string;
  onChange: (v: string) => void;
}>({ value: "", onChange: () => {} });

function AuraRadioGroup({
  value,
  defaultValue = "",
  onValueChange,
  children,
  className,
}: AuraRadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const controlled = value !== undefined ? value : internal;

  const onChange = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <AuraRadioContext.Provider value={{ value: controlled, onChange }}>
      <div role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        {children}
      </div>
    </AuraRadioContext.Provider>
  );
}

export interface AuraRadioItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  label?: string;
}

const AuraRadioItem = React.forwardRef<HTMLButtonElement, AuraRadioItemProps>(
  ({ className, value, label, ...props }, ref) => {
    const ctx = React.useContext(AuraRadioContext);
    const isSelected = ctx.value === value;

    return (
      <label className="inline-flex cursor-pointer items-center gap-2">
        <button
          type="button"
          role="radio"
          aria-checked={isSelected}
          className={cn(
            "relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full border-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isSelected
              ? "bg-aura"
              : "bg-[rgba(255,255,255,0.06)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]",
            className
          )}
          onClick={() => ctx.onChange(value)}
          ref={ref}
          {...props}
        >
          {/* Rim Light */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full z-[3]"
            style={{
              padding: "0.5px",
              background: isSelected
                ? "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)"
                : "linear-gradient(to top, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          {/* Dot */}
          {isSelected && (
            <span className="relative z-10 h-2 w-2 rounded-full bg-white" />
          )}
        </button>
        {label && <span className="text-sm text-[var(--text-primary,#f1f1f1)]">{label}</span>}
      </label>
    );
  }
);

AuraRadioItem.displayName = "AuraRadioItem";

export { AuraCheckbox, AuraRadioGroup, AuraRadioItem };
