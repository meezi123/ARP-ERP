import { PackageOpen, RefreshCw } from 'lucide-react';

export default function EmptyState({ title = 'No data found', message, onRetry, icon: Icon = PackageOpen }) {
  return (
    <div className="glass-card p-12 flex flex-col items-center gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(109,31,58,0.12)', border: 'var(--glass-border-neon)' }}>
        <Icon size={28} style={{ color: 'var(--color-text-brand)' }} />
      </div>
      <div>
        <p className="section-heading mb-1">{title}</p>
        {message && <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>{message}</p>}
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-2">
          <RefreshCw size={14} /> Retry
        </button>
      )}
    </div>
  );
}
