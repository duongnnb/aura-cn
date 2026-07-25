import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Alert ─── */

const alertVariants = cva(
  "relative flex items-start gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        info: "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-primary)]",
        success: "bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400",
        warning: "bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:text-yellow-400",
        error: "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const icons: Record<string, React.ReactNode> = {
  info: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export interface AuraAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: boolean;
}

export function AuraAlert({
  className,
  variant = "info",
  title,
  icon = true,
  children,
  ...props
}: AuraAlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      {icon && icons[variant || "info"]}
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {children && <div className="mt-0.5 opacity-90">{children}</div>}
      </div>
    </div>
  );
}
