export default function FormField({ label, required, error, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="label-caps">
          {label}
          {required && <span style={{ color: 'var(--color-brand-accent)', marginLeft: '3px' }}>*</span>}
        </label>
      )}
      {children}
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--color-sys-error)', fontFamily: "'Instrument Sans', sans-serif" }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: "'Instrument Sans', sans-serif" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
