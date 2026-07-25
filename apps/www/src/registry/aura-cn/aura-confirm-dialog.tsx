"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Confirm Dialog ─── */

interface AuraConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function AuraConfirmDialog({
  open = false,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: AuraConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => { onCancel?.(); onOpenChange?.(false); }}
      />
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-[var(--card-border)] bg-[var(--bg-page)] p-6 shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{description}</p>
        )}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => { onCancel?.(); onOpenChange?.(false); }}
            className="rounded-lg bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-surface-hover)]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => { onConfirm?.(); onOpenChange?.(false); }}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white transition",
              variant === "destructive"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
