"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children, defaultTheme = 'light' }) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Read the persisted theme only after mount, so the first client render
  // matches the server-rendered HTML (both default to `defaultTheme`).
  useEffect(() => {
    const stored = window.localStorage.getItem('portal-theme');
    if (stored) setTheme(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('portal-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
