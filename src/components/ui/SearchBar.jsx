import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex items-center" style={{ transition: 'width 0.3s var(--ease-luxury)', width: focused ? '280px' : '220px' }}>
      <Search size={14} className="absolute left-3" style={{ color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
      <input
        className="glass-input pl-9 pr-8"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2"
          style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
