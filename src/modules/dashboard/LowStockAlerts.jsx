import { useEffect, useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations';
import api from '../../api/axiosInstance';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { useNavigate } from 'react-router-dom';

export default function LowStockAlerts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/resource/Bin', {
          params: {
            fields: JSON.stringify(['item_code', 'warehouse', 'actual_qty', 'projected_qty']),
            filters: JSON.stringify([['actual_qty', '<=', 0]]),
            limit: 8,
            order_by: 'actual_qty asc',
          }
        });
        setItems(res.data?.data || []);
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingSkeleton rows={4} cols={3} />;

  return (
    <motion.div className="glass-card p-6" variants={fadeInUp} initial="hidden" animate="visible">
      <div className="flex items-center justify-between mb-4">
        <h3 className="section-heading flex items-center gap-2">
          <AlertTriangle size={18} style={{ color: 'var(--color-sys-warning)' }} />
          Low Stock Alerts
        </h3>
        <span className="badge badge-warning">{items.length} items</span>
      </div>
      {items.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>All items are stocked</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => (
            <div key={`${item.item_code}-${item.warehouse}`}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg"
              style={{ background: 'var(--glass-bg-light)', border: 'var(--glass-border-stroke)' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.item_code}</p>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{item.warehouse}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="mono-data" style={{ fontSize: '13px', color: item.actual_qty <= 0 ? 'var(--color-sys-error)' : 'var(--color-sys-warning)' }}>
                  {item.actual_qty}
                </span>
                <button
                  className="btn-primary py-1 px-2 text-xs"
                  style={{ fontSize: '11px', padding: '4px 10px' }}
                  onClick={() => navigate('/material-requests')}
                  aria-label="Create material request"
                >
                  <Plus size={11} /> MR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
