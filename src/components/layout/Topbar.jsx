import { Menu } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

function initials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Topbar({ title, subtitle, actions, studentName, studentId, onOpenMobileMenu }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 sm:px-6 py-4 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onOpenMobileMenu} className="lg:hidden text-text-secondary shrink-0" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-lg sm:text-xl text-text-primary truncate">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-text-secondary mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {actions}
        <ThemeToggle />
        {studentName && (
          <div className="hidden sm:flex items-center gap-2.5 pl-4 border-l border-border">
            <div className="w-9 h-9 rounded-full bg-brass-soft text-brass flex items-center justify-center font-semibold text-sm shrink-0">
              {initials(studentName)}
            </div>
            <div className="text-right leading-tight">
              <p className="text-sm font-medium text-text-primary">{studentName}</p>
              <p className="ledger-num text-xs text-text-secondary">{studentId}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
