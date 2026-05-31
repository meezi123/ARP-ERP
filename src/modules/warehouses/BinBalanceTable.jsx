import { useState, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import useApiQuery from '../../hooks/useApiQuery';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import useDebounce from '../../hooks/useDebounce';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../animations';

const PAGE_SIZE = 25;
const col = createColumnHelper();

export default function BinBalanceTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['item_code', 'warehouse', 'actual_qty', 'projected_qty', 'reserved_qty', 'ordered_qty', 'valuation_rate', 'stock_value']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'stock_value desc',
    ...(debSearch ? { filters: JSON.stringify([['item_code', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Bin', params);
  const bins = data?.data || [];
  const total = data?.total_count || 0;

  const fmtQty = v => v != null ? parseFloat(v).toLocaleString('en', { maximumFractionDigits: 3 }) : '—';
  const fmtVal = v => v != null ? parseFloat(v).toLocaleString('en', { minimumFractionDigits: 2 }) : '—';

  const columns = useMemo(() => [
    col.accessor('item_code', {
      header: 'Item Code',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('warehouse', { header: 'Warehouse' }),
    col.accessor('actual_qty', {
      header: 'Actual Qty',
      cell: i => <span className="mono-data">{fmtQty(i.getValue())}</span>,
    }),
    col.accessor('projected_qty', {
      header: 'Projected',
      cell: i => <span className="mono-data">{fmtQty(i.getValue())}</span>,
    }),
    col.accessor('reserved_qty', {
      header: 'Reserved',
      cell: i => <span className="mono-data">{fmtQty(i.getValue())}</span>,
    }),
    col.accessor('valuation_rate', {
      header: 'Val. Rate',
      cell: i => <span className="mono-data">{fmtVal(i.getValue())}</span>,
    }),
    col.accessor('stock_value', {
      header: 'Stock Value',
      cell: i => <span className="mono-data" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{fmtVal(i.getValue())}</span>,
    }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Bin Balances" subtitle="Real-time stock levels by warehouse" />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by item code…" />
        </div>
        {error ? <EmptyState title="Failed to load bins" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={bins} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
