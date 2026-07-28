"use client";

import * as React from "react";
import Link from "next/link";
import { AuraAvatar } from "@/registry/aura-cn/aura-avatar";
import { AuraBadge } from "@/registry/aura-cn/aura-badge";
import { AuraButton } from "@/registry/aura-cn/aura-button";
import { AuraCard } from "@/registry/aura-cn/aura-card";
import {
  AuraDrawer,
  AuraDrawerHeader,
  AuraDrawerTitle,
  AuraDrawerContent,
} from "@/registry/aura-cn/aura-drawer";
import { AuraDropdown } from "@/registry/aura-cn/aura-dropdown";
import { AuraInput } from "@/registry/aura-cn/aura-input";
import {
  AuraModal,
  AuraModalHeader,
  AuraModalTitle,
  AuraModalDescription,
  AuraModalContent,
  AuraModalFooter,
} from "@/registry/aura-cn/aura-modal";
import {
  AuraTabs,
  AuraTabsList,
  AuraTabsTrigger,
} from "@/registry/aura-cn/aura-tabs";
import { AuraTextarea } from "@/registry/aura-cn/aura-textarea";
import { AuraToast } from "@/registry/aura-cn/aura-toast";
import { AuraTooltip } from "@/registry/aura-cn/aura-tooltip";
import {
  AuraThemeProvider,
  AuraThemeSwitcher,
} from "@/registry/aura-cn/aura-theme";
import { MAILS, type Mail } from "./data";

const FOLDERS = [
  { value: "inbox", label: "Inbox" },
  { value: "sent", label: "Sent" },
  { value: "drafts", label: "Drafts" },
  { value: "archive", label: "Archive" },
  { value: "favorites", label: "Favorites" },
  { value: "spam", label: "Spam" },
] as const;

export default function MailExamplePage() {
  const [mails, setMails] = React.useState<Mail[]>(MAILS);
  const [tab, setTab] = React.useState<string>("inbox");
  const [selectedId, setSelectedId] = React.useState<string | null>("m1");
  const [query, setQuery] = React.useState("");
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [toastVisible, setToastVisible] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const visibleMails = mails.filter(
    (m) =>
      (tab === "favorites" ? m.starred : m.folder === tab) &&
      (query === "" ||
        `${m.from} ${m.subject}`.toLowerCase().includes(query.toLowerCase()))
  );
  const selected = mails.find((m) => m.id === selectedId) ?? null;
  const inboxUnread = mails.filter(
    (m) => m.folder === "inbox" && m.unread
  ).length;

  const selectMail = (id: string) => {
    setSelectedId(id);
    setMails((ms) =>
      ms.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  const toggleStar = (id: string) =>
    setMails((ms) =>
      ms.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m))
    );

  const archiveMail = (id: string) =>
    setMails((ms) =>
      ms.map((m) => (m.id === id ? { ...m, folder: "archive" as const } : m))
    );

  const deleteMail = (id: string) => {
    setMails((ms) => ms.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const sendMail = () => {
    setComposeOpen(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <AuraThemeProvider defaultTheme="blue" defaultDark={true}>
      <div
        className="flex h-screen overflow-hidden bg-background text-foreground"
        style={
          {
            /* Brighter charcoal palette for this app (reference-matched) */
            "--background": "oklch(0.3 0.006 286)",
            "--card": "oklch(0.34 0.006 286)",
            "--bg-page": "#313237",
            "--border": "oklch(0.4 0.006 286)",
            "--bg-surface": "rgba(255,255,255,0.08)",
            "--bg-surface-hover": "rgba(255,255,255,0.13)",
            "--bg-surface-active": "rgba(255,255,255,0.18)",
            "--card-bg": "rgba(255,255,255,0.06)",
            "--card-border": "rgba(255,255,255,0.1)",
            "--rim-light": "rgba(255,255,255,0.22)",
          } as React.CSSProperties
        }
      >
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border lg:flex">
          <SidebarNav />
        </aside>

        {/* Sidebar (mobile drawer) */}
        <AuraDrawer open={drawerOpen} onOpenChange={setDrawerOpen} side="left">
          <AuraDrawerHeader>
            <AuraDrawerTitle>Menu</AuraDrawerTitle>
          </AuraDrawerHeader>
          <AuraDrawerContent>
            <SidebarNav />
          </AuraDrawerContent>
        </AuraDrawer>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="flex items-center gap-3 border-b border-border px-4 py-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground lg:hidden"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--aura-wash)] text-[var(--aura)]">
                <MailIcon />
              </span>
              <h1 className="text-sm font-semibold">
                All mails{" "}
                <span className="text-muted-foreground">({mails.length})</span>
              </h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:block">
                <AuraInput
                  placeholder="Quick search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-56"
                />
              </div>
              <div className="hidden md:block">
                <AuraThemeSwitcher />
              </div>
              <AuraButton variant="accent" onClick={() => setComposeOpen(true)}>
                New email
              </AuraButton>
            </div>
          </header>

          {/* Folder tabs */}
          <div className="border-b border-border px-4 pt-2">
            <AuraTabs defaultValue="inbox" value={tab} onValueChange={setTab}>
              <AuraTabsList className="pb-2">
                {FOLDERS.map((f) => (
                  <AuraTabsTrigger key={f.value} value={f.value}>
                    <span className="flex items-center gap-1.5">
                      {f.label}
                      {f.value === "inbox" && inboxUnread > 0 && (
                        <AuraBadge size="sm">{inboxUnread}</AuraBadge>
                      )}
                    </span>
                  </AuraTabsTrigger>
                ))}
              </AuraTabsList>
            </AuraTabs>
          </div>

          {/* Panes */}
          <div className="flex min-h-0 flex-1">
            {/* Mail list */}
            <div
              className={`w-full flex-col overflow-y-auto border-r border-border md:flex md:w-[380px] md:shrink-0 ${
                selected ? "hidden" : "flex"
              }`}
            >
              {visibleMails.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">
                  No mails here.
                </p>
              ) : (
                visibleMails.map((mail) => (
                  <button
                    key={mail.id}
                    type="button"
                    onClick={() => selectMail(mail.id)}
                    className={`flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors hover:bg-card/60 ${
                      mail.id === selectedId
                        ? "border-l-2 border-l-[var(--aura)] bg-card/60"
                        : "border-l-2 border-l-transparent"
                    }`}
                  >
                    <AuraAvatar fallback={initials(mail.from)} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 truncate text-sm font-medium">
                          {mail.from}
                          {mail.starred && (
                            <span className="text-[var(--aura)]">
                              <StarIcon filled className="h-3 w-3" />
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {mail.date}
                        </span>
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {mail.email}
                      </span>
                      <span
                        className={`mt-1 block truncate text-xs ${
                          mail.unread
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {mail.preview}
                      </span>
                    </span>
                    {mail.unread && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--aura)]" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Detail pane */}
            <div
              className={`min-w-0 flex-1 flex-col overflow-y-auto md:flex ${
                selected ? "flex" : "hidden"
              }`}
            >
              {selected ? (
                <article className="flex flex-col gap-6 p-6">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
                      aria-label="Back to list"
                    >
                      <BackIcon />
                    </button>
                    <AuraAvatar fallback={initials(selected.from)} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {selected.from}{" "}
                        <span className="font-normal text-muted-foreground">
                          {selected.email}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">To: Me</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <span className="mr-2 hidden text-xs text-muted-foreground sm:block">
                        {selected.time}
                      </span>
                      <AuraTooltip
                        content={selected.starred ? "Unstar" : "Star"}
                      >
                        <button
                          type="button"
                          onClick={() => toggleStar(selected.id)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                            selected.starred
                              ? "text-[var(--aura)]"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          aria-label={selected.starred ? "Unstar" : "Star"}
                        >
                          <StarIcon filled={selected.starred} />
                        </button>
                      </AuraTooltip>
                      <AuraTooltip content="Archive">
                        <button
                          type="button"
                          onClick={() => archiveMail(selected.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Archive"
                        >
                          <ArchiveIcon />
                        </button>
                      </AuraTooltip>
                      <AuraTooltip content="Delete">
                        <button
                          type="button"
                          onClick={() => deleteMail(selected.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-red-400"
                          aria-label="Delete"
                        >
                          <TrashIcon />
                        </button>
                      </AuraTooltip>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight">
                    {selected.subject}
                  </h2>

                  <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                    {selected.body.map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {selected.attachment && (
                    <div>
                      <p className="mb-2 text-sm font-medium">
                        Attachment{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          Secure by aura.ai
                        </span>
                      </p>
                      <AuraCard className="max-w-xs">
                        <div className="flex items-center gap-3 p-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--aura-wash)] text-[var(--aura)]">
                            <FileIcon />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium">
                              {selected.attachment.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {selected.attachment.size} · Download
                            </span>
                          </span>
                        </div>
                      </AuraCard>
                    </div>
                  )}
                </article>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Select a mail to read it.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compose modal */}
        <AuraModal open={composeOpen} onOpenChange={setComposeOpen}>
          <AuraModalHeader>
            <AuraModalTitle>New email</AuraModalTitle>
            <AuraModalDescription>
              Compose and send a new message.
            </AuraModalDescription>
          </AuraModalHeader>
          <AuraModalContent>
            <div className="space-y-3">
              <AuraInput placeholder="To" type="email" />
              <AuraInput placeholder="Subject" />
              <AuraTextarea placeholder="Write your message..." rows={6} />
            </div>
          </AuraModalContent>
          <AuraModalFooter>
            <AuraButton variant="ghost" onClick={() => setComposeOpen(false)}>
              Cancel
            </AuraButton>
            <AuraButton variant="accent" onClick={sendMail}>
              Send
            </AuraButton>
          </AuraModalFooter>
        </AuraModal>

        {/* Toast */}
        {toastVisible && (
          <div className="fixed bottom-4 right-4 z-50">
            <AuraToast
              variant="success"
              title="Email sent"
              description="Your message is on its way."
              onClose={() => setToastVisible(false)}
            />
          </div>
        )}
      </div>
    </AuraThemeProvider>
  );
}

/* ─────────── Sidebar ─────────── */

function SidebarNav() {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <AuraDropdown
        trigger={
          <button
            type="button"
            className="relative flex w-full items-center gap-2 rounded-xl bg-[var(--bg-surface)] px-3 py-2.5 text-sm font-medium shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-all hover:bg-[var(--bg-surface-hover)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                padding: "1px",
                background:
                  "linear-gradient(to bottom, var(--rim-light), transparent 60%)",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
              }}
            />
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--aura)] text-xs font-bold text-white">
              A
            </span>
            Acme
            <span className="ml-auto text-muted-foreground">
              <ChevronsIcon />
            </span>
          </button>
        }
        items={[
          { label: "Acme" },
          { label: "Personal" },
          { separator: true, label: "" },
          { label: "Create workspace" },
        ]}
      />

      <nav className="space-y-1">
        <SidebarLink icon={<MailIcon />} label="Email" active />
        <SidebarLink icon={<CalendarIcon />} label="Calendar" />
        <SidebarLink icon={<ChartIcon />} label="Reports" />
        <SidebarLink icon={<TrashIcon />} label="Trash" />
      </nav>

      <div>
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Channels
        </p>
        <nav className="space-y-1">
          <SidebarLink icon={<GlobeIcon />} label="Everything" />
          <SidebarLink icon={<BriefcaseIcon />} label="Work" />
          <SidebarLink icon={<UserIcon />} label="Personal" />
        </nav>
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Integrations
        </p>
        <nav className="space-y-1">
          <SidebarLink icon={<GithubIcon />} label="GitHub" />
          <SidebarLink icon={<ZapIcon />} label="Zapier" />
          <SidebarLink icon={<LayersIcon />} label="Linear" />
        </nav>
      </div>

      <div className="mt-auto space-y-3">
        <Link
          href="/"
          className="block px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to aura-cn
        </Link>
        <div className="relative flex items-center gap-3 rounded-xl bg-[var(--bg-surface)] p-3 shadow-[0_6px_16px_rgba(0,0,0,0.25)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              padding: "1px",
              background:
                "linear-gradient(to bottom, var(--rim-light), transparent 60%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          <AuraAvatar fallback="RK" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Richard Kyle</p>
            <p className="truncate text-xs text-muted-foreground">
              richardkyle@mail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
        active
          ? "font-medium text-foreground shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
          : "text-muted-foreground hover:bg-[var(--bg-surface)] hover:text-foreground"
      }`}
      style={
        active
          ? {
              background:
                "linear-gradient(to bottom, var(--bg-surface-hover), var(--bg-surface))",
            }
          : undefined
      }
    >
      {active && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              padding: "1px",
              background:
                "linear-gradient(to bottom, var(--rim-light), transparent 60%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[var(--aura)] shadow-[0_0_8px_var(--aura-glow)]"
          />
        </>
      )}
      <span className={active ? "text-foreground" : "text-muted-foreground"}>
        {icon}
      </span>
      {label}
    </button>
  );
}

/* ─────────── Helpers ─────────── */

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ─────────── Icons ─────────── */

function svgProps(className?: string) {
  return {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
}

function MailIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function StarIcon({
  filled,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg {...svgProps(className)} fill={filled ? "currentColor" : "none"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <path d="M5 8v11a1 1 0 001 1h12a1 1 0 001-1V8M10 12h4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a1 1 0 01-1 1H7a1 1 0 01-1-1L5 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l10 6-10 6L2 8l10-6zM2 16l10 6 10-6" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function ChevronsIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );
}
