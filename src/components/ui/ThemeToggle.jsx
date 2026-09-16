"use client";

import { useTheme } from '../../theme/ThemeProvider';

/** Light/dark toggle. Renders as a small pill switch. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      className="relative w-12 h-6 rounded-full border border-border-strong bg-surface-raised transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass shrink-0"
    >
      <span
        className={[
          'absolute top-0.5 left-0.5 rounded-full bg-brass transition-transform duration-150',
          isDark ? 'translate-x-[26px]' : 'translate-x-0',
        ].join(' ')}
        style={{ height: '18px', width: '18px' }}
      />
    </button>
  );
}
