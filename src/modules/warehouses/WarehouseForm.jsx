import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from '../../components/ui/FormField';
import { createWarehouse } from './warehouses.api';

export default function WarehouseForm({ onSuccess, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await createWarehouse(data);
      toast.success('Warehouse created');
      onSuccess?.();
      onClose?.();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to create warehouse');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField label="Warehouse Name" required error={errors.warehouse_name?.message}>
        <input className="glass-input" {...register('warehouse_name', { required: 'Required' })} placeholder="Main Store" />
      </FormField>
      <FormField label="Company" required error={errors.company?.message}>
        <input className="glass-input" {...register('company', { required: 'Required' })} placeholder="Your Company" />
      </FormField>
      <FormField label="Parent Warehouse">
        <input className="glass-input" {...register('parent_warehouse')} placeholder="All Warehouses" />
      </FormField>
      <FormField label="City">
        <input className="glass-input" {...register('city')} placeholder="City" />
      </FormField>
      <div className="flex gap-3 justify-end">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          Create Warehouse
        </button>
      </div>
    </form>
  );
}
