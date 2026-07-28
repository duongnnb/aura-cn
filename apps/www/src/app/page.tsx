"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { AuraStatCard } from "@/registry/aura-cn/aura-stat-card";
import { AuraOTPInput } from "@/registry/aura-cn/aura-otp-input";
import { AuraPagination } from "@/registry/aura-cn/aura-pagination";
import { AuraTimeline } from "@/registry/aura-cn/aura-timeline";
import { AuraAlert } from "@/registry/aura-cn/aura-alert";
import { AuraNotificationBadge } from "@/registry/aura-cn/aura-notification-badge";
import { AuraSwitchIcon } from "@/registry/aura-cn/aura-switch-icon";
import {
  AuraThemeProvider,
  AuraThemeSwitcher,
  useAuraTheme,
  type AuraTheme,
} from "@/registry/aura-cn/aura-theme";

export default function LandingPage() {
  return (
    <AuraThemeProvider defaultTheme="blue" defaultDark={true}>
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
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
            <Link
              href="/examples/mail"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Examples
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

        {/* Live Bento Showcase */}
        <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--aura)]">
              Live playground
            </p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              Every component, alive
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Nothing below is a screenshot — click, type, and drag. Then pick
              a color and watch the whole page follow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Dashboard — 2×2 */}
            <BentoCell
              index={0}
              title="Dashboard"
              href="/docs/components/stat-card"
              className="md:col-span-2 lg:row-span-2"
            >
              <DashboardDemo />
            </BentoCell>

            {/* Sign-in — 1×2 */}
            <BentoCell
              index={1}
              title="Sign in"
              href="/docs/components/input"
              className="lg:row-span-2"
            >
              <div className="space-y-3">
                <AuraInput type="email" placeholder="you@example.com" />
                <AuraInput type="password" placeholder="••••••••" />
                <AuraButton variant="accent" className="w-full">
                  Sign in
                </AuraButton>
              </div>
            </BentoCell>

            {/* OTP */}
            <BentoCell index={2} title="OTP Input" href="/docs/components/otp-input">
              <OTPDemo />
            </BentoCell>

            {/* Buttons */}
            <BentoCell index={3} title="Buttons" href="/docs/components/button">
              <div className="flex flex-wrap gap-2">
                <AuraButton size="sm">Default</AuraButton>
                <AuraButton size="sm" variant="primary">
                  Subscribe
                </AuraButton>
                <AuraButton size="sm" variant="accent">
                  Accent
                </AuraButton>
              </div>
            </BentoCell>

            {/* Controls */}
            <BentoCell index={4} title="Controls" href="/docs/components/toggle">
              <ControlsDemo />
            </BentoCell>

            {/* Chips & Badge */}
            <BentoCell index={5} title="Chips & Badge" href="/docs/components/chip">
              <div className="flex flex-wrap items-center gap-2">
                <AuraChip size="sm">React</AuraChip>
                <AuraChip size="sm" variant="outline">
                  TypeScript
                </AuraChip>
                <AuraBadge>New</AuraBadge>
              </div>
            </BentoCell>

            {/* Feedback — 2×1 */}
            <BentoCell
              index={6}
              title="Feedback"
              href="/docs/components/alert"
              className="md:col-span-2"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <AuraAlert variant="success" title="Deployed">
                    Your site is live.
                  </AuraAlert>
                </div>
                <div className="flex items-center gap-6 sm:pr-2">
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
                </div>
              </div>
            </BentoCell>

            {/* Theme — the wow moment */}
            <BentoCell index={7} title="Theme" href="/docs/theming">
              <ThemeDotsDemo />
            </BentoCell>

            {/* Timeline */}
            <BentoCell index={8} title="Timeline" href="/docs/components/timeline">
              <AuraTimeline
                items={[
                  { title: "Design", date: "Jan 2026", active: true },
                  { title: "Develop", date: "Mar 2026" },
                  { title: "Launch", date: "Jul 2026" },
                ]}
              />
            </BentoCell>

            {/* Cards — 2×1 */}
            <BentoCell
              index={9}
              title="Cards"
              href="/docs/components/card"
              className="md:col-span-2"
            >
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
            </BentoCell>
          </div>

          <div className="mt-10 text-center">
            <Link href="/docs">
              <AuraButton size="lg" variant="primary">
                Browse all 46 components →
              </AuraButton>
            </Link>
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

function BentoCell({
  title,
  href,
  className,
  index,
  children,
}: {
  title: string;
  href: string;
  className?: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative flex flex-col rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-[var(--aura-rim)] hover:bg-card/60 ${
        className || ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
          {title}
        </h3>
        <Link
          href={href}
          aria-label={`${title} documentation`}
          className="text-muted-foreground opacity-0 transition-all hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M4.5 11.5l7-7M5.5 4.5h6v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </motion.div>
  );
}

function DashboardDemo() {
  const [page, setPage] = React.useState(2);

  return (
    <div className="flex flex-1 flex-col justify-between gap-4">
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
      <div className="space-y-3">
        <AuraProgress value={80} />
        <AuraProgress value={45} />
      </div>
      <AuraPagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </div>
  );
}

function OTPDemo() {
  const [otp, setOtp] = React.useState("42");

  return <AuraOTPInput length={4} value={otp} onChange={setOtp} />;
}

function ControlsDemo() {
  const [bell, setBell] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <AuraToggle defaultChecked />
        <AuraToggle />
        <AuraSwitchIcon checked={bell} onCheckedChange={setBell} />
      </div>
      <AuraSlider defaultValue={65} />
    </div>
  );
}

function ThemeDotsDemo() {
  const { theme, setTheme } = useAuraTheme();

  const themes: { key: AuraTheme; color: string }[] = [
    { key: "blue", color: "#3b82f6" },
    { key: "purple", color: "#a855f7" },
    { key: "green", color: "#22c55e" },
    { key: "orange", color: "#f97316" },
    { key: "rose", color: "#f43f5e" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {themes.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTheme(t.key)}
            className={`h-8 w-8 rounded-full border-2 transition-all ${
              theme === t.key
                ? "border-foreground scale-110"
                : "border-transparent opacity-60 hover:scale-105 hover:opacity-100"
            }`}
            style={{ backgroundColor: t.color }}
            aria-label={`Switch to ${t.key} theme`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Pick a color — the whole page follows.
      </p>
    </div>
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
