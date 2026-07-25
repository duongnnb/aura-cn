"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Carousel ─── */

interface AuraCarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function AuraCarousel({
  children,
  autoPlay = false,
  interval = 4000,
  className,
}: AuraCarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const items = React.Children.toArray(children);
  const total = items.length;
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const goTo = (i: number) => setCurrent(i);

  React.useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, interval, total]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((child, i) => (
          <div key={i} className="min-w-full shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-surface)]/80 text-[var(--text-primary)] backdrop-blur-sm transition hover:bg-[var(--bg-surface-hover)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-surface)]/80 text-[var(--text-primary)] backdrop-blur-sm transition hover:bg-[var(--bg-surface-hover)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-4 bg-[var(--text-primary)]"
                  : "w-1.5 bg-[var(--text-secondary)]/50 hover:bg-[var(--text-secondary)]"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
