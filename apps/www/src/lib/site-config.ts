/**
 * Central site configuration.
 * Change REGISTRY_BASE_URL here to update install commands across the entire site.
 */
export const siteConfig = {
  name: "aura-cn",
  /** Base URL for the component registry JSON files */
  registryBaseUrl:
    "https://raw.githubusercontent.com/duongnnb/aura-cn/master/apps/www/public/r",
} as const;

/** Helper: full URL for a component registry file */
export function getRegistryUrl(componentName: string) {
  return `${siteConfig.registryBaseUrl}/${componentName}.json`;
}

/** Helper: full install command for a component */
export function getInstallCommand(componentName: string) {
  return `npx shadcn@latest add ${getRegistryUrl(componentName)}`;
}
