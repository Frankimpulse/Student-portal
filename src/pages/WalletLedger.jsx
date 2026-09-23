"use client";

import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Wallet, Plus } from 'lucide-react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import PageBanner from '../components/ui/PageBanner';
import WalletFunding from './WalletFunding';

export default function WalletLedger({ balance = 0, transactions = [], onFund }) {
  const [fundOpen, setFundOpen] = useState(false);
  const credited = transactions.filter((t) => t.type === 'credit').length;
  const debited = transactions.filter((t) => t.type === 'debit').length;

  const columns = [
    {
      key: 'desc',
      header: 'Transaction',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${r.type === 'credit' ? 'bg-forest text-text-on-ink' : 'bg-oxblood text-text-on-ink'}`}>
            {r.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
          </div>
          <div>
            <p className="text-text-primary">{r.desc}</p>
            <p className="ledger-num text-xs text-text-secondary mt-0.5">{r.datetime}</p>
          </div>
        </div>
      ),
    },
    { key: 'amount', header: 'Amount', render: (r) => (
      <span className={`ledger-num font-medium ${r.type === 'credit' ? 'text-forest' : 'text-oxblood'}`}>{r.amount}</span>
    )},
    { key: 'type', header: 'Type', render: (r) => <Badge tone={r.type === 'credit' ? 'success' : 'danger'}>{r.type}</Badge> },
  ];

  const handleFundSubmit = (payload) => {
    onFund?.(payload);
    setFundOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageBanner eyebrow="Student Finance" title="Wallet" subtitle="Fund your wallet and review your transaction history." bgImage="/wallet-bg.jpg" compact />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Wallet Balance" value={`₦${balance.toLocaleString()}`} hint="Available balance" icon={Wallet} tone="forest" />
        <StatCard label="Credits" value={String(credited)} hint="Money in" icon={ArrowDownLeft} tone="forest" />
        <StatCard label="Debits" value={String(debited)} hint="Money out" icon={ArrowUpRight} tone="oxblood" />
      </div>

      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold text-text-primary">Transaction History</p>
        <Button variant="brass" icon={Plus} onClick={() => setFundOpen(true)}>Fund Wallet</Button>
      </div>

      <Table columns={columns} rows={transactions} emptyMessage="No transactions yet." />

      <Modal open={fundOpen} onClose={() => setFundOpen(false)} title="Fund Wallet">
        <WalletFunding onSubmit={handleFundSubmit} />
      </Modal>
    </div>
  );
}
