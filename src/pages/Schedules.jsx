"use client";

import { useState } from 'react';
import { Video, FileCheck, GraduationCap, Radio } from 'lucide-react';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import PageBanner from '../components/ui/PageBanner';

// status: 'Ongoing' | 'Upcoming' | 'Ended' — only 'Ongoing' sessions get a
// Join button, since that's the only time there's actually a live link to
// join. A real system would compute this from the current time vs the
// session's start/end, not a hardcoded field — this mock has one example
// of each so you can see all three states.
const LIVE_CLASSES = [
  { id: 1, code: 'CSC 402', day: 'Monday', time: '8:00 – 10:00am', status: 'Ongoing' },
  { id: 2, code: 'CSC 415', day: 'Tuesday', time: '10:00am – 12:00pm', status: 'Upcoming' },
  { id: 3, code: 'MTH 301', day: 'Wednesday', time: '2:00 – 4:00pm', status: 'Upcoming' },
];

const STATUS_TONE = { Ongoing: 'success', Upcoming: 'neutral', Ended: 'brass' };

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
  { key: 'live', label: 'Live Class Schedule' },
  { key: 'exam', label: 'Exam Schedule' },
  { key: 'program', label: 'Program Timetable' },
];

export default function Schedules() {
  const [tab, setTab] = useState('live');
  const ongoingCount = LIVE_CLASSES.filter((c) => c.status === 'Ongoing').length;

  return (
    <div className="space-y-4">
      <PageBanner eyebrow="Open & Distance Learning" title="Schedules" subtitle="Live classes, exam timetable and your program's required units." bgImage="/schedules-bg.jpg" compact />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Live Classes This Week" value={String(LIVE_CLASSES.length)} hint={ongoingCount > 0 ? `${ongoingCount} ongoing now` : 'None ongoing'} icon={Video} tone="ink" />
        <StatCard label="Exams Scheduled" value={String(EXAM_SCHEDULE.length)} icon={FileCheck} tone="brass" />
        <StatCard label="Mode of Study" value="Online" hint="Open & Distance Learning" icon={GraduationCap} tone="forest" />
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'live' && (
        <div className="border border-border rounded-xl divide-y divide-border overflow-hidden">
          {LIVE_CLASSES.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-raised">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${c.status === 'Ongoing' ? 'bg-forest text-text-on-ink' : 'bg-ink text-brass'}`}>
                  <Radio size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    <span className="ledger-num">{c.code}</span>
                  </p>
                  <p className="text-xs text-text-secondary">{c.day} · {c.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone={STATUS_TONE[c.status]}>{c.status}</Badge>
                {c.status === 'Ongoing' && (
                  <Button size="sm" variant="brass" icon={Video}>Join Class</Button>
                )}
              </div>
            </div>
          ))}
          <div className="px-4 py-2.5 bg-surface-raised text-xs text-text-secondary">
            The Join button only appears while a class is live. Missed a session? Recordings are posted afterward for anyone who couldn't attend.
          </div>
        </div>
      )}

      {tab === 'exam' && (
        <>
          <Table
            columns={[
              { key: 'code', header: 'Course', render: (r) => <span className="ledger-num">{r.code}</span> },
              { key: 'date', header: 'Date', render: (r) => <span className="ledger-num">{r.date}</span> },
              { key: 'time', header: 'Time' },
            ]}
            rows={EXAM_SCHEDULE}
          />
          <p className="text-xs text-text-secondary px-1">
            Examinations are computer-based (CBT) and taken remotely through the exam portal — no physical exam center required.
          </p>
        </>
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
