import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Ruler } from 'lucide-react';
export default function UOMPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Units of Measure" subtitle="Manage UOMs and conversion factors" />
      <EmptyState icon={Ruler} title="UOM List" message="Connect to your ERPNext instance to view and manage units of measure." />
    </div>
  );
}
