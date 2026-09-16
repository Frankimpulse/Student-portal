import Card from './Card';

const MAX_UNITS = 24;
const MIN_UNITS = 12;

/**
 * CreditUnitTracker — live validation strip shown during course registration.
 * usedUnits: units already registered/confirmed this semester (locked in)
 * selectedUnits: units currently checked/selected in the registration form (not yet submitted)
 */
export default function CreditUnitTracker({ usedUnits = 0, selectedUnits = 0 }) {
  const total = usedUnits + selectedUnits;
  const available = Math.max(MAX_UNITS - usedUnits, 0);
  const overLimit = total > MAX_UNITS;
  const underMin = total < MIN_UNITS;

  return (
    <Card className={overLimit ? 'border-oxblood' : 'border-border'}>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">Used</p>
          <p className="ledger-num text-xl font-semibold text-ink mt-1">{usedUnits}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">Selected</p>
          <p className="ledger-num text-xl font-semibold text-brass mt-1">{selectedUnits}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">Available</p>
          <p className={`ledger-num text-xl font-semibold mt-1 ${overLimit ? 'text-oxblood' : 'text-forest'}`}>
            {Math.max(available - selectedUnits, 0)}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          Total: <span className="ledger-num font-medium text-text-primary">{total}</span> / {MAX_UNITS} units
        </span>
        {overLimit && <span className="text-oxblood font-medium">Exceeds max — remove a course</span>}
        {!overLimit && underMin && <span className="text-amber font-medium">Below minimum ({MIN_UNITS} units)</span>}
        {!overLimit && !underMin && <span className="text-forest font-medium">Within limits</span>}
      </div>
    </Card>
  );
}

export { MAX_UNITS, MIN_UNITS };
