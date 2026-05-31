import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, Layers, Warehouse, Archive, Ruler, Tag,
  ArrowLeftRight, ClipboardList, Scale, ScrollText, Lock,
  PackagePlus, PackageMinus, MapPin, Box, Truck, Route,
  CheckSquare, DollarSign, Zap, Hash, BarChart2, Settings, X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { slideInLeft } from '../../animations';
import useAuth from '../../hooks/useAuth';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/', end: true },
  { type: 'section', label: 'Inventory' },
  { label: 'Item Master',    icon: Package,   to: '/items' },
  { label: 'Item Groups',    icon: Layers,    to: '/item-groups' },
  { label: 'Warehouses',     icon: Warehouse, to: '/warehouses' },
  { label: 'Bin Balances',   icon: Archive,   to: '/bin-balances' },
  { label: 'UOM',            icon: Ruler,     to: '/uom' },
  { label: 'Price Lists',    icon: Tag,       to: '/price-lists' },
  { type: 'section', label: 'Stock Movements' },
  { label: 'Stock Entries',       icon: ArrowLeftRight, to: '/stock-entries' },
  { label: 'Material Requests',   icon: ClipboardList,  to: '/material-requests' },
  { label: 'Stock Recon.',        icon: Scale,          to: '/stock-reconciliation' },
  { label: 'Stock Ledger',        icon: ScrollText,     to: '/stock-ledger' },
  { label: 'Stock Reservation',   icon: Lock,           to: '/stock-reservation' },
  { type: 'section', label: 'Receiving & Dispatch' },
  { label: 'Purchase Receipts', icon: PackagePlus,  to: '/purchase-receipts' },
  { label: 'Delivery Notes',    icon: PackageMinus, to: '/delivery-notes' },
  { label: 'Pick Lists',        icon: MapPin,       to: '/pick-lists' },
  { label: 'Packing Slips',     icon: Box,          to: '/packing-slips' },
  { label: 'Shipments',         icon: Truck,        to: '/shipments' },
  { label: 'Delivery Trips',    icon: Route,        to: '/delivery-trips' },
  { type: 'section', label: 'Quality & Costing' },
  { label: 'Quality Inspect.', icon: CheckSquare, to: '/quality-inspection' },
  { label: 'Landed Cost',      icon: DollarSign,  to: '/landed-cost' },
  { label: 'Putaway Rules',    icon: Zap,         to: '/putaway-rules' },
  { label: 'Batch Tracking',   icon: Layers,      to: '/batches' },
  { label: 'Serial Numbers',   icon: Hash,        to: '/serial-numbers' },
  { type: 'section', label: '' },
  { label: 'Reports',  icon: BarChart2, to: '/reports' },
  { label: 'Settings', icon: Settings,  to: '/settings' },
];

export default function Sidebar({ collapsed, onClose }) {
  const { user } = useAuth();
  const initials = user?.full_name
    ? user.full_name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <motion.aside
      className="flex flex-col h-full overflow-hidden"
      style={{
        background: 'var(--sidebar-bg)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: 'var(--glass-border-stroke)',
        width: collapsed ? '64px' : '240px',
        transition: 'width 0.3s var(--ease-luxury), background 0.4s ease, border-color 0.4s ease',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
    >
      {/* ── Logo ───────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: 'var(--glass-border-light)', flexShrink: 0 }}
      >
        {/* Diamond logo mark */}
        <div
          style={{
            width: '32px', height: '32px', flexShrink: 0,
            background: 'var(--gradient-primary-mesh)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            boxShadow: '0 0 20px 2px rgba(109,31,58,0.55)',
          }}
        />
        {!collapsed && (
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '18px', color: 'var(--color-text-primary)', lineHeight: 1, letterSpacing: '0.04em' }}>
              ARP ERP
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'var(--color-text-muted)', letterSpacing: '0.06em', marginTop: '2px' }}>
              STOCK MODULE
            </p>
          </div>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Nav ─────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV.map((item, i) => {
          if (item.type === 'section') {
            return !collapsed && item.label ? (
              <p key={i} className="label-caps px-3 pt-5 pb-2">{item.label}</p>
            ) : (
              <div key={i} style={{ height: '1px', background: 'var(--glass-border-light)', margin: '10px 10px' }} />
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
              style={collapsed ? { justifyContent: 'center', padding: '10px' } : undefined}
            >
              <Icon size={15} className="nav-icon" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* ── User Profile ─────────────────────────────── */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '14px 16px',
          borderTop: 'var(--glass-border-light)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          background: 'var(--gradient-primary-mesh)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 600, color: '#fff',
          boxShadow: '0 0 12px 1px rgba(109,31,58,0.45)',
        }}>
          {initials}
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.full_name || 'User'}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Stock Manager</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
