"use client";

import * as React from "react";
import Link from "next/link";
import { getInstallCommand } from "@/lib/site-config";
import { AuraButton } from "@/registry/aura-cn/aura-button";
import {
  AuraCard,
  AuraCardHeader,
  AuraCardTitle,
  AuraCardDescription,
} from "@/registry/aura-cn/aura-card";
import { AuraInput } from "@/registry/aura-cn/aura-input";
import { AuraToggle } from "@/registry/aura-cn/aura-toggle";
import { AuraSlider } from "@/registry/aura-cn/aura-slider";
import { AuraProgress } from "@/registry/aura-cn/aura-progress";
import { AuraBadge } from "@/registry/aura-cn/aura-badge";
import { AuraChip } from "@/registry/aura-cn/aura-chip";
import { AuraSkeleton } from "@/registry/aura-cn/aura-skeleton";
import { AuraStatCard } from "@/registry/aura-cn/aura-stat-card";
import { AuraOTPInput } from "@/registry/aura-cn/aura-otp-input";
import { AuraTagInput } from "@/registry/aura-cn/aura-tag-input";
import { AuraPagination } from "@/registry/aura-cn/aura-pagination";
import { AuraTimeline } from "@/registry/aura-cn/aura-timeline";
import { AuraAlert } from "@/registry/aura-cn/aura-alert";
import { AuraNotificationBadge } from "@/registry/aura-cn/aura-notification-badge";
import { AuraSwitchIcon } from "@/registry/aura-cn/aura-switch-icon";
import {
  AuraThemeProvider,
  AuraThemeSwitcher,
} from "@/registry/aura-cn/aura-theme";

export default function LandingPage() {
  return (
    <AuraThemeProvider defaultTheme="blue" defaultDark={true}>
      <div className="dark relative min-h-screen overflow-hidden bg-background text-foreground">
        {/* Animated background grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--aura-wash)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,hsl(var(--background)))]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">aura-cn</span>
            <AuraBadge size="sm" variant="outline">
              v0.1
            </AuraBadge>
          </div>
          <div className="flex items-center gap-4">
            <AuraThemeSwitcher />
            <Link
              href="/docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/duongnnb/aura-cn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-12 pt-20 text-center md:pt-32">
          <div className="animate-fade-in">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-[var(--aura)] via-[var(--aura-rim)] to-[var(--aura)] bg-clip-text text-transparent animate-gradient-x">
                3D Light Effects
              </span>
              <br />
              <span className="text-foreground">for Modern UI</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              46 copy-paste React components with rim light, dynamic cursor
              glow, and micro-interactions. Built for shadcn ecosystem.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/docs">
                <AuraButton size="lg">Get Started</AuraButton>
              </Link>
              <div className="group relative">
                <code className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm backdrop-blur-sm">
                  <span className="text-muted-foreground">$</span>
                  <span>{getInstallCommand("aura-button")}</span>
                  <CopyButton text={getInstallCommand("aura-button")} />
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Preview Grid */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Button preview */}
            <PreviewCard title="Button" href="/docs/components/button">
              <div className="flex flex-wrap gap-2">
                <AuraButton size="sm">Default</AuraButton>
                <AuraButton size="sm" variant="primary">
                  Subscribe
                </AuraButton>
                <AuraButton size="sm" variant="accent">
                  Accent
                </AuraButton>
              </div>
            </PreviewCard>

            {/* Input preview */}
            <PreviewCard title="Input" href="/docs/components/input">
              <AuraInput placeholder="Type something..." />
            </PreviewCard>

            {/* Toggle preview */}
            <PreviewCard title="Toggle" href="/docs/components/toggle">
              <div className="flex items-center gap-4">
                <AuraToggle defaultChecked />
                <AuraToggle />
              </div>
            </PreviewCard>

            {/* Slider preview */}
            <PreviewCard title="Slider" href="/docs/components/slider">
              <AuraSlider defaultValue={65} />
            </PreviewCard>

            {/* Progress preview */}
            <PreviewCard title="Progress" href="/docs/components/progress">
              <div className="space-y-3">
                <AuraProgress value={80} />
                <AuraProgress value={45} />
              </div>
            </PreviewCard>

            {/* Chips preview */}
            <PreviewCard title="Chip & Badge" href="/docs/components/chip">
              <div className="flex flex-wrap gap-2">
                <AuraChip size="sm">React</AuraChip>
                <AuraChip size="sm" variant="outline">
                  TypeScript
                </AuraChip>
                <AuraBadge>New</AuraBadge>
              </div>
            </PreviewCard>

            {/* Skeleton preview */}
            <PreviewCard title="Skeleton" href="/docs/components/skeleton">
              <div className="space-y-2">
                <AuraSkeleton className="h-4 w-3/4" />
                <AuraSkeleton className="h-4 w-1/2" />
                <AuraSkeleton className="h-8 w-full" />
              </div>
            </PreviewCard>

            {/* Stat Card preview */}
            <PreviewCard title="Stat Card" href="/docs/components/stat-card" span2>
              <div className="grid gap-3 sm:grid-cols-2">
                <AuraStatCard
                  label="Total Revenue"
                  value="$45,231"
                  change="+20.1%"
                  trend="up"
                />
                <AuraStatCard
                  label="Active Users"
                  value="2,350"
                  change="-4.5%"
                  trend="down"
                />
              </div>
            </PreviewCard>

            {/* OTP Input preview */}
            <PreviewCard title="OTP Input" href="/docs/components/otp-input">
              <AuraOTPInput length={4} value="42" />
            </PreviewCard>

            {/* Tag Input preview */}
            <PreviewCard title="Tag Input" href="/docs/components/tag-input">
              <AuraTagInput value={["react", "tailwind"]} />
            </PreviewCard>

            {/* Pagination preview */}
            <PreviewCard title="Pagination" href="/docs/components/pagination">
              <AuraPagination
                currentPage={2}
                totalPages={5}
                onPageChange={() => {}}
              />
            </PreviewCard>

            {/* Alert preview */}
            <PreviewCard title="Alert" href="/docs/components/alert">
              <AuraAlert variant="success" title="Deployed">
                Your site is live.
              </AuraAlert>
            </PreviewCard>

            {/* Notification Badge & Switch Icon preview */}
            <PreviewCard
              title="Badge & Switch Icon"
              href="/docs/components/notification-badge"
            >
              <div className="flex items-center gap-6">
                <AuraNotificationBadge count={5}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg">
                    🔔
                  </span>
                </AuraNotificationBadge>
                <AuraNotificationBadge count={120}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg">
                    ✉️
                  </span>
                </AuraNotificationBadge>
                <AuraSwitchIcon checked />
                <AuraSwitchIcon />
              </div>
            </PreviewCard>

            {/* Timeline preview */}
            <PreviewCard title="Timeline" href="/docs/components/timeline">
              <AuraTimeline
                items={[
                  { title: "Design", date: "Jan 2026", active: true },
                  { title: "Develop", date: "Mar 2026" },
                  { title: "Launch", date: "Jul 2026" },
                ]}
              />
            </PreviewCard>

            {/* Card preview */}
            <PreviewCard title="Card" href="/docs/components/card" span2>
              <div className="grid gap-3 sm:grid-cols-2">
                <AuraCard>
                  <AuraCardHeader>
                    <AuraCardTitle>Elevated</AuraCardTitle>
                    <AuraCardDescription>
                      Light falls from above for natural 3D depth.
                    </AuraCardDescription>
                  </AuraCardHeader>
                </AuraCard>
                <AuraCard>
                  <AuraCardHeader>
                    <AuraCardTitle>Customizable</AuraCardTitle>
                    <AuraCardDescription>
                      5 color themes, dark/light modes, CSS variables.
                    </AuraCardDescription>
                  </AuraCardHeader>
                </AuraCard>
              </div>
            </PreviewCard>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureItem
              icon="✦"
              title="3-Layer Rendering"
              description="Rim light, static wash, and dynamic cursor glow work together for depth."
            />
            <FeatureItem
              icon="◐"
              title="Elevated & Recessed"
              description="Buttons glow from top, inputs glow from bottom. Natural depth perception."
            />
            <FeatureItem
              icon="◎"
              title="shadcn Compatible"
              description="Install via CLI, customize with CSS variables, works with your existing setup."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
          <p>
            Built with React, Tailwind CSS 4, and oklch.{" "}
            <a
              href="https://github.com/duongnnb/aura-cn"
              className="underline underline-offset-4 hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub
            </a>
          </p>
        </footer>
      </div>
    </AuraThemeProvider>
  );
}

/* ─────────── Sub-components ─────────── */

function PreviewCard({
  title,
  href,
  children,
  span2,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-[var(--aura-rim)] hover:bg-card/60 ${
        span2 ? "md:col-span-2" : ""
      }`}
    >
      <h3 className="mb-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {title}
      </h3>
      <div className="pointer-events-none">{children}</div>
    </Link>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mb-3 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8.5l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect
            x="5"
            y="5"
            width="9"
            height="9"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </button>
  );
}
