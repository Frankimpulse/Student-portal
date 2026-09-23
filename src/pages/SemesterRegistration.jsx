"use client";

import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Select from '../components/ui/Select';

const FEE_BREAKDOWN = [
  { label: 'Tuition Fee', amount: 12000 },
  { label: 'ICT / E-Portal Fee', amount: 3000 },
  { label: 'Library Fee', amount: 2000 },
  { label: 'Medical & Insurance Fee', amount: 2000 },
  { label: 'Study Center / Facilitation Fee', amount: 1000 },
];
const REGISTRATION_FEE = FEE_BREAKDOWN.reduce((sum, f) => sum + f.amount, 0); // ₦20,000

const PAYMENT_METHODS = [
  { value: 'wallet', label: 'Wallet Balance' },
  { value: 'card', label: 'Debit / Credit Card' },
  { value: 'transfer', label: 'Bank Transfer' },
  { value: 'ussd', label: 'USSD' },
];

export default function SemesterRegistration({
  session,
  semester,
  level,
  walletBalance,
  onSubmit,
  onFundWallet,
  onDone,
  onCancel,
}) {
  const [agreed, setAgreed] = useState(false);
  const [method, setMethod] = useState('wallet');
  const [phase, setPhase] = useState('form'); // 'form' | 'success'

  const isWallet = method === 'wallet';
  const canAffordWallet = walletBalance >= REGISTRATION_FEE;
  const canSubmit = agreed && (!isWallet || canAffordWallet);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    const methodLabel = PAYMENT_METHODS.find((m) => m.value === method)?.label;
    onSubmit?.({ fee: REGISTRATION_FEE, method, methodLabel, paidFromWallet: isWallet });
    setPhase('success');
  };

  if (phase === 'success') {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader
          title="Semester Registration Complete"
          subtitle={`${session} — ${semester} Semester`}
          action={<Badge tone="success">Registered</Badge>}
        />
        <div className="border border-border rounded-xl divide-y divide-border mb-4 text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Student Level</span>
            <span className="ledger-num text-text-primary">{level}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Amount Paid</span>
            <span className="ledger-num text-text-primary">₦{REGISTRATION_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Payment Method</span>
            <span className="text-text-primary">{PAYMENT_METHODS.find((m) => m.value === method)?.label}</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-4">
          You can now proceed to register your courses and register for exams for this semester.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print Confirmation</Button>
          <Button variant="primary" onClick={() => onDone?.()}>Continue</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader
        title="Semester Registration"
        subtitle="Complete this step to unlock course and exam registration"
        action={<Badge tone="brass">{session}</Badge>}
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-2">Fee Breakdown</p>
          <div className="border border-border rounded-xl divide-y divide-border text-sm">
            {FEE_BREAKDOWN.map((f) => (
              <div key={f.label} className="flex justify-between px-4 py-2.5">
                <span className="text-text-secondary">{f.label}</span>
                <span className="ledger-num text-text-primary">₦{f.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-3 bg-surface-raised">
              <span className="font-medium text-text-primary">Total</span>
              <span className="ledger-num font-semibold text-brass">₦{REGISTRATION_FEE.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Select
          label="Payment Method"
          name="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={PAYMENT_METHODS}
        />

        {isWallet && (
          <div className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-surface-raised text-sm">
            <span className="text-text-secondary">Wallet Balance</span>
            <span className={`ledger-num font-medium ${canAffordWallet ? 'text-forest' : 'text-oxblood'}`}>₦{walletBalance.toLocaleString()}</span>
          </div>
        )}

        {isWallet && !canAffordWallet && (
          <div className="text-sm text-oxblood flex items-center justify-between gap-2 flex-wrap">
            <span>Insufficient wallet balance to cover this fee.</span>
            <Button type="button" size="sm" variant="brass" onClick={onFundWallet}>Fund Wallet</Button>
          </div>
        )}

        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-brass w-4 h-4 mt-0.5"
          />
          <span className="text-text-secondary">
            I confirm the details above are correct and authorize this payment for {session}, {semester} Semester.
          </span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={!canSubmit}>Submit Semester Registration</Button>
        </div>
      </form>
    </Card>
  );
}
