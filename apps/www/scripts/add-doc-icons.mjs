// One-off: add `icon:` frontmatter to all docs pages (lucide icon names).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../content/docs");

const ICONS = {
  "index.mdx": "BookOpen",
  "theming.mdx": "Palette",
  // Actions
  "button.mdx": "MousePointerClick",
  "fab.mdx": "Plus",
  "chip.mdx": "Tag",
  "badge.mdx": "BadgeCheck",
  // Inputs
  "input.mdx": "TextCursorInput",
  "textarea.mdx": "AlignLeft",
  "select.mdx": "List",
  "toggle.mdx": "ToggleLeft",
  "switch-icon.mdx": "SunMoon",
  "checkbox-radio.mdx": "SquareCheck",
  "slider.mdx": "SlidersHorizontal",
  "datepicker.mdx": "Calendar",
  "otp-input.mdx": "KeyRound",
  "tag-input.mdx": "Tags",
  "autocomplete.mdx": "Search",
  "file-upload.mdx": "Upload",
  "color-picker.mdx": "Pipette",
  // Navigation
  "navbar.mdx": "PanelTop",
  "sidebar.mdx": "PanelLeft",
  "breadcrumb.mdx": "ChevronRight",
  "pagination.mdx": "Ellipsis",
  "tabs.mdx": "AppWindow",
  "command.mdx": "Command",
  "dropdown.mdx": "ChevronDown",
  // Feedback
  "alert.mdx": "TriangleAlert",
  "toast.mdx": "Bell",
  "progress.mdx": "LoaderCircle",
  "skeleton.mdx": "RectangleHorizontal",
  "tooltip.mdx": "MessageSquare",
  "notification-badge.mdx": "BellDot",
  // Overlays
  "modal.mdx": "Square",
  "drawer.mdx": "PanelRight",
  "popover.mdx": "MessageCircle",
  "confirm-dialog.mdx": "CircleHelp",
  // Layout
  "card.mdx": "CreditCard",
  "accordion.mdx": "ChevronsUpDown",
  "divider.mdx": "SeparatorHorizontal",
  "timeline.mdx": "History",
  "carousel.mdx": "GalleryHorizontal",
  // Data Display
  "table.mdx": "Table",
  "avatar.mdx": "CircleUser",
  "stat-card.mdx": "TrendingUp",
  "tree-view.mdx": "FolderTree",
  "data-list.mdx": "Rows3",
  // Animation
  "motion.mdx": "Sparkles",
};

let changed = 0;
for (const dir of ["", "components"]) {
  const abs = path.join(ROOT, dir);
  for (const file of fs.readdirSync(abs)) {
    if (!file.endsWith(".mdx")) continue;
    const icon = ICONS[file];
    if (!icon) {
      console.warn(`no icon mapped: ${dir}/${file}`);
      continue;
    }
    const fp = path.join(abs, file);
    let src = fs.readFileSync(fp, "utf8");
    if (/^icon:/m.test(src)) continue; // already has one
    src = src.replace(/^(---\r?\n[\s\S]*?)(\r?\n---)/, `$1\nicon: ${icon}$2`);
    fs.writeFileSync(fp, src);
    changed++;
  }
}
console.log(`updated ${changed} files`);
