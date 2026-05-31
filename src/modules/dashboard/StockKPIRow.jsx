import KPICard from '../../components/ui/KPICard';

export default function StockKPIRow({ kpis = {}, loading }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
      {kpis.items !== undefined && <KPICard label="Total Items" value={kpis.items} loading={loading} />}
      {kpis.stockValue !== undefined && <KPICard label="Stock Value" value={kpis.stockValue} prefix="$" loading={loading} />}
      {kpis.lowStock !== undefined && <KPICard label="Low Stock" value={kpis.lowStock} loading={loading} />}
      {kpis.pendingMRs !== undefined && <KPICard label="Pending MRs" value={kpis.pendingMRs} loading={loading} />}
    </div>
  );
}
