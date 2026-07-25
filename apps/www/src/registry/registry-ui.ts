import type { RegistryItem } from "./types";

export const registryUI: RegistryItem[] = [
  {
    name: "aura-button",
    type: "registry:ui",
    title: "Aura Button",
    description:
      "A button component with 3D rim light, static wash, and dynamic cursor-following glow effect.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        path: "registry/aura-cn/aura-button.tsx",
        type: "registry:ui",
      },
    ],
    cssVars: {
      light: {
        "aura": "oklch(0.623 0.214 259.815)",
        "aura-glow": "oklch(0.623 0.214 259.815 / 0.4)",
        "aura-rim": "oklch(0.882 0.059 254.128 / 0.6)",
        "aura-wash": "oklch(0.882 0.059 254.128 / 0.15)",
        "aura-dynamic": "oklch(0.882 0.059 254.128 / 0.25)",
      },
      dark: {
        "aura": "oklch(0.707 0.165 254.624)",
        "aura-glow": "oklch(0.707 0.165 254.624 / 0.5)",
        "aura-rim": "oklch(0.882 0.059 254.128 / 0.7)",
        "aura-wash": "oklch(0.882 0.059 254.128 / 0.1)",
        "aura-dynamic": "oklch(0.882 0.059 254.128 / 0.35)",
      },
    },
  },
];
