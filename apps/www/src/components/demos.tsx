"use client";

import * as React from "react";
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
import { AuraSelect } from "@/registry/aura-cn/aura-select";
import { AuraToggle } from "@/registry/aura-cn/aura-toggle";
import {
  AuraCheckbox,
  AuraRadioGroup,
  AuraRadioItem,
} from "@/registry/aura-cn/aura-checkbox-radio";
import { AuraChip } from "@/registry/aura-cn/aura-chip";
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
import {
  AuraModal,
  AuraModalHeader,
  AuraModalTitle,
  AuraModalDescription,
  AuraModalContent,
  AuraModalFooter,
} from "@/registry/aura-cn/aura-modal";
import { AuraDropdown } from "@/registry/aura-cn/aura-dropdown";
import { AuraTooltip } from "@/registry/aura-cn/aura-tooltip";
import {
  AuraDrawer,
  AuraDrawerHeader,
  AuraDrawerTitle,
  AuraDrawerContent,
  AuraDrawerFooter,
} from "@/registry/aura-cn/aura-drawer";
import { AuraFAB } from "@/registry/aura-cn/aura-fab";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AuraButton>Default</AuraButton>
      <AuraButton size="sm">Small</AuraButton>
      <AuraButton size="lg">Large</AuraButton>
      <AuraButton variant="secondary">Secondary</AuraButton>
      <AuraButton variant="outline">Outline</AuraButton>
      <AuraButton variant="ghost">Ghost</AuraButton>
      <AuraButton disabled>Disabled</AuraButton>
    </div>
  );
}

export function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AuraCard>
        <AuraCardHeader>
          <AuraCardTitle>Getting Started</AuraCardTitle>
          <AuraCardDescription>
            Install components with a single command.
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
            Built with CSS variables. Tweak colors and glow.
          </AuraCardDescription>
        </AuraCardHeader>
      </AuraCard>
    </div>
  );
}

export function InputDemo() {
  return (
    <div className="max-w-sm space-y-4">
      <AuraInput placeholder="Enter your email..." />
      <AuraInput placeholder="Disabled input" disabled />
      <AuraTextarea placeholder="Write something amazing..." />
    </div>
  );
}

export function TextareaDemo() {
  return (
    <div className="max-w-sm">
      <AuraTextarea placeholder="Write your message here..." rows={4} />
    </div>
  );
}

export function SelectDemo() {
  return (
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
  );
}

export function ToggleDemo() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <AuraToggle defaultChecked />
        <span className="text-sm">Enabled</span>
      </div>
      <div className="flex items-center gap-2">
        <AuraToggle />
        <span className="text-sm">Off</span>
      </div>
    </div>
  );
}

export function CheckboxRadioDemo() {
  return (
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
  );
}

export function ChipDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <AuraChip>React</AuraChip>
      <AuraChip>TypeScript</AuraChip>
      <AuraChip variant="outline">Tailwind</AuraChip>
      <AuraChip variant="default">Default</AuraChip>
      <AuraChip size="lg">Large Chip</AuraChip>
    </div>
  );
}

export function SliderDemo() {
  return (
    <div className="max-w-sm space-y-6">
      <AuraSlider defaultValue={65} />
      <AuraSlider defaultValue={30} />
    </div>
  );
}

export function TabsDemo() {
  return (
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
  );
}

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <AuraAvatar size="sm" fallback="A" alt="Alice" />
      <AuraAvatar fallback="B" alt="Bob" />
      <AuraAvatar size="lg" fallback="C" alt="Charlie" />
      <AuraAvatar size="xl" fallback="D" alt="Dave" />
    </div>
  );
}

export function ProgressDemo() {
  return (
    <div className="max-w-sm space-y-4">
      <AuraProgress value={75} showLabel />
      <AuraProgress value={40} />
      <AuraProgress value={100} />
    </div>
  );
}

export function AccordionDemo() {
  return (
    <div className="max-w-md">
      <AuraAccordion defaultValue={["item-1"]}>
        <AuraAccordionItem value="item-1">
          <AuraAccordionTrigger value="item-1">What is aura-cn?</AuraAccordionTrigger>
          <AuraAccordionContent value="item-1">
            A UI library with 3D light effects — rim light, dynamic cursor glow, and micro-interactions.
          </AuraAccordionContent>
        </AuraAccordionItem>
        <AuraAccordionItem value="item-2">
          <AuraAccordionTrigger value="item-2">How do I install it?</AuraAccordionTrigger>
          <AuraAccordionContent value="item-2">
            Use the shadcn CLI to add components directly to your project.
          </AuraAccordionContent>
        </AuraAccordionItem>
      </AuraAccordion>
    </div>
  );
}

export function SkeletonDemo() {
  return (
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
  );
}

export function ToastDemo() {
  return (
    <div className="max-w-sm space-y-3">
      <AuraToast title="Component added" description="aura-button has been added to your project." />
      <AuraToast variant="success" title="Build successful" description="Compiled without errors." />
      <AuraToast variant="error" title="Build failed" description="Check the console." />
    </div>
  );
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <AuraBadge>New</AuraBadge>
      <AuraBadge variant="secondary">Beta</AuraBadge>
      <AuraBadge variant="outline">v0.1</AuraBadge>
      <AuraBadge variant="destructive">Breaking</AuraBadge>
    </div>
  );
}

export function ModalDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AuraButton onClick={() => setOpen(true)}>Open Modal</AuraButton>
      <AuraModal open={open} onOpenChange={setOpen}>
        <AuraModalHeader>
          <AuraModalTitle>Confirm Action</AuraModalTitle>
          <AuraModalDescription>This action cannot be undone.</AuraModalDescription>
        </AuraModalHeader>
        <AuraModalContent>
          <p className="text-sm text-muted-foreground">Are you sure you want to proceed?</p>
        </AuraModalContent>
        <AuraModalFooter>
          <AuraButton variant="ghost" onClick={() => setOpen(false)}>Cancel</AuraButton>
          <AuraButton onClick={() => setOpen(false)}>Confirm</AuraButton>
        </AuraModalFooter>
      </AuraModal>
    </>
  );
}

export function DropdownDemo() {
  return (
    <AuraDropdown
      trigger={<AuraButton variant="outline">Actions</AuraButton>}
      items={[
        { label: "Edit" },
        { label: "Duplicate" },
        { separator: true, label: "" },
        { label: "Delete", destructive: true },
      ]}
    />
  );
}

export function TooltipDemo() {
  return (
    <div className="flex items-center gap-6">
      <AuraTooltip content="Save changes" side="top">
        <AuraButton variant="outline" size="sm">Top</AuraButton>
      </AuraTooltip>
      <AuraTooltip content="More info" side="bottom">
        <AuraButton variant="outline" size="sm">Bottom</AuraButton>
      </AuraTooltip>
      <AuraTooltip content="Go back" side="left">
        <AuraButton variant="outline" size="sm">Left</AuraButton>
      </AuraTooltip>
      <AuraTooltip content="Next step" side="right">
        <AuraButton variant="outline" size="sm">Right</AuraButton>
      </AuraTooltip>
    </div>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <AuraButton onClick={() => setOpen(true)}>Open Drawer</AuraButton>
      <AuraDrawer open={open} onOpenChange={setOpen} side="right">
        <AuraDrawerHeader>
          <AuraDrawerTitle>Settings</AuraDrawerTitle>
        </AuraDrawerHeader>
        <AuraDrawerContent>
          <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
        </AuraDrawerContent>
        <AuraDrawerFooter>
          <AuraButton variant="ghost" onClick={() => setOpen(false)}>Cancel</AuraButton>
          <AuraButton onClick={() => setOpen(false)}>Save</AuraButton>
        </AuraDrawerFooter>
      </AuraDrawer>
    </>
  );
}

export function FABDemo() {
  return (
    <div className="flex items-center gap-4">
      <AuraFAB size="sm">+</AuraFAB>
      <AuraFAB>+</AuraFAB>
      <AuraFAB size="lg">+</AuraFAB>
      <AuraFAB variant="secondary">✦</AuraFAB>
      <AuraFAB size="extended" label="Create">+</AuraFAB>
    </div>
  );
}
