import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Box } from 'lucide-react';
export default function PackingSlipsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Packing Slips" subtitle="Package content documentation" />
      <EmptyState icon={Box} title="Packing Slips" message="Connect to your ERPNext instance to view and manage packing slips." />
    </div>
  );
}
