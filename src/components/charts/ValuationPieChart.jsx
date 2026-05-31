import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#E04070', '#C73060', '#B23A5A', '#8B2E4F', '#6D1F3A', '#D96080', '#F280A0', '#A04468'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--glass-bg-heavy)',
      border: 'var(--glass-border-neon)',
      borderRadius: '10px',
      padding: '10px 14px',
      backdropFilter: 'var(--glass-blur)',
    }}>
      <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>{payload[0].name}</p>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', color: 'var(--color-text-brand)' }}>
        {payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
};

export default function ValuationPieChart({ data = [], nameKey = 'name', valueKey = 'value' }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          dataKey={valueKey}
          nameKey={nameKey}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={v => <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: 'Instrument Sans' }}>{v}</span>}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
