import { CalendarDays, Layers, Activity, TrendingUp, Clock, ListChecks } from 'lucide-react';
import StatCard from '../ui/StatCard';

export default function DashboardCards({ stats, session, semester }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard label="Academic Session" value={session} icon={CalendarDays} tone="ink" />
      <StatCard label="Current Semester" value={semester} icon={Layers} tone="ink" />
      <StatCard label="Active Phase" value={stats.currentPhase} hint="Current milestone" icon={Activity} tone="brass" />
      <StatCard label="Overall Progress" value={`${stats.overallProgress}%`} hint={`${stats.completed} of ${stats.total} completed`} icon={TrendingUp} tone="forest" />
      <StatCard
        label="Upcoming Deadline"
        value={stats.nextEvent ? stats.nextEvent.title : 'None'}
        hint={stats.daysUntilNext !== null ? `In ${stats.daysUntilNext} day${stats.daysUntilNext !== 1 ? 's' : ''}` : 'Session complete'}
        icon={Clock}
        tone="amber"
      />
      <StatCard label="Total Events" value={String(stats.total)} hint={`${stats.remaining} remaining`} icon={ListChecks} tone="ink" />
    </div>
  );
}
