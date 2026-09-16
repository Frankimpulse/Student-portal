"use client";

import { useState } from 'react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';

// Past-semester history only — current semester comes from the `courses` prop instead.
const PAST_COURSES = [
  { id: 'p1', code: 'CSC 301', title: 'Operating Systems', units: 3, year: '2024/2025', semester: 'Second', status: 'Completed' },
  { id: 'p2', code: 'CSC 305', title: 'Software Engineering', units: 3, year: '2024/2025', semester: 'Second', status: 'Completed' },
  { id: 'p3', code: 'MTH 201', title: 'Linear Algebra', units: 2, year: '2024/2025', semester: 'First', status: 'Completed' },
];

const STATUS_TONE = {
  Enrolled: 'success',
  'Pending Approval': 'pending',
  'Not Registered': 'neutral',
  Completed: 'brass',
  Rejected: 'danger',
};

// Only courses in these statuses can still be dropped — a standard "add/drop
// period" rule: once a course is Completed (past semester), it's locked.
const DROPPABLE_STATUSES = ['Enrolled', 'Pending Approval'];

function courseColumns({ onDropClick }) {
  return [
    { key: 'code', header: 'Code', render: (r) => <span className="ledger-num">{r.code}</span> },
    { key: 'title', header: 'Title' },
    { key: 'units', header: 'Unit', render: (r) => <span className="ledger-num">{r.units}</span> },
    { key: 'year', header: 'Year', render: (r) => <span className="ledger-num">{r.year}</span> },
    { key: 'semester', header: 'Semester' },
    { key: 'status', header: 'Status', render: (r) => <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge> },
    {
      key: 'action',
      header: '',
      render: (r) => DROPPABLE_STATUSES.includes(r.status) && (
        <Button size="sm" variant="danger" onClick={() => onDropClick(r)}>Drop</Button>
      ),
    },
  ];
}

export default function CourseListing({ courses = [], onRegister, onDrop }) {
  const [tab, setTab] = useState('current');
  const [pendingDrop, setPendingDrop] = useState(null);
  const timeline = [...PAST_COURSES, ...courses];

  const confirmDrop = () => {
    if (pendingDrop) onDrop?.(pendingDrop);
    setPendingDrop(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs
          tabs={[{ key: 'current', label: 'Current Semester' }, { key: 'timeline', label: 'Timeline' }]}
          active={tab}
          onChange={setTab}
        />
        <Button variant="brass" onClick={() => onRegister?.()}>New Registration</Button>
      </div>

      {tab === 'current' ? (
        <Table
          columns={courseColumns({ onDropClick: setPendingDrop })}
          rows={courses}
          emptyMessage="No courses registered this semester yet. Click 'New Registration' to add some."
        />
      ) : (
        <Table columns={courseColumns({ onDropClick: setPendingDrop })} rows={timeline} emptyMessage="No course history yet." />
      )}

      <Modal
        open={!!pendingDrop}
        onClose={() => setPendingDrop(null)}
        title="Drop this course?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingDrop(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDrop}>Drop Course</Button>
          </>
        }
      >
        {pendingDrop && (
          <p>
            You're about to drop <span className="ledger-num font-medium">{pendingDrop.code}</span> — {pendingDrop.title}
            ({pendingDrop.units} units). This will free up units in your current registration and cannot be undone from here.
          </p>
        )}
      </Modal>
    </div>
  );
}
