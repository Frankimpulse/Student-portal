import { Inbox } from 'lucide-react';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-14 px-6 border-2 border-dashed border-border rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-surface-raised border border-border flex items-center justify-center mx-auto mb-3 text-text-secondary">
        <Inbox size={20} />
      </div>
      <h4 className="font-display text-lg text-text-primary">{title}</h4>
      {description && <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
