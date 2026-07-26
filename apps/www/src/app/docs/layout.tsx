import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
        banner: (
          <div
            key="sidebar-banner"
            className="flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-3 py-2 text-xs text-fd-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            46 components · shadcn compatible
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
