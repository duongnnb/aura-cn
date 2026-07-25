"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Drawer ─── */

interface AuraDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  children: React.ReactNode;
  className?: string;
}

export function AuraDrawer({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
}: AuraDrawerProps) {
  if (!open) return null;

  const sideClasses = {
    left: "left-0 top-0 h-full w-80 animate-in slide-in-from-left duration-300",
    right: "right-0 top-0 h-full w-80 animate-in slide-in-from-right duration-300",
    bottom: "bottom-0 left-0 w-full h-[60vh] rounded-t-xl animate-in slide-in-from-bottom duration-300",
  };

  const rimDirection = {
    left: "to right",
    right: "to left",
    bottom: "to bottom",
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Panel */}
      <div
        className={cn(
          "absolute bg-[var(--bg-page,#0f0f0f)] border-[rgba(255,255,255,0.06)] shadow-2xl",
          "before:absolute before:inset-0 before:z-[3]",
          `before:bg-[linear-gradient(${rimDirection[side]},var(--rim-light,rgba(255,255,255,0.15)),transparent_75%)]`,
          "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "before:[mask-composite:exclude]",
          "before:[padding:0.5px]",
          "before:pointer-events-none",
          side === "left" && "border-r",
          side === "right" && "border-l",
          side === "bottom" && "border-t before:rounded-t-xl",
          sideClasses[side],
          className
        )}
      >
        <div className="relative z-10 flex h-full flex-col overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuraDrawerHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function AuraDrawerTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold text-[var(--text-primary,#f1f1f1)]", className)}>
      {children}
    </h2>
  );
}

export function AuraDrawerContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex-1", className)}>{children}</div>;
}

export function AuraDrawerFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 flex items-center justify-end gap-2", className)}>
      {children}
    </div>
  );
}
