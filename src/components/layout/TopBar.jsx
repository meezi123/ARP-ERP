import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import useAuth from '../../hooks/useAuth';

const PAGE_LABELS = {
  '/':                    'Dashboard',
  '/items':               'Item Master',
  '/item-groups':         'Item Groups',
  '/warehouses':          'Warehouses',
  '/bin-balances':        'Bin Balances',
  '/uom':                 'UOM',
  '/price-lists':         'Price Lists',
  '/stock-entries':       'Stock Entries',
  '/material-requests':   'Material Requests',
  '/stock-reconciliation':'Stock Reconciliation',
  '/stock-ledger':        'Stock Ledger',
  '/stock-reservation':   'Stock Reservation',
  '/purchase-receipts':   'Purchase Receipts',
  '/delivery-notes':      'Delivery Notes',
  '/pick-lists':          'Pick Lists',
  '/packing-slips':       'Packing Slips',
  '/shipments':           'Shipments',
  '/delivery-trips':      'Delivery Trips',
  '/quality-inspection':  'Quality Inspection',
  '/landed-cost':         'Landed Cost',
  '/putaway-rules':       'Putaway Rules',
  '/batches':             'Batch Tracking',
  '/serial-numbers':      'Serial Numbers',
  '/reports':             'Reports',
  '/settings':            'Settings',
};

export default function TopBar({ onMenuClick }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [search, setSearch] = useState('');
  const [rotating, setRotating] = useState(false);

  const pageName = PAGE_LABELS[pathname] || 'ARP ERP';
  const initials = user?.full_name
    ? user.full_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  const handleTheme = () => {
    setRotating(true);
    document.body.classList.add('theme-transitioning');
    toggle();
    setTimeout(() => {
      setRotating(false);
      document.body.classList.remove('theme-transitioning');
    }, 400);
  };

  return (
    <motion.header
      className="flex items-center gap-4 px-6"
      style={{
        height: '60px',
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: 'var(--glass-border-stroke)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        flexShrink: 0,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Toggle menu"
        style={{
          width: '36px', height: '36px', borderRadius: '9px',
          background: 'var(--glass-bg-surface)',
          border: 'var(--glass-border-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--color-text-secondary)',
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
          flexShrink: 0,
        }}
        onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--glow-card)'; }}
        onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <Menu size={16} />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'var(--gradient-primary-mesh)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 10px 1px rgba(109,31,58,0.40)',
        }}>
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: 700, fontFamily: 'Cormorant Garamond, serif' }}>
            {pageName[0]}
          </span>
        </div>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {pageName}
        </span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: '360px', margin: '0 auto', position: 'relative' }}>
        <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', fontSize: '13px', pointerEvents: 'none' }}>⌕</span>
        <input
          className="glass-input"
          type="text"
          placeholder="Search across ERP…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: '32px', paddingRight: '48px', fontSize: '13px', padding: '8px 48px 8px 32px' }}
        />
        <span style={{
          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'var(--color-text-muted)',
          background: 'var(--color-surface-elevated)', padding: '2px 6px', borderRadius: '5px',
          border: 'var(--glass-border-light)',
        }}>⌘K</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2" style={{ marginLeft: 'auto', flexShrink: 0 }}>
        {/* Theme toggle */}
        <button
          onClick={handleTheme}
          className="flex items-center gap-1.5"
          aria-label="Toggle theme"
          style={{
            background: 'var(--glass-bg-surface)',
            border: 'var(--glass-border-light)',
            borderRadius: '20px',
            padding: '5px 12px 5px 8px',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            fontSize: '12px', fontWeight: 500,
            transition: 'all 0.2s ease, transform 0.4s',
            transform: rotating ? 'rotate(360deg)' : 'none',
          }}
        >
          {theme === 'dark'
            ? <Moon size={14} style={{ color: 'var(--color-text-muted)' }} />
            : <Sun  size={14} style={{ color: 'var(--color-text-muted)' }} />
          }
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'var(--glass-bg-surface)',
            border: 'var(--glass-border-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--color-text-secondary)',
            position: 'relative',
            transition: 'background 0.2s ease, box-shadow 0.2s ease',
          }}
        >
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: '7px', right: '7px',
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--color-sys-error)',
            boxShadow: '0 0 6px rgba(220,38,38,0.7)',
            animation: 'dotPulse 2s ease-in-out infinite',
          }} />
        </button>

        {/* User pill */}
        <div
          className="flex items-center gap-2"
          style={{
            background: 'var(--glass-bg-surface)',
            border: 'var(--glass-border-light)',
            borderRadius: '20px',
            padding: '4px 10px 4px 4px',
            cursor: 'default',
            transition: 'box-shadow 0.2s ease',
          }}
        >
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%',
            background: 'var(--gradient-primary-mesh)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: 600, color: '#fff',
          }}>
            {initials}
          </div>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
            {user?.full_name?.split(' ')[0] || 'User'}
          </span>
          <button
            onClick={logout}
            aria-label="Logout"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-text-muted)', padding: 0 }}
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
