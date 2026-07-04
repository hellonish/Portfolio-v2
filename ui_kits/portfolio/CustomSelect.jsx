/* Portfolio UI kit — Custom Select Dropdown for mobile screens. */
function CustomSelect({ value, onChange, options, placeholder = "Select an option" }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: 14 }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.03)', color: '#fff',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--night-line)'}`, borderRadius: 6,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', outline: 'none', transition: 'border-color 0.2s, background 0.2s', textAlign: 'left'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', opacity: 0.7 }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8,
          background: 'var(--night-800)', border: '1px solid var(--border)', borderRadius: 6,
          zIndex: 50, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          maxHeight: 280, overflowY: 'auto'
        }}>
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: '12px 16px', cursor: 'pointer',
                background: opt.value === value ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: opt.value === value ? 'var(--accent)' : '#fff',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={(e) => e.currentTarget.style.background = opt.value === value ? 'rgba(255,255,255,0.05)' : 'transparent'}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CustomSelect });
