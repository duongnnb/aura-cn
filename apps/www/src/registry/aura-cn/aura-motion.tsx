"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

/**
 * AuraMotion — entrance animation wrapper
 *
 * Provides consistent fade-up, scale-in, and slide animations
 * for any component wrapped within it.
 */

export type AuraMotionPreset = "fade-up" | "fade-down" | "scale" | "slide-left" | "slide-right" | "blur";

const presetVariants: Record<AuraMotionPreset, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export interface AuraMotionProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Animation preset */
  preset?: AuraMotionPreset;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Whether to trigger animation once when in viewport */
  once?: boolean;
  /** Custom variants (overrides preset) */
  variants?: Variants;
  /** Children */
  children: React.ReactNode;
}

export const AuraMotion = React.forwardRef<HTMLDivElement, AuraMotionProps>(
  (
    {
      preset = "fade-up",
      duration = 0.5,
      delay = 0,
      once = true,
      variants,
      children,
      ...props
    },
    ref
  ) => {
    const selectedVariants = variants || presetVariants[preset];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-48px" }}
        variants={selectedVariants}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AuraMotion.displayName = "AuraMotion";

/**
 * AuraStagger — stagger children animations
 *
 * Wraps children with staggered entrance animation.
 */
export interface AuraStaggerProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Stagger delay between each child (seconds) */
  stagger?: number;
  /** Duration of each child animation */
  duration?: number;
  /** Initial delay before first child */
  delay?: number;
  /** Animation preset for children */
  preset?: AuraMotionPreset;
  /** Trigger once in viewport */
  once?: boolean;
  children: React.ReactNode;
}

export const AuraStagger = React.forwardRef<HTMLDivElement, AuraStaggerProps>(
  (
    {
      stagger = 0.08,
      duration = 0.4,
      delay = 0,
      preset = "fade-up",
      once = true,
      children,
      ...props
    },
    ref
  ) => {
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const itemVariants = presetVariants[preset];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-48px" }}
        variants={containerVariants}
        {...props}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <motion.div variants={itemVariants} transition={{ duration, ease: [0.25, 0.46, 0.45, 0.94] }}>
              {child}
            </motion.div>
          ) : (
            child
          )
        )}
      </motion.div>
    );
  }
);

AuraStagger.displayName = "AuraStagger";

export { presetVariants };
