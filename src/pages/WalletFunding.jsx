"use client";

import { useState } from 'react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

const METHOD_LABELS = {
  card: 'Debit / Credit Card',
  transfer: 'Bank Transfer',
  ussd: 'USSD',
};

/** The Fund Wallet form — lives only inside the WalletLedger modal now, not as its own page. */
export default function WalletFunding({ onSubmit }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('card');

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const numericAmount = Number(amount);
        if (numericAmount > 0) {
          onSubmit?.({ amount: numericAmount, method, methodLabel: METHOD_LABELS[method] });
          setAmount('');
        }
      }}
    >
      <Input
        label="Amount (₦)"
        name="amount"
        type="number"
        min="100"
        placeholder="e.g. 5000"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Select
        label="Payment Method"
        name="method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: 'card', label: 'Debit / Credit Card' },
          { value: 'transfer', label: 'Bank Transfer' },
          { value: 'ussd', label: 'USSD' },
        ]}
      />
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" variant="brass">Proceed to Pay</Button>
      </div>
    </form>
  );
}
