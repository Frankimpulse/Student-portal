"use client";

import { useState } from 'react';
import { Home, BookOpen, ClipboardCheck, Wallet, User, CalendarDays, CalendarClock, GraduationCap, ChevronLeft, ChevronRight, X, LogOut } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const NAV_ITEMS = [
  { key: 'dashboard', icon: Home, label: 'Dashboard' },
  { key: 'courses', icon: BookOpen, label: 'Course Management' },
  { key: 'exams', icon: ClipboardCheck, label: 'Exam Management' },
  { key: 'wallet', icon: Wallet, label: 'Wallet' },
  { key: 'profile', icon: User, label: 'Profile' },
  { key: 'schedules', icon: CalendarDays, label: 'Schedules' },
  { key: 'calendar', icon: CalendarClock, label: 'Academic Calendar' },
];

export default function Sidebar({ active, onNavigate, studentName, studentId, collapsed, onToggleCollapse, mobileOpen, onCloseMobile, onLogout }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const width = collapsed ? 'w-[76px]' : 'w-64';

  const handleConfirmLogout = () => {
    setConfirmOpen(false);
    onLogout?.();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'bg-surface border-r border-border flex flex-col shrink-0 transition-all duration-200 z-40',
          width,
          'fixed lg:static inset-y-0 left-0 h-full',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="px-4 py-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-brass border-2 border-brass shrink-0">
              <GraduationCap size={20} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="font-display font-semibold text-lg text-ink leading-tight truncate">Registry</p>
                <p className="text-[11px] text-text-secondary tracking-wide">Student Portal</p>
              </div>
            )}
          </div>
          <button onClick={onCloseMobile} className="lg:hidden text-text-secondary" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="mx-4 h-px bg-border" />

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === active;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                title={collapsed ? item.label : undefined}
                className={[
                  'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors',
                  collapsed ? 'justify-center' : '',
                  isActive
                    ? 'bg-ink text-text-on-ink font-semibold shadow-sm'
                    : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary',
                ].join(' ')}
              >
                <Icon size={18} className={isActive ? 'text-brass shrink-0' : 'shrink-0'} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {studentName && !collapsed && (
          <div className="px-4 py-4 mx-3 mb-2 rounded-lg bg-surface-raised flex items-center gap-3 border border-border">
            <div className="w-9 h-9 rounded-full bg-brass-soft text-brass flex items-center justify-center font-semibold text-sm border border-brass/40 shrink-0">
              {studentName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text-primary truncate">{studentName}</p>
              <p className="ledger-num text-xs text-text-secondary">{studentId}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setConfirmOpen(true)}
          title={collapsed ? 'Log Out' : undefined}
          className={[
            'flex items-center gap-3 mx-3 mb-3 px-3.5 py-2.5 rounded-lg text-sm text-oxblood hover:bg-oxblood-soft transition-colors',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && 'Log Out'}
        </button>

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center mx-3 mb-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-surface-raised"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Log out?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleConfirmLogout}>Log Out</Button>
          </>
        }
      >
        <p>You'll need to sign back in to access your dashboard, courses, and wallet.</p>
      </Modal>
    </>
  );
}
