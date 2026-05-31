import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--glass-bg-heavy)',
      border: 'var(--glass-border-neon)',
      borderRadius: '10px',
      padding: '10px 14px',
      backdropFilter: 'var(--glass-blur)',
    }}>
      <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ fontSize: '14px', fontFamily: "'DM Mono', monospace", color: 'var(--color-text-brand)' }}>
          {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function StockTrendChart({ data = [], dataKey = 'value', nameKey = 'date', height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#E04070" stopOpacity={0.50} />
            <stop offset="50%" stopColor="#B23A5A" stopOpacity={0.20} />
            <stop offset="100%" stopColor="#6D1F3A" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey={nameKey}
          tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Instrument Sans' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'DM Mono' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#E04070"
          strokeWidth={2.5}
          fill="url(#stockGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#E04070', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
