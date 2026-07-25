"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── DatePicker ─── */

interface AuraDatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  placeholder?: string;
}

export function AuraDatePicker({
  value,
  onChange,
  className,
  placeholder = "Select date",
}: AuraDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(value || new Date());
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

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const isSelected = (day: number) =>
    value &&
    value.getDate() === day &&
    value.getMonth() === month &&
    value.getFullYear() === year;

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDay = (day: number) => {
    onChange?.(new Date(year, month, day));
    setOpen(false);
  };

  const formatted = value
    ? `${value.getDate()} ${monthNames[value.getMonth()]?.slice(0, 3)} ${value.getFullYear()}`
    : "";

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 items-center gap-2 rounded-lg border-0 bg-[var(--bg-surface)] px-3 text-sm shadow-[var(--inset-shadow)] transition-all",
          value ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
        )}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {formatted || placeholder}
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 left-0 w-[280px] rounded-xl overflow-hidden",
            "bg-[var(--bg-page)] border border-[var(--card-border)] shadow-xl",
            "animate-in fade-in zoom-in-95 duration-150"
          )}
        >
          {/* Rim Light */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-xl z-[3]"
            style={{
              padding: "0.5px",
              background: "linear-gradient(to bottom, var(--rim-light), transparent 75%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />

          <div className="relative z-10 p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                className="h-7 w-7 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
              >
                ‹
              </button>
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="h-7 w-7 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
              >
                ›
              </button>
            </div>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="text-center text-xs text-[var(--text-secondary)] py-1">
                  {d}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {days.map((day, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={!day}
                  onClick={() => day && selectDay(day)}
                  className={cn(
                    "h-8 w-8 rounded-md text-xs transition-colors",
                    !day && "invisible",
                    day && isSelected(day) && "bg-[var(--aura)] text-white font-medium",
                    day && !isSelected(day) && isToday(day) && "border border-[var(--aura)] text-[var(--text-primary)]",
                    day && !isSelected(day) && !isToday(day) && "text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
