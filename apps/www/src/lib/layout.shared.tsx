import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <span
            aria-hidden="true"
            className="size-5 rounded-md bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 shadow-[0_0_10px_rgba(168,85,247,0.55)]"
          />
          <span className="font-semibold tracking-tight">aura-cn</span>
        </>
      ),
    },
    githubUrl: 'https://github.com/duongnnb/aura-cn',
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
    ],
  };
}
