"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Modal / Dialog ─── */

interface AuraModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export function AuraModal({ open, onOpenChange, children }: AuraModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Content */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg mx-4 rounded-2xl",
          "bg-[var(--bg-page,#0f0f0f)] border border-[rgba(255,255,255,0.06)] shadow-2xl",
          "animate-in fade-in zoom-in-95 duration-200",
          // Rim light
          "before:absolute before:inset-0 before:rounded-2xl before:z-[3]",
          "before:bg-[linear-gradient(to_bottom,var(--rim-light,rgba(255,255,255,0.15)),transparent_75%)]",
          "before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
          "before:[mask-composite:exclude]",
          "before:[padding:0.5px]",
          "before:pointer-events-none"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AuraModalHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 pt-6 pb-2", className)}>
      {children}
    </div>
  );
}

export function AuraModalTitle({
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

export function AuraModalDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-[var(--text-secondary,rgba(255,255,255,0.7))] mt-1", className)}>
      {children}
    </p>
  );
}

export function AuraModalContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function AuraModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 pb-6 pt-2",
        className
      )}
    >
      {children}
    </div>
  );
}
