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
import { AuraMotion, AuraStagger } from "@/registry/aura-cn/aura-motion";
import { AuraCommand, type CommandItem } from "@/registry/aura-cn/aura-command";
import { AuraPopover } from "@/registry/aura-cn/aura-popover";
import { AuraTable, type AuraTableColumn } from "@/registry/aura-cn/aura-table";
import { AuraDatePicker } from "@/registry/aura-cn/aura-datepicker";
import { AuraBreadcrumb, type BreadcrumbItem } from "@/registry/aura-cn/aura-breadcrumb";
import { AuraPagination } from "@/registry/aura-cn/aura-pagination";
import { AuraDivider } from "@/registry/aura-cn/aura-divider";
import { AuraAlert } from "@/registry/aura-cn/aura-alert";
import { AuraOTPInput } from "@/registry/aura-cn/aura-otp-input";
import { AuraTagInput } from "@/registry/aura-cn/aura-tag-input";
import { AuraAutocomplete } from "@/registry/aura-cn/aura-autocomplete";
import { AuraFileUpload } from "@/registry/aura-cn/aura-file-upload";
import { AuraSidebar, type SidebarItem } from "@/registry/aura-cn/aura-sidebar";
import { AuraNavbar } from "@/registry/aura-cn/aura-navbar";
import { AuraTimeline, type TimelineItem } from "@/registry/aura-cn/aura-timeline";
import { AuraCarousel } from "@/registry/aura-cn/aura-carousel";
import { AuraSwitchIcon } from "@/registry/aura-cn/aura-switch-icon";
import { AuraColorPicker } from "@/registry/aura-cn/aura-color-picker";
import { AuraConfirmDialog } from "@/registry/aura-cn/aura-confirm-dialog";
import { AuraNotificationBadge } from "@/registry/aura-cn/aura-notification-badge";
import { AuraStatCard } from "@/registry/aura-cn/aura-stat-card";
import { AuraTreeView, type TreeNode } from "@/registry/aura-cn/aura-tree-view";
import { AuraDataList } from "@/registry/aura-cn/aura-data-list";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AuraButton>Default</AuraButton>
      <AuraButton variant="primary">Subscribe</AuraButton>
      <AuraButton variant="accent">Accent</AuraButton>
      <AuraButton size="sm">Small</AuraButton>
      <AuraButton size="lg">Large</AuraButton>
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
      <AuraChip variant="active">Active</AuraChip>
      <AuraChip variant="outline">Tailwind</AuraChip>
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
      <AuraBadge variant="accent">Accent</AuraBadge>
      <AuraBadge variant="outline">v0.1</AuraBadge>
      <AuraBadge variant="destructive">Breaking</AuraBadge>
      <AuraBadge variant="success">Stable</AuraBadge>
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

export function MotionDemo() {
  return (
    <div className="space-y-6">
      <AuraMotion preset="fade-up">
        <AuraButton>Fade Up</AuraButton>
      </AuraMotion>
      <AuraMotion preset="scale" delay={0.1}>
        <AuraButton variant="accent">Scale In</AuraButton>
      </AuraMotion>
      <AuraMotion preset="blur" delay={0.2}>
        <AuraButton variant="outline">Blur In</AuraButton>
      </AuraMotion>
      <AuraStagger stagger={0.1} preset="fade-up">
        <AuraChip>Item 1</AuraChip>
        <AuraChip>Item 2</AuraChip>
        <AuraChip>Item 3</AuraChip>
        <AuraChip>Item 4</AuraChip>
      </AuraStagger>
    </div>
  );
}

const commandItems: CommandItem[] = [
  { id: "1", label: "Search files", shortcut: "⌘P", group: "Navigation" },
  { id: "2", label: "Open settings", shortcut: "⌘,", group: "Navigation" },
  { id: "3", label: "Toggle dark mode", group: "Actions" },
  { id: "4", label: "Copy current URL", group: "Actions" },
  { id: "5", label: "New file", shortcut: "⌘N", group: "File" },
  { id: "6", label: "Save all", shortcut: "⌘S", group: "File" },
];

export function CommandDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <AuraButton onClick={() => setOpen(true)} variant="outline">
        ⌘K Open Command
      </AuraButton>
      <AuraCommand items={commandItems} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export function PopoverDemo() {
  return (
    <AuraPopover
      trigger={<AuraButton variant="outline">Open Popover</AuraButton>}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--text-primary)]">Popover Content</p>
        <p className="text-xs text-[var(--text-secondary)]">This is a rich content popover with any elements inside.</p>
        <AuraButton size="sm">Action</AuraButton>
      </div>
    </AuraPopover>
  );
}

const tableData = [
  { name: "Button", category: "Action", status: "Stable" },
  { name: "Card", category: "Layout", status: "Stable" },
  { name: "Modal", category: "Overlay", status: "Beta" },
  { name: "DatePicker", category: "Input", status: "New" },
];

const tableColumns: AuraTableColumn<typeof tableData[number]>[] = [
  { key: "name", header: "Component" },
  { key: "category", header: "Category" },
  { key: "status", header: "Status" },
];

export function TableDemo() {
  return <AuraTable columns={tableColumns} data={tableData} striped />;
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>();
  return <AuraDatePicker value={date} onChange={setDate} />;
}

/* ─── Batch 1 ─── */

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];

export function BreadcrumbDemo() {
  return <AuraBreadcrumb items={breadcrumbItems} />;
}

export function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  return <AuraPagination currentPage={page} totalPages={12} onPageChange={setPage} />;
}

export function DividerDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <p className="text-sm text-[var(--text-secondary)]">Content above</p>
      <AuraDivider />
      <AuraDivider label="or" />
      <p className="text-sm text-[var(--text-secondary)]">Content below</p>
    </div>
  );
}

export function AlertDemo() {
  return (
    <div className="max-w-md space-y-3">
      <AuraAlert variant="info" title="Info">This is an informational alert.</AuraAlert>
      <AuraAlert variant="success" title="Success">Operation completed.</AuraAlert>
      <AuraAlert variant="warning" title="Warning">Please review your input.</AuraAlert>
      <AuraAlert variant="error" title="Error">Something went wrong.</AuraAlert>
    </div>
  );
}

/* ─── Batch 2 ─── */

export function OtpInputDemo() {
  return <AuraOTPInput length={6} onChange={(otp) => console.log(otp)} />;
}

export function TagInputDemo() {
  const [tags, setTags] = React.useState(["React", "TypeScript"]);
  return <AuraTagInput value={tags} onChange={setTags} maxTags={5} className="max-w-sm" />;
}

export function AutocompleteDemo() {
  return (
    <AuraAutocomplete
      options={["React", "Vue", "Angular", "Svelte", "Solid", "Next.js", "Nuxt", "Remix"]}
      placeholder="Search frameworks..."
      className="max-w-sm"
    />
  );
}

export function FileUploadDemo() {
  return <AuraFileUpload accept="image/*" multiple maxSize={5} className="max-w-md" />;
}

/* ─── Batch 3 ─── */

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", active: true },
  { label: "Components", children: [
    { label: "Button" },
    { label: "Card" },
    { label: "Input" },
  ]},
  { label: "Settings" },
];

export function SidebarDemo() {
  return (
    <div className="h-64 w-60 overflow-hidden rounded-xl border border-[var(--card-border)]">
      <AuraSidebar items={sidebarItems} />
    </div>
  );
}

export function NavbarDemo() {
  return (
    <div className="rounded-xl border border-[var(--card-border)] overflow-hidden">
      <AuraNavbar
        brand={<span>Aura</span>}
        links={[
          { label: "Docs", active: true },
          { label: "Components" },
          { label: "GitHub" },
        ]}
      />
    </div>
  );
}

const timelineItems: TimelineItem[] = [
  { title: "Project created", description: "Initial setup and configuration", date: "Jan 1", active: true },
  { title: "Components added", description: "Button, Card, Input components", date: "Jan 5" },
  { title: "Dark mode support", description: "CSS variable theming system", date: "Jan 10" },
  { title: "v1.0 Release", date: "Jan 15" },
];

export function TimelineDemo() {
  return <AuraTimeline items={timelineItems} className="max-w-md" />;
}

export function CarouselDemo() {
  return (
    <AuraCarousel className="max-w-md h-48">
      <div className="flex h-48 items-center justify-center rounded-xl bg-blue-500/20 text-[var(--text-primary)]">Slide 1</div>
      <div className="flex h-48 items-center justify-center rounded-xl bg-purple-500/20 text-[var(--text-primary)]">Slide 2</div>
      <div className="flex h-48 items-center justify-center rounded-xl bg-emerald-500/20 text-[var(--text-primary)]">Slide 3</div>
    </AuraCarousel>
  );
}

/* ─── Batch 4 ─── */

export function SwitchIconDemo() {
  const [checked, setChecked] = React.useState(false);
  return <AuraSwitchIcon checked={checked} onCheckedChange={setChecked} />;
}

export function ColorPickerDemo() {
  return <AuraColorPicker />;
}

export function ConfirmDialogDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition"
      >
        Delete Item
      </button>
      <AuraConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this item?"
        description="This action cannot be undone. The item will be permanently removed."
        variant="destructive"
        confirmLabel="Delete"
        onConfirm={() => console.log("Deleted")}
      />
    </>
  );
}

export function NotificationBadgeDemo() {
  return (
    <div className="flex items-center gap-6">
      <AuraNotificationBadge count={3}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </AuraNotificationBadge>
      <AuraNotificationBadge count={150}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </AuraNotificationBadge>
      <AuraNotificationBadge dot>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)]">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
      </AuraNotificationBadge>
    </div>
  );
}

/* ─── Batch 5 ─── */

export function StatCardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <AuraStatCard label="Revenue" value="$45,231" change="+12.5%" trend="up" />
      <AuraStatCard label="Users" value="2,340" change="+8.2%" trend="up" />
      <AuraStatCard label="Bounce Rate" value="24.5%" change="-3.1%" trend="down" />
    </div>
  );
}

const treeNodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "button.tsx" },
          { id: "card", label: "card.tsx" },
        ],
      },
      { id: "utils", label: "utils.ts" },
    ],
  },
  { id: "package", label: "package.json" },
];

export function TreeViewDemo() {
  return <AuraTreeView nodes={treeNodes} defaultExpanded={["src", "components"]} className="max-w-sm" />;
}

export function DataListDemo() {
  return (
    <div className="max-w-sm space-y-6">
      <AuraDataList
        items={[
          { label: "Name", value: "Aura CN" },
          { label: "Version", value: "1.0.0" },
          { label: "License", value: "MIT" },
          { label: "Components", value: "40+" },
        ]}
      />
    </div>
  );
}
