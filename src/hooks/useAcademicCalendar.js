"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import CalendarService from '../services/CalendarService';

// Mock "today" for deterministic demo behaviour — see CourseRegistration.jsx
// for the same pattern and reasoning.
const TODAY = new Date('2026-07-30');

function daysBetween(a, b) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/** Recomputes an event's status relative to TODAY, unless it's been manually
 * set to 'delayed' or 'cancelled' (those are administrative overrides that
 * shouldn't be silently reverted by the date math). */
function effectiveStatus(event) {
  if (event.status === 'delayed' || event.status === 'cancelled' || event.status === 'completed') {
    return event.status;
  }
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (TODAY < start) return 'upcoming';
  if (TODAY > end) return 'completed';
  return 'active';
}

/** Per-event completion percentage — used for the small progress bar. */
function eventProgress(event) {
  const status = effectiveStatus(event);
  if (status === 'completed') return 100;
  if (status === 'cancelled') return 0;
  if (status === 'upcoming') return 0;
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const total = Math.max(end.getTime() - start.getTime(), 1);
  const elapsed = Math.min(Math.max(TODAY.getTime() - start.getTime(), 0), total);
  return Math.round((elapsed / total) * 100);
}

export default function useAcademicCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage only after mount — localStorage doesn't exist
  // during server rendering, and reading it during the initial render would
  // cause the same hydration mismatch we hit with ThemeProvider earlier.
  useEffect(() => {
    setEvents(CalendarService.getEvents());
    setLoading(false);
  }, []);

  const addEvent = useCallback((event) => {
    setEvents(CalendarService.createEvent(event));
  }, []);

  const updateEvent = useCallback((id, patch) => {
    setEvents(CalendarService.updateEvent(id, patch));
  }, []);

  const deleteEvent = useCallback((id) => {
    setEvents(CalendarService.deleteEvent(id));
  }, []);

  const reorderEvent = useCallback((id, direction) => {
    setEvents(CalendarService.reorderEvent(id, direction));
  }, []);

  // Events annotated with their date-derived status + progress, in a stable
  // chronological-by-storage-order (reordering is manual, via reorderEvent).
  const annotatedEvents = useMemo(
    () => events.map((e) => ({ ...e, effectiveStatus: effectiveStatus(e), progress: eventProgress(e) })),
    [events]
  );

  const stats = useMemo(() => {
    const total = annotatedEvents.length;
    const completed = annotatedEvents.filter((e) => e.effectiveStatus === 'completed').length;
    const cancelled = annotatedEvents.filter((e) => e.effectiveStatus === 'cancelled').length;
    const remaining = total - completed - cancelled;
    const overallProgress = total > 0 ? Math.round((completed / (total - cancelled || 1)) * 100) : 0;

    const active = annotatedEvents.find((e) => e.effectiveStatus === 'active');
    const upcoming = annotatedEvents
      .filter((e) => e.effectiveStatus === 'upcoming')
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    const nextEvent = upcoming[0] || null;
    const daysUntilNext = nextEvent ? daysBetween(TODAY, new Date(nextEvent.startDate)) : null;

    return {
      total,
      completed,
      remaining,
      cancelled,
      overallProgress,
      currentPhase: active ? active.title : nextEvent ? `Awaiting ${nextEvent.title}` : 'Session Complete',
      nextEvent,
      daysUntilNext,
    };
  }, [annotatedEvents]);

  return { events: annotatedEvents, loading, stats, addEvent, updateEvent, deleteEvent, reorderEvent, today: TODAY };
}
