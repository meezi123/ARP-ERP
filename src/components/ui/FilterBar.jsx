import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { chipSlideIn } from '../../animations';

export default function FilterBar({ filters, onRemove, options = [], onSelect }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <AnimatePresence>
        {filters.map(f => (
          <motion.div
            key={f.key}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{
              background: 'rgba(109,31,58,0.15)',
              border: 'var(--glass-border-neon)',
              color: 'var(--color-text-brand)',
              fontFamily: "'Instrument Sans', sans-serif",
            }}
            variants={chipSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="label-caps" style={{ fontSize: '10px' }}>{f.label}</span>
            <span style={{ color: 'var(--color-text-primary)' }}>{f.value}</span>
            <button onClick={() => onRemove(f.key)} aria-label={`Remove ${f.label} filter`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'inherit', opacity: 0.7 }}>
              <X size={11} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
