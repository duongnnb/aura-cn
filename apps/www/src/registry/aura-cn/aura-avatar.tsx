"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const auraAvatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AuraAvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof auraAvatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  enableGlow?: boolean;
}

const AuraAvatar = React.forwardRef<HTMLSpanElement, AuraAvatarProps>(
  ({ className, size, src, alt, fallback, enableGlow = true, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    return (
      <span
        className={cn(auraAvatarVariants({ size, className }))}
        ref={ref}
        {...props}
      >
        {/* Rim Light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full z-[3]"
          style={{
            padding: "0.5px",
            background:
              "linear-gradient(to bottom, var(--rim-light, rgba(255,255,255,0.15)), transparent 75%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Glow ring */}
        {enableGlow && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-0.5 rounded-full opacity-50"
            style={{ boxShadow: "0 0 10px 2px var(--aura-glow)" }}
          />
        )}

        {/* Image or Fallback */}
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || ""}
            className="h-full w-full rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="relative z-10 font-medium text-[var(--text-secondary,rgba(255,255,255,0.7))]">
            {fallback || alt?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}
      </span>
    );
  }
);

AuraAvatar.displayName = "AuraAvatar";

export { AuraAvatar, auraAvatarVariants };
