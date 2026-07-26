"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── ACCORDION ─── */
interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue>({
  openItems: new Set(),
  toggle: () => {},
  type: "single",
});

export interface AuraAccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string[];
  children: React.ReactNode;
  className?: string;
}

function AuraAccordion({
  type = "single",
  defaultValue = [],
  children,
  className,
}: AuraAccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(defaultValue)
  );

  const toggle = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AuraAccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function AuraAccordionItem({ value, children, className }: AuraAccordionItemProps) {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);
  const itemRef = React.useRef<HTMLDivElement | null>(null);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const glowSize = Math.max(rect.width, rect.height) * 1.5;
    el.style.setProperty("--wash-x", `${x}px`);
    el.style.setProperty("--wash-y", `${y}px`);
    el.style.setProperty("--wash-size", `${glowSize}px`);
    el.style.setProperty("--wash-opacity", "1");
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    const el = itemRef.current;
    if (!el) return;
    el.style.setProperty("--wash-opacity", "0");
  }, []);

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
    >
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
          opacity: isOpen ? 1 : 0.5,
        }}
      />
      {/* Dynamic Cursor Glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-[1]"
      >
        <span
          className="absolute rounded-full transition-opacity duration-250 ease-out"
          style={{
            top: "50%",
            left: "50%",
            width: "var(--wash-size, 0px)",
            height: "var(--wash-size, 0px)",
            transform:
              "translate(-50%, -50%) translate(var(--wash-x, 0px), var(--wash-y, 0px))",
            background:
              "radial-gradient(circle, var(--dynamic-light-color) 0%, transparent 100%)",
            opacity: "var(--wash-opacity, 0)",
            filter: "blur(12px)",
          }}
        />
      </span>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export interface AuraAccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AuraAccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AuraAccordionTriggerProps
>(({ className, value, children, ...props }, ref) => {
  const { openItems, toggle } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)]",
        className
      )}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      {...props}
    >
      <span>{children}</span>
      <svg
        className={cn(
          "h-4 w-4 text-[var(--text-secondary)] transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});
AuraAccordionTrigger.displayName = "AuraAccordionTrigger";

export interface AuraAccordionContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

function AuraAccordionContent({
  value,
  children,
  className,
}: AuraAccordionContentProps) {
  const { openItems } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "animate-in fade-in-0 slide-in-from-top-1 border-t border-[var(--card-border)] px-4 py-3 text-sm text-[var(--text-secondary)] duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export {
  AuraAccordion,
  AuraAccordionItem,
  AuraAccordionTrigger,
  AuraAccordionContent,
};
