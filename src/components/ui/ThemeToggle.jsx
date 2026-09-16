"use client";

import { useTheme } from '../../theme/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      className="relative inline-flex w-12 h-6 shrink-0 items-center rounded-full border border-border-strong bg-surface-raised transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
    >
      <span
        className={[
          'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-brass transition-transform duration-150',
          isDark ? 'translate-x-6' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}
