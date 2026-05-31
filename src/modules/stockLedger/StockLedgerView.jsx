import { useState, useMemo } from 'react';
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

const PAGE_SIZE = 25;
const col = createColumnHelper();

export default function StockLedgerView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'item_code', 'warehouse', 'actual_qty', 'qty_after_transaction', 'posting_date', 'voucher_type', 'voucher_no', 'incoming_rate', 'stock_value_difference']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'posting_date desc, posting_time desc',
    ...(debSearch ? { filters: JSON.stringify([['item_code', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Stock Ledger Entry', params);
  const entries = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('posting_date', {
      header: 'Date',
      cell: i => <span className="mono-data" style={{ fontSize: '11px' }}>{i.getValue() ? format(new Date(i.getValue()), 'MMM d, yyyy') : '—'}</span>,
    }),
    col.accessor('item_code', {
      header: 'Item Code',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('warehouse', { header: 'Warehouse', cell: i => <span style={{ fontSize: '12px' }}>{i.getValue()}</span> }),
    col.accessor('voucher_type', { header: 'Voucher Type', cell: i => <span style={{ fontSize: '12px' }}>{i.getValue()}</span> }),
    col.accessor('voucher_no', {
      header: 'Voucher No',
      cell: i => <span className="mono-data" style={{ fontSize: '11px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('actual_qty', {
      header: 'Qty Change',
      cell: i => {
        const v = parseFloat(i.getValue()) || 0;
        return <span className="mono-data" style={{ color: v >= 0 ? 'var(--color-sys-success)' : 'var(--color-sys-error)' }}>
          {v > 0 ? '+' : ''}{v.toLocaleString('en', { maximumFractionDigits: 3 })}
        </span>;
      },
    }),
    col.accessor('qty_after_transaction', {
      header: 'Balance',
      cell: i => <span className="mono-data">{parseFloat(i.getValue() || 0).toLocaleString('en', { maximumFractionDigits: 3 })}</span>,
    }),
    col.accessor('stock_value_difference', {
      header: 'Value Change',
      cell: i => {
        const v = parseFloat(i.getValue()) || 0;
        return <span className="mono-data" style={{ color: v >= 0 ? 'var(--color-sys-success)' : 'var(--color-sys-error)' }}>
          {v > 0 ? '+' : ''}{v.toLocaleString('en', { minimumFractionDigits: 2 })}
        </span>;
      },
    }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader title="Stock Ledger" subtitle="Audit log of all stock movements — read only" />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by item code…" />
        </div>
        {error ? <EmptyState title="Failed to load ledger" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={entries} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
