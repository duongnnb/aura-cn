/**
 * Registry Build Script
 * Generates shadcn-compatible JSON files in public/r/ for each component.
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ─── Registry base URL (single source of truth: src/lib/site-config.ts) ───
const REGISTRY_BASE_URL = "https://aura-cn.vercel.app/r";

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
  {
    name: "aura-motion",
    file: "aura-motion.tsx",
    title: "Aura Motion",
    description: "Entrance animation wrappers with 6 presets, powered by Framer Motion.",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-command",
    file: "aura-command.tsx",
    title: "Aura Command",
    description: "Command palette (⌘K) with fuzzy search and keyboard navigation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-popover",
    file: "aura-popover.tsx",
    title: "Aura Popover",
    description: "Floating popover panel with rim light and click-outside handling.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-table",
    file: "aura-table.tsx",
    title: "Aura Table",
    description: "Data table with rim light container, striped rows, and typed columns.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-datepicker",
    file: "aura-datepicker.tsx",
    title: "Aura DatePicker",
    description: "Calendar-based date picker with month navigation and today highlight.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-breadcrumb",
    file: "aura-breadcrumb.tsx",
    title: "Aura Breadcrumb",
    description: "Navigation breadcrumb trail showing the current page hierarchy.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-pagination",
    file: "aura-pagination.tsx",
    title: "Aura Pagination",
    description: "Page navigation with smart ellipsis and prev/next controls.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-divider",
    file: "aura-divider.tsx",
    title: "Aura Divider",
    description: "Horizontal or vertical separator line with optional label.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-alert",
    file: "aura-alert.tsx",
    title: "Aura Alert",
    description: "Contextual feedback messages with info, success, warning, and error variants.",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "aura-otp-input",
    file: "aura-otp-input.tsx",
    title: "Aura OTP Input",
    description: "One-time password input with auto-focus, paste support, and backspace navigation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-tag-input",
    file: "aura-tag-input.tsx",
    title: "Aura Tag Input",
    description: "Multi-tag input with Enter/comma to add tags and backspace to remove.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-autocomplete",
    file: "aura-autocomplete.tsx",
    title: "Aura Autocomplete",
    description: "Input with filtered dropdown suggestions and keyboard navigation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-file-upload",
    file: "aura-file-upload.tsx",
    title: "Aura File Upload",
    description: "Drag-and-drop file upload zone with file list and size validation.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-sidebar",
    file: "aura-sidebar.tsx",
    title: "Aura Sidebar",
    description: "Collapsible sidebar navigation with nested items and active state.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-navbar",
    file: "aura-navbar.tsx",
    title: "Aura Navbar",
    description: "Responsive top navigation bar with mobile hamburger menu.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-timeline",
    file: "aura-timeline.tsx",
    title: "Aura Timeline",
    description: "Vertical timeline with connected dots and optional dates.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-carousel",
    file: "aura-carousel.tsx",
    title: "Aura Carousel",
    description: "Slide-based carousel with prev/next controls and indicator dots.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-switch-icon",
    file: "aura-switch-icon.tsx",
    title: "Aura Switch Icon",
    description: "Animated icon toggle with rotate/scale transitions (e.g., sun/moon).",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-color-picker",
    file: "aura-color-picker.tsx",
    title: "Aura Color Picker",
    description: "Color selector with presets grid and custom hex/native input.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-confirm-dialog",
    file: "aura-confirm-dialog.tsx",
    title: "Aura Confirm Dialog",
    description: "Confirmation dialog with destructive/default variants and customizable actions.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-notification-badge",
    file: "aura-notification-badge.tsx",
    title: "Aura Notification Badge",
    description: "Count or dot badge overlay for icons and buttons.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-stat-card",
    file: "aura-stat-card.tsx",
    title: "Aura Stat Card",
    description: "Dashboard metric card with value, trend indicator, and change percentage.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-tree-view",
    file: "aura-tree-view.tsx",
    title: "Aura Tree View",
    description: "Expandable hierarchical tree structure for file explorers and nested data.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "aura-data-list",
    file: "aura-data-list.tsx",
    title: "Aura Data List",
    description: "Key-value pairs display in vertical or horizontal grid layout.",
    dependencies: ["clsx", "tailwind-merge"],
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
  homepage: REGISTRY_BASE_URL,
  items: registryItems,
};

writeFileSync(
  resolve(OUTPUT_DIR, "index.json"),
  JSON.stringify(registryIndex, null, 2)
);
console.log(`\n✓ index.json (${registryItems.length} components)`);
console.log(`\nRegistry built successfully at public/r/`);
