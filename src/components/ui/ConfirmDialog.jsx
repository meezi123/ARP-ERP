import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { modalContent, modalOverlay } from '../../animations';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Confirm Action', message, confirmLabel = 'Confirm', danger = false }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            variants={modalOverlay}
            initial="hidden" animate="visible" exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalContent}
            initial="hidden" animate="visible" exit="exit"
          >
            <div className="glass-card-neon p-8 flex flex-col gap-5" style={{ maxWidth: '400px', width: '100%' }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: danger ? 'var(--color-sys-error-bg)' : 'rgba(109,31,58,0.12)' }}>
                  <AlertTriangle size={18} style={{ color: danger ? 'var(--color-sys-error)' : 'var(--color-text-brand)' }} />
                </div>
                <h3 className="section-heading" style={{ fontSize: '18px' }}>{title}</h3>
              </div>
              {message && <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{message}</p>}
              <div className="flex gap-3 justify-end">
                <button className="btn-secondary" onClick={onClose}>Cancel</button>
                <button
                  className="btn-primary"
                  style={danger ? { background: 'var(--color-sys-error)', boxShadow: '0 0 20px rgba(220,38,38,0.4)' } : {}}
                  onClick={() => { onConfirm(); onClose(); }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
