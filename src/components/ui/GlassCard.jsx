import { motion } from 'framer-motion';
import { scaleIn } from '../../animations';

export default function GlassCard({ children, neon = false, className = '', animate = true, ...props }) {
  const base = neon ? 'glass-card-neon' : 'glass-card';
  if (!animate) {
    return <div className={`${base} ${className}`} {...props}>{children}</div>;
  }
  return (
    <motion.div
      className={`${base} ${className}`}
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}
