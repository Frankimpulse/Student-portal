"use client";

import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const SEMESTER_OPTIONS = [
  { value: 'First', label: 'First' },
  { value: 'Second', label: 'Second' },
];

const BLANK_EVENT = {
  title: '', description: '', startDate: '', endDate: '',
  status: 'upcoming', session: '2025/2026', semester: 'First', notes: '',
};

export default function EventModal({ open, event, onClose, onSave }) {
  const [form, setForm] = useState(BLANK_EVENT);
  const [error, setError] = useState('');

  // Reset the form whenever a different event is opened (or the modal opens for "add new")
  useEffect(() => {
    if (open) {
      setForm(event ? { ...event } : BLANK_EVENT);
      setError('');
    }
  }, [open, event]);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.title.trim()) return setError('Title is required.');
    if (!form.startDate || !form.endDate) return setError('Start and end dates are required.');
    if (new Date(form.endDate) < new Date(form.startDate)) return setError('End date cannot be before start date.');
    onSave(form);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={event ? 'Edit Event' : 'Add Event'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{event ? 'Save Changes' : 'Add Event'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && <p className="text-sm text-oxblood">{error}</p>}
        <Input label="Title" name="title" value={form.title} onChange={update('title')} />
        <Input label="Description" name="description" value={form.description} onChange={update('description')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Start Date" name="startDate" type="date" value={form.startDate} onChange={update('startDate')} />
          <Input label="End Date" name="endDate" type="date" value={form.endDate} onChange={update('endDate')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select label="Status" name="status" value={form.status} onChange={update('status')} options={STATUS_OPTIONS} />
          <Select label="Semester" name="semester" value={form.semester} onChange={update('semester')} options={SEMESTER_OPTIONS} />
        </div>
        <Input label="Session" name="session" value={form.session} onChange={update('session')} hint="e.g. 2025/2026" />
        <Input label="Notes" name="notes" value={form.notes} onChange={update('notes')} hint="Optional — visible when the event is expanded" />
      </div>
    </Modal>
  );
}
