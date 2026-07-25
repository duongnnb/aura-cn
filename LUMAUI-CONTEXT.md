# LumaUI — Project Context & Summary

## What is this?

A UI Component Library inspired by YouTube Shorts' 3D light effect buttons. Single-file HTML demo showcasing 25 components with rim light, dynamic cursor glow, light/dark theme, and micro-interactions.

---

## Core Technique (3 Layers)

```
┌─────────────────────────────────────────────┐
│  Button (raised = light on TOP)             │
│  ┌─ Rim Light: gradient border via          │
│  │   mask-composite: exclude (0.5px)        │
│  ├─ Static Wash: blurred glow, top half     │
│  └─ Dynamic Wash: radial-gradient follows   │
│      cursor via CSS vars + JS mousemove     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  Input (recessed = light on BOTTOM)         │
│  ┌─ Inverted Rim Light: gradient from       │
│  │   bottom → transparent                   │
│  ├─ Inset Shadow: box-shadow inward         │
│  ├─ Bottom Border: 2px, blue on focus       │
│  └─ Darker Background: rgba(0,0,0,0.2)     │
└─────────────────────────────────────────────┘
```

---

## Components (25 total)

1. Icon Buttons  2. Text Buttons  3. Chips/Tags  4. Text Input  5. Textarea
6. Select  7. Checkbox  8. Radio  9. Toggle/Switch  10. Slider/Range
11. Card  12. Tabs  13. Toast  14. Avatar  15. Progress Bar
16. Accordion  17. FAB  18. Dropdown Menu  19. Segmented Control
20. Skeleton Loader  21. Rating Stars  22. Number Stepper  23. Timeline
24. Navbar  25. Table

---

## Design Decisions

| Decision | Choice |
|----------|--------|
| Input vs Button | Combo: inset shadow + bottom border + inverted rim light (NO floating label) |
| Theme system | CSS Variables, full light/dark with toggle |
| Animations | Ripple (click), Press scale (0.95), Bounce, Loading spinner, Pulse glow, Shake, Slide-up, Bounce-in |
| Project name | **LumaUI** |

---

## CSS Variable System (key tokens)

```css
:root {
  --bg-page, --bg-surface, --bg-surface-hover, --bg-surface-active
  --bg-input, --bg-input-hover, --bg-input-focus
  --text-primary, --text-secondary, --text-placeholder
  --border-input, --border-input-hover
  --accent, --accent-glow, --accent-glow-strong
  --rim-light, --rim-light-input
  --wash-color, --dynamic-light-color
  --inset-shadow
  --card-bg, --card-border, --dropdown-bg, --toast-bg
  --toggle-track, --toggle-thumb
  --star-empty, --star-filled, --danger
  --skeleton-base, --skeleton-shine
}

[data-theme="light"] { /* overrides all vars */ }
```

---

## File Structure

```
youtube-shorts-buttons.html  — Main library (25 components, ~1200 lines)
input-comparison.html        — 6 input styling approaches + combo recommendation
LUMAUI-CONTEXT.md           — This file (project context)
```

---

## What's Next (TODO)

- [ ] **Tách files**: Extract CSS → `luma.css`, JS → `luma.js`
- [ ] **Responsive**: Mobile breakpoints, touch events (replace mousemove)
- [ ] **Complex components**: Modal, Drawer, Toast queue, Date picker, File upload
- [ ] **Accessibility**: Focus-visible rings, keyboard nav, ARIA attributes
- [ ] **React/Vue**: Convert to framework components
- [ ] **Advanced animations**: Page transitions, stagger, scroll reveal
- [ ] **npm package**: Bundle, publish, add TypeScript types

---

## How to Continue

1. Copy all 3 files to your new folder
2. Run: `npx http-server -p 8765 --cors -c-1`
3. Open `localhost:8765/youtube-shorts-buttons.html`
4. Tell the AI: "Tiếp tục dự án LumaUI, đây là context file" and attach this file

---

## Key Selectors Reference

| Selector | Purpose |
|----------|---------|
| `.yt-light` | Base class: adds rim light + overflow hidden |
| `.yt-light::before` | Rim light gradient border |
| `.light-layers` | Container for wash + dynamic light |
| `.wash-light` | Static top glow |
| `.dynamic-light` | Cursor-following glow (uses --wash-x, --wash-y, --wash-size, --wash-opacity) |
| `.elevated` | Content above light layers (z-index: 2) |
| `[data-light]` | JS hook for mousemove listener |
| `.yt-pressable` | Adds scale(0.95) on :active |
| `.ripple` | Animated ripple element (created by JS) |
| `.yt-loading` | Loading state (spinner + hide content) |
| `.yt-pulse` | Pulsing glow animation |
| `.yt-shake` | Error shake animation |
| `.yt-bounce-in` | Entrance bounce animation |
| `.yt-slide-up` | Entrance slide-up animation |
