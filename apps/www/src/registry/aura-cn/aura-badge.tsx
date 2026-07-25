import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraBadgeVariants = cva(
  "relative inline-flex items-center overflow-hidden rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[rgba(255,255,255,0.1)] text-[var(--text-primary,#f1f1f1)]",
        accent: "bg-aura text-white",
        outline: "bg-transparent border border-[rgba(255,255,255,0.15)] text-[var(--text-primary,#f1f1f1)]",
        destructive: "bg-red-500/20 text-red-400 border border-red-500/20",
        success: "bg-green-500/20 text-green-400 border border-green-500/20",
      },
      size: {
        sm: "h-5 px-2",
        default: "h-6 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AuraBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auraBadgeVariants> {}

const AuraBadge = React.forwardRef<HTMLSpanElement, AuraBadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const showRim = variant !== "accent";

    return (
      <span
        className={cn(auraBadgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Rim Light */}
        {showRim && (
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
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </span>
    );
  }
);

AuraBadge.displayName = "AuraBadge";

export { AuraBadge, auraBadgeVariants };
