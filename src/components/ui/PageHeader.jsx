import { motion } from 'framer-motion';
import { slideInLeft } from '../../animations';

export default function PageHeader({ title, subtitle, actions }) {
  return (
    <motion.div
      className="flex items-start justify-between gap-4 mb-6"
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h1 className="display-heading" style={{ fontSize: '28px' }}>{title}</h1>
        {subtitle && <p className="mt-1" style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </motion.div>
  );
}
