import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useApiQuery from '../../hooks/useApiQuery';
import FormField from '../../components/ui/FormField';
import PageHeader from '../../components/ui/PageHeader';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import { updateStockSettings } from './stockSettings.api';
import { staggerContainer, fadeInUp } from '../../animations';

export default function StockSettingsForm() {
  const { data, loading, error } = useApiQuery('/api/resource/Stock Settings');
  const settings = data?.data;

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  const onSubmit = async (data) => {
    try {
      await updateStockSettings(data);
      toast.success('Stock settings saved');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to save settings');
    }
  };

  if (loading) return <LoadingSkeleton rows={6} cols={2} />;

  return (
    <motion.div className="space-y-6" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Stock Settings" subtitle="Global configuration for the stock module" />
      <motion.div className="glass-card p-6" variants={fadeInUp}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <FormField label="Default Warehouse">
              <input className="glass-input" {...register('default_warehouse')} placeholder="Default warehouse" />
            </FormField>
            <FormField label="Valuation Method">
              <select className="glass-input" {...register('valuation_method')}>
                <option value="FIFO">FIFO</option>
                <option value="Moving Average">Moving Average</option>
              </select>
            </FormField>
            <FormField label="Stock Frozen Date">
              <input className="glass-input" type="date" {...register('stock_frozen_upto')} />
            </FormField>
            <FormField label="Grace Period (days)">
              <input className="glass-input mono-data" type="number" {...register('stock_frozen_upto_days')} placeholder="0" />
            </FormField>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            {[
              ['allow_negative_stock', 'Allow Negative Stock'],
              ['show_barcode_field', 'Show Barcode Field'],
              ['auto_indent', 'Auto Reorder'],
              ['set_qty_in_transactions_based_on_serial_no_input', 'Qty from Serial No'],
            ].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer label-caps">
                <input type="checkbox" {...register(field)} style={{ accentColor: 'var(--color-brand-accent)' }} />
                {label}
              </label>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Settings
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
