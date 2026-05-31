import { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createColumnHelper } from '@tanstack/react-table';
import useApiQuery from '../../hooks/useApiQuery';
import useDebounce from '../../hooks/useDebounce';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EmptyState from '../../components/ui/EmptyState';
import { deleteItemGroup } from './itemGroups.api';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 20;
const col = createColumnHelper();

export default function ItemGroupList({ onCreateClick, onEditClick }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'parent_item_group', 'is_group']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'name asc',
    ...(debSearch ? { filters: JSON.stringify([['name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Item Group', params);
  const groups = data?.data || [];
  const total = data?.total_count || 0;

  const handleDelete = async () => {
    try {
      await deleteItemGroup(deleteTarget);
      toast.success('Item group deleted');
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteTarget(null);
    }
  };

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Group Name',
      cell: i => <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{i.getValue()}</span>,
    }),
    col.accessor('parent_item_group', {
      header: 'Parent Group',
      cell: i => i.getValue() || <span style={{ color: 'var(--color-text-muted)' }}>—</span>,
    }),
    col.accessor('is_group', {
      header: 'Type',
      cell: i => (
        <span className={`badge ${i.getValue() ? 'badge-info' : 'badge-brand'}`}>
          {i.getValue() ? 'Group' : 'Leaf'}
        </span>
      ),
    }),
    col.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <button className="btn-secondary py-1 px-2" onClick={() => onEditClick(row.original)} aria-label="Edit">
            <Edit2 size={12} />
          </button>
          <button
            className="btn-secondary py-1 px-2"
            onClick={() => setDeleteTarget(row.original.name)}
            aria-label="Delete"
            style={{ color: 'var(--color-sys-error)' }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      ),
    }),
  ], [onEditClick]);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Item Groups"
        subtitle="Hierarchical item categorization"
        actions={
          <button className="btn-primary" onClick={onCreateClick}>
            <Plus size={14} /> New Group
          </button>
        }
      />

      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search item groups…" />
        </div>

        {error ? (
          <EmptyState icon={Layers} title="Failed to load item groups" message={error} onRetry={refetch} />
        ) : (
          <>
            <DataTable columns={columns} data={groups} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Item Group"
        message={`Are you sure you want to delete "${deleteTarget}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
      />
    </motion.div>
  );
}
