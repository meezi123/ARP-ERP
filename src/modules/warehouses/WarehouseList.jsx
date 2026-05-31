import { useState, useMemo } from 'react';
import { Plus, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useApiQuery from '../../hooks/useApiQuery';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';
import Drawer from '../../components/ui/Drawer';
import EmptyState from '../../components/ui/EmptyState';
import WarehouseForm from './WarehouseForm';
import { staggerContainer } from '../../animations';
import useDebounce from '../../hooks/useDebounce';

const PAGE_SIZE = 20;
const col = createColumnHelper();

export default function WarehouseList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const debSearch = useDebounce(search);

  const params = useMemo(() => ({
    fields: JSON.stringify(['name', 'warehouse_name', 'company', 'city', 'is_group', 'disabled']),
    limit: PAGE_SIZE,
    limit_start: (page - 1) * PAGE_SIZE,
    ...(debSearch ? { filters: JSON.stringify([['warehouse_name', 'like', `%${debSearch}%`]]) } : {}),
  }), [page, debSearch]);

  const { data, loading, error, refetch } = useApiQuery('/api/resource/Warehouse', params);
  const warehouses = data?.data || [];
  const total = data?.total_count || 0;

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'Warehouse ID',
      cell: i => <span className="mono-data" style={{ fontSize: '12px', color: 'var(--color-text-brand)' }}>{i.getValue()}</span>,
    }),
    col.accessor('warehouse_name', {
      header: 'Name',
      cell: i => <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{i.getValue()}</span>,
    }),
    col.accessor('company', { header: 'Company' }),
    col.accessor('city', { header: 'City' }),
    col.accessor('is_group', {
      header: 'Type',
      cell: i => <span className={`badge ${i.getValue() ? 'badge-info' : 'badge-brand'}`}>{i.getValue() ? 'Group' : 'Leaf'}</span>,
    }),
    col.accessor('disabled', {
      header: 'Status',
      cell: i => <span className={`badge ${i.getValue() ? 'badge-error' : 'badge-success'}`}>{i.getValue() ? 'Disabled' : 'Active'}</span>,
    }),
  ], []);

  return (
    <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
      <PageHeader
        title="Warehouses"
        subtitle="Manage storage locations"
        actions={<button className="btn-primary" onClick={() => setDrawerOpen(true)}><Plus size={14} /> New Warehouse</button>}
      />
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <SearchBar value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search warehouses…" />
        </div>
        {error ? <EmptyState title="Failed to load" message={error} onRetry={refetch} /> : (
          <>
            <DataTable columns={columns} data={warehouses} loading={loading} />
            <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
          </>
        )}
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New Warehouse">
        <WarehouseForm onSuccess={refetch} onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </motion.div>
  );
}
