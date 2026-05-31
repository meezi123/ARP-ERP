import { useForm, useFieldArray } from 'react-hook-form';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from '../../components/ui/FormField';
import { createStockEntry } from './stockEntries.api';

const PURPOSES = ['Material Issue', 'Material Receipt', 'Material Transfer', 'Manufacture', 'Repack', 'Send to Subcontractor'];

export default function StockEntryForm({ onSuccess, onClose }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { stock_entry_type: 'Material Transfer', items: [{ item_code: '', qty: 1 }] }
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const onSubmit = async (data) => {
    try {
      await createStockEntry(data);
      toast.success('Stock Entry created as Draft');
      onSuccess?.();
      onClose?.();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create entry');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <FormField label="Entry Type" required>
          <select className="glass-input" {...register('stock_entry_type', { required: true })}>
            {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </FormField>
        <FormField label="Posting Date" required error={errors.posting_date?.message}>
          <input className="glass-input" type="date" {...register('posting_date', { required: 'Required' })} defaultValue={new Date().toISOString().slice(0,10)} />
        </FormField>
        <FormField label="From Warehouse">
          <input className="glass-input" {...register('from_warehouse')} placeholder="Source warehouse" />
        </FormField>
        <FormField label="To Warehouse">
          <input className="glass-input" {...register('to_warehouse')} placeholder="Target warehouse" />
        </FormField>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="label-caps">Items</p>
          <button type="button" className="btn-secondary py-1.5 px-3" style={{ fontSize: '12px' }}
            onClick={() => append({ item_code: '', qty: 1 })}>
            <Plus size={12} /> Add Item
          </button>
        </div>
        <div className="space-y-3">
          {fields.map((field, idx) => (
            <div key={field.id} className="grid gap-3 p-3 rounded-xl" style={{ background: 'var(--glass-bg-light)', border: 'var(--glass-border-stroke)', gridTemplateColumns: '2fr 1fr 1fr 1fr auto' }}>
              <input className="glass-input" {...register(`items.${idx}.item_code`, { required: true })} placeholder="Item Code" aria-label="Item code" />
              <input className="glass-input mono-data" type="number" step="0.001" {...register(`items.${idx}.qty`, { required: true, min: 0.001 })} placeholder="Qty" aria-label="Quantity" />
              <input className="glass-input" {...register(`items.${idx}.s_warehouse`)} placeholder="From" aria-label="Source warehouse" />
              <input className="glass-input" {...register(`items.${idx}.t_warehouse`)} placeholder="To" aria-label="Target warehouse" />
              <button type="button" onClick={() => remove(idx)} disabled={fields.length === 1}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-sys-error)', display: 'flex', alignItems: 'center' }}
                aria-label="Remove item">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          Save as Draft
        </button>
      </div>
    </form>
  );
}
