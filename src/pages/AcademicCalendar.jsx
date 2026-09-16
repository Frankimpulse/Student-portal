"use client";

import { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import useAcademicCalendar from '../hooks/useAcademicCalendar';
import Card, { CardHeader } from '../components/ui/Card';
import DashboardCards from '../components/calendar/DashboardCards';
import CalendarFilters from '../components/calendar/CalendarFilters';
import AcademicTimeline from '../components/calendar/AcademicTimeline';

const DEFAULT_FILTERS = { search: '', status: 'all', semester: 'all', session: 'all', sort: 'manual', dateFrom: '', dateTo: '' };

export default function AcademicCalendar({ onNavigate }) {
  const { events, loading, stats } = useAcademicCalendar();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const sessionOptions = useMemo(() => {
    const unique = [...new Set(events.map((e) => e.session))];
    return [{ value: 'all', label: 'All Sessions' }, ...unique.map((s) => ({ value: s, label: s }))];
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = events.filter((e) => {
      if (filters.search && !e.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status !== 'all' && e.effectiveStatus !== filters.status) return false;
      if (filters.semester !== 'all' && e.semester !== filters.semester) return false;
      if (filters.session !== 'all' && e.session !== filters.session) return false;
      if (filters.dateFrom && e.startDate < filters.dateFrom) return false;
      if (filters.dateTo && e.endDate > filters.dateTo) return false;
      return true;
    });
    if (filters.sort === 'date-asc') result = [...result].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    if (filters.sort === 'date-desc') result = [...result].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    return result;
  }, [events, filters]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-text-secondary">
        <button onClick={() => onNavigate?.('dashboard')} className="hover:text-text-primary focus:outline-none focus-visible:underline">
          Dashboard
        </button>
        <ChevronRight size={14} aria-hidden="true" />
        <span className="text-text-primary font-medium">Academic Calendar</span>
      </nav>

      {/* Header */}
      <div>
        <h2 className="font-display text-lg font-semibold text-text-primary">Academic Calendar Progress</h2>
        <p className="text-sm text-text-secondary mt-0.5">Track your progress through the {stats.total > 0 ? events[0].session : 'current'} academic session.</p>
      </div>

      {loading ? (
        <Card className="text-center py-16 text-sm text-text-secondary">Loading academic calendar…</Card>
      ) : (
        <>
          <DashboardCards stats={stats} session={events[0]?.session || '—'} semester={events[0]?.semester || '—'} />

          <CalendarFilters filters={filters} onChange={setFilters} sessionOptions={sessionOptions} />

          <Card>
            <CardHeader
              title="Timeline"
              subtitle={`Showing ${filteredEvents.length} of ${events.length} event${events.length !== 1 ? 's' : ''}`}
            />
            <AcademicTimeline events={filteredEvents} isAdmin={false} />
          </Card>
        </>
      )}
    </div>
  );
}