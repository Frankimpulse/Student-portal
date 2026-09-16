"use client";

import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const FAQS = [
  { q: 'How do I register for a semester?', a: 'Go to Course Registration or Exam Registration — you\'ll be prompted to register for the semester first if you haven\'t already.' },
  { q: 'How many units can I register?', a: 'Between 12 and 24 units per semester. The registration page shows your live totals as you select courses.' },
  { q: 'How do I fund my wallet?', a: 'Go to Wallet / Ledger → Fund Wallet, enter an amount and choose a payment method.' },
];

export default function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Help"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-ink text-text-on-ink shadow-lg flex items-center justify-center text-lg font-display hover:bg-ink-soft transition-colors z-40"
      >
        ?
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Help & FAQs" footer={<Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>}>
        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <div key={i}>
              <p className="font-medium text-text-primary">{item.q}</p>
              <p className="text-text-secondary mt-1">{item.a}</p>
            </div>
          ))}
          <p className="text-text-secondary pt-2 border-t border-border">
            Still stuck? Contact the registrar at <span className="ledger-num">registry@uni.edu.ng</span>.
          </p>
        </div>
      </Modal>
    </>
  );
}
