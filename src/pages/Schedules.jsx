"use client";

import { useState } from 'react';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';

const COURSE_TIMETABLE = [
  { id: 1, code: 'CSC 402', day: 'Monday', time: '8:00 – 10:00am' },
  { id: 2, code: 'CSC 415', day: 'Tuesday', time: '10:00am – 12:00pm' },
  { id: 3, code: 'MTH 301', day: 'Wednesday', time: '2:00 – 4:00pm' },
];

const EXAM_SCHEDULE = [
  { id: 1, code: 'CSC 402', date: '2026-08-04', time: '9:00am' },
  { id: 2, code: 'CSC 415', date: '2026-08-06', time: '9:00am' },
  { id: 3, code: 'MTH 301', date: '2026-08-09', time: '2:00pm' },
];

const PROGRAM_TIMETABLE = [
  { id: 1, level: '100 Level', semester: 'First', units: 21 },
  { id: 2, level: '200 Level', semester: 'First', units: 22 },
  { id: 3, level: '300 Level', semester: 'First', units: 20 },
  { id: 4, level: '400 Level', semester: 'First', units: 18 },
];

const TABS = [
  { key: 'course', label: 'Course Timetable' },
  { key: 'exam', label: 'Exam Schedule' },
  { key: 'program', label: 'Program Timetable' },
];

export default function Schedules() {
  const [tab, setTab] = useState('course');

  return (
    <div className="space-y-4">
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'course' && (
        <Table
          columns={[
            { key: 'code', header: 'Course', render: (r) => <span className="ledger-num">{r.code}</span> },
            { key: 'day', header: 'Day' },
            { key: 'time', header: 'Time' },
          ]}
          rows={COURSE_TIMETABLE}
        />
      )}

      {tab === 'exam' && (
        <Table
          columns={[
            { key: 'code', header: 'Course', render: (r) => <span className="ledger-num">{r.code}</span> },
            { key: 'date', header: 'Date', render: (r) => <span className="ledger-num">{r.date}</span> },
            { key: 'time', header: 'Time' },
          ]}
          rows={EXAM_SCHEDULE}
        />
      )}

      {tab === 'program' && (
        <Table
          columns={[
            { key: 'level', header: 'Level' },
            { key: 'semester', header: 'Semester' },
            { key: 'units', header: 'Required Units', render: (r) => <span className="ledger-num">{r.units}</span> },
          ]}
          rows={PROGRAM_TIMETABLE}
        />
      )}
    </div>
  );
}