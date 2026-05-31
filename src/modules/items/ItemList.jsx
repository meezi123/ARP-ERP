import { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import EmptyState from '../../components/ui/EmptyState';
import { deleteItem } from './items.api';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 20;
const col = createColumnHelper();

export default function ItemList({ onCreateClick }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const debSearch = useDebounce(search);
  const navigate = useNavigate();

  const params = useMemo(() => ({
    fields: JSON.stringify(['item_code', 'item_name', 'item_group', 'stock_uom', 'valuation_rate', 'disabled']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'item_code asc',
    ...(debSearch ? { filters: JSON.stringify([['item_name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Item', params);
  const items = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('item_code', {
      header: 'Item Code',
      cell: info => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{info.getValue()}</span>,
    }),
    col.accessor('item_name', {
      header: 'Item Name',
      cell: info => <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{info.getValue()}</span>,
    }),
    col.accessor('item_group', { header: 'Group' }),
    col.accessor('stock_uom', { header: 'UOM' }),
    col.accessor('valuation_rate', {
      header: 'Val. Rate',
      cell: info => <span className="mono-data">{info.getValue() ? parseFloat(info.getValue()).toLocaleString('en', { minimumFractionDigits: 2 }) : '—'}</span>,
    }),
    col.accessor('disabled', {
      header: 'Status',
      cell: info => <span className={`badge ${info.getValue() ? 'badge-error' : 'badge-success'}`}>{info.getValue() ? 'Disabled' : 'Active'}</span>,
    }),
    col.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <button className="btn-secondary py-1 px-2" onClick={() => navigate(`/items/${row.original.item_code}`)} aria-label="Edit">
            <Edit2 size={12} />
          </button>
          <button className="btn-secondary py-1 px-2" onClick={() => setDeleteTarget(row.original.item_code)} aria-label="Delete"
            style={{ color: 'var(--color-sys-error)' }}>
            <Trash2 size={12} />
          </button>
        </div>
      ),
    }),
  ], [navigate]);

  const handleDelete = async () => {
    try {
      await deleteItem(deleteTarget);
      toast.success('Item deleted');
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Item Master"
        subtitle="Manage your inventory items"
        actions={
          <button className="btn-primary" onClick={onCreateClick}>
            <Plus size={14} /> New Item
          </button>
        }
      />

      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search items…" />
        </div>

        {error ? (
          <EmptyState title="Failed to load items" message={error} onRetry={refetch} />
        ) : (
          <>
            <DataTable columns={columns} data={items} loading={loading} onRowClick={row => navigate(`/items/${row.item_code}`)} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteTarget}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
      />
    </motion.div>
  );
}
