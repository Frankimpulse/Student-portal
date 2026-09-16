"use client";

import { useRef, useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
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

export default function Profile({ student, semesterStatus = 'registered', onSave }) {
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef(null);

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
    <Card className="max-w-2xl">
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
        The details below are on file with the school and cannot be edited here. Go to your study center to request a correction.
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
  );
}