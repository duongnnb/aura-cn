"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── OTP Input ─── */

interface AuraOTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function AuraOTPInput({
  length = 6,
  value = "",
  onChange,
  className,
}: AuraOTPInputProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  const chars = value.split("").concat(Array(length - value.length).fill(""));

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const next = [...chars];
    next[index] = char.slice(-1);
    const newVal = next.join("").slice(0, length);
    onChange?.(newVal);
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !chars[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange?.(pasted);
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="relative">
          <input
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={chars[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={cn(
              "h-12 w-10 rounded-lg border-0 bg-[var(--bg-surface)] text-center text-lg font-semibold text-[var(--text-primary)] shadow-[var(--inset-shadow)] outline-none transition-all",
              "focus:ring-2 focus:ring-[var(--aura)]"
            )}
          />
          {/* Inverted Rim Light (bottom) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg"
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
      ))}
    </div>
  );
}
