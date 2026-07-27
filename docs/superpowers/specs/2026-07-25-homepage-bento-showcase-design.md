# Homepage Bento Showcase Redesign

Date: 2026-07-25
Status: Approved (user selected "Bento collage kiểu HeroUI", ~12 curated cells)

## Goal

Replace the uniform 3-column preview grid on the aura-cn homepage with a HeroUI-inspired
bento collage: mixed cell sizes, fully interactive components, scroll-reveal motion, and an
inline theme picker that recolors the whole collage in place.

## Research basis

Screenshotted and analyzed magicui.design, ui.aceternity.com, heroui.com, cult-ui.com.
HeroUI's pattern fits aura-cn best: live interactive component collage + theme dots.

## Layout

`lg`: 4-column grid, 16 units, 10 cells (`md`: 2 columns, mobile: 1 column):

| Cell | Span (lg) | Content |
|---|---|---|
| Dashboard | 2×2 | 2 AuraStatCard + AuraProgress + AuraPagination |
| Sign-in | 1×2 | AuraInput email/password + AuraButton accent |
| OTP | 1×1 | AuraOTPInput (interactive) |
| Buttons | 1×1 | AuraButton default/primary/accent |
| Controls | 1×1 | AuraToggle + AuraSwitchIcon + AuraSlider |
| Chips & Badge | 1×1 | AuraChip ×2 + AuraBadge |
| Feedback | 2×1 | AuraAlert success + AuraNotificationBadge ×2 |
| Theme | 1×1 | 5 inline theme dots via useAuraTheme — recolors whole page |
| Timeline | 1×1 | AuraTimeline 3 items |
| Cards | 2×1 | AuraCard ×2 (Elevated / Customizable) |

Skeleton and Tag Input previews are dropped (typing is already showcased by Sign-in and OTP;
grid must total exactly 16 units).

## Interaction

- Remove `pointer-events-none`; every component is genuinely usable.
- Cells are no longer whole-cell links. Each cell header: small title + `↗` link to its docs page.
- Cell container: `rounded-2xl border bg-card/40 backdrop-blur-sm`, hover border
  `var(--aura-rim)` (same treatment as today).

## Motion

- framer-motion `whileInView` fade-up (y: 16 → 0, opacity 0 → 1), stagger ~60ms per cell,
  `viewport={{ once: true }}`.

## Section framing

- Header: eyebrow label + title "Every component, alive" + one-line subtitle.
- Footer: centered button "Browse all 46 components →" linking to /docs.

## Files changed

- `apps/www/src/app/page.tsx` only: rewrite showcase section, replace `PreviewCard` with
  `BentoCell`, add `ThemeDotsCell` (client, uses `useAuraTheme`), add motion wrappers.
  No registry or component library changes.

## Test plan

- `pnpm build` passes.
- Puppeteer: type into Sign-in input (value registers), click a theme dot inside the collage
  → `--aura` on hero changes, screenshot desktop (1440px) + mobile (390px) for visual QA.
- Existing `scripts/verify-theme.mjs` still passes against production after deploy.
