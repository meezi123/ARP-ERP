import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Tag } from 'lucide-react';
export default function PriceListsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Price Lists" subtitle="Buying and selling price lists" />
      <EmptyState icon={Tag} title="Price Lists" message="Connect to your ERPNext instance to view and manage price lists." />
    </div>
  );
}
