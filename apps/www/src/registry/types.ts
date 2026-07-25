export type RegistryItemType =
  | "registry:ui"
  | "registry:component"
  | "registry:block"
  | "registry:example"
  | "registry:hook"
  | "registry:lib"
  | "registry:page"
  | "registry:file"
  | "registry:theme";

export interface RegistryItemFile {
  path: string;
  type: RegistryItemType;
  target?: string;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryItemFile[];
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  css?: Record<string, Record<string, string>>;
}
