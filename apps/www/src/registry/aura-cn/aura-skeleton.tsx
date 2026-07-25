import * as React from "react";
import { cn } from "@/lib/utils";

export interface AuraSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuraSkeleton = React.forwardRef<HTMLDivElement, AuraSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg bg-[var(--bg-surface)]",
          className
        )}
        {...props}
      >
        {/* Shimmer animation */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--wash-color) 50%, transparent 100%)",
          }}
        />
      </div>
    );
  }
);

AuraSkeleton.displayName = "AuraSkeleton";

export { AuraSkeleton };
