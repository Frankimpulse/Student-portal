"use client";

import { useState, useMemo } from 'react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Tabs from '../components/ui/Tabs';

// Past-semester history only — current semester comes from the `exams` prop instead.
const PAST_EXAMS = [
  { id: 'p1', code: 'CSC 301', title: 'Operating Systems', year: '2024/2025', semester: 'Second', status: 'Completed' },
  { id: 'p2', code: 'MTH 201', title: 'Linear Algebra', year: '2024/2025', semester: 'First', status: 'Completed' },
];

const STATUS_TONE = { Registered: 'success', 'Not Registered': 'neutral', Completed: 'brass' };

const YEAR_OPTIONS = [{ value: 'all', label: 'All Years' }, { value: '2025/2026', label: '2025/2026' }, { value: '2024/2025', label: '2024/2025' }];
const SEMESTER_OPTIONS = [{ value: 'all', label: 'All Semesters' }, { value: 'First', label: 'First' }, { value: 'Second', label: 'Second' }];

function examColumns() {
  return [
    { key: 'code', header: 'Code', render: (r) => <span className="ledger-num">{r.code}</span> },
    { key: 'title', header: 'Course Title' },
    { key: 'year', header: 'Year', render: (r) => <span className="ledger-num">{r.year}</span> },
    { key: 'semester', header: 'Semester' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge> },
  ];
}

export default function ExamListing({ exams = [], onRegister }) {
  const [tab, setTab] = useState('current');
  const [year, setYear] = useState('all');
  const [semester, setSemester] = useState('all');

  const rows = tab === 'current' ? exams : [...PAST_EXAMS, ...exams];
  const filtered = useMemo(
    () => rows.filter((r) => (year === 'all' || r.year === year) && (semester === 'all' || r.semester === semester)),
    [rows, year, semester]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Tabs
          tabs={[{ key: 'current', label: 'Current Semester' }, { key: 'timeline', label: 'Timeline' }]}
          active={tab}
          onChange={setTab}
        />
        <div className="flex items-center gap-2">
          <Select name="year" value={year} onChange={(e) => setYear(e.target.value)} options={YEAR_OPTIONS} className="w-36" />
          <Select name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} options={SEMESTER_OPTIONS} className="w-40" />
          <Button variant="brass" onClick={() => onRegister?.()}>Register for Exams</Button>
        </div>
      </div>

      <Table
        columns={examColumns()}
        rows={filtered}
        emptyMessage="No exams match this filter. Check the Exam Schedule page (under Schedules) for dates, times and venues."
      />
    </div>
  );
}