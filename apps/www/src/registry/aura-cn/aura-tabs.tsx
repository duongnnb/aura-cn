"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── TABS ─── */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({
  activeTab: "",
  setActiveTab: () => {},
});

export interface AuraTabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function AuraTabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: AuraTabsProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const activeTab = value !== undefined ? value : internal;

  const setActiveTab = (id: string) => {
    if (value === undefined) setInternal(id);
    onValueChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface AuraTabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuraTabsList = React.forwardRef<HTMLDivElement, AuraTabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "relative inline-flex items-center gap-1 overflow-hidden rounded-lg bg-[rgba(0,0,0,0.2)] p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    >
      {/* Rim light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
        style={{
          background:
            "linear-gradient(0deg, var(--aura-rim) 0%, transparent 50%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="relative z-10 flex items-center gap-1">
        {props.children}
      </div>
    </div>
  )
);
AuraTabsList.displayName = "AuraTabsList";

export interface AuraTabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const AuraTabsTrigger = React.forwardRef<HTMLButtonElement, AuraTabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        className={cn(
          "relative inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {/* Active rim light */}
        {isActive && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] p-px"
            style={{
              background:
                "linear-gradient(180deg, var(--aura-rim) 0%, transparent 60%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);
AuraTabsTrigger.displayName = "AuraTabsTrigger";

export interface AuraTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AuraTabsContent = React.forwardRef<HTMLDivElement, AuraTabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab } = React.useContext(TabsContext);
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn("mt-3 animate-in fade-in-50 duration-200", className)}
        {...props}
      />
    );
  }
);
AuraTabsContent.displayName = "AuraTabsContent";

export { AuraTabs, AuraTabsList, AuraTabsTrigger, AuraTabsContent };
