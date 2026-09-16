import TimelineItem from './TimelineItem';
import EmptyState from '../ui/EmptyState';

export default function AcademicTimeline({ events, isAdmin, onEdit, onDelete, onMove }) {
  if (events.length === 0) {
    return <EmptyState title="No events match your filters" description="Try adjusting or clearing the filters above." />;
  }

  return (
    <ol className="relative" aria-label="Academic calendar timeline">
      {events.map((event, i) => (
        <TimelineItem
          key={event.id}
          event={event}
          isFirst={i === 0}
          isLast={i === events.length - 1}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </ol>
  );
}
