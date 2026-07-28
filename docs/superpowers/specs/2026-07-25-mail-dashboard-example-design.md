# Mail Dashboard Example Page

Date: 2026-07-25
Status: Approved (demo page at /examples/mail, dark aura style, full client-state interactivity)

## Goal

Add a full-screen mail dashboard example at `/examples/mail` (shadcn `/examples/mail` pattern)
that proves aura-cn components compose into a real application. Modeled on the reference
screenshot (3-pane email client) but restyled in the library's dark aura language.

## Route & files

Self-contained under `apps/www/src/app/examples/mail/`:

- `page.tsx` — client page: state, layout, all three panes
- `data.ts` — mock data: ~14 English mails (James Anderson, Dianne Russell, ...) with
  `id, from, email, subject, preview, body, date, folder, starred, unread, attachment?`
- Local sub-components stay in the folder (split files only if page.tsx grows unwieldy)

Homepage navbar gains an "Examples" link to `/examples/mail`. No registry changes.

## Layout (3 panes, dark aura)

Wrapped in its own `AuraThemeProvider` (dark). `AuraThemeSwitcher` sits in the demo header.

1. **Sidebar (~260px)**: workspace switcher "Acme" (AuraDropdown) · nav Email / Calendar /
   Reports / Trash · Channels group (Everything, Work, Personal) · Integrations group
   (GitHub, Zapier, Linear) · user footer "Richard Kyle" with AuraAvatar
2. **Mail list (~380px)**: "All mails" header with total count · AuraTabs folders: Inbox,
   Sent, Drafts, Archive, Favorites, Spam (unread badge on Inbox) · mail rows: initials
   avatar, name, preview, date, unread dot; selected row highlighted with rim-light border
3. **Detail pane**: sender header + action row (star / archive / delete with AuraTooltip) ·
   formatted body · attachment block (AuraCard) when present

Top bar over panes 2-3: search (AuraInput) + "New email" (AuraButton accent) opening an
AuraModal compose form; Send shows AuraToast "Email sent".

## Interactions (all client state, no backend)

- Click mail → detail pane updates, mail marked read
- Tabs filter by folder; search filters sender name + subject in real time
- Star toggles (starred mails appear under Favorites); archive moves to Archive; delete
  moves to Spam-adjacent Trash behavior → mail is removed from list
- Theme dots recolor the whole demo (provider inline vars pattern from aura-theme)

## Responsive

- `< lg`: sidebar hidden behind a menu button (AuraDrawer)
- `< md`: detail pane becomes a full overlay when a mail is selected, with back button

## Test plan

- `pnpm build` passes (new static route `/examples/mail`)
- Puppeteer: click second mail → detail sender changes; type in search → list shrinks;
  click star → Favorites tab contains the mail; switch to Sent tab → list changes;
  screenshots desktop (1440) + mobile (390)
- Deploy to Vercel, re-verify on production
