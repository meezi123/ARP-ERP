import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { Lock } from 'lucide-react';
export default function StockReservationPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Stock Reservation" subtitle="Reserve inventory for sales orders" />
      <EmptyState icon={Lock} title="Stock Reservations" message="Connect to your ERPNext instance to view and manage stock reservations." />
    </div>
  );
}
