import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import useCountUp from '../../hooks/useCountUp';
import { fadeInUp } from '../../animations';

/* Static sparkline paths — decorative, four variants */
const SPARKS = {
  up: {
    area: 'M0,28 L15,24 L30,20 L45,22 L60,16 L75,12 L90,8 L105,6 L120,4 L120,32 L0,32 Z',
    line: 'M0,28 L15,24 L30,20 L45,22 L60,16 L75,12 L90,8 L105,6 L120,4',
    color: '#B23A5A',
  },
  down: {
    area: 'M0,4 L15,6 L30,8 L45,7 L60,10 L75,14 L90,16 L105,18 L120,22 L120,32 L0,32 Z',
    line: 'M0,4 L15,6 L30,8 L45,7 L60,10 L75,14 L90,16 L105,18 L120,22',
    color: '#DC2626',
  },
  flat: {
    area: 'M0,16 L30,14 L60,16 L90,15 L120,16 L120,32 L0,32 Z',
    line: 'M0,16 L30,14 L60,16 L90,15 L120,16',
    color: '#B23A5A',
  },
  warning: {
    area: 'M0,10 L20,12 L40,8 L60,14 L80,10 L100,16 L120,12 L120,32 L0,32 Z',
    line: 'M0,10 L20,12 L40,8 L60,14 L80,10 L100,16 L120,12',
    color: '#D97706',
  },
};

function Sparkline({ variant = 'up', id }) {
  const spark = SPARKS[variant] || SPARKS.up;
  const gradId = `sg-${id}`;
  return (
    <svg viewBox="0 0 120 32" preserveAspectRatio="none" style={{ width: '100%', height: '32px', marginTop: '12px', display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={spark.color} stopOpacity="0.40" />
          <stop offset="100%" stopColor={spark.color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradId})`} d={spark.area} />
      <path fill="none" stroke={spark.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d={spark.line} />
    </svg>
  );
}

export default function KPICard({
  label,
  value,
  icon: Icon,
  prefix = '',
  suffix = '',
  loading = false,
  spark = 'up',       /* 'up' | 'down' | 'flat' | 'warning' */
  sparkId = 'kpi',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const numVal = parseFloat(String(value ?? '').replace(/[^0-9.]/g, '')) || 0;
  const animated = useCountUp(isInView ? numVal : 0);

  const formatVal = (v) => {
    if (numVal >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
    if (numVal >= 1_000)     return (v / 1_000).toFixed(1) + 'K';
    return Math.round(v).toLocaleString();
  };

  return (
    <motion.div
      ref={ref}
      className="glass-card p-5"
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ cursor: 'default' }}
    >
      {/* Header: label + icon */}
      <div className="flex items-start justify-between" style={{ marginBottom: '14px' }}>
        <span className="label-caps" style={{ paddingTop: '2px' }}>{label}</span>
        {Icon && (
          <div style={{
            width: '34px', height: '34px', borderRadius: '9px', flexShrink: 0,
            background: 'var(--gradient-primary-mesh)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px 1px rgba(109,31,58,0.45)',
          }}>
            <Icon size={15} color="#fff" />
          </div>
        )}
      </div>

      {/* Value */}
      {loading ? (
        <div className="skeleton" style={{ height: '36px', width: '120px', marginBottom: '10px' }} />
      ) : (
        <div
          className="mono-data"
          style={{ fontSize: '26px', fontWeight: 500, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '10px' }}
        >
          {prefix}{formatVal(animated)}{suffix && <span style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginLeft: '3px' }}>{suffix}</span>}
        </div>
      )}

      {/* Sparkline */}
      <Sparkline variant={spark} id={sparkId} />
    </motion.div>
  );
}
