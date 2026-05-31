import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
      <p style={{ fontSize: '14px', fontFamily: "'DM Mono', monospace", color: 'var(--color-text-brand)' }}>
        {payload[0].value?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </p>
    </div>
  );
};

export default function MovementBarChart({ data = [], dataKey = 'value', nameKey = 'name', height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barCategoryGap="28%">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#E04070" stopOpacity={1}    />
            <stop offset="55%"  stopColor="#C0345E" stopOpacity={0.88} />
            <stop offset="100%" stopColor="#7B1E40" stopOpacity={0.60} />
          </linearGradient>
          <linearGradient id="barGradLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#B23A5A" stopOpacity={1}    />
            <stop offset="100%" stopColor="#6D1F3A" stopOpacity={0.75} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.045)" vertical={false} />
        <XAxis
          dataKey={nameKey}
          tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'Instrument Sans' }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={data.length > 6 ? -30 : 0}
          textAnchor={data.length > 6 ? 'end' : 'middle'}
          height={data.length > 6 ? 42 : 24}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'DM Mono' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(178,58,90,0.06)' }} />
        <Bar dataKey={dataKey} fill="url(#barGrad)" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
