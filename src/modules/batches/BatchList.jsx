import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import useApiQuery from '../../hooks/useApiQuery';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import useDebounce from '../../hooks/useDebounce';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 20;
const col = createColumnHelper();

export default function BatchList({ onCreateClick }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'item', 'batch_id', 'expiry_date', 'batch_qty', 'disabled']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'creation desc',
    ...(debSearch ? { filters: JSON.stringify([['item', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Batch', params);
  const batches = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Batch ID',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('item', { header: 'Item', cell: i => <span style={{ fontWeight: 500 }}>{i.getValue()}</span> }),
    col.accessor('expiry_date', {
      header: 'Expiry',
      cell: i => {
        if (!i.getValue()) return <span style={{ color: 'var(--color-text-muted)' }}>—</span>;
        const days = Math.ceil((new Date(i.getValue()) - new Date()) / 86400000);
        return (
          <div className="flex items-center gap-2">
            <span className="mono-data" style={{ fontSize: '12px' }}>{format(new Date(i.getValue()), 'MMM d, yyyy')}</span>
            {days <= 30 && <span className={`badge ${days <= 7 ? 'badge-error' : 'badge-warning'}`}>{days}d</span>}
          </div>
        );
      },
    }),
    col.accessor('batch_qty', {
      header: 'Qty',
      cell: i => <span className="mono-data">{i.getValue() ?? '—'}</span>,
    }),
    col.accessor('disabled', {
      header: 'Status',
      cell: i => <span className={`badge ${i.getValue() ? 'badge-error' : 'badge-success'}`}>{i.getValue() ? 'Disabled' : 'Active'}</span>,
    }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Batch Tracking"
        subtitle="Manage inventory batches and expiry"
        actions={onCreateClick && <button className="btn-primary" onClick={onCreateClick}><Plus size={14} /> New Batch</button>}
      />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by item…" />
        </div>
        {error ? <EmptyState title="Failed to load batches" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={batches} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
