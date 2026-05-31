import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import useApiQuery from '../../hooks/useApiQuery';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import { staggerContainer } from '../../animations';
import useDebounce from '../../hooks/useDebounce';

const PAGE_SIZE = 20;
const col = createColumnHelper();

const docstatusLabel = (v) => {
  if (v === 1) return 'Submitted';
  if (v === 2) return 'Cancelled';
  return 'Draft';
};

export default function StockEntryList({ onCreateClick }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);
  const navigate = useNavigate();

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'stock_entry_type', 'posting_date', 'docstatus', 'from_warehouse', 'to_warehouse', 'total_amount']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'creation desc',
    ...(debSearch ? { filters: JSON.stringify([['name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Stock Entry', params);
  const entries = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Entry ID',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('stock_entry_type', {
      header: 'Type',
      cell: i => <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{i.getValue()}</span>,
    }),
    col.accessor('posting_date', {
      header: 'Date',
      cell: i => <span className="mono-data" style={{ fontSize: '12px' }}>{i.getValue() ? format(new Date(i.getValue()), 'MMM d, yyyy') : '—'}</span>,
    }),
    col.accessor('from_warehouse', { header: 'From Warehouse' }),
    col.accessor('to_warehouse', { header: 'To Warehouse' }),
    col.accessor('total_amount', {
      header: 'Total',
      cell: i => <span className="mono-data">{i.getValue() ? parseFloat(i.getValue()).toLocaleString('en', { minimumFractionDigits: 2 }) : '—'}</span>,
    }),
    col.accessor('docstatus', {
      header: 'Status',
      cell: i => <StatusBadge status={docstatusLabel(i.getValue())} />,
    }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Stock Entries"
        subtitle="Material transfers, receipts, and issues"
        actions={<button className="btn-primary" onClick={onCreateClick}><Plus size={14} /> New Entry</button>}
      />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search entries…" />
        </div>
        {error ? <EmptyState title="Failed to load entries" message={error} onRetry={refetch} /> : (
          <>
            <DataTable
              columns={columns}
              data={entries}
              loading={loading}
              onRowClick={row => navigate(`/stock-entries/${row.name}`)}
            />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
