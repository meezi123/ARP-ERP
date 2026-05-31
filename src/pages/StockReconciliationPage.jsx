import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Scale } from 'lucide-react';
export default function StockReconciliationPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Stock Reconciliation" subtitle="Adjust stock to match physical counts" />
      <EmptyState icon={Scale} title="Stock Reconciliation" message="Connect to your ERPNext instance to view and create stock reconciliations." />
    </div>
  );
}
