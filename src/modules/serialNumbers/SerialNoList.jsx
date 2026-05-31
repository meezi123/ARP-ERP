import { useState, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import useApiQuery from '../../hooks/useApiQuery';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import useDebounce from '../../hooks/useDebounce';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 25;
const col = createColumnHelper();

export default function SerialNoList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'item_code', 'warehouse', 'status', 'purchase_rate', 'supplier']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    ...(debSearch ? { filters: JSON.stringify([['name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Serial No', params);
  const serials = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Serial No',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('item_code', { header: 'Item', cell: i => <span style={{ fontWeight: 500 }}>{i.getValue()}</span> }),
    col.accessor('warehouse', { header: 'Warehouse' }),
    col.accessor('status', { header: 'Status', cell: i => <StatusBadge status={i.getValue()} /> }),
    col.accessor('purchase_rate', {
      header: 'Purchase Rate',
      cell: i => <span className="mono-data">{i.getValue() ? parseFloat(i.getValue()).toFixed(2) : '—'}</span>,
    }),
    col.accessor('supplier', { header: 'Supplier' }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Serial Numbers" subtitle="Track individual serialized items" />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search serial numbers…" />
        </div>
        {error ? <EmptyState title="Failed to load serial numbers" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={serials} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
