"use client";

import * as React from "react";

const THEME_PRESETS = {
  blue: {
    "--aura": "oklch(0.623 0.214 259.815)",
    "--aura-glow": "oklch(0.623 0.214 259.815 / 0.4)",
    "--aura-rim": "oklch(0.882 0.059 254.128 / 0.6)",
    "--aura-wash": "oklch(0.882 0.059 254.128 / 0.15)",
    "--aura-dynamic": "oklch(0.882 0.059 254.128 / 0.25)",
  },
  purple: {
    "--aura": "oklch(0.586 0.22 292.717)",
    "--aura-glow": "oklch(0.586 0.22 292.717 / 0.4)",
    "--aura-rim": "oklch(0.811 0.111 293.571 / 0.6)",
    "--aura-wash": "oklch(0.811 0.111 293.571 / 0.15)",
    "--aura-dynamic": "oklch(0.811 0.111 293.571 / 0.25)",
  },
  green: {
    "--aura": "oklch(0.648 0.2 145.942)",
    "--aura-glow": "oklch(0.648 0.2 145.942 / 0.4)",
    "--aura-rim": "oklch(0.845 0.108 146.72 / 0.6)",
    "--aura-wash": "oklch(0.845 0.108 146.72 / 0.15)",
    "--aura-dynamic": "oklch(0.845 0.108 146.72 / 0.25)",
  },
  orange: {
    "--aura": "oklch(0.705 0.213 47.604)",
    "--aura-glow": "oklch(0.705 0.213 47.604 / 0.4)",
    "--aura-rim": "oklch(0.879 0.107 55.087 / 0.6)",
    "--aura-wash": "oklch(0.879 0.107 55.087 / 0.15)",
    "--aura-dynamic": "oklch(0.879 0.107 55.087 / 0.25)",
  },
  rose: {
    "--aura": "oklch(0.645 0.246 16.439)",
    "--aura-glow": "oklch(0.645 0.246 16.439 / 0.4)",
    "--aura-rim": "oklch(0.839 0.117 11.561 / 0.6)",
    "--aura-wash": "oklch(0.839 0.117 11.561 / 0.15)",
    "--aura-dynamic": "oklch(0.839 0.117 11.561 / 0.25)",
  },
} as const;

export type AuraTheme = keyof typeof THEME_PRESETS;

interface ThemeContextValue {
  theme: AuraTheme;
  setTheme: (theme: AuraTheme) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "blue",
  setTheme: () => {},
  isDark: true,
  toggleDark: () => {},
});

export function useAuraTheme() {
  return React.useContext(ThemeContext);
}

export function AuraThemeProvider({
  children,
  defaultTheme = "blue",
  defaultDark = true,
}: {
  children: React.ReactNode;
  defaultTheme?: AuraTheme;
  defaultDark?: boolean;
}) {
  const [theme, setTheme] = React.useState<AuraTheme>(defaultTheme);
  const [isDark, setIsDark] = React.useState(defaultDark);

  React.useEffect(() => {
    const root = document.documentElement;

    // Apply aura color vars
    const vars = THEME_PRESETS[theme];
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }

    // Apply dark mode
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function AuraThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, isDark, toggleDark } = useAuraTheme();

  const themes: { key: AuraTheme; color: string }[] = [
    { key: "blue", color: "#3b82f6" },
    { key: "purple", color: "#a855f7" },
    { key: "green", color: "#22c55e" },
    { key: "orange", color: "#f97316" },
    { key: "rose", color: "#f43f5e" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      {/* Color picker */}
      <div className="flex items-center gap-1.5">
        {themes.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTheme(t.key)}
            className={`h-5 w-5 rounded-full border-2 transition-all ${
              theme === t.key
                ? "border-foreground scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: t.color }}
            aria-label={`${t.key} theme`}
          />
        ))}
      </div>

      {/* Dark/Light toggle */}
      <button
        type="button"
        onClick={toggleDark}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 10.42A6.5 6.5 0 015.58 2 6.5 6.5 0 1014 10.42z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

export { THEME_PRESETS };
