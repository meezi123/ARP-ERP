import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { DollarSign } from 'lucide-react';
export default function LandedCostPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Landed Cost Vouchers" subtitle="Distribute additional costs to purchase receipts" />
      <EmptyState icon={DollarSign} title="Landed Cost" message="Connect to your ERPNext instance to view landed cost vouchers." />
    </div>
  );
}
