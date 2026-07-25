"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Tag Input ─── */

interface AuraTagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
}

export function AuraTagInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  className,
  maxTags,
}: AuraTagInputProps) {
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;
    if (maxTags && value.length >= maxTags) return;
    onChange?.([...value, trimmed]);
    setInput("");
  };

  const removeTag = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 rounded-lg bg-[var(--bg-surface)] px-3 py-2 shadow-[var(--inset-shadow)] transition-all",
        "focus-within:ring-2 focus-within:ring-[var(--aura)]",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 rounded-md bg-[var(--bg-surface-hover)] px-2 py-0.5 text-xs font-medium text-[var(--text-primary)]"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="ml-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={value.length === 0 ? placeholder : ""}
        className="min-w-[80px] flex-1 border-0 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
      />
    </div>
  );
}
