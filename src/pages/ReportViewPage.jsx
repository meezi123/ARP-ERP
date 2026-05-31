import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { BarChart2 } from 'lucide-react';

export default function ReportViewPage() {
  const { reportName } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(reportName || '');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button className="btn-secondary p-2" onClick={() => navigate('/reports')} aria-label="Back"><ArrowLeft size={16} /></button>
        <PageHeader title={decoded} subtitle="ERPNext report" />
      </div>
      <EmptyState icon={BarChart2} title={decoded} message="Connect to your ERPNext instance to view this report with live data." />
    </div>
  );
}
