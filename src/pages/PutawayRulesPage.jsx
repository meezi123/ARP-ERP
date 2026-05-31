import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Zap } from 'lucide-react';
export default function PutawayRulesPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Putaway Rules" subtitle="Automatic warehouse assignment for incoming goods" />
      <EmptyState icon={Zap} title="Putaway Rules" message="Connect to your ERPNext instance to view and manage putaway rules." />
    </div>
  );
}
