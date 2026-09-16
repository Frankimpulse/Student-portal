"use client";

import { useState } from 'react';
import Card, { CardHeader } from './Card';
import Badge from './Badge';
import Button from './Button';
import SemesterRegistration from '../../pages/SemesterRegistration';

export function SemesterStatusBadge({ status }) {
  const tone = { registered: 'success', pending: 'pending', not_registered: 'neutral' }[status];
  const label = { registered: 'Semester Registered', pending: 'Pending Approval', not_registered: 'Not Registered' }[status];
  return <Badge tone={tone}>{label}</Badge>;
}

/**
 * SemesterGate — wraps Course/Exam sections. If the student hasn't registered
 * for the current semester yet, shows a lock screen, then an inline
 * SemesterRegistration form (a real form + fee check, not an instant toggle)
 * before finally rendering the wrapped children.
 */
export default function SemesterGate({
  status,
  session,
  semester,
  level = '300 Level',
  walletBalance,
  onRegisterComplete,
  onFundWallet,
  children,
}) {
  const [showForm, setShowForm] = useState(false);

  if (status === 'registered') return children;

  if (showForm) {
    return (
      <SemesterRegistration
        session={session}
        semester={semester}
        level={level}
        walletBalance={walletBalance}
        onSubmit={onRegisterComplete}
        onFundWallet={onFundWallet}
        onDone={() => setShowForm(false)}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <Card className="max-w-lg mx-auto text-center py-10">
      <CardHeader
        title="Semester Registration Required"
        subtitle={`${session} — ${semester} Semester`}
        action={<SemesterStatusBadge status={status} />}
      />
      <p className="text-sm text-text-secondary mb-6">
        You must complete semester registration before you can register courses or exams.
      </p>
      <Button variant="brass" onClick={() => setShowForm(true)}>
        {status === 'pending' ? 'Awaiting Approval' : 'Register for Semester'}
      </Button>
    </Card>
  );
}