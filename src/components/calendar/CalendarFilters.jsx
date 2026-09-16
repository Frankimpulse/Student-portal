import { Search } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const SEMESTER_OPTIONS = [
  { value: 'all', label: 'All Semesters' },
  { value: 'First', label: 'First' },
  { value: 'Second', label: 'Second' },
];

const SORT_OPTIONS = [
  { value: 'manual', label: 'Manual Order' },
  { value: 'date-asc', label: 'Date (Earliest First)' },
  { value: 'date-desc', label: 'Date (Latest First)' },
];

export default function CalendarFilters({ filters, onChange, sessionOptions }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-1.5" htmlFor="cal-search">Search</label>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
            <input
              id="cal-search"
              type="text"
              placeholder="Search event name..."
              value={filters.search}
              onChange={update('search')}
              className="w-full rounded-md border border-border bg-surface pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brass"
            />
          </div>
        </div>
        <Select label="Status" name="status" value={filters.status} onChange={update('status')} options={STATUS_OPTIONS} />
        <Select label="Semester" name="semester" value={filters.semester} onChange={update('semester')} options={SEMESTER_OPTIONS} />
        <Select label="Session" name="session" value={filters.session} onChange={update('session')} options={sessionOptions} />
        <Select label="Sort" name="sort" value={filters.sort} onChange={update('sort')} options={SORT_OPTIONS} />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Input label="From Date" name="dateFrom" type="date" value={filters.dateFrom} onChange={update('dateFrom')} />
        <Input label="To Date" name="dateTo" type="date" value={filters.dateTo} onChange={update('dateTo')} />
      </div>
    </Card>
  );
}
