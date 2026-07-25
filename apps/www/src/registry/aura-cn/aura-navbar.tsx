"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Navbar ─── */

export interface NavbarLink {
  label: string;
  href?: string;
  active?: boolean;
}

interface AuraNavbarProps {
  brand?: React.ReactNode;
  links?: NavbarLink[];
  actions?: React.ReactNode;
  className?: string;
}

export function AuraNavbar({ brand, links = [], actions, className }: AuraNavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[var(--card-border)] bg-[var(--bg-page)]/80 backdrop-blur-lg",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
          {brand}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href || "#"}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                link.active
                  ? "bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions + Mobile Toggle */}
        <div className="flex items-center gap-2">
          {actions}
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--card-border)] bg-[var(--bg-page)] p-3 animate-in slide-in-from-top-2 duration-200">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href || "#"}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-colors",
                link.active
                  ? "bg-[var(--bg-surface-active)] text-[var(--text-primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
