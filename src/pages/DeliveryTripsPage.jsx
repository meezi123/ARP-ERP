import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Route } from 'lucide-react';
export default function DeliveryTripsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Delivery Trips" subtitle="Driver routes and delivery schedules" />
      <EmptyState icon={Route} title="Delivery Trips" message="Connect to your ERPNext instance to view delivery trips." />
    </div>
  );
}
