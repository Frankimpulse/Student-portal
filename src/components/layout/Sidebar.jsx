"use client";

import { Home, BookOpen, ClipboardCheck, Wallet, User, CalendarDays, CalendarClock } from 'lucide-react';

const NAV_ITEMS = [
  { key: 'dashboard', icon: Home, label: 'Dashboard' },
  { key: 'courses', icon: BookOpen, label: 'Courses' },
  { key: 'exams', icon: ClipboardCheck, label: 'Exams' },
  { key: 'wallet', icon: Wallet, label: 'Wallet' },
  { key: 'profile', icon: User, label: 'Profile' },
  { key: 'schedules', icon: CalendarDays, label: 'Schedules' },
  { key: 'calendar', icon: CalendarClock, label: 'Academic Calendar' },
];

export default function Sidebar({ active, onNavigate, studentName, studentId }) {
  return (
    <aside className="w-64 shrink-0 bg-surface border-r border-border h-full flex flex-col">
      <div className="px-5 py-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center text-text-on-ink font-bold text-sm">U</div>
        <p className="font-display font-bold text-lg text-ink">UNIFRA</p>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={[
                'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-left transition-colors',
                isActive
                  ? 'bg-brass text-text-on-ink font-semibold shadow-sm'
                  : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary',
              ].join(' ')}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {studentName && (
        <div className="px-5 py-4 mx-3 mb-3 rounded-xl bg-surface-raised flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brass-soft text-brass flex items-center justify-center font-semibold text-sm">
            {studentName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{studentName}</p>
            <p className="ledger-num text-xs text-text-secondary">{studentId}</p>
          </div>
        </div>
      )}
    </aside>
  );
}
