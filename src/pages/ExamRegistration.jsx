"use client";

import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function ExamRegistration({ onSubmit, onDone, registeredCourses = [], examEligible = true }) {
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(null);

  const toggle = (code) => setSelected((prev) => (prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected.length) return;
    const registered = registeredCourses
      .filter((c) => selected.includes(c.code))
      .map((c) => ({ code: c.code, title: c.title }));
    onSubmit?.({ courses: registered });
    setConfirmed(registered);
  };

  if (!examEligible) {
    return (
      <Card className="max-w-lg mx-auto text-center py-10">
        <CardHeader title="Not Eligible for Exams" subtitle="Outstanding requirement" action={<Badge tone="danger">Not Cleared</Badge>} />
        <p className="text-sm text-text-secondary">
          You must clear outstanding fees and complete course registration before registering for exams. Visit the Wallet section to settle any balance.
        </p>
      </Card>
    );
  }

  if (confirmed) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader title="Exam Registration Confirmed" subtitle="Confirmation" action={<Badge tone="success">Registered</Badge>} />
        <div className="border border-border rounded-xl divide-y divide-border mb-4">
          {confirmed.map((c) => (
            <div key={c.code} className="px-4 py-3">
              <p className="text-sm font-medium text-text-primary"><span className="ledger-num">{c.code}</span> — {c.title}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-secondary mb-4">
          Exam dates, times and venues will be published on the Exam Schedule page (under Schedules) closer to the exam period.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print Exam Registration Slip</Button>
          <Button variant="primary" onClick={() => onDone?.()}>Continue to Exam Listing</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg">
      <CardHeader
        title="Exam Registration"
        subtitle="Select the courses you wish to register for examinations"
        action={<Badge tone="success">Cleared</Badge>}
      />
      <form className="space-y-4" onSubmit={handleSubmit}>
        {registeredCourses.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-xl text-sm text-text-secondary">
            Nothing to register — either you've already registered for all your exams, or you haven't registered any courses eyet.
          </div>
        ) : (
          <div className="border border-border rounded-xl divide-y divide-border">
            {registeredCourses.map((c) => (
              <label key={c.code} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-raised">
                <input
                  type="checkbox"
                  checked={selected.includes(c.code)}
                  onChange={() => toggle(c.code)}
                  className="accent-brass w-4 h-4"
                />
                <p className="text-sm text-text-primary"><span className="ledger-num font-medium">{c.code}</span> — {c.title}</p>
              </label>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="submit" variant="primary" disabled={selected.length === 0}>
            Register {selected.length || ''} Course{selected.length !== 1 ? 's' : ''} for Exams
          </Button>
        </div>
      </form>
    </Card>
  );
}