import Badge from '../ui/Badge';

const STATUS_CONFIG = {
  upcoming: { tone: 'neutral', label: 'Upcoming' },
  active: { tone: 'brass', label: 'Active' },
  completed: { tone: 'success', label: 'Completed' },
  delayed: { tone: 'pending', label: 'Delayed' },
  cancelled: { tone: 'danger', label: 'Cancelled' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.upcoming;
  return <Badge tone={config.tone}>{config.label}</Badge>;
}

export { STATUS_CONFIG };
