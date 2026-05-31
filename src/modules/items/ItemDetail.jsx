import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useApiQuery from '../../hooks/useApiQuery';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import EmptyState from '../../components/ui/EmptyState';
import Drawer from '../../components/ui/Drawer';
import ItemForm from './ItemForm';
import { fadeInUp, staggerContainer } from '../../animations';

export default function ItemDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const { data, loading, error, refetch } = useApiQuery(`/api/resource/Item/${encodeURIComponent(name)}`);
  const item = data?.data;

  if (loading) return <LoadingSkeleton rows={8} cols={3} />;
  if (error || !item) return <EmptyState title="Item not found" message={error} onRetry={refetch} />;

  const fields = [
    ['Item Code', item.item_code, true],
    ['Item Name', item.item_name],
    ['Item Group', item.item_group],
    ['Stock UOM', item.stock_uom],
    ['Valuation Method', item.valuation_method],
    ['Standard Rate', item.standard_rate ? `${parseFloat(item.standard_rate).toLocaleString('en', { minimumFractionDigits: 2 })}` : '—', true],
    ['Valuation Rate', item.valuation_rate ? `${parseFloat(item.valuation_rate).toLocaleString('en', { minimumFractionDigits: 2 })}` : '—', true],
    ['Safety Stock', item.safety_stock, true],
    ['Brand', item.brand],
    ['Has Batch', item.has_batch_no ? 'Yes' : 'No'],
    ['Has Serial No', item.has_serial_no ? 'Yes' : 'No'],
    ['Status', item.disabled ? 'Disabled' : 'Active'],
  ];

  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div variants={fadeInUp} className="flex items-center gap-3">
        <button className="btn-secondary p-2" onClick={() => navigate('/items')} aria-label="Back">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <h1 className="display-heading" style={{ fontSize: '24px' }}>{item.item_name}</h1>
          <p className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{item.item_code}</p>
        </div>
        <button className="btn-primary" onClick={() => setEditOpen(true)}>
          <Edit2 size={14} /> Edit
        </button>
      </motion.div>

      <motion.div className="glass-card p-6" variants={fadeInUp}>
        <h3 className="section-heading mb-5">Item Details</h3>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {fields.map(([label, value, mono]) => (
            <div key={label}>
              <p className="label-caps mb-1">{label}</p>
              <p className={mono ? 'mono-data' : ''} style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>
                {value ?? '—'}
              </p>
            </div>
          ))}
        </div>
        {item.description && (
          <div className="mt-5 pt-5" style={{ borderTop: 'var(--glass-border-stroke)' }}>
            <p className="label-caps mb-2">Description</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>{item.description}</p>
          </div>
        )}
      </motion.div>

      <Drawer open={editOpen} onClose={() => setEditOpen(false)} title="Edit Item">
        <ItemForm defaultValues={item} onSuccess={refetch} onClose={() => setEditOpen(false)} />
      </Drawer>
    </motion.div>
  );
}
