import type { RegistryItem } from "./types";

export const registryExamples: RegistryItem[] = [
  {
    name: "aura-button-demo",
    type: "registry:example",
    title: "Aura Button Demo",
    description: "Demo showcasing all AuraButton variants and sizes.",
    registryDependencies: ["aura-button"],
    files: [
      {
        path: "registry/example/aura-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
