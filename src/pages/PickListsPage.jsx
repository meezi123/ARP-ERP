import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { MapPin } from 'lucide-react';
export default function PickListsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Pick Lists" subtitle="Warehouse picking operations" />
      <EmptyState icon={MapPin} title="Pick Lists" message="Connect to your ERPNext instance to view and manage pick lists." />
    </div>
  );
}
