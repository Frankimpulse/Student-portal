"use client";

import { useState, useMemo } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import CreditUnitTracker, { MAX_UNITS, MIN_UNITS } from '../components/ui/CreditUnitTracker';

const USED_UNITS = 6; // already-confirmed units this semester
const REGISTRATION_DEADLINE = new Date('2026-08-15');
const TODAY = new Date('2026-07-30'); // mock "today" for deterministic demo behaviour

// Maps a student's profile.department (free text) to the internal dept code
// used by the curriculum below. In a real system this would come straight
// from the student's academic record, not be guessed from a label.
const DEPARTMENT_CODES = {
  'Computer Science': 'CSC',
  'Mathematics': 'MTH',
  'Physics': 'PHY',
  'General Studies': 'GST',
};

// The full curriculum for a department/level/semester — every course a
// student at that level is meant to take is listed here, split into
// compulsory (auto-registered) and elective (student chooses) courses.
// This is what a real Nigerian university portal shows on the course
// registration page: your own courses, not a catalog to browse.
const CURRICULUM = {
  CSC: {
    '300': {
      first: [
        { code: 'CSC301', title: 'Operating Systems', units: 3, type: 'compulsory' },
        { code: 'CSC305', title: 'Software Engineering', units: 3, type: 'compulsory' },
        { code: 'CSC311', title: 'Database Systems', units: 3, type: 'elective' },
        { code: 'CSC321', title: 'Computer Networks', units: 2, type: 'elective' },
      ],
    },
    '400': {
      first: [
        { code: 'CSC401', title: 'Cloud Computing', units: 3, type: 'compulsory' },
        { code: 'CSC431', title: 'Human-Computer Interaction', units: 2, type: 'elective' },
      ],
    },
  },
  MTH: {
    '300': {
      first: [
        { code: 'MTH301', title: 'Numerical Analysis', units: 2, type: 'compulsory' },
        { code: 'MTH305', title: 'Real Analysis', units: 3, type: 'elective' },
      ],
    },
  },
  PHY: {
    '200': {
      first: [{ code: 'PHY201', title: 'Classical Mechanics', units: 3, type: 'compulsory' }],
    },
  },
  GST: {
    '300': {
      first: [{ code: 'GST312', title: 'Entrepreneurship Studies', units: 2, type: 'compulsory' }],
    },
  },
};

function getCurriculum(deptCode, levelNumber) {
  return CURRICULUM[deptCode]?.[levelNumber]?.first || [];
}

export default function CourseRegistration({ onSubmit, onDone, profile, registeredCodes = [] }) {
  const [phase, setPhase] = useState('select'); // 'select' | 'review' | 'success'
  const [selectedElectives, setSelectedElectives] = useState([]);
  const [submittedCourses, setSubmittedCourses] = useState([]);

  const deptCode = DEPARTMENT_CODES[profile.department] || 'CSC';
  const levelNumber = (profile.level || '').split(' ')[0] || '300';
  const isLate = TODAY > REGISTRATION_DEADLINE;

  const allCourses = useMemo(
    () => getCurriculum(deptCode, levelNumber).filter((c) => !registeredCodes.includes(c.code)),
    [deptCode, levelNumber, registeredCodes]
  );
  const compulsory = allCourses.filter((c) => c.type === 'compulsory');
  const electives = allCourses.filter((c) => c.type === 'elective');

  const chosen = [...compulsory, ...electives.filter((c) => selectedElectives.includes(c.code))];
  const selectedUnits = chosen.reduce((sum, c) => sum + c.units, 0);
  const total = USED_UNITS + selectedUnits;
  const overLimit = total > MAX_UNITS;
  const canProceed = chosen.length > 0 && !overLimit;

  const toggleElective = (code) => {
    setSelectedElectives((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  };

  const handleConfirm = () => {
    onSubmit?.({ courses: chosen });
    setSubmittedCourses(chosen);
    setPhase('success');
  };

  // ---- Success / printable slip ----
  if (phase === 'success') {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader
          title="Registration Submitted"
          subtitle={`${profile.department} — ${profile.level}, First Semester`}
          action={<Badge tone="success">Pending Approval</Badge>}
        />
        <div className="border border-border rounded-xl divide-y divide-border mb-4">
          {submittedCourses.map((c) => (
            <div key={c.code} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  <span className="ledger-num">{c.code}</span> — {c.title}
                </p>
                <p className="text-xs text-text-secondary">{c.type === 'compulsory' ? 'Compulsory' : 'Elective'}</p>
              </div>
              <span className="ledger-num text-sm text-text-secondary">{c.units} units</span>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-raised">
            <span className="text-sm font-medium text-text-primary">Total Units This Submission</span>
            <span className="ledger-num text-sm font-semibold text-brass">
              {submittedCourses.reduce((s, c) => s + c.units, 0)} units
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-4">
          Your registration is pending course adviser approval. Print or save this slip for your records.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print Registration Slip</Button>
          <Button variant="primary" onClick={() => onDone?.()}>Continue to Course Listing</Button>
        </div>
      </Card>
    );
  }

  // ---- Review step ----
  if (phase === 'review') {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader
          title="Review Your Registration"
          subtitle="Confirm the courses below before submitting"
          action={<Badge tone="brass">2025/2026</Badge>}
        />
        <CreditUnitTracker usedUnits={USED_UNITS} selectedUnits={selectedUnits} />
        <div className="border border-border rounded-xl divide-y divide-border my-4">
          {chosen.map((c) => (
            <div key={c.code} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-text-primary">
                  <span className="ledger-num">{c.code}</span> — {c.title}
                </p>
                <p className="text-xs text-text-secondary">{c.type === 'compulsory' ? 'Compulsory' : 'Elective'}</p>
              </div>
              <span className="ledger-num text-sm text-text-secondary">{c.units} units</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setPhase('select')}>Back to Edit</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirm & Submit</Button>
        </div>
      </Card>
    );
  }

  // ---- Select step ----
  return (
    <Card className="w-full min-h-[calc(100vh-140px)]">
      <CardHeader
        title="Course Registration"
        subtitle={`${profile.department} — ${profile.level}, First Semester, 2025/2026`}
        action={<Badge tone="brass">2025/2026</Badge>}
      />

      <div className="flex items-center justify-between px-4 py-2.5 mb-5 rounded-lg bg-surface-raised text-sm">
        <span className="text-text-secondary">
          Registration Deadline: <span className="ledger-num text-text-primary">Aug 15, 2026</span>
        </span>
        {isLate ? <Badge tone="danger">Late Registration — Fee Applies</Badge> : <Badge tone="success">Registration Open</Badge>}
      </div>

      <CreditUnitTracker usedUnits={USED_UNITS} selectedUnits={selectedUnits} />

      <div className="mt-6 space-y-6">
        {allCourses.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-border rounded-lg text-sm text-text-secondary">
            You've already registered every course available for your level this semester.
          </div>
        ) : (
          <>
            {compulsory.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2">
                  Compulsory Courses <span className="normal-case font-normal">(auto-included)</span>
                </p>
                <div className="border border-border rounded-xl divide-y divide-border">
                  {compulsory.map((c) => (
                    <div key={c.code} className="flex items-center justify-between px-4 py-3.5 bg-surface-raised">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked disabled className="accent-brass w-4 h-4 opacity-70" />
                        <p className="text-sm font-medium text-text-primary">
                          <span className="ledger-num">{c.code}</span> — {c.title}
                        </p>
                      </div>
                      <span className="ledger-num text-sm text-text-secondary">{c.units} units</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {electives.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2">Elective Courses</p>
                <div className="border border-border rounded-xl divide-y divide-border">
                  {electives.map((c) => (
                    <label key={c.code} className="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-surface-raised">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedElectives.includes(c.code)}
                          onChange={() => toggleElective(c.code)}
                          className="accent-brass w-4 h-4"
                        />
                        <p className="text-sm font-medium text-text-primary">
                          <span className="ledger-num">{c.code}</span> — {c.title}
                        </p>
                      </div>
                      <span className="ledger-num text-sm text-text-secondary">{c.units} units</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {overLimit && (
          <p className="text-sm text-oxblood">
            Selected total ({total} units) exceeds the {MAX_UNITS}-unit maximum. Deselect an elective to continue.
          </p>
        )}
        {!overLimit && total < MIN_UNITS && chosen.length > 0 && (
          <p className="text-sm text-amber">Total is below the {MIN_UNITS}-unit minimum for full-time registration.</p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost">Cancel</Button>
          <Button type="button" variant="primary" disabled={!canProceed} onClick={() => setPhase('review')}>
            Review Registration ({chosen.length} course{chosen.length !== 1 ? 's' : ''})
          </Button>
        </div>
      </div>
    </Card>
  );
}