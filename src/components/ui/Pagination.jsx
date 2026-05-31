import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pageSize, total, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 justify-end mt-4">
      <span className="label-caps mr-2">{total} records</span>
      <button
        className="btn-secondary px-2 py-1.5"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>
      {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
        const p = i + 1;
        const active = p === page;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={active ? 'btn-primary px-3 py-1.5 text-xs' : 'btn-secondary px-3 py-1.5 text-xs'}
            style={active ? { boxShadow: 'var(--glow-neon-accent)', fontSize: '12px' } : { fontSize: '12px' }}
          >
            {p}
          </button>
        );
      })}
      <button
        className="btn-secondary px-2 py-1.5"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
