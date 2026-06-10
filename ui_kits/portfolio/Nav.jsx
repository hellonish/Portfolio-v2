/* Portfolio UI kit — top navigation. Sticky, minimal, mono links.
   Loaded via browser Babel; exposes itself on window (no ESM export). */
function PortfolioNav({ onNav, active }) {
  const links = [
    ['about', 'About'], ['work', 'Work'], ['research', 'Research'],
    ['skills', 'Skills'], ['contact', 'Contact'],
  ];
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('[data-scroll]') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setSolid(y > 80);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(20px, 5vw, 56px)', height: 64,
      background: solid ? 'rgba(7,10,11,0.82)' : 'transparent',
      backdropFilter: solid ? 'saturate(140%) blur(12px)' : 'none',
      borderBottom: solid ? '1px solid var(--night-line)' : '1px solid transparent',
      transition: 'background 0.3s ease, border-color 0.3s ease',
    }}>
      <button onClick={() => onNav('top')} style={{
        display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 0,
        cursor: 'pointer', padding: 0,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--teal-400)', boxShadow: '0 0 10px var(--teal-400)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: '#fff' }}>nishant.sh</span>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vw, 30px)' }}>
        {links.map(([id, label]) => (
          <button key={id} onClick={() => onNav(id)} style={{
            background: 'none', border: 0, cursor: 'pointer', padding: '6px 0',
            fontFamily: 'var(--font-mono)', fontSize: 12.5, letterSpacing: '0.02em',
            color: active === id ? 'var(--teal-400)' : 'var(--night-muted)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => { if (active !== id) e.currentTarget.style.color = '#e8ecec'; }}
          onMouseLeave={(e) => { if (active !== id) e.currentTarget.style.color = 'var(--night-muted)'; }}
          >{label}</button>
        ))}
      </div>
    </nav>
  );
}
Object.assign(window, { PortfolioNav });
