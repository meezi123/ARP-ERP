import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from '../../components/ui/FormField';
import useApiQuery from '../../hooks/useApiQuery';
import { createItemGroup, updateItemGroup } from './itemGroups.api';

export default function ItemGroupForm({ defaultValues, onSuccess, onClose }) {
  const isEdit = !!defaultValues;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: defaultValues
      ? { item_group_name: defaultValues.name, parent_item_group: defaultValues.parent_item_group, is_group: !!defaultValues.is_group }
      : { is_group: false },
  });

  const { data: groupsData } = useApiQuery('/api/resource/Item Group', {
    fields: JSON.stringify(['name']),
    limit: 200,
    order_by: 'name asc',
  });
  const parentGroups = groupsData?.data || [];

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateItemGroup(defaultValues.name, {
          parent_item_group: data.parent_item_group,
          is_group: data.is_group ? 1 : 0,
        });
        toast.success('Item group updated');
      } else {
        await createItemGroup({
          item_group_name: data.item_group_name,
          parent_item_group: data.parent_item_group || undefined,
          is_group: data.is_group ? 1 : 0,
        });
        toast.success('Item group created');
      }
      onSuccess?.();
      onClose?.();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField label="Group Name" required error={errors.item_group_name?.message}>
        <input
          className="glass-input"
          {...register('item_group_name', { required: 'Group name is required' })}
          placeholder="e.g. Raw Material"
          aria-label="Group name"
          readOnly={isEdit}
        />
      </FormField>

      <FormField label="Parent Group">
        <select className="glass-input" {...register('parent_item_group')} aria-label="Parent group">
          <option value="">— None —</option>
          {parentGroups
            .filter(g => !isEdit || g.name !== defaultValues.name)
            .map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
        </select>
      </FormField>

      <label className="flex items-center gap-2 cursor-pointer label-caps">
        <input type="checkbox" {...register('is_group')} style={{ accentColor: 'var(--color-brand-accent)' }} />
        Is Group (can have sub-groups)
      </label>

      <div className="flex gap-3 justify-end pt-2">
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : null}
          {isEdit ? 'Update Group' : 'Create Group'}
        </button>
      </div>
    </form>
  );
}
