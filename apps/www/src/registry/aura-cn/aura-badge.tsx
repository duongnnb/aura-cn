import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraBadgeVariants = cva(
  "relative inline-flex items-center overflow-hidden rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        aura: "bg-aura text-primary-foreground",
        destructive: "bg-destructive text-primary-foreground",
      },
      size: {
        sm: "h-5 px-2",
        default: "h-6 px-2.5",
      },
    },
    defaultVariants: {
      variant: "aura",
      size: "default",
    },
  }
);

export interface AuraBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auraBadgeVariants> {}

const AuraBadge = React.forwardRef<HTMLSpanElement, AuraBadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const isAura = variant === "aura" || variant === undefined;

    return (
      <span
        className={cn(auraBadgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Rim Light */}
        {isAura && (
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
      </span>
    );
  }
);

AuraBadge.displayName = "AuraBadge";

export { AuraBadge, auraBadgeVariants };
