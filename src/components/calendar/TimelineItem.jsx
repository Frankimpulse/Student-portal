"use client";

import { useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, Pencil, Trash2, GraduationCap, ClipboardList, FileText, FileCheck, Award } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Button from '../ui/Button';

const DOT_TONE = {
  upcoming: 'bg-border-strong',
  active: 'bg-brass',
  completed: 'bg-forest',
  delayed: 'bg-amber',
  cancelled: 'bg-oxblood',
};

function iconFor(title) {
  const t = title.toLowerCase();
  if (t.includes('admission') || t.includes('graduation')) return GraduationCap;
  if (t.includes('registration')) return ClipboardList;
  if (t.includes('tma')) return FileText;
  if (t.includes('exam')) return FileCheck;
  if (t.includes('result')) return Award;
  return ClipboardList;
}

function formatRange(start, end) {
  return start === end ? start : `${start} – ${end}`;
}

export default function TimelineItem({ event, isFirst, isLast, isAdmin, onEdit, onDelete, onMove }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconFor(event.title);

  return (
    <li className="relative pl-12">
      {/* Connecting line */}
      {!isLast && <span className="absolute left-[19px] top-10 bottom-0 w-px bg-border" aria-hidden="true" />}
      {/* Dot + icon */}
      <span
        className={`absolute left-0 top-0.5 w-10 h-10 rounded-full flex items-center justify-center text-white ${DOT_TONE[event.effectiveStatus]}`}
        aria-hidden="true"
      >
        <Icon size={18} />
      </span>

      <div className="pb-8">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="w-full flex items-start justify-between gap-3 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-semibold text-text-primary">{event.title}</h4>
              <StatusBadge status={event.effectiveStatus} />
            </div>
            <p className="ledger-num text-xs text-text-secondary mt-1">{formatRange(event.startDate, event.endDate)}</p>
          </div>
          <ChevronDown size={18} className={`text-text-secondary shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Per-event progress bar */}
        <div className="h-1.5 rounded-full bg-surface-raised mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full ${DOT_TONE[event.effectiveStatus]}`}
            style={{ width: `${event.progress}%` }}
            role="progressbar"
            aria-valuenow={event.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${event.title} progress`}
          />
        </div>

        {expanded && (
          <div className="mt-3 text-sm text-text-secondary space-y-2">
            <p>{event.description}</p>
            {event.notes && <p className="italic">Note: {event.notes}</p>}
            <p className="text-xs">Session {event.session} · {event.semester} Semester</p>

            {isAdmin && (
              <div className="flex flex-wrap gap-2 pt-2">
                <Button size="sm" variant="outline" icon={Pencil} onClick={() => onEdit(event)}>Edit</Button>
                <Button size="sm" variant="danger" icon={Trash2} onClick={() => onDelete(event)}>Delete</Button>
                <Button size="sm" variant="ghost" icon={ArrowUp} disabled={isFirst} onClick={() => onMove(event.id, 'up')}>Move Up</Button>
                <Button size="sm" variant="ghost" icon={ArrowDown} disabled={isLast} onClick={() => onMove(event.id, 'down')}>Move Down</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
