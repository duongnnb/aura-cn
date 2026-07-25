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

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)]",
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
            "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: isOpen ? 1 : 0.5,
        }}
      />
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
        "flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-primary,#f1f1f1)] transition-colors hover:bg-[rgba(255,255,255,0.06)]",
        className
      )}
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      {...props}
    >
      <span>{children}</span>
      <svg
        className={cn(
          "h-4 w-4 text-[var(--text-secondary,rgba(255,255,255,0.7))] transition-transform duration-200",
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
        "animate-in fade-in-0 slide-in-from-top-1 border-t border-[rgba(255,255,255,0.06)] px-4 py-3 text-sm text-[var(--text-secondary,rgba(255,255,255,0.7))] duration-200",
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
