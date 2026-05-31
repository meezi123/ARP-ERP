import { useEffect, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations';
import { format } from 'date-fns';
import api from '../../api/axiosInstance';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';

export default function RecentMovements() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/resource/Stock Entry', {
          params: {
            fields: JSON.stringify(['name', 'stock_entry_type', 'posting_date', 'docstatus', 'owner']),
            order_by: 'creation desc',
            limit: 8,
          }
        });
        setEntries(res.data?.data || []);
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  const statusLabel = (docstatus) => {
    if (docstatus === 0) return 'Draft';
    if (docstatus === 1) return 'Submitted';
    return 'Cancelled';
  };

  if (loading) return <LoadingSkeleton rows={4} cols={3} />;

  return (
    <motion.div className="glass-card p-6" variants={fadeInUp} initial="hidden" animate="visible">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-heading flex items-center gap-2">
          <ArrowLeftRight size={18} style={{ color: 'var(--color-text-brand)' }} />
          Recent Movements
        </h3>
        <button className="btn-secondary py-1 px-3" style={{ fontSize: '12px' }} onClick={() => navigate('/stock-entries')}>
          View all
        </button>
      </div>
      <div className="space-y-2">
        {entries.map(e => (
          <div
            key={e.name}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer"
            style={{ background: 'var(--glass-bg-light)', border: 'var(--glass-border-stroke)', transition: 'background 0.15s ease' }}
            onClick={() => navigate(`/stock-entries/${e.name}`)}
          >
            <div>
              <p className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{e.name}</p>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{e.stock_entry_type}</p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {e.posting_date ? format(new Date(e.posting_date), 'MMM d') : '—'}
              </span>
              <StatusBadge status={statusLabel(e.docstatus)} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
