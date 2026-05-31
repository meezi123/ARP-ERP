export default function LoadingSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="glass-card p-6 space-y-3">
      <div className="skeleton h-5 w-40 mb-6" />
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="skeleton h-4 flex-1" style={{ opacity: 1 - c * 0.1 }} />
          ))}
        </div>
      ))}
    </div>
  );
}
