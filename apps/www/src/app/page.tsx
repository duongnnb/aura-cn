"use client";

import { AuraButton } from "@/registry/aura-cn/aura-button";
import {
  AuraCard,
  AuraCardHeader,
  AuraCardTitle,
  AuraCardDescription,
  AuraCardContent,
} from "@/registry/aura-cn/aura-card";
import { AuraInput } from "@/registry/aura-cn/aura-input";
import { AuraTextarea } from "@/registry/aura-cn/aura-textarea";
import { AuraToggle } from "@/registry/aura-cn/aura-toggle";
import { AuraChip } from "@/registry/aura-cn/aura-chip";
import { AuraSelect } from "@/registry/aura-cn/aura-select";
import {
  AuraCheckbox,
  AuraRadioGroup,
  AuraRadioItem,
} from "@/registry/aura-cn/aura-checkbox-radio";
import { AuraSlider } from "@/registry/aura-cn/aura-slider";
import {
  AuraTabs,
  AuraTabsList,
  AuraTabsTrigger,
  AuraTabsContent,
} from "@/registry/aura-cn/aura-tabs";
import { AuraAvatar } from "@/registry/aura-cn/aura-avatar";
import { AuraProgress } from "@/registry/aura-cn/aura-progress";
import {
  AuraAccordion,
  AuraAccordionItem,
  AuraAccordionTrigger,
  AuraAccordionContent,
} from "@/registry/aura-cn/aura-accordion";
import { AuraSkeleton } from "@/registry/aura-cn/aura-skeleton";
import { AuraToast } from "@/registry/aura-cn/aura-toast";
import { AuraBadge } from "@/registry/aura-cn/aura-badge";

export default function ShowcasePage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Hero */}
        <header className="mb-20 text-center">
          <h1 className="mb-4 text-6xl font-bold tracking-tight">aura-cn</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            3D light effect UI components with rim light, dynamic cursor glow,
            and micro-interactions. Copy-paste. Open source.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <code className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground">
              npx shadcn@latest add https://aura-cn.dev/r/aura-button.json
            </code>
          </div>
        </header>

        {/* Components */}
        <div className="space-y-16">
          {/* Button */}
          <Section title="Aura Button" description="Hover to see the dynamic cursor glow effect.">
            <div className="flex flex-wrap items-center gap-3">
              <AuraButton>Default Aura</AuraButton>
              <AuraButton size="sm">Small</AuraButton>
              <AuraButton size="lg">Large</AuraButton>
              <AuraButton variant="secondary">Secondary</AuraButton>
              <AuraButton variant="outline">Outline</AuraButton>
              <AuraButton variant="ghost">Ghost</AuraButton>
              <AuraButton disabled>Disabled</AuraButton>
            </div>
          </Section>

          {/* Card */}
          <Section title="Aura Card" description="Move your cursor over the card to see the glow.">
            <div className="grid gap-4 sm:grid-cols-2">
              <AuraCard>
                <AuraCardHeader>
                  <AuraCardTitle>Getting Started</AuraCardTitle>
                  <AuraCardDescription>
                    Install aura-cn components with a single command.
                  </AuraCardDescription>
                </AuraCardHeader>
                <AuraCardContent>
                  <code className="text-xs text-muted-foreground">
                    npx shadcn@latest add aura-button
                  </code>
                </AuraCardContent>
              </AuraCard>
              <AuraCard>
                <AuraCardHeader>
                  <AuraCardTitle>Customizable</AuraCardTitle>
                  <AuraCardDescription>
                    Built with CSS variables. Tweak colors, glow intensity, and more.
                  </AuraCardDescription>
                </AuraCardHeader>
              </AuraCard>
            </div>
          </Section>

          {/* Input & Textarea */}
          <Section title="Aura Input & Textarea" description="Recessed style with inverted rim light and focus accent.">
            <div className="max-w-sm space-y-4">
              <AuraInput placeholder="Enter your email..." />
              <AuraInput placeholder="Disabled input" disabled />
              <AuraTextarea placeholder="Write something amazing..." />
            </div>
          </Section>

          {/* Select */}
          <Section title="Aura Select" description="Dropdown select with aura styling.">
            <div className="max-w-xs">
              <AuraSelect
                placeholder="Choose framework"
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "svelte", label: "Svelte" },
                  { value: "angular", label: "Angular" },
                ]}
              />
            </div>
          </Section>

          {/* Toggle */}
          <Section title="Aura Toggle" description="Switch with glowing thumb indicator.">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <AuraToggle defaultChecked />
                <span className="text-sm">Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <AuraToggle />
                <span className="text-sm">Disabled</span>
              </div>
            </div>
          </Section>

          {/* Checkbox & Radio */}
          <Section title="Aura Checkbox & Radio" description="Selection controls with rim light effects.">
            <div className="flex gap-12">
              <div className="space-y-3">
                <AuraCheckbox label="Option A" defaultChecked />
                <AuraCheckbox label="Option B" />
                <AuraCheckbox label="Option C" />
              </div>
              <AuraRadioGroup defaultValue="fast">
                <AuraRadioItem value="fast" label="Fast" />
                <AuraRadioItem value="balanced" label="Balanced" />
                <AuraRadioItem value="quality" label="Quality" />
              </AuraRadioGroup>
            </div>
          </Section>

          {/* Slider */}
          <Section title="Aura Slider" description="Range slider with glowing track fill.">
            <div className="max-w-sm space-y-6">
              <AuraSlider defaultValue={65} />
              <AuraSlider defaultValue={30} />
            </div>
          </Section>

          {/* Tabs */}
          <Section title="Aura Tabs" description="Tab navigation with recessed list and active rim light.">
            <AuraTabs defaultValue="overview">
              <AuraTabsList>
                <AuraTabsTrigger value="overview">Overview</AuraTabsTrigger>
                <AuraTabsTrigger value="features">Features</AuraTabsTrigger>
                <AuraTabsTrigger value="code">Code</AuraTabsTrigger>
              </AuraTabsList>
              <AuraTabsContent value="overview">
                <p className="text-sm text-muted-foreground">
                  aura-cn brings 3D lighting effects to everyday UI components.
                </p>
              </AuraTabsContent>
              <AuraTabsContent value="features">
                <p className="text-sm text-muted-foreground">
                  Rim light, dynamic glow, inset shadows, and smooth animations.
                </p>
              </AuraTabsContent>
              <AuraTabsContent value="code">
                <code className="text-xs text-muted-foreground">
                  {`import { AuraButton } from "@/registry/aura-cn/aura-button"`}
                </code>
              </AuraTabsContent>
            </AuraTabs>
          </Section>

          {/* Avatar */}
          <Section title="Aura Avatar" description="Avatars with glow ring effect.">
            <div className="flex items-center gap-4">
              <AuraAvatar size="sm" fallback="A" alt="Alice" />
              <AuraAvatar fallback="B" alt="Bob" />
              <AuraAvatar size="lg" fallback="C" alt="Charlie" />
              <AuraAvatar size="xl" fallback="D" alt="Dave" />
            </div>
          </Section>

          {/* Progress */}
          <Section title="Aura Progress" description="Progress bar with glowing fill.">
            <div className="max-w-sm space-y-4">
              <AuraProgress value={75} showLabel />
              <AuraProgress value={40} />
              <AuraProgress value={100} />
            </div>
          </Section>

          {/* Accordion */}
          <Section title="Aura Accordion" description="Collapsible sections with rim light intensity change.">
            <div className="max-w-md">
              <AuraAccordion defaultValue={["item-1"]}>
                <AuraAccordionItem value="item-1">
                  <AuraAccordionTrigger value="item-1">
                    What is aura-cn?
                  </AuraAccordionTrigger>
                  <AuraAccordionContent value="item-1">
                    A UI library with 3D light effects — rim light, dynamic cursor
                    glow, and micro-interactions built for React.
                  </AuraAccordionContent>
                </AuraAccordionItem>
                <AuraAccordionItem value="item-2">
                  <AuraAccordionTrigger value="item-2">
                    How do I install it?
                  </AuraAccordionTrigger>
                  <AuraAccordionContent value="item-2">
                    Use the shadcn CLI to add components directly to your project.
                  </AuraAccordionContent>
                </AuraAccordionItem>
                <AuraAccordionItem value="item-3">
                  <AuraAccordionTrigger value="item-3">
                    Is it accessible?
                  </AuraAccordionTrigger>
                  <AuraAccordionContent value="item-3">
                    Yes! All components use proper ARIA attributes and keyboard navigation.
                  </AuraAccordionContent>
                </AuraAccordionItem>
              </AuraAccordion>
            </div>
          </Section>

          {/* Chips & Badges */}
          <Section title="Aura Chip & Badge" description="Tags and badges with subtle rim light.">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <AuraChip>React</AuraChip>
                <AuraChip>TypeScript</AuraChip>
                <AuraChip variant="outline">Tailwind</AuraChip>
                <AuraChip variant="default">Default</AuraChip>
                <AuraChip size="lg">Large Chip</AuraChip>
              </div>
              <div className="flex flex-wrap gap-2">
                <AuraBadge>New</AuraBadge>
                <AuraBadge variant="secondary">Beta</AuraBadge>
                <AuraBadge variant="outline">v0.1</AuraBadge>
                <AuraBadge variant="destructive">Breaking</AuraBadge>
              </div>
            </div>
          </Section>

          {/* Toast */}
          <Section title="Aura Toast" description="Notification toasts with variants.">
            <div className="max-w-sm space-y-3">
              <AuraToast
                title="Component added"
                description="aura-button has been added to your project."
              />
              <AuraToast
                variant="success"
                title="Build successful"
                description="Your project compiled without errors."
                onClose={() => {}}
              />
              <AuraToast
                variant="error"
                title="Build failed"
                description="Check the console for details."
                onClose={() => {}}
              />
            </div>
          </Section>

          {/* Skeleton */}
          <Section title="Aura Skeleton" description="Loading placeholder with shimmer animation.">
            <div className="max-w-sm space-y-3">
              <AuraSkeleton className="h-10 w-full" />
              <div className="flex gap-3">
                <AuraSkeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <AuraSkeleton className="h-4 w-3/4" />
                  <AuraSkeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with React, Tailwind CSS, and love.{" "}
            <a
              href="https://github.com/user/aura-cn"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>
      <div className="rounded-xl border border-border bg-secondary/20 p-8">
        {children}
      </div>
    </section>
  );
}
