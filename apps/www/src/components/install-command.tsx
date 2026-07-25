"use client";

import { siteConfig } from "@/lib/site-config";

interface InstallCommandProps {
  name: string;
}

export function InstallCommand({ name }: InstallCommandProps) {
  const command = `npx shadcn@latest add ${siteConfig.registryBaseUrl}/${name}.json`;

  return (
    <div className="relative my-4">
      <pre className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] p-4 text-sm">
        <code>{command}</code>
      </pre>
      <button
        type="button"
        onClick={() => navigator.clipboard.writeText(command)}
        className="absolute right-3 top-3 rounded-md p-1.5 text-[var(--text-secondary,rgba(255,255,255,0.7))] hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--text-primary,#f1f1f1)] transition-colors"
        aria-label="Copy install command"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
