"use client";

import { BookOpen, Wallet, ClipboardCheck, GraduationCap, ArrowRight, ClipboardList, User as UserIcon, CalendarClock } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import PageBanner from '../components/ui/PageBanner';
import useAcademicCalendar from '../hooks/useAcademicCalendar';

const TAG_ICON = {
  Course: BookOpen,
  Exam: ClipboardCheck,
  Wallet: Wallet,
  Profile: UserIcon,
  Semester: GraduationCap,
};

const TAG_TONE_BG = {
  success: 'bg-forest text-text-on-ink',
  brass: 'bg-brass text-text-on-ink',
  danger: 'bg-oxblood text-text-on-ink',
  pending: 'bg-amber text-text-on-ink',
  neutral: 'bg-ink text-text-on-ink',
};

const QUICK_ACTIONS = [
  { key: 'courses', icon: BookOpen, label: 'Register a Course', tone: 'ink' },
  { key: 'exams', icon: ClipboardCheck, label: 'Register for Exams', tone: 'brass' },
  { key: 'wallet', icon: Wallet, label: 'Fund Wallet', tone: 'forest' },
  { key: 'calendar', icon: CalendarClock, label: 'Academic Calendar', tone: 'amber' },
];

export default function Dashboard({
  studentName = 'Student',
  registeredCoursesCount = 0,
  examsScheduledCount = 0,
  walletBalance = 0,
  activity = [],
  onNavigate,
}) {
  const firstName = studentName.split(' ')[0];
  const { events, loading: calendarLoading, stats: calendarStats } = useAcademicCalendar();

  const upcomingPreview = events
    .filter((e) => e.effectiveStatus === 'upcoming' || e.effectiveStatus === 'active')
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <PageBanner
        eyebrow="2025/2026 Academic Session"
        title={`Welcome back, ${firstName}`}
        subtitle="Here's where things stand across your courses, exams and wallet this semester."
        bgImage="/dashboard-bg.jpg"
      />

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              onClick={() => onNavigate?.(a.key)}
              className="card-shadow bg-surface border border-border rounded-2xl p-4 text-left hover:border-brass/50 hover:-translate-y-0.5 transition-all"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center bg-${a.tone} text-text-on-ink mb-3`}>
                <Icon size={16} />
              </div>
              <p className="text-sm font-medium text-text-primary leading-snug">{a.label}</p>
            </button>
          );
        })}
      </div>

      {/* Academic calendar progress strip */}
      {!calendarLoading && (
        <Card>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">Academic Calendar Progress</p>
              <p className="font-display text-lg font-semibold text-text-primary mt-1">{calendarStats.currentPhase}</p>
              {calendarStats.nextEvent && (
                <p className="text-sm text-text-secondary mt-1">
                  Next: <span className="text-text-primary font-medium">{calendarStats.nextEvent.title}</span>
                  {calendarStats.daysUntilNext !== null && ` in ${calendarStats.daysUntilNext} day${calendarStats.daysUntilNext !== 1 ? 's' : ''}`}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="ledger-num text-2xl font-semibold text-forest">{calendarStats.overallProgress}%</p>
              <p className="text-xs text-text-secondary">{calendarStats.completed} of {calendarStats.total} milestones</p>
            </div>
          </div>

          <div className="h-2 rounded-full bg-surface-raised mt-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-forest transition-all"
              style={{ width: `${calendarStats.overallProgress}%` }}
              role="progressbar"
              aria-valuenow={calendarStats.overallProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Academic calendar overall progress"
            />
          </div>

          {upcomingPreview.length > 0 && (
            <div className="mt-5 pt-4 border-t border-border space-y-3">
              {upcomingPreview.map((e) => (
                <div key={e.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${e.effectiveStatus === 'active' ? 'bg-brass' : 'bg-border-strong'}`} aria-hidden="true" />
                    <span className="text-text-primary">{e.title}</span>
                  </div>
                  <span className="ledger-num text-text-secondary text-xs">{e.startDate}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border flex justify-end">
            <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => onNavigate?.('calendar')}>
              View Full Academic Calendar
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Registered Courses" value={String(registeredCoursesCount)} hint="This semester" icon={BookOpen} tone="ink" />
        <StatCard label="Exams Registered" value={String(examsScheduledCount)} hint="Registered so far" icon={ClipboardCheck} tone="brass" />
        <StatCard label="Wallet Balance" value={`₦${walletBalance.toLocaleString()}`} hint="Available balance" icon={Wallet} tone="forest" />
        <StatCard label="CGPA" value="4.32" hint="As of last semester" icon={GraduationCap} tone="ink" />
      </div>

      <Card>
        <CardHeader title="Recent Activity" subtitle="Latest actions across your registry record" />
        {activity.length === 0 ? (
          <p className="text-sm text-text-secondary py-4 text-center">No activity yet — register a course, book an exam, or fund your wallet to see it here.</p>
        ) : (
          <ul className="divide-y divide-border">
            {activity.slice(0, 8).map((item) => {
              const Icon = TAG_ICON[item.tag] || ClipboardList;
              return (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${TAG_TONE_BG[item.tone] || TAG_TONE_BG.neutral}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-text-primary">{item.text}</span>
                    {item.timestamp && <p className="ledger-num text-xs text-text-secondary mt-0.5">{item.timestamp}</p>}
                  </div>
                  <Badge tone={item.tone}>{item.tag}</Badge>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
