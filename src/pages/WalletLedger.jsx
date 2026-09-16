import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import { Wallet } from 'lucide-react';

export default function WalletLedger({ balance = 0, transactions = [], onFund }) {
  const columns = [
    { key: 'datetime', header: 'Date & Time', render: (r) => <span className="ledger-num">{r.datetime}</span> },
    { key: 'desc', header: 'Description' },
    { key: 'amount', header: 'Amount', render: (r) => (
      <span className={`ledger-num font-medium ${r.type === 'credit' ? 'text-forest' : 'text-oxblood'}`}>{r.amount}</span>
    )},
    { key: 'type', header: 'Type', render: (r) => <Badge tone={r.type === 'credit' ? 'success' : 'danger'}>{r.type}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <StatCard label="Wallet Balance" value={`₦${balance.toLocaleString()}`} hint="Available balance" icon={Wallet} tone="forest" />
      <Table columns={columns} rows={transactions} emptyMessage="No transactions yet." />
    </div>
  );
}
