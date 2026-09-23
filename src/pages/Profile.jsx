"use client";

import { useRef, useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageBanner from '../components/ui/PageBanner';
import { SemesterStatusBadge } from '../components/ui/SemesterGate';

const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary mb-1">{label}</p>
      <p className="text-sm text-text-primary">{value || '—'}</p>
    </div>
  );
}

function computeCompleteness(student) {
  const checks = [
    { label: 'Photo uploaded', done: !!student.photoUrl },
    { label: 'Email on file', done: !!student.email },
    { label: 'Phone on file', done: !!student.phone },
    { label: 'Department on file', done: !!student.department },
    { label: 'Account verified', done: !!student.verified },
  ];
  const doneCount = checks.filter((c) => c.done).length;
  return { checks, percent: Math.round((doneCount / checks.length) * 100) };
}

export default function Profile({ student, semesterStatus = 'registered', onSave }) {
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef(null);
  const { checks, percent } = computeCompleteness(student);

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose an image file (JPG or PNG).');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError('Image is too large — please choose a file under 2MB.');
      return;
    }

    setPhotoError('');
    const reader = new FileReader();
    reader.onload = () => {
      onSave?.({ ...student, photoUrl: reader.result });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-2xl space-y-4">
      <PageBanner eyebrow="Student Record" title="Profile" subtitle="Your personal and academic details on file with the school." bgImage="/profile-bg.jpg" compact />

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">Profile Completeness</p>
            <p className="font-display text-lg font-semibold text-text-primary mt-1">
              {percent === 100 ? 'All set!' : 'Almost there'}
            </p>
          </div>
          <p className="ledger-num text-2xl font-semibold text-forest shrink-0">{percent}%</p>
        </div>
        <div className="h-2 rounded-full bg-surface-raised mt-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-forest transition-all"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Profile completeness"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {checks.map((c) => (
            <Badge key={c.label} tone={c.done ? 'success' : 'neutral'}>{c.label}</Badge>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Student Profile"
          subtitle={student.studentId}
          action={<Badge tone={student.verified ? 'success' : 'pending'}>{student.verified ? 'Verified' : 'Pending Review'}</Badge>}
        />

        <div className="flex items-center gap-4 mb-2">
          {student.photoUrl ? (
            <img
              src={student.photoUrl}
              alt="Profile passport photo"
              className="w-20 h-24 rounded-md border border-border object-cover"
            />
          ) : (
            <div className="w-20 h-24 rounded-md border-2 border-dashed border-border-strong bg-surface-raised flex items-center justify-center text-xs text-text-secondary text-center px-1">
              Passport Photo
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <Button size="sm" variant="outline" type="button" onClick={handlePhotoClick}>
              {student.photoUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>
            <p className="text-xs text-text-secondary mt-1">JPG or PNG, passport-style, max 2MB</p>
          </div>
        </div>
        {photoError && <p className="text-xs text-oxblood mb-4">{photoError}</p>}
        {!photoError && <div className="mb-4" />}

        <div className="flex items-center justify-between mb-5 px-3 py-2 bg-surface-raised rounded-md">
          <span className="text-sm text-text-secondary">Semester Registration — {student.session}</span>
          <SemesterStatusBadge status={semesterStatus} />
        </div>

        <p className="text-xs text-text-secondary mb-3">
          The details below are on file with the school and cannot be edited here. Contact the registrar to request a correction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ReadOnlyField label="Full Name" value={student.name} />
          <ReadOnlyField label="Matriculation Number" value={student.studentId} />
          <ReadOnlyField label="Email" value={student.email} />
          <ReadOnlyField label="Phone" value={student.phone} />
          <ReadOnlyField label="Department" value={student.department} />
          <ReadOnlyField label="Level" value={student.level} />
        </div>
      </Card>
    </div>
  );
}
