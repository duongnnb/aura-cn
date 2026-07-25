import { registryUI } from "./registry-ui";
import { registryExamples } from "./registry-examples";
import type { RegistryItem } from "./types";

export const registry: RegistryItem[] = [...registryUI, ...registryExamples];
