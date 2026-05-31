import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart2, Layers, Hash, Clock, TrendingDown, Warehouse, TrendingUp, Truck, DollarSign, RotateCcw, Package } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { REPORTS } from './reports.api';
import { fadeInUp, staggerContainer } from '../../animations';

const REPORT_ICONS = {
  'Stock Balance': Package,
  'Stock Ledger': BarChart2,
  'Batch-Wise Balance History': Layers,
  'Serial No Ledger': Hash,
  'Stock Ageing': Clock,
  'Slow Moving Item Analysis': TrendingDown,
  'Warehouse-wise Item Balance': Warehouse,
  'Projected Stock': TrendingUp,
  'Item-wise Sales History': Truck,
  'Item-wise Purchase History': Package,
  'Reorder Point Report': RotateCcw,
  'Delivery Performance': Truck,
  'Landed Cost Summary': DollarSign,
};

export default function ReportsHub() {
  const navigate = useNavigate();

  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Reports & Analytics" subtitle="Live insights from your stock data" />
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {REPORTS.map(report => {
          const Icon = REPORT_ICONS[report] || BarChart2;
          return (
            <motion.div
              key={report}
              className="glass-card p-5 cursor-pointer"
              variants={fadeInUp}
              onClick={() => navigate(`/reports/${encodeURIComponent(report)}`)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(109,31,58,0.12)', border: 'var(--glass-border-neon)' }}>
                  <Icon size={18} style={{ color: 'var(--color-text-brand)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '16px', color: 'var(--color-text-primary)' }}>
                    {report}
                  </p>
                  <p className="label-caps mt-1">View Report</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
