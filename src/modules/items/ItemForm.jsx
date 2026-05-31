import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from '../../components/ui/FormField';
import { createItem, updateItem } from './items.api';

const VALUATION_METHODS = ['FIFO', 'Moving Average', 'LIFO'];

export default function ItemForm({ defaultValues, onSuccess, onClose }) {
  const isEdit = !!defaultValues;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: defaultValues || { stock_uom: 'Nos', valuation_method: 'FIFO', is_stock_item: 1 }
  });

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateItem(defaultValues.item_code, data);
        toast.success('Item updated');
      } else {
        await createItem(data);
        toast.success('Item created');
      }
      onSuccess?.();
      onClose?.();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <FormField label="Item Code" required error={errors.item_code?.message}>
          <input className="glass-input" {...register('item_code', { required: 'Item code is required' })}
            placeholder="e.g. WIDGET-001" aria-label="Item code" readOnly={isEdit} />
        </FormField>
        <FormField label="Item Name" required error={errors.item_name?.message}>
          <input className="glass-input" {...register('item_name', { required: 'Item name is required' })}
            placeholder="e.g. Blue Widget" aria-label="Item name" />
        </FormField>
        <FormField label="Item Group" required error={errors.item_group?.message}>
          <input className="glass-input" {...register('item_group', { required: 'Item group is required' })}
            placeholder="e.g. Raw Material" aria-label="Item group" />
        </FormField>
        <FormField label="Stock UOM" required error={errors.stock_uom?.message}>
          <input className="glass-input" {...register('stock_uom', { required: 'UOM is required' })}
            placeholder="e.g. Nos" aria-label="Stock UOM" />
        </FormField>
        <FormField label="Valuation Method">
          <select className="glass-input" {...register('valuation_method')} aria-label="Valuation method">
            {VALUATION_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </FormField>
        <FormField label="Standard Rate">
          <input className="glass-input mono-data" type="number" step="0.01" {...register('standard_rate')}
            placeholder="0.00" aria-label="Standard rate" />
        </FormField>
        <FormField label="Opening Stock">
          <input className="glass-input mono-data" type="number" step="0.001" {...register('opening_stock')}
            placeholder="0" aria-label="Opening stock" />
        </FormField>
        <FormField label="Safety Stock">
          <input className="glass-input mono-data" type="number" step="0.001" {...register('safety_stock')}
            placeholder="0" aria-label="Safety stock" />
        </FormField>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <label className="flex items-center gap-2 cursor-pointer label-caps">
          <input type="checkbox" {...register('is_stock_item')} style={{ accentColor: 'var(--color-brand-accent)' }} />
          Is Stock Item
        </label>
        <label className="flex items-center gap-2 cursor-pointer label-caps">
          <input type="checkbox" {...register('has_batch_no')} style={{ accentColor: 'var(--color-brand-accent)' }} />
          Has Batch
        </label>
        <label className="flex items-center gap-2 cursor-pointer label-caps">
          <input type="checkbox" {...register('has_serial_no')} style={{ accentColor: 'var(--color-brand-accent)' }} />
          Has Serial No
        </label>
        <label className="flex items-center gap-2 cursor-pointer label-caps">
          <input type="checkbox" {...register('disabled')} style={{ accentColor: 'var(--color-brand-accent)' }} />
          Disabled
        </label>
      </div>

      <FormField label="Description">
        <textarea className="glass-input" {...register('description')} rows={3}
          placeholder="Item description…" aria-label="Description" />
      </FormField>

      <div className="flex gap-3 justify-end pt-2">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : null}
          {isEdit ? 'Update Item' : 'Create Item'}
        </button>
      </div>
    </form>
  );
}
