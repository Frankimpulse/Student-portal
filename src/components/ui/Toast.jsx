"use client";

import { useEffect } from 'react';

/** Toast — brief auto-dismissing success/error banner, fixed to the top of the viewport. */
export default function Toast({ message, tone = 'success', onDismiss, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  const toneClasses = tone === 'success'
    ? 'bg-forest-soft text-forest border-forest'
    : 'bg-oxblood-soft text-oxblood border-oxblood';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.15s_ease-out]">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${toneClasses}`}>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onDismiss} aria-label="Dismiss" className="text-xs opacity-70 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}
