/**
 * Registry Build Script
 * Generates shadcn-compatible JSON files in public/r/ for each component.
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REGISTRY_DIR = resolve(ROOT, "src/registry/aura-cn");
const OUTPUT_DIR = resolve(ROOT, "public/r");

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

/** @type {Array<{name: string, file: string, title: string, description: string, dependencies: string[], registryDependencies?: string[], cssVars?: {light: Record<string, string>, dark: Record<string, string>}}>} */
const components = [
  {
    name: "aura-button",
    file: "aura-button.tsx",
    title: "Aura Button",
    description: "A button with 3D rim light, static wash, and dynamic cursor-following glow.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
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
  {
    name: "aura-card",
    file: "aura-card.tsx",
    title: "Aura Card",
    description: "A card container with rim light and dynamic cursor-following glow on hover.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-input",
    file: "aura-input.tsx",
    title: "Aura Input",
    description: "A text input with recessed styling, inset shadow, and focus accent.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-textarea",
    file: "aura-textarea.tsx",
    title: "Aura Textarea",
    description: "A multi-line text input with recessed styling matching AuraInput.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-select",
    file: "aura-select.tsx",
    title: "Aura Select",
    description: "A dropdown select with recessed styling and custom chevron.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-toggle",
    file: "aura-toggle.tsx",
    title: "Aura Toggle",
    description: "A switch/toggle with glowing thumb and rim light track.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-checkbox-radio",
    file: "aura-checkbox-radio.tsx",
    title: "Aura Checkbox & Radio",
    description: "Selection controls with rim light that flips direction on checked state.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-chip",
    file: "aura-chip.tsx",
    title: "Aura Chip",
    description: "A tag/chip with rim light and optional remove button.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-slider",
    file: "aura-slider.tsx",
    title: "Aura Slider",
    description: "A range slider with glowing fill track and custom thumb.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-tabs",
    file: "aura-tabs.tsx",
    title: "Aura Tabs",
    description: "Tab navigation with recessed list and active trigger rim light.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-avatar",
    file: "aura-avatar.tsx",
    title: "Aura Avatar",
    description: "An avatar with glow ring and rim light border.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-progress",
    file: "aura-progress.tsx",
    title: "Aura Progress",
    description: "A progress bar with glowing fill and rim light track.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-accordion",
    file: "aura-accordion.tsx",
    title: "Aura Accordion",
    description: "Collapsible sections with rim light intensity change on open.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-skeleton",
    file: "aura-skeleton.tsx",
    title: "Aura Skeleton",
    description: "Loading placeholder with aura shimmer animation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-toast",
    file: "aura-toast.tsx",
    title: "Aura Toast",
    description: "Notification toast with rim light and variant styles.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-badge",
    file: "aura-badge.tsx",
    title: "Aura Badge",
    description: "Compact badge/label with rim light effect.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-modal",
    file: "aura-modal.tsx",
    title: "Aura Modal",
    description: "Dialog/modal overlay with rim light and backdrop blur.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-dropdown",
    file: "aura-dropdown.tsx",
    title: "Aura Dropdown",
    description: "Dropdown menu with rim light and slide animation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-tooltip",
    file: "aura-tooltip.tsx",
    title: "Aura Tooltip",
    description: "Tooltip with rim light and positioning support.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-drawer",
    file: "aura-drawer.tsx",
    title: "Aura Drawer",
    description: "Slide-out panel with rim light from the opening edge.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-fab",
    file: "aura-fab.tsx",
    title: "Aura FAB",
    description: "Floating action button with rim light glow.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-theme",
    file: "aura-theme.tsx",
    title: "Aura Theme",
    description: "Theme provider with 5 color presets and dark/light toggle.",
    dependencies: [],
  },
];

// Build individual component JSONs
const registryItems = [];

for (const comp of components) {
  const filePath = resolve(REGISTRY_DIR, comp.file);
  const content = readFileSync(filePath, "utf-8");

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: comp.name,
    type: "registry:ui",
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
    files: [
      {
        path: `registry/aura-cn/${comp.file}`,
        type: "registry:ui",
        content,
      },
    ],
  };

  if (comp.cssVars) {
    item.cssVars = comp.cssVars;
  }

  if (comp.registryDependencies) {
    item.registryDependencies = comp.registryDependencies;
  }

  // Write individual JSON
  const outputPath = resolve(OUTPUT_DIR, `${comp.name}.json`);
  writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`✓ ${comp.name}.json`);

  // Add to registry index (without content for catalog)
  registryItems.push({
    name: comp.name,
    type: "registry:ui",
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
    files: [{ path: `registry/aura-cn/${comp.file}`, type: "registry:ui" }],
  });
}

// Write registry index
const registryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "aura-cn",
  homepage: "https://raw.githubusercontent.com/duongnnb/aura-cn/master/apps/www/public/r",
  items: registryItems,
};

writeFileSync(
  resolve(OUTPUT_DIR, "index.json"),
  JSON.stringify(registryIndex, null, 2)
);
console.log(`\n✓ index.json (${registryItems.length} components)`);
console.log(`\nRegistry built successfully at public/r/`);
