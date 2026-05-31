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

export default function MaterialRequestList({ onCreateClick }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'material_request_type', 'status', 'schedule_date', 'company', 'requested_by']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    order_by: 'creation desc',
    ...(debSearch ? { filters: JSON.stringify([['name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Material Request', params);
  const requests = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'MR ID',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('material_request_type', { header: 'Type', cell: i => <span style={{ fontWeight: 500 }}>{i.getValue()}</span> }),
    col.accessor('schedule_date', {
      header: 'Schedule Date',
      cell: i => <span className="mono-data" style={{ fontSize: '12px' }}>{i.getValue() ? format(new Date(i.getValue()), 'MMM d, yyyy') : '—'}</span>,
    }),
    col.accessor('company', { header: 'Company' }),
    col.accessor('requested_by', { header: 'Requested By' }),
    col.accessor('status', { header: 'Status', cell: i => <StatusBadge status={i.getValue()} /> }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Material Requests"
        subtitle="Track purchase and transfer requests"
        actions={<button className="btn-primary" onClick={onCreateClick}><Plus size={14} /> New Request</button>}
      />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search requests…" />
        </div>
        {error ? <EmptyState title="Failed to load" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={requests} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
}
