"use client";

import { useState } from 'react';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const REGISTRATION_FEE = 20000;

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
  const [phase, setPhase] = useState('form'); // 'form' | 'success'

  const canAfford = walletBalance >= REGISTRATION_FEE;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed || !canAfford) return;
    onSubmit?.({ fee: REGISTRATION_FEE });
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
            <span className="text-text-secondary">Registration Fee Paid</span>
            <span className="ledger-num text-text-primary">₦{REGISTRATION_FEE.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-4">
          You can now proceed to register your courses and book exam slots for this semester.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print Confirmation</Button>
          <Button variant="primary" onClick={() => onDone?.()}>Continue</Button>
        </div>
      </Card>
    );
  }

  if (!canAfford) {
    return (
      <Card className="max-w-lg mx-auto text-center py-10">
        <CardHeader title="Insufficient Wallet Balance" subtitle="Registration fee required" action={<Badge tone="danger">₦{REGISTRATION_FEE.toLocaleString()} Required</Badge>} />
        <p className="text-sm text-text-secondary mb-4">
          Semester registration requires a fee of <span className="ledger-num">₦{REGISTRATION_FEE.toLocaleString()}</span>.
          Your current wallet balance is <span className="ledger-num">₦{walletBalance.toLocaleString()}</span> — please fund your wallet before continuing.
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="ghost" onClick={onCancel}>Back</Button>
          <Button variant="brass" onClick={onFundWallet}>Fund Wallet</Button>
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="border border-border rounded-xl divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Academic Session</span>
            <span className="ledger-num text-text-primary">{session}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Semester</span>
            <span className="text-text-primary">{semester}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Level</span>
            <span className="ledger-num text-text-primary">{level}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Registration Fee</span>
            <span className="ledger-num text-text-primary">₦{REGISTRATION_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-text-secondary">Wallet Balance</span>
            <span className="ledger-num text-forest">₦{walletBalance.toLocaleString()}</span>
          </div>
        </div>

        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="accent-brass w-4 h-4 mt-0.5"
          />
          <span className="text-text-secondary">
            I confirm that the details above are correct and I authorize deduction of the registration fee from my wallet for {session}, {semester} Semester.
          </span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={!agreed}>Submit Semester Registration</Button>
        </div>
      </form>
    </Card>
  );
}