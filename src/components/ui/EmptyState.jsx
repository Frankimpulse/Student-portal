export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-14 px-6 border border-dashed border-border rounded-lg">
      <h4 className="font-display text-lg text-text-primary">{title}</h4>
      {description && <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
