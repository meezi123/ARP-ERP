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
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import useDebounce from '../../hooks/useDebounce';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 20;
const col = createColumnHelper();

export default function PurchaseReceiptList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'supplier', 'posting_date', 'status', 'grand_total', 'company']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'creation desc',
    ...(debSearch ? { filters: JSON.stringify([['supplier', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Purchase Receipt', params);
  const receipts = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Receipt ID',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('supplier', { header: 'Supplier', cell: i => <span style={{ fontWeight: 500 }}>{i.getValue()}</span> }),
    col.accessor('posting_date', {
      header: 'Date',
      cell: i => <span className="mono-data" style={{ fontSize: '12px' }}>{i.getValue() ? format(new Date(i.getValue()), 'MMM d, yyyy') : '—'}</span>,
    }),
    col.accessor('grand_total', {
      header: 'Total',
      cell: i => <span className="mono-data">{i.getValue() ? parseFloat(i.getValue()).toLocaleString('en', { minimumFractionDigits: 2 }) : '—'}</span>,
    }),
    col.accessor('company', { header: 'Company' }),
    col.accessor('status', { header: 'Status', cell: i => <StatusBadge status={i.getValue()} /> }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Purchase Receipts" subtitle="Incoming goods from suppliers" />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by supplier…" />
        </div>
        {error ? <EmptyState title="Failed to load receipts" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={receipts} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
