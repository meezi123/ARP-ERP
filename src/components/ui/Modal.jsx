import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { modalContent, modalOverlay } from '../../animations';

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  const widths = { sm: '440px', md: '600px', lg: '800px', xl: '1000px' };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="glass-card-neon flex flex-col overflow-hidden"
              style={{ width: '100%', maxWidth: widths[size], maxHeight: '90vh' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 pb-4" style={{ borderBottom: 'var(--glass-border-stroke)' }}>
                <h2 className="section-heading">{title}</h2>
                <button onClick={onClose} className="btn-secondary p-1.5" aria-label="Close modal">
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto p-6 flex-1">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
