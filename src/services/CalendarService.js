/**
 * CalendarService — persistence layer for academic calendar events.
 *
 * Every function here is the seam between the UI and storage. Right now it
 * reads/writes localStorage, but every function returns/accepts plain
 * objects and nothing outside this file touches `window.localStorage`
 * directly — so swapping this for real API calls (fetch/axios to a backend)
 * later means editing only this file, not any component.
 */

const STORAGE_KEY = 'academic-calendar-events';

const DEFAULT_EVENTS = [
  { id: 'ev1', title: 'Admission Opens', description: 'Portal opens for new student admissions for the 2025/2026 session.', startDate: '2026-01-05', endDate: '2026-01-05', status: 'completed', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev2', title: 'Admission Closes', description: 'Final deadline for submission of admission applications.', startDate: '2026-02-10', endDate: '2026-02-10', status: 'completed', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev3', title: 'Registration Begins', description: 'Returning and new students may begin semester registration.', startDate: '2026-02-16', endDate: '2026-02-16', status: 'completed', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev4', title: 'Registration Ends', description: 'Deadline for semester registration.', startDate: '2026-03-15', endDate: '2026-03-22', status: 'delayed', session: '2025/2026', semester: 'First', notes: 'Extended by one week due to portal downtime.' },
  { id: 'ev5', title: 'Course Registration', description: 'Window for adding/dropping courses for the semester.', startDate: '2026-02-16', endDate: '2026-03-15', status: 'completed', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev8', title: 'Examination Registration', description: 'Students register for the semester examinations.', startDate: '2026-07-20', endDate: '2026-08-05', status: 'active', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev9', title: 'Examination Begins', description: 'First semester examinations commence.', startDate: '2026-08-18', endDate: '2026-08-18', status: 'upcoming', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev10', title: 'Examination Ends', description: 'First semester examinations conclude.', startDate: '2026-08-29', endDate: '2026-08-29', status: 'upcoming', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev11', title: 'Result Processing', description: 'Examination scripts are marked and results computed.', startDate: '2026-09-01', endDate: '2026-09-20', status: 'upcoming', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev12', title: 'Results Released', description: 'Semester results become available on the student portal.', startDate: '2026-09-25', endDate: '2026-09-25', status: 'upcoming', session: '2025/2026', semester: 'First', notes: '' },
  { id: 'ev13', title: 'Graduation Clearance', description: 'Final-year students complete clearance for graduation.', startDate: '2026-10-05', endDate: '2026-10-20', status: 'upcoming', session: '2025/2026', semester: 'Second', notes: '' },
  { id: 'ev14', title: 'Special Late Registration Window', description: 'Additional registration window for edge-case students — cancelled by Senate.', startDate: '2026-03-23', endDate: '2026-03-29', status: 'cancelled', session: '2025/2026', semester: 'First', notes: 'Cancelled following the standard registration extension.' },
];

function generateId() {
  return `ev-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function readRaw() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeRaw(events) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch {
    return false;
  }
}

const CalendarService = {
  /** Returns all events, seeding localStorage with defaults on first run. */
  getEvents() {
    const existing = readRaw();
    if (existing) return existing;
    writeRaw(DEFAULT_EVENTS);
    return DEFAULT_EVENTS;
  },

  /** Overwrites the full event list — used internally by the other methods. */
  saveEvents(events) {
    writeRaw(events);
    return events;
  },

  createEvent(event) {
    const events = CalendarService.getEvents();
    const newEvent = { id: generateId(), notes: '', ...event };
    const updated = [...events, newEvent];
    CalendarService.saveEvents(updated);
    return updated;
  },

  updateEvent(id, patch) {
    const events = CalendarService.getEvents();
    const updated = events.map((e) => (e.id === id ? { ...e, ...patch } : e));
    CalendarService.saveEvents(updated);
    return updated;
  },

  deleteEvent(id) {
    const events = CalendarService.getEvents();
    const updated = events.filter((e) => e.id !== id);
    CalendarService.saveEvents(updated);
    return updated;
  },

  /** Moves the event at `id` up or down one position ('up' | 'down'). */
  reorderEvent(id, direction) {
    const events = CalendarService.getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return events;
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= events.length) return events;
    const updated = [...events];
    [updated[index], updated[swapWith]] = [updated[swapWith], updated[index]];
    CalendarService.saveEvents(updated);
    return updated;
  },
};

export default CalendarService;