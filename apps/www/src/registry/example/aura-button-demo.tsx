"use client";

import { AuraButton } from "@/registry/aura-cn/aura-button";

export default function AuraButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AuraButton>Default Aura</AuraButton>
      <AuraButton size="sm">Small</AuraButton>
      <AuraButton size="lg">Large</AuraButton>
      <AuraButton variant="secondary">Secondary</AuraButton>
      <AuraButton variant="outline">Outline</AuraButton>
      <AuraButton variant="ghost">Ghost</AuraButton>
      <AuraButton disabled>Disabled</AuraButton>
    </div>
  );
}
