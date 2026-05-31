import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import useApiQuery from '../../hooks/useApiQuery';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import EmptyState from '../../components/ui/EmptyState';
import StatusBadge from '../../components/ui/StatusBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { submitStockEntry, cancelStockEntry } from './stockEntries.api';
import { fadeInUp, staggerContainer } from '../../animations';

const statusLabel = (v) => v === 1 ? 'Submitted' : v === 2 ? 'Cancelled' : 'Draft';

export default function StockEntryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const { data, loading, error, refetch } = useApiQuery(`/api/resource/Stock Entry/${encodeURIComponent(name)}`);
  const entry = data?.data;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitStockEntry(name);
      toast.success('Stock Entry submitted');
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Submit failed');
    }
    setSubmitting(false);
  };

  const handleCancel = async () => {
    setCancelling(true);
    try {
      await cancelStockEntry(name);
      toast.success('Stock Entry cancelled');
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Cancel failed');
    }
    setCancelling(false);
  };

  if (loading) return <LoadingSkeleton rows={6} cols={3} />;
  if (error || !entry) return <EmptyState title="Entry not found" message={error} onRetry={refetch} />;

  const status = statusLabel(entry.docstatus);

  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
        <button className="btn-secondary p-2" onClick={() => navigate('/stock-entries')} aria-label="Back"><ArrowLeft size={16} /></button>
        <div className="flex-1">
          <h1 className="display-heading" style={{ fontSize: '22px' }}>{entry.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={status} />
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{entry.stock_entry_type}</span>
          </div>
        </div>
        {entry.docstatus === 0 && (
          <button className="btn-primary" onClick={() => setConfirmDialog('submit')} disabled={submitting}>
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
            Submit
          </button>
        )}
        {entry.docstatus === 1 && (
          <button className="btn-secondary" onClick={() => setConfirmDialog('cancel')} disabled={cancelling}
            style={{ color: 'var(--color-sys-error)' }}>
            {cancelling ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
            Cancel
          </button>
        )}
      </motion.div>

      <motion.div className="glass-card p-6" variants={fadeInUp}>
        <h3 className="section-heading mb-5">Entry Details</h3>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {[
            ['Posting Date', entry.posting_date ? format(new Date(entry.posting_date), 'MMM d, yyyy') : '—', true],
            ['From Warehouse', entry.from_warehouse],
            ['To Warehouse', entry.to_warehouse],
            ['Total Amount', entry.total_amount ? parseFloat(entry.total_amount).toLocaleString('en', { minimumFractionDigits: 2 }) : '—', true],
          ].map(([label, value, mono]) => (
            <div key={label}>
              <p className="label-caps mb-1">{label}</p>
              <p className={mono ? 'mono-data' : ''} style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>{value ?? '—'}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {entry.items?.length > 0 && (
        <motion.div className="glass-card p-6" variants={fadeInUp}>
          <h3 className="section-heading mb-4">Items</h3>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Item Code</th><th>Qty</th><th>UOM</th><th>From</th><th>To</th><th>Rate</th><th>Amount</th></tr></thead>
              <tbody>
                {entry.items.map((item, i) => (
                  <tr key={i}>
                    <td className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{item.item_code}</td>
                    <td className="mono-data">{item.qty}</td>
                    <td>{item.uom}</td>
                    <td style={{ fontSize: '12px' }}>{item.s_warehouse || '—'}</td>
                    <td style={{ fontSize: '12px' }}>{item.t_warehouse || '—'}</td>
                    <td className="mono-data">{item.basic_rate ? parseFloat(item.basic_rate).toFixed(2) : '—'}</td>
                    <td className="mono-data">{item.amount ? parseFloat(item.amount).toLocaleString('en', { minimumFractionDigits: 2 }) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <ConfirmDialog
        open={confirmDialog === 'submit'}
        onClose={() => setConfirmDialog(null)}
        onConfirm={handleSubmit}
        title="Submit Stock Entry"
        message="This will post the stock movements and update bin balances. Proceed?"
        confirmLabel="Submit"
      />
      <ConfirmDialog
        open={confirmDialog === 'cancel'}
        onClose={() => setConfirmDialog(null)}
        onConfirm={handleCancel}
        title="Cancel Stock Entry"
        message="This will reverse the stock movements. Are you sure?"
        confirmLabel="Cancel Entry"
        danger
      />
    </motion.div>
  );
}
