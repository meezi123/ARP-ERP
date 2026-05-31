import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Layers } from 'lucide-react';
export default function ItemGroupsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Item Groups" subtitle="Hierarchical item categorization" />
      <EmptyState icon={Layers} title="Item Groups" message="Tree view for item groups is available when connected to your ERPNext instance." />
    </div>
  );
}
