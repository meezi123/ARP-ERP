import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { drawerSlide, modalOverlay } from '../../animations';

export default function Drawer({ open, onClose, title, children, width = '520px' }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col overflow-hidden"
            style={{
              width,
              maxWidth: '95vw',
              background: 'var(--glass-bg-heavy)',
              border: 'var(--glass-border-neon)',
              borderRight: 'none',
              backdropFilter: 'var(--glass-blur-heavy)',
              WebkitBackdropFilter: 'var(--glass-blur-heavy)',
              boxShadow: 'var(--shadow-card-elevated)',
            }}
            variants={drawerSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-6" style={{ borderBottom: 'var(--glass-border-stroke)', flexShrink: 0 }}>
              <h2 className="section-heading">{title}</h2>
              <button onClick={onClose} className="btn-secondary p-1.5" aria-label="Close drawer">
                <X size={16} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
